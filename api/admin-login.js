// /api/admin-login.js
//
// Server-side password check for the diagnostic admin tool.
//
// This replaces `const ADMIN_PASSWORD = 'std-admin-2026';` which used to ship
// directly inside diagnostic-admin.html — readable by anyone who viewed page
// source, no login required. The real password now lives only in the
// ADMIN_PASSWORD environment variable and never reaches the browser.
//
// Note on scope: this is a lightweight gate, not a full session/auth system —
// there is no signed token or cookie, matching the original tool's threat
// model (a single advisor's solo internal tool, not a multi-user product).
// The fix removes "the password is sitting in plaintext HTML"; it is not
// intended to be bank-grade session security.

const crypto = require("crypto");

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) {
    // Run a same-length comparison anyway so a mismatched length doesn't
    // resolve faster than a mismatched value (avoids leaking length via timing).
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
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
  const password = String((body && body.password) || "");

  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) {
    console.error("ADMIN_PASSWORD env var is not set");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  if (password && safeCompare(password, expected)) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
};
