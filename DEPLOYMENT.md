# Diagnostic system: deployment and pre-launch guide

This covers what to set up before the diagnostic system goes live, how to deploy, and what to test before sending real access to a client. It assumes you're deploying from `new-std-website/` with the Vercel CLI already linked (it is. `.vercel` exists and `.env.local` has a `VERCEL_OIDC_TOKEN`).

## 1. Set the three required environment variables

The diagnostic system needs three secrets. None of them live in a file in this repo, they're read server-side only, from Vercel's environment variables. Set them at Project Settings → Environment Variables (Production, and Preview if you want to test there too).

**`CLIENTS_JSON`**
A single JSON string. Keys are access codes, values are that client's record. Example:

```json
{"STD-2026-DEMO":{"name":"Demo Client","tier":"asrp","diagnosticComplete":false,"resultsUrl":null}}
```

Each record has four fields: `name`, `tier` (`asrp` or `agency`), `diagnosticComplete` (boolean), `resultsUrl` (string or `null`). This is the entire client roster. `api/login.js` reads it, matches the submitted code case-insensitively, and returns only that one client's record, never the full object.

**`ADMIN_PASSWORD`**
A single password string for `diagnostic-admin.html`. Checked in `api/admin-login.js` with a constant-time comparison, so pick something real, not the placeholder in `.env.local`.

**`ANTHROPIC_API_KEY`**
Your Anthropic API key, for the admin tool's AI pre-scoring feature (`api/analyze.js`). Get one at console.anthropic.com/settings/keys if you don't already have one wired up.

`.env.local` already documents all three with placeholder values, for local dev only. It's excluded from both git and the Vercel deployment, so it's safe to leave as is, just don't rely on the placeholders in production.

## 2. Confirm the Formspree endpoint

`js/page-diagnostic.jsx` posts completed diagnostics to `https://formspree.io/f/xbdvrkzz`, carried over unchanged from the original prototype. Before launch, log into Formspree and confirm form `xbdvrkzz` is actually connected to your account and an inbox you're watching, not a leftover test form. There's a TODO comment at that line in the file as a reminder. If it's wrong, swap in your real form ID.

## 3. Decide on the benchmark baseline

`js/page-diagnostic-results.jsx` shows a fixed ANZ mid-market baseline on every report's radar chart:

```js
const BENCHMARK = { brand: [1, 2, 1, 1, 2, 1], agency: [2, 1, 1, 2, 2, 1] };
```

Every client currently sees the same comparison numbers. That's fine to ship with, but it's a real product decision (not a bug) whether you want this hard-coded permanently or eventually editable per report from the admin tool. There's a TODO comment at that line as a flag. No action required to launch, just don't forget it's there.

## 4. How the client roster and access codes actually work

There's no database. The roster is the `CLIENTS_JSON` env var, full stop. Two things touch it:

- **Adding a new client**: open `diagnostic-admin.html`, use the "Generate Access Code" panel. It generates a code in the form `STD-YYYY-XXXX` and a ready-to-paste JSON snippet with `diagnosticComplete:false` and `resultsUrl:null`. Paste that snippet into the `CLIENTS_JSON` object in the Vercel dashboard, then redeploy (or trigger a redeploy from the dashboard) so the new value takes effect. Send the client the code.
- **Marking a diagnostic complete**: after you've built a report in the admin tool and generated the results URL (see step 5), go back into `CLIENTS_JSON` in the Vercel dashboard and manually flip that client's `diagnosticComplete` to `true` and set `resultsUrl` to the generated link, then redeploy.

This hand-off is intentionally manual, it's noted directly in a code comment above `generateAccessCode()` in `diagnostic-admin.html`. There's no automation linking "report built" to "client roster updated." If you forget this step, the client's portal page will keep showing "diagnostic in progress" even after you've sent them results.

## 5. Deploy

From `new-std-website/`:

```bash
vercel --prod
```

That's it, no build step (`vercel.json` has `outputDirectory: "."`, so the folder is served as-is). Any file under `api/` is automatically picked up as a serverless function.

## 6. Manual test checklist before sending real access to a client

Run this whole loop yourself with a throwaway test code before you send anything to an actual client.

