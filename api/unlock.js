// /api/unlock.js
//
// Lead-capture gate for the three Agentic Readiness playbooks (Agencies,
// Brands, Publishers). A visitor submits name + email here. On success we
// (a) email Andrew a notification via Resend, best-effort, and (b) set a
// signed, time-limited cookie that api/playbook.js checks before releasing
// any playbook content.
//
// Same shape as api/login.js: validate input, do the real check server-side,
// return a generic response. The thing actually doing the locking is
// PLAYBOOK_UNLOCK_SECRET (Vercel env var) — it signs the access cookie so a
// visitor can't forge one by hand-editing a cookie value in devtools. Without
// a valid signature, api/playbook.js will not serve the file no matter what
// the cookie claims.
//
// Required env vars (Vercel dashboard -> Project Settings -> Environment
// Variables; see DEPLOYMENT.md):
//   PLAYBOOK_UNLOCK_SECRET — any long random string, used to sign the cookie.
//   RESEND_API_KEY         — optional. If unset, unlocking still works, you
//                             just won't get a notification email.
//   NOTIFY_EMAIL           — where the notification email is sent.

const { COOKIE_NAME, sign } = require("./_lib/playbook-auth");

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

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

  const name = String((body && body.name) || "").trim().slice(0, 200);
  const email = String((body && body.email) || "").trim().toLowerCase().slice(0, 320);
  // Qualifying field only — shows up in the notification email so Andrew
  // knows who's asking, but does not gate access. Every valid unlock still
  // grants all three playbooks, regardless of what's selected here.
  const role = String((body && body.role) || "").trim().slice(0, 50);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }

  const secret = process.env.PLAYBOOK_UNLOCK_SECRET;
  if (!secret) {
    console.error("PLAYBOOK_UNLOCK_SECRET is not set");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  // Notify Andrew. Best-effort — a failed or unconfigured notification
  // should never block the visitor from getting access to the content
  // they just gave their email for.
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.NOTIFY_EMAIL;
    if (resendKey && notifyTo) {
      const resendResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Systems That Decide <onboarding@resend.dev>",
          to: [notifyTo],
          subject: `Playbook unlock: ${name || email}`,
          text:
            "New playbook unlock.\n\n" +
            `Name: ${name || "(not given)"}\n` +
            `Email: ${email}\n` +
            `Role: ${role || "(not given)"}\n` +
            `Time: ${new Date().toISOString()}`,
        }),
      });
      if (!resendResp.ok) {
        const errText = await resendResp.text().catch(() => "");
        console.error("Resend notification failed:", resendResp.status, errText);
      }
    } else {
      console.warn("RESEND_API_KEY or NOTIFY_EMAIL not set — skipping notification email");
    }
  } catch (e) {
    console.error("Notification email failed:", e.message);
  }

  const exp = Math.floor(Date.now() / 1000) + THIRTY_DAYS_SECONDS;
  const token = sign({ email, exp }, secret);

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${THIRTY_DAYS_SECONDS}; HttpOnly; Secure; SameSite=Lax`
  );

  return res.status(200).json({ ok: true });
};
