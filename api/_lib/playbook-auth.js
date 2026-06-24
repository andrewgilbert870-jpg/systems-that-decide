// /api/_lib/playbook-auth.js
//
// Shared signing/verification for the playbook access cookie. Underscore-
// prefixed paths under /api are excluded from Vercel's automatic route
// generation, so this file is bundled with whichever function requires it
// (unlock.js, playbook.js, check-access.js) but never becomes a public
// route itself.
//
// One source of truth for the signing scheme, so unlock.js (which signs)
// and playbook.js / check-access.js (which verify) can't quietly drift out
// of sync.

const crypto = require("crypto");

const COOKIE_NAME = "std_playbook_access";

function sign(payload, secret) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function verify(token, secret) {
  if (!token || token.indexOf(".") === -1) return null;
  const idx = token.lastIndexOf(".");
  const data = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (sig !== expected) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
  if (!payload || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return payload;
}

function parseCookies(header) {
  const out = {};
  (header || "").split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return;
    out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  });
  return out;
}

module.exports = { COOKIE_NAME, sign, verify, parseCookies };