1. Add a test entry to `CLIENTS_JSON` (e.g. `STD-2026-TEST`, `diagnosticComplete:false`), redeploy.
2. Go to `login.html`, enter the test code. Confirm it logs in and lands on `portal.html`.
3. On the portal, confirm it shows "diagnostic in progress" (not a results link) and links to `diagnostic.html`.
4. Complete the diagnostic survey end to end. Confirm the Formspree submission actually arrives in your inbox.
5. After submitting, reload `diagnostic.html` directly. Confirm what actually happens: since `diagnosticComplete` is still `false` server-side at this point (you haven't flipped it yet), the page will NOT redirect you to the portal, and it resets to the type-selection screen rather than resuming the "thank you" screen. This means a client who completes the survey and then reloads the page, before you've manually marked them complete in `CLIENTS_JSON`, could restart and resubmit. Worth knowing going in. It's not a bug to fix before launch, just a real gap, so the faster you flip `diagnosticComplete` after receiving a submission, the smaller the window for it.
6. Open `diagnostic-admin.html`, log in with `ADMIN_PASSWORD`. Paste the test responses, try the AI pre-scoring assist, confirm it returns suggested scores.
7. Build out a full report (scores, narratives, risk register, etc.), switch to the Preview tab, confirm the radar chart and report render correctly.
8. Copy the generated results link and open it directly in a new tab (logged out). Confirm `diagnostic-results.html` renders the full report from the URL alone.
9. Go back to `CLIENTS_JSON`, set the test client's `diagnosticComplete:true` and `resultsUrl` to the link from step 8, redeploy.
10. Log into the portal again with the same test code. Confirm it now shows "View your results" linking to the correct report.
11. Remove the test entry from `CLIENTS_JSON` before going live, or leave it if you want a standing demo code, your call.

If all eleven steps behave as described, the system is ready for a real client.

## 7. Playbook unlock system (Agentic Readiness briefings)

The three Agentic Readiness playbooks (Brands, Agencies, Publishers) are gated behind a name+email form on `playbooks.html`. Separate feature from the diagnostic system above, same project, same deploy step.

### 7.1 How it's locked

The playbook HTML files live in `api/_content/` (e.g. `playbook-brands.html`), not in the public static root. Vercel excludes underscore-prefixed paths under `api/` from automatic routing, so there's no direct URL to them. The only way to get one is through `api/playbook.js`, which checks for a valid signed cookie first, same fix as moving `CLIENTS_JSON` out of a static file.

- `api/unlock.js` — POST endpoint. Takes `name`/`email`/`role` (role is "Brand"/"Agency"/"Publisher"/"Other", a qualifying field only, it does not restrict access), best-effort emails you a notification via Resend including all three fields, signs a 30-day access cookie (`std_playbook_access`).
- `api/playbook.js` — GET `/api/playbook?id=brands|agencies|publishers`. Verifies the cookie, serves the file from `api/_content/` if valid, otherwise redirects to `/playbooks.html?locked=<id>`.
- `api/check-access.js` — GET endpoint, returns `{unlocked: true/false}`. Lets `playbooks.html` check status on page load without downloading a full ~1.5-2MB playbook just to find out.
- `api/_lib/playbook-auth.js` — shared signing/verification logic the three functions above all call into, one source of truth so they can't quietly drift out of sync.

One unlock covers all three playbooks. There's no per-playbook access, the cookie just means "this visitor unlocked," checked the same way regardless of which `id` is requested. The "I'm a..." role field on the form is for your own lead context (it lands in the notification email), it does not gate which playbook(s) a visitor can read.

### 7.2 Required environment variables

**`PLAYBOOK_UNLOCK_SECRET`**
Any long random string (e.g. `openssl rand -hex 32`). Signs the cookie. Without it, `unlock.js` and `playbook.js` both return 500, this one's not optional.

**`RESEND_API_KEY`** and **`NOTIFY_EMAIL`**
Optional. If either is missing, unlocking still works, you just don't get notified. Sign up at resend.com and get an API key. Without verifying your own sending domain, you're limited to the sandbox sender (`onboarding@resend.dev`), which can only deliver to the email address on your own Resend account, so set `NOTIFY_EMAIL` to that same address.

`.env.local` documents all three with placeholders, for local dev only. Set the real values in Vercel: Project Settings → Environment Variables, same as the diagnostic system's secrets.

### 7.3 Deploy

Same command, no separate step: `vercel --prod`. The new `api/*.js` files are picked up automatically. `api/_content/` and `api/_lib/` are not, by Vercel's own underscore-prefix convention, that's the point of putting the protected files there.

### 7.4 Manual test checklist before sending the link anywhere

1. Confirm all three env vars are set in Vercel (Production), redeploy.
2. Open `playbooks.html` in a private/incognito window. Confirm all three cards show "Unlock above to read," not direct links.
3. Fetch `/api/playbook?id=brands` directly, with no cookie set. Confirm it redirects to `/playbooks.html?locked=brands`, and that the page shows the "your access link expired" notice.
4. Submit the form with a real email and a role selected. Confirm the page flips all three cards to "Read now," and that you receive the Resend notification email (if configured) with name, email, and role all present.
5. Click "Read now" on each of the three. Confirm each opens the correct briefing.
6. Reload `playbooks.html` fresh (new tab, same browser). Confirm it skips the form and shows all three already unlocked, that's `check-access.js` reading the existing cookie, no form resubmission needed.
7. Clear cookies (or open a fresh private window) and confirm the form reappears and the direct `/api/playbook?id=...` links redirect again.
8. Check the actual content being served. The three files in `api/_content/` were swapped on 2026-06-24 for a revised set with the "Annex · Contract language" section and Module 05 (privacy, legal and regulatory risk) removed from all three, consistent with the contract-clause risk flagged in the Legal Risk Assessment doc. If that swap wasn't intentional, the wrong files are live.

If all eight behave as described, the unlock flow is ready to share.
