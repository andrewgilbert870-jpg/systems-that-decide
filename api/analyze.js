// /api/analyze.js
//
// Server-side AI pre-scoring for the diagnostic admin tool.
//
// This replaces a direct browser-to-Anthropic call. The original tool had
// Andrew paste his personal Anthropic API key into a browser field, which was
// then stored in localStorage and sent on every request with the header
// `anthropic-dangerous-direct-browser-access: true` — Anthropic's own opt-in
// flag acknowledging that calling their API directly from a browser is unsafe
// (the key is visible to anyone with dev-tools access on that machine, or to
// any XSS / network inspection). The key now lives only in this function's
// ANTHROPIC_API_KEY environment variable and never reaches the browser.

const SCORING_RUBRIC = {
  brand: `
BRAND DIAGNOSTIC — SCORING RUBRIC (0–4 per dimension)

SCORE 0: No capability, no awareness, no named owner. Exposed.
SCORE 1: Aware of the issue but nothing operational. Informal at best.
SCORE 2: Partial capability. Something exists but inconsistently applied or incomplete.
SCORE 3: Solid capability with minor gaps. Documented and mostly operational.
SCORE 4: Leading practice. Documented, consistently applied, actively governed.

DIMENSION 1 — Data Infrastructure Maturity
Key diagnostic question: "If someone asked you to upload a first-party audience segment to your DSP tomorrow, what would that process look like?" (Q1.2)
- Score 0–1: Data in separate systems, no real-time connections, cannot activate first-party data
- Score 2: Some centralisation, partial identity resolution, manual processes
- Score 3–4: Production-grade, actively used across multiple channels, near-real-time capability

DIMENSION 2 — Platform Architecture & Dependency Risk
Key diagnostic question: "If your primary DSP relationship ended tomorrow, what would the impact be?" (Q2.6)
- Score 0–1: 70%+ concentration, no independent measurement, agency commercial arrangements undisclosed
- Score 2: Aware of concentration, some independent measurement but not systematic
- Score 3–4: Deliberate diversification decisions, independent measurement primary source of truth, full disclosure of agency arrangements

DIMENSION 3 — Decisioning Architecture
Key diagnostic question: "Describe what your highest-spend automated campaign type is currently optimising for." (Q3.3)
RED FLAG: Cannot accurately describe what their primary automated campaign is optimising for → cap dimension at 1
- Score 0–1: Vendor/agency-led adoption, no documented evaluation criteria, cannot describe automated campaign logic
- Score 2: Some criteria exist informally, can partially describe campaign logic
- Score 3–4: Criteria-led or internal-led, documented evaluation process, clear understanding of automated campaign logic

Q3.7 — Regulatory readiness (Privacy Act automated decision-making obligations + OAIC Children's Code)
The Privacy Act automated decision-making transparency obligations are confirmed: in effect 10 December 2026. APP entities (private sector, >$3M turnover) must describe in their privacy policy what personal information feeds automated decisions that could significantly affect someone's rights. Civil penalty exposure. Buying-agent targeting decisions are squarely in scope.
The OAIC Children's Online Privacy Code must be registered by the same date. Industry compliance date is still unconfirmed as of mid-2026 — not a reason to wait, but worth distinguishing from the confirmed Privacy Act date.
CAP RULE (hard ceiling, not a suggestion): If the brand answers 'No' or 'aware but not mapped' (options 1 or 2), cap Dimension 3 score at 2/4 regardless of how other questions in this dimension scored. Apply the same way any other red-flag answer caps a dimension.
RISK REGISTER: A score of 1 or 2 on Q3.7 should generate a risk register row: Dimension 3, Severity High, Horizon Immediate (0–6 months), trigger: 10 December 2026 Privacy Act deadline.

DIMENSION 4 — Human-to-Machine Handoff Readiness
Key diagnostic question: Escalation scenario walkthrough (Q4.3)
- Score 0–1: No escalation path, entirely agency-dependent, no config review separate from performance review
- Score 2: Informal escalation, quarterly config reviews, can partially explain automated decisions
- Score 3–4: Named people, defined process, monthly config reviews, can fully explain and interrogate automated decisions

DIMENSION 5 — Organisational Alignment
Key diagnostic questions: Named owner (Q5.1) + does that person have genuine authority (Q5.2)
RED FLAG: No named owner or named owner without real authority → score this dimension low regardless of other answers
- Score 0–1: No named owner, no roadmap, vendors drive technology agenda
- Score 2: Named owner but limited authority, informal roadmap, some investment
- Score 3–4: Named owner with genuine authority, documented roadmap with budget, proactive vendor management

DIMENSION 6 — Measurement Independence
Key diagnostic question: "Where does primary performance measurement come from for AI-managed formats?" (Q6.1)
RED FLAG: Entirely platform-reported measurement with no independent verification and no incrementality testing → cap at 1
- Score 0–1: Platform-only measurement, never run incrementality tests, platform-defined KPIs, no visibility into what AI is buying
- Score 2: Some independent measurement but not systematic, rare incrementality testing
- Score 3–4: Independent measurement primary source of truth, regular incrementality testing, internally-defined KPIs, full visibility

RED FLAGS (any of these caps total score at ≤15 / Aware tier maximum):
- Cannot describe what primary automated campaign is optimising for (Q3.3)
- No independent measurement layer of any kind
- No named owner for advertising technology decisions
- No escalation process for automated platform failures
- Never run an incrementality test for any channel AND entirely platform-reported measurement`,

  agency: `
AGENCY DIAGNOSTIC — SCORING RUBRIC (0–4 per dimension)

SCORE 0: No capability, no governance, entirely exposed.
SCORE 1: Aware of the issue but nothing operational or documented.
SCORE 2: Partial capability. Inconsistently applied or incomplete.
SCORE 3: Solid capability with minor gaps. Documented and mostly operational.
SCORE 4: Leading practice. Documented, consistently applied, actively governed.

DIMENSION 1 — Data Infrastructure & Client Data Governance
Key diagnostic question: "If a client terminated tomorrow, what happens to their data?" (Q1.2)
- Score 0–1: No consistent data governance, client data not cleanly separable, no documented process
- Score 2: Informal standards, some documentation, partial portability
- Score 3–4: Formal governance framework, technical controls, clients briefed, clean separation enforced

DIMENSION 2 — Platform Architecture & Commercial Dependency Risk
Key diagnostic question: Platform rebate revenue proportion (Q2.2) + disclosure to clients (Q2.3)
RED FLAG: >25% revenue from platform arrangements with no client disclosure → cap dimension at 1
- Score 0–1: 70%+ Google/Meta, significant undisclosed platform revenue, single DSP capability
- Score 2: Aware of concentration, partial disclosure, some multi-platform capability
- Score 3–4: Deliberate concentration decisions, full disclosure standard, genuine multi-DSP capability, formal concentration risk review

DIMENSION 3 — Decisioning Architecture
Key diagnostic question: "For your largest client, describe what their primary automated campaign is optimising for and what data is feeding it." (Q3.3)
RED FLAG: Cannot accurately describe the optimisation logic for their most significant client's automated campaigns → cap dimension at 1
- Score 0–1: No recommendation criteria, no conflict of interest framework, cannot describe client campaign logic
- Score 2: Informal criteria, ad-hoc conflict management, partial campaign knowledge
- Score 3–4: Documented criteria independent of platform relationships, comprehensive COI framework, complete campaign logic knowledge

Q3.7 — Regulatory readiness (agency-side: Privacy Act ADM obligations + OAIC Children's Code)
Same two obligations as brand track, reframed around what they require of the agency and its clients. The differentiating answer is option 4: 'could produce a decision-level explanation for a client's automated targeting decisions if asked' — this is the operational test of real readiness.
CAP RULE (hard ceiling): If the agency answers 'No' or 'aware but not mapped' (options 1 or 2), cap Dimension 3 score at 2/4 regardless of other answers.
RISK REGISTER: A score of 1 or 2 on Q3.7 → Dimension 3, Severity High, Horizon Immediate (0–6 months), trigger: 10 December 2026.

DIMENSION 4 — Human-to-Machine Handoff Readiness
Key diagnostic question: "As agentic buying scales, how does your agency plan to maintain the expertise clients are paying for?" (Q4.5)
RED FLAG: No considered answer to this question → flag as structural risk regardless of score
- Score 0–1: No escalation process, entirely reactive to platform performance data, no governance position on agentic platforms
- Score 2: Informal escalation, some configuration review for major clients, governance position in development
- Score 3–4: Defined escalation with named people, documented configuration review across all accounts, formal agentic governance policy

DIMENSION 5 — Organisational Alignment
Key diagnostic questions: Named technology owner (Q5.1) + genuine authority (Q5.2)
- Score 0–1: No named technology owner, no documented strategy, vendor-driven adoption
- Score 2: Named owner with limited authority, informal strategy, some investment
- Score 3–4: Named owner with genuine authority, documented strategy reviewed annually, proactive capability investment

DIMENSION 6 — Measurement Independence
Key diagnostic question: "What measurement sits outside the platform's own reporting for a typical AI-managed client?" (Q6.1)
RED FLAG: Relies entirely on platform-reported attribution for AI-managed client spend with no independent verification → cap at 1
- Score 0–1: Platform-only measurement, no incrementality testing, platform-defined client KPIs
- Score 2: Some third-party measurement for some clients, rare incrementality testing
- Score 3–4: Independent measurement standard for AI-managed spend, regular incrementality testing, independently-defined KPIs

RED FLAGS (any of these caps total score at ≤15 / Aware tier maximum):
- Cannot describe the optimisation logic for their most significant client's automated campaigns (Q3.3)
- No client data governance framework
- No named technology owner
- No escalation process for automated platform failures
- Relies entirely on platform-reported attribution with no independent verification
- Platform rebate revenue >25% with no client disclosure`,
};

