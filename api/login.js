// /api/login.js
//
// Server-side lookup for client portal access codes.
//
// This replaces a plaintext `ACCESS_CODES` object literal that used to ship
// directly inside login.html. Because login.html is a static, unauthenticated
// page, anyone who viewed page source could read the entire client roster —
// every code, name, engagement tier, diagnostic-completion status, and results
// link — with zero code-guessing required. That is a full client-list leak,
// not just "codes are guessable."
//
// The registry now lives in the CLIENTS_JSON environment variable only
// (Vercel dashboard > Project Settings > Environment Variables), never in a
// file shipped as part of this static site. This endpoint accepts a single
// code and returns only that one client's record.
//
// Expected shape of CLIENTS_JSON (a JSON string):
// {
//   "STD-2026-DEMO": { "name": "Demo Client", "tier": "asrp", "diagnosticComplete": false, "resultsUrl": null }
// }
//
// To add a new client: add an entry to the CLIENTS_JSON value in the Vercel
// dashboard (or .env.local for local testing) and redeploy. See
// diagnostic-admin.html's sidebar for a code generator that produces
// correctly-formatted STD-YYYY-XXXX codes to add here.

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
  const code = String((body && body.code) || "").trim().toUpperCase();
  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  let registry;
  try {
    registry = JSON.parse(process.env.CLIENTS_JSON || "{}");
  } catch (e) {
    console.error("CLIENTS_JSON env var is not valid JSON:", e.message);
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const client = registry[code];
  if (!client) {
    // Deliberately generic — never hint that a code is "close" to a real one.
    return res.status(404).json({ error: "Code not recognised" });
  }

  return res.status(200).json({
    name: client.name,
    tier: client.tier,
    diagnosticComplete: !!client.diagnosticComplete,
    resultsUrl: client.resultsUrl || null,
  });
};
