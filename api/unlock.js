// /api/unlock.js
//
// Lead-capture gate for the three Agentic Readiness playbooks (Agencies,
// Brands, Publishers). On success:
//   (a) Sets a signed, time-limited access cookie for api/playbook.js.
//   (b) Sends Andrew a notification email (Resend, best-effort).
//   (c) Sends the visitor a branded confirmation email with a signed link
//       that works even on a different device than the one they submitted on.
//   (d) If subscribe===true, adds the visitor to the Resend Audience so
//       they receive the Substack-equivalent newsletter list.
//
// Required env vars (Vercel dashboard → Project Settings → Environment Variables):
//   PLAYBOOK_UNLOCK_SECRET — signs the access cookie and email token.
//   RESEND_API_KEY         — optional. Emails silently skipped if unset.
//   NOTIFY_EMAIL           — where Andrew's notification goes.
//   RESEND_AUDIENCE_ID     — optional. Resend Audience for the newsletter list.
//                            Create one at resend.com/audiences, copy the UUID.
//
// Note on Substack: Substack has no public subscriber-management API.
// Resend Audiences is used as the list manager instead. Subscribers added
// here appear in the Resend Contacts dashboard and can be emailed via
// Resend Broadcasts. The Substack link in the email still points to the
// public Substack page so visitors can also subscribe there directly.

const fs = require("fs");
const path = require("path");
const { COOKIE_NAME, sign } = require("./_lib/playbook-auth");

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

const ROLE_MAP = {
  Brand:     { id: "brands",     label: "Brand Operator",     market: "the buy side" },
  Agency:    { id: "agencies",   label: "Agency Operator",    market: "the agency model" },
  Publisher: { id: "publishers", label: "Publisher Operator", market: "the sell side" },
};

function buildEmailHtml(name, role, playbookUrl) {
  const templatePath = path.join(__dirname, "../Playbook_Email_Template.html");
  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replace(/\{\{name\}\}/g, name || "there")
    .replace(/\{\{role_label\}\}/g, role.label)
    .replace(/\{\{market_context\}\}/g, role.market)
    .replace(/\{\{playbook_url\}\}/g, playbookUrl);
  return html;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const name      = String((body && body.name) || "").trim().slice(0, 200);
  const email     = String((body && body.email) || "").trim().toLowerCase().slice(0, 320);
  const role      = String((body && body.role) || "").trim().slice(0, 50);
  const subscribe = body && body.subscribe === true;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }

  const secret = process.env.PLAYBOOK_UNLOCK_SECRET;
  if (!secret) {
    console.error("PLAYBOOK_UNLOCK_SECRET is not set");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const exp = Math.floor(Date.now() / 1000) + THIRTY_DAYS_SECONDS;
  const token = sign({ email, exp }, secret);

  // Set auth cookie — controls browser-side access via api/playbook.js
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${THIRTY_DAYS_SECONDS}; HttpOnly; Secure; SameSite=Lax`
  );

  const resendKey  = process.env.RESEND_API_KEY;
  const notifyTo   = process.env.NOTIFY_EMAIL;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const roleInfo   = ROLE_MAP[role];

  // All email/list calls are best-effort — failures never block the visitor.
  if (resendKey) {
    // 1. Notification to Andrew
    if (notifyTo) {
      try {
        const resp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Systems That Decide <andrew@systemsthatdecide.io>",
            to: [notifyTo],
            subject: `Playbook unlock: ${name || email}${subscribe ? " + Substack" : ""}`,
            text:
              "New playbook unlock.\n\n" +
              `Name:      ${name || "(not given)"}\n` +
              `Email:     ${email}\n` +
              `Role:      ${role || "(not given)"}\n` +
              `Subscribe: ${subscribe}\n` +
              `Time:      ${new Date().toISOString()}`,
          }),
        });
        if (!resp.ok) {
          console.error("Resend notification failed:", resp.status, await resp.text().catch(() => ""));
        }
      } catch (e) {
        console.error("Notification email error:", e.message);
      }
    }

    // 2. Branded confirmation email to the visitor
    if (roleInfo) {
      try {
        // Signed token in the URL lets the link work on any device, not just
        // the one where the cookie was set.
        const playbookUrl = `https://www.systemsthatdecide.io/api/playbook?id=${roleInfo.id}&token=${encodeURIComponent(token)}`;
        const html = buildEmailHtml(name, roleInfo, playbookUrl);

        const resp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Andrew Gilbert <andrew@systemsthatdecide.io>",
            to: [email],
            subject: `Your ${roleInfo.label} Briefing — Systems That Decide`,
            html,
          }),
        });
        if (!resp.ok) {
          console.error("Confirmation email failed:", resp.status, await resp.text().catch(() => ""));
        }
      } catch (e) {
        console.error("Confirmation email error:", e.message);
      }
    } else {
      console.warn(`Unknown role "${role}" — skipping confirmation email`);
    }

    // 3. Substack opt-in via Resend Audiences
    if (subscribe && audienceId) {
      try {
        const nameParts = name.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName  = nameParts.slice(1).join(" ") || "";

        const resp = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            unsubscribed: false,
          }),
        });
        if (!resp.ok) {
          console.error("Resend Audience add failed:", resp.status, await resp.text().catch(() => ""));
        }
      } catch (e) {
        console.error("Resend Audience error:", e.message);
      }
    } else if (subscribe && !audienceId) {
      console.warn("subscribe=true but RESEND_AUDIENCE_ID not set — skipping list add");
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping all email and list operations");
  }

  return res.status(200).json({ ok: true });
};