function buildAnalysisPrompt(type, responses) {
  return `You are scoring a diagnostic questionnaire assessing an organisation's readiness for agentic advertising systems. You have been given the client's raw responses and a scoring rubric.

Your task: analyse the responses and output a JSON object with suggested scores and findings for each of the 6 dimensions.

DIAGNOSTIC TYPE: ${type === "agency" ? "Agency" : "Brand"}

${SCORING_RUBRIC[type]}

---

CLIENT RESPONSES:
${responses}

---

OUTPUT FORMAT — respond with ONLY a valid JSON object, no markdown fences, no preamble:
{
  "dimensions": [
    {
      "number": 1,
      "suggested_score": 2,
      "suggested_flag": "watch",
      "finding": "2–3 sentence summary of the key finding for this dimension based on the responses. Be specific — reference what the client actually said.",
      "key_phrases": ["exact phrase from response", "another phrase"],
      "reasoning": "Brief explanation of why you chose this score (1 sentence)."
    }
  ],
  "red_flags": ["Description of any red flag condition detected, referencing the specific question/response"],
  "overall_notes": "2–3 sentences on the overall pattern. Honest and direct — this becomes the executive summary seed.",
  "headlines": [
    "One punchy sentence — the most critical issue or risk finding.",
    "One punchy sentence — the second most important observation.",
    "One punchy sentence — a strength or contrasting positive finding."
  ],
  "next_steps": [
    {"title": "Short action title", "body": "1–2 sentences on what to do and why it matters.", "priority": "now"},
    {"title": "Short action title", "body": "1–2 sentences.", "priority": "soon"},
    {"title": "Short action title", "body": "1–2 sentences.", "priority": "soon"},
    {"title": "Short action title", "body": "1–2 sentences.", "priority": "later"}
  ],
  "suggested_tier": "Aware",
  "risk_register_rows": [
    {
      "description": "Privacy Act automated decision-making transparency obligations: exposure not assessed",
      "dimension": "3",
      "severity": "High",
      "horizon": "Immediate",
      "trigger": "10 December 2026 — Privacy Act ADM transparency obligations in effect",
      "mitigation": "Map Privacy Act and Children's Code exposure, document position before December 2026",
      "owner": ""
    }
  ]
}

Rules:
- suggested_score must be 0, 1, 2, 3, or 4
- suggested_flag must be "none", "risk", "watch", or "strength"
- suggested_tier must be one of: Exposed, Aware, Structured, Positioned (four tiers: 0–9, 10–15, 16–20, 21–24)
- If a red flag condition applies, set the relevant dimension score to 0 or 1 and flag as "risk"
- Q3.7 CAP RULE: if the submission indicates the respondent answered 'No' or 'aware but not mapped' on Q3.7 (the regulatory readiness question about the Privacy Act ADM obligations and OAIC Children's Code), cap Dimension 3 score at 2 — set suggested_score to min(suggested_score, 2) and set suggested_flag to 'risk'. Also include a risk_register_rows entry. If Q3.7 scored well (level 3 or 4) or was absent from the submission, omit risk_register_rows or return an empty array.
- key_phrases should be short verbatim excerpts (under 8 words each), maximum 4 per dimension
- headlines: exactly 3 items, each a single direct sentence standing alone as a management finding
- next_steps: exactly 4 items; priority must be "now", "soon", or "later"
- If a question was left blank or unanswered, treat that as a score of 0 for that dimension's key question
- Be calibrated: most ANZ mid-market organisations will score in the 1–2 range per dimension. Only give 3–4 if the responses are genuinely specific and credible.
- Output ONLY the JSON object. No other text.`;
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
  const type = body && body.type === "agency" ? "agency" : "brand";
  const responses = String((body && body.responses) || "").trim();

  if (!responses) {
    return res.status(400).json({ error: "Missing responses text" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY env var is not set");
    return res.status(500).json({ error: "Server misconfiguration: ANTHROPIC_API_KEY not set" });
  }

  const prompt = buildAnalysisPrompt(type, responses);

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return res
        .status(upstream.status)
        .json({ error: (err.error && err.error.message) || `Anthropic API error ${upstream.status}` });
    }

    const data = await upstream.json();
    const raw = (data.content && data.content[0] && data.content[0].text) || "";
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    let result;
    try {
      result = JSON.parse(cleaned);
    } catch (e) {
      console.error("Could not parse model response as JSON:", cleaned.slice(0, 500));
      return res.status(502).json({ error: "Could not parse the model response as JSON. Try again." });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error("analyze.js upstream error:", e);
    return res.status(502).json({ error: "Upstream request to Anthropic failed: " + e.message });
  }
};
