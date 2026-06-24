// /api/check-access.js
//
// Lightweight status check: does this visitor already have a valid playbook
// access cookie? playbooks.html calls this on page load so a returning
// visitor isn't asked to re-submit the form, without paying the cost of a
// full ~1.5-2MB playbook fetch just to find out. No file reads, just cookie
// verification, same shared logic api/unlock.js and api/playbook.js use.
//
// Usage: GET /api/check-access -> { unlocked: true } or { unlocked: false }

const { COOKIE_NAME, verify, parseCookies } = require("./_lib/playbook-auth");

module.exports = async function handler(req, res) {
  const secret = process.env.PLAYBOOK_UNLOCK_SECRET;
  if (!secret) {
    console.error("PLAYBOOK_UNLOCK_SECRET is not set");
    return res.status(500).json({ unlocked: false });
  }

  const cookies = parseCookies(req.headers.cookie);
  const payload = verify(cookies[COOKIE_NAME], secret);

  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({ unlocked: !!payload });
};
