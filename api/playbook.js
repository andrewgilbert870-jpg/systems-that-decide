// /api/playbook.js
//
// Serves the actual playbook HTML — but only to a request carrying a valid
// access cookie issued by api/unlock.js. The three playbook files live in
// api/_content/, never in the public static root, so there's no direct URL
// that bypasses the gate. Same fix as moving CLIENTS_JSON out of login.html:
// don't ship the thing you're protecting as a public static file.
//
// Usage: GET /api/playbook?id=brands | agencies | publishers

const fs = require("fs");
const path = require("path");
const { COOKIE_NAME, verify, parseCookies } = require("./_lib/playbook-auth");

const FILES = {
  brands: "playbook-brands.html",
  agencies: "playbook-agencies.html",
  publishers: "playbook-publishers.html",
};

module.exports = async function handler(req, res) {
  const id = String((req.query && req.query.id) || "");
  const file = FILES[id];
  if (!file) {
    return res.status(404).json({ error: "Unknown playbook" });
  }

  const secret = process.env.PLAYBOOK_UNLOCK_SECRET;
  if (!secret) {
    console.error("PLAYBOOK_UNLOCK_SECRET is not set");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const cookies = parseCookies(req.headers.cookie);
  const payload =
    verify(cookies[COOKIE_NAME], secret) ||
    verify(req.query && req.query.token, secret);

  if (!payload) {
    res.setHeader("Location", `/playbooks.html?locked=${encodeURIComponent(id)}`);
    return res.status(302).end();
  }

  const filePath = path.join(__dirname, "_content", file);
  let html;
  try {
    html = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Could not read playbook file:", file, e.message);
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).send(html);
};
