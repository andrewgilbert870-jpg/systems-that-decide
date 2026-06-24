// Agentic Readiness Diagnostic — results / report renderer.
// Self-mounts into #app (bypasses the bootstrap.jsx Shell), same pattern
// as page-diagnostic.jsx — this is a focused, full-bleed, print-friendly
// report view, not a normal site page.
//
// Access model: intentionally NOT gated behind the portal session. The
// long base64 "d" query param IS the access token (see noindex/nofollow
// in diagnostic-results.html) — this matches the original prototype and
// lets Andrew send a client this link directly by email, with or without
// that client ever returning to a fresh portal login. The "View your
// results" link on the portal page points here too, once a client's
// admin record has diagnosticComplete=true and a resultsUrl set.
//
// Data contract: everything is read from `?d=<base64 JSON>` (legacy
// individual query params are also supported for backward compatibility,
// matching the original). Field names below are unchanged from the
// original prototype so the future admin scoring tool can keep producing
// the same shape:
//
//   { name, org, date, type: 'brand'|'agency', total: 0-24, tier: 'Exposed'|'Aware'|'Structured'|'Positioned',
//     dims: [ { score: 0-4, flag: 'risk'|'watch'|'strength'|'none', narrative, evidence } ] (6, in DIM_NAMES order),
//     headlines: [ string ], exec: string (paragraphs separated by blank lines),
//     steps: [ { title, body, priority: 'now'|'soon'|'later'|'' } ],
//     closingQuote, riskRegister: [ { description, dimension, severity, horizon, trigger, mitigation, owner } ],
//     agenticExposure: { overallPct, note, platforms: [ { name, pct, objective, aligned } ], twoBlackBox, twoBlackBoxNote, verificationStatus },
//     stackMap: [ { platform, aiManaged, firstPartySignal, independentMeasurement, silo } ],
//     dependencyMap: [ { platform, lockIn: 'Locked'|'Some optionality'|'Portable', note } ],
//     pairedEngagement: { enabled, rebuttalDisclosure, optimisationLogic, measurementIndependence } }
//
// Rendering note: the original prototype built raw HTML strings and
// injected them via innerHTML, manually escaping every interpolated
// value with its own esc() helper. This port uses JSX throughout instead
// — React escapes text content automatically, so there's no innerHTML
// anywhere in this file and no escaping logic to get wrong.

const TIERS = {
  Exposed: { range: "0–9", color: "var(--r-exposed)", rgb: "184,80,66", desc: "Your infrastructure is exposed to the agentic transition. Significant foundational work is required before AI-managed systems can be governed effectively." },
  Aware: { range: "10–15", color: "var(--r-aware)", rgb: "201,135,58", desc: "You have identified the key risks but have not yet built the governance structures to manage them. The diagnostic has surfaced several priority areas." },
  Structured: { range: "16–20", color: "var(--r-developing)", rgb: "74,124,89", desc: "Coherent infrastructure and a functioning governance model. Gaps remain, typically in measurement independence or cross-channel signal coherence." },
  Positioned: { range: "21–24", color: "var(--r-leading)", rgb: "187,165,95", desc: "Mature, intentional architecture. Making proactive decisions rather than reactive ones." },
};
const TIER_ORDER = ["Exposed", "Aware", "Structured", "Positioned"];
const TIER_SPAN = { Exposed: 9, Aware: 6, Structured: 5, Positioned: 4 };
const DIM_NAMES = ["Data Infrastructure", "Platform Architecture & Dependency Risk", "Decisioning Architecture", "Human-to-Machine Handoff Readiness", "Organisational Alignment", "Measurement Independence"];
const DIM_SHORT = ["Data", "Platform", "Decisioning", "Handoff", "Alignment", "Measurement"];
// Confirmed with Andrew, 2026-06-23: keep this hard-coded indicative ANZ
// mid-market baseline for now, there's no real benchmark dataset to fill it
// with yet. Every client sees the same radar-chart overlay. Revisit only if
// real comparison data becomes available, no action needed before launch.
const BENCHMARK = { brand: [1, 2, 1, 1, 2, 1], agency: [2, 1, 1, 2, 2, 1] };
const SCORE_CONTEXT = [
  "No capability. Significant foundational work required.",
  "Risk identified. Nothing operational is in place yet.",
  "Partial capability, inconsistently applied.",
  "Solid infrastructure with minor gaps remaining.",
  "Leading practice — documented, consistently applied, actively governed.",
];

// ---------------------------------------------------------------
// Pure data / math helpers (ported from the prototype's vanilla-JS engine)
// ---------------------------------------------------------------

function parseData() {
  const params = new URLSearchParams(window.location.search);

  // Preferred format: a single base64-encoded JSON payload. This is what
  // the admin scoring tool produces (and the only format new links use).
  const d = params.get("d");
  if (d) {
    try {
      return JSON.parse(decodeURIComponent(window.atob(d)));
    } catch (e) {
      // fall through to the legacy path below
    }
  }

  // Legacy individual params (backward compat with very old links, if
  // any ever existed). Unlike the original prototype — which referenced
  // an undefined `data` variable in this branch and would have thrown if
  // it were ever actually exercised — this builds a real object from the
  // individual params it just read.
  function p(key, fallback) {
    const v = params.get(key);
    return v === null ? fallback : v;
  }
  const total = parseInt(p("total", "0"), 10) || 0;
  const tier = p("tier", "");
  const exec = p("exec", "");
  if (!total && !tier && !exec) return null;

  const dims = [];
  for (let i = 1; i <= 6; i++) {
    dims.push({
      score: parseInt(p("d" + i, "0"), 10) || 0,
      flag: p("f" + i, "none"),
      narrative: p("n" + i, ""),
      evidence: "",
    });
  }
  const steps = [];
  for (let i = 1; i <= 4; i++) {
    const t = p("ns" + i + "t", "");
    const b = p("ns" + i + "b", "");
    if (t) steps.push({ title: t, body: b, priority: "" });
  }

  return {
    name: p("name", ""),
    org: p("org", ""),
    date: p("date", ""),
    type: p("type", "brand"),
    total,
    tier,
    dims,
    headlines: [],
    exec,
    steps,
    closingQuote: "",
    riskRegister: [],
    agenticExposure: null,
    stackMap: [],
    dependencyMap: [],
    pairedEngagement: null,
  };
}

function scoreColor(s) {
  return s <= 1 ? "var(--r-exposed)" : s <= 2 ? "var(--r-aware)" : s <= 3 ? "var(--r-developing)" : "var(--r-gold-light)";
}

function polar(cx, cy, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function radarPoly(vals, cx, cy, maxR) {
  return vals.map((v, i) => {
    const [x, y] = polar(cx, cy, maxR * (v / 4), i * 60);
    return x.toFixed(1) + "," + y.toFixed(1);
  }).join(" ");
}
function fmtParas(text) {
  return String(text || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

// ---------------------------------------------------------------
// SVG pieces
// ---------------------------------------------------------------

function ProgressRing({ total, tier }) {
  const R = 78, C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(1, total / 24));
  const col = TIERS[tier] ? TIERS[tier].color : TIERS.Aware.color;
  const off = C * (1 - pct);
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={R} fill="none" stroke="var(--r-rule)" strokeWidth="11" />
      <circle
        cx="90" cy="90" r={R} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round"
        strokeDasharray={C.toFixed(1)} strokeDashoffset={off.toFixed(1)} transform="rotate(-90 90 90)"
        style={{ filter: `drop-shadow(0 0 6px ${col})` }}
      />
    </svg>
  );
}

function RadarChart({ scores, bench }) {
  const S = 380, cx = S / 2, cy = S / 2 + 6, maxR = 120;

  const grid = [1, 2, 3, 4].map((l) => {
    const pts = [0, 1, 2, 3, 4, 5].map((i) => {
      const [x, y] = polar(cx, cy, (maxR * l) / 4, i * 60);
      return x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
    return (
      <polygon key={"grid" + l} points={pts} fill="none" stroke="var(--r-rule-light)" strokeWidth="1" opacity={l === 4 ? 0.9 : 0.45} />
    );
  });

  const axes = [];
  const labels = [];
  for (let i = 0; i < 6; i++) {
    const [ex, ey] = polar(cx, cy, maxR, i * 60);
    axes.push(
      <line key={"ax" + i} x1={cx} y1={cy} x2={ex.toFixed(1)} y2={ey.toFixed(1)} stroke="var(--r-rule-light)" strokeWidth="1" opacity="0.5" />
    );
    const [lx, ly] = polar(cx, cy, maxR + 26, i * 60);
    let anchor = "middle";
    if (lx > cx + 6) anchor = "start";
    else if (lx < cx - 6) anchor = "end";
    let dy = 4;
    if (ly < cy - 6) dy = -2;
    else if (ly > cy + 6) dy = 10;
    labels.push(
      <text key={"lab" + i} x={lx.toFixed(1)} y={(ly + dy).toFixed(1)} textAnchor={anchor} className="radar-axis-label">
        {DIM_SHORT[i]}
      </text>
    );
    labels.push(
      <text key={"labv" + i} x={lx.toFixed(1)} y={(ly + dy + 12).toFixed(1)} textAnchor={anchor} className="radar-axis-val">
        {scores[i]}/4
      </text>
    );
  }

  const dots = scores.map((v, i) => {
    const [x, y] = polar(cx, cy, maxR * (v / 4), i * 60);
    return <circle key={"dot" + i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3.5" fill="var(--r-gold)" stroke="var(--r-bg)" strokeWidth="1.5" />;
  });

  return (
    <svg className="radar-svg" width={S} height={S} viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Readiness radar">
      {grid}
      {axes}
      <polygon points={radarPoly(bench, cx, cy, maxR)} fill="none" stroke="var(--r-muted)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
      <polygon points={radarPoly(scores, cx, cy, maxR)} fill="rgba(154,139,71,0.16)" stroke="var(--r-gold)" strokeWidth="2" />
      {dots}
      {labels}
    </svg>
  );
}

// ---------------------------------------------------------------
// Report sections
// ---------------------------------------------------------------

function LockedState() {
  return (
    <div className="locked-wrap">
      <div className="locked-icon">◎</div>
      <h2 className="locked-heading">Report Pending Review</h2>
      <p className="locked-body">
        Your diagnostic responses have been received. Andrew is reviewing them and will prepare your readiness report
        within 24 hours.
        <br /><br />
        Questions in the meantime? <a href="mailto:andrew@systemsthatdecide.io">andrew@systemsthatdecide.io</a>
      </p>
    </div>
  );
}

function PrintButton() {
  return (
    <button className="print-btn" onClick={() => window.print()} title="Save as PDF">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
      </svg>
      Save as PDF
    </button>
  );
}

function ReportHeader({ data, typeLabel }) {
  return (
    <React.Fragment>
      <div className="report-eyebrow">Agentic Readiness Report · {typeLabel} Diagnostic</div>
      <h1 className="report-heading">{data.org || data.name}</h1>
      <div className="report-sub">Prepared for {data.name}</div>
      <div className="report-meta">
        <span><strong>Issued</strong>{data.date}</span>
        <span><strong>Score</strong>{data.total} / 24</span>
        <span><strong>Tier</strong>{data.tier}</span>
        <span><strong>Prepared by</strong>Andrew Gilbert</span>
      </div>
    </React.Fragment>
  );
}

function HeroBlock({ data, tier, scores, bench }) {
  return (
    <div className="hero" style={{ "--ring-wash": `rgba(${tier.rgb},0.12)` }}>
      <div className="ring-box">
        <ProgressRing total={data.total} tier={data.tier} />
        <div className="ring-center">
          <div className="ring-score">{data.total}<small>/24</small></div>
          <div className="ring-of">Total Score</div>
        </div>
      </div>
      <div className="hero-body">
        <div className="hero-tier-label">Readiness Tier · Range {tier.range}</div>
        <div className="hero-tier-name" style={{ color: tier.color }}>{data.tier}</div>
        <div className="hero-tier-desc">{tier.desc}</div>
        <div className="ladder">
          <div className="ladder-track">
            {TIER_ORDER.map((t) => (
              <div key={t} className={"ladder-seg" + (t === data.tier ? " active" : "")} style={{ flex: TIER_SPAN[t], background: TIERS[t].color }} />
            ))}
          </div>
          <div className="ladder-labels">
            {TIER_ORDER.map((t) => (
              <span key={t} className={t === data.tier ? "active" : ""}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadlinesSection({ headlines }) {
  const list = (headlines || []).filter(Boolean);
  if (!list.length) return null;
  return (
    <div className="section">
      <div className="section-kicker">At a Glance</div>
      <h3 className="section-heading">What the assessment found</h3>
      <div className="section-rule" />
      <div className="headlines-list">
        {list.map((h, i) => (
          <div className="headline-item" key={i}>
            <div className="headline-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="headline-text">{h}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarSection({ scores, bench, typeLabel, benchTotal }) {
  return (
    <div className="section">
      <div className="section-kicker">Readiness Profile</div>
      <h3 className="section-heading">The shape of your readiness</h3>
      <div className="section-rule" />
      <div className="radar-card">
        <RadarChart scores={scores} bench={bench} />
        <div className="radar-side">
          <div className="legend-row"><span className="legend-swatch fill" />Your score</div>
          <div className="legend-row"><span className="legend-swatch" />Your outline (0–4 per axis)</div>
          <div className="legend-row"><span className="legend-swatch bench" />Typical ANZ {typeLabel.toLowerCase()} ({benchTotal}/24)</div>
          <div className="radar-note">
            Each axis runs 0 (exposed) to 4 (leading). Where your outline sits inside the dashed baseline, you trail the
            typical market position, beyond it, you lead.
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecSummarySection({ exec }) {
  if (!exec) return null;
  return (
    <div className="section">
      <div className="paper-card">
        <div className="section-kicker">Executive Summary</div>
        <h3 className="section-heading">What the diagnostic found</h3>
        <div className="section-rule" />
        <div className="summary-text">
          {fmtParas(exec).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

function DimensionsSection({ dims, bench, barsReady }) {
  return (
    <div className="section">
      <div className="section-kicker">Dimension Detail</div>
      <h3 className="section-heading">Six dimensions, scored</h3>
      <div className="section-rule" />
      {dims.map((dim, i) => {
        const pct = Math.round((dim.score / 4) * 100);
        const bpct = Math.round((bench[i] / 4) * 100);
        const chips = String(dim.evidence || "").split(",").map((s) => s.trim()).filter(Boolean);
        return (
          <div className="dim-card" data-flag={dim.flag || "none"} key={i}>
            <div className="dim-card-inner">
              <div className="dim-card-head">
                <div>
                  <div className="dim-number">Dimension {i + 1}</div>
                  <div className="dim-name">{DIM_NAMES[i]}</div>
                </div>
                <div className="dim-score-big">
                  <span className="dim-score-val">{dim.score}</span><span className="dim-score-of">/4</span>
                </div>
              </div>
              <div className="dim-flag-row">
                {dim.flag === "risk" && <span className="dim-flag flag-risk">⚠ Priority Risk</span>}
                {dim.flag === "watch" && <span className="dim-flag flag-watch">◎ Watch</span>}
                {dim.flag === "strength" && <span className="dim-flag flag-strength">✓ Strength</span>}
                <span className="dim-score-label">{SCORE_CONTEXT[Math.min(dim.score, 4)]}</span>
              </div>
              <div className="bar-wrap">
                <div className="bar-fill" style={{ background: scoreColor(dim.score), width: barsReady ? pct + "%" : "0%" }} />
                <div className="bench-tick" style={{ left: bpct + "%" }} />
              </div>
              {dim.narrative && <div className="dim-narrative">{dim.narrative}</div>}
              {chips.length > 0 && (
                <div className="dim-evidence">
                  {chips.map((c, ci) => <span className="evidence-chip" key={ci}>&quot;{c}&quot;</span>)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NextStepsSection({ steps }) {
  const list = steps || [];
  if (!list.length) return null;
  const hasPriority = list.some((s) => s.priority);

  if (!hasPriority) {
    return (
      <div className="section">
        <div className="section-kicker">Where to focus</div>
        <h3 className="section-heading">Recommended next steps</h3>
        <div className="section-rule" />
        {list.map((ns, i) => (
          <div className="next-item" key={i}>
            <div className="next-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="next-title">{ns.title}</div>
              {ns.body && <div className="next-body">{ns.body}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const groups = [
    { key: "now", label: "Do now", cls: "pl-now" },
    { key: "soon", label: "Plan next", cls: "pl-soon" },
    { key: "later", label: "Consider later", cls: "pl-later" },
    { key: "", label: "Additional", cls: "pl-later" },
  ];
  let n = 0;
  return (
    <div className="section">
      <div className="section-kicker">Where to focus</div>
      <h3 className="section-heading">Recommended next steps</h3>
      <div className="section-rule" />
      {groups.map((g) => {
        const items = list.filter((s) => s.priority === g.key);
        if (!items.length) return null;
        return (
          <div className="priority-group" key={g.key || "additional"}>
            <div className={"priority-label " + g.cls}>{g.label}</div>
            {items.map((ns, i) => {
              n++;
              return (
                <div className="next-item" key={i}>
                  <div className="next-num">{String(n).padStart(2, "0")}</div>
                  <div>
                    <div className="next-title">{ns.title}</div>
                    {ns.body && <div className="next-body">{ns.body}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function RiskRegisterSection({ riskRegister }) {
  const rr = (riskRegister || []).filter((r) => r.description);
  if (!rr.length) return null;
  return (
    <div className="section">
      <div className="section-kicker">Risk Register</div>
      <h3 className="section-heading">Identified risks</h3>
      <div className="section-rule" />
      <div className="risk-wrap">
        <table className="risk-table">
          <thead>
            <tr><th>Risk</th><th>Dim.</th><th>Severity</th><th>Horizon</th><th>Trigger</th><th>Mitigation</th><th>Owner</th></tr>
          </thead>
          <tbody>
            {rr.map((r, i) => (
              <tr key={i}>
                <td>{r.description}</td>
                <td style={{ fontFamily: "var(--r-mono)", fontSize: "0.62rem", whiteSpace: "nowrap" }}>Dim {r.dimension}</td>
                <td><span className={"sev-" + String(r.severity || "").toLowerCase()}>{r.severity}</span></td>
                <td><span className="horizon-chip">{r.horizon}</span></td>
                <td>{r.trigger}</td>
                <td>{r.mitigation}</td>
                <td>{r.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgenticExposureSection({ agenticExposure }) {
  const ae = agenticExposure;
  if (!ae) return null;
  const pct = ae.overallPct || 0;
  const color = pct >= 70 ? "var(--r-exposed)" : pct >= 40 ? "var(--r-aware)" : "var(--r-developing)";
  const platforms = (ae.platforms || []).filter((p) => p.name);
  return (
    <div className="section">
      <div className="section-kicker">Agentic Exposure</div>
      <h3 className="section-heading">How much of your spend is AI-managed</h3>
      <div className="section-rule" />
      <div className="exposure-hero">
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div className="exposure-pct" style={{ color }}>{pct}%</div>
          <div className="exposure-label">Agentic exposure</div>
        </div>
        <div style={{ fontSize: "0.88rem", color: "var(--r-fg-muted)", lineHeight: 1.75, maxWidth: 500 }}>
          {ae.note || "Proportion of total advertising spend currently in AI-managed or algorithmic campaign modes."}
        </div>
      </div>
      {platforms.length > 0 && (
        <div className="platform-rows">
          {platforms.map((p, i) => (
            <div className="pl-row" key={i}>
              <span className="pl-name">{p.name}</span>
              <span className="pl-pct">{p.pct ? p.pct + "%" : ""}</span>
              <span className="pl-obj">{p.objective}</span>
              {p.aligned === true && <span className="pl-y">Aligned ✓</span>}
              {p.aligned === false && <span className="pl-n">Misaligned ⚠</span>}
            </div>
          ))}
        </div>
      )}
      {ae.twoBlackBox && (
        <div className="two-bb-card">
          <div style={{ fontSize: "1.1rem", flexShrink: 0 }}>⬛⬛</div>
          <div className="two-bb-body">
            <strong>Two-black-box flag.</strong>{" "}
            {ae.twoBlackBoxNote || "The same platform both manages automated campaigns and reports on their performance, with no independent check on either."}
          </div>
        </div>
      )}
      {ae.verificationStatus && (
        <p style={{ fontSize: "0.84rem", color: "var(--r-muted)", marginTop: "0.85rem", lineHeight: 1.65 }}>{ae.verificationStatus}</p>
      )}
    </div>
  );
}

function StackMapSection({ stackMap }) {
  const sm = (stackMap || []).filter((r) => r.platform);
  if (!sm.length) return null;
  const flags = ["aiManaged", "firstPartySignal", "independentMeasurement", "silo"];
  return (
    <div className="section">
      <div className="section-kicker">Agentic Stack Map</div>
      <h3 className="section-heading">Your platform-by-platform picture</h3>
      <div className="section-rule" />
      <div className="stack-wrap">
        <table className="stack-table">
          <thead>
            <tr><th>Platform</th><th>AI-managed</th><th>1P signal in</th><th>Independent measurement</th><th>Isolated silo</th></tr>
          </thead>
          <tbody>
            {sm.map((r, i) => (
              <tr key={i}>
                <td>{r.platform}</td>
                {flags.map((k) => (
                  <td key={k}>
                    {r[k] === true ? <span className="sm-risk">Yes</span> : r[k] === false ? <span className="sm-ok">No</span> : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontFamily: "var(--r-mono)", fontSize: "0.6rem", color: "var(--r-muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
        AI-managed: campaign decisions made by automated system. 1P signal in: platform receives first-party data signals.
        Independent measurement: performance verified outside this platform. Isolated silo: no data flow to/from other platforms.
      </p>
    </div>
  );
}

function DependencyMapSection({ dependencyMap }) {
  const dm = (dependencyMap || []).filter((r) => r.platform);
  if (!dm.length) return null;
  return (
    <div className="section">
      <div className="section-kicker">Platform Dependency Map</div>
      <h3 className="section-heading">Where you are locked in, where you have optionality</h3>
      <div className="section-rule" />
      <div className="dep-rows">
        <div className="dep-row dep-head"><span>Platform</span><span>Lock-in rating</span><span>Notes</span></div>
        {dm.map((r, i) => {
          const cls = r.lockIn === "Locked" ? "lock-locked" : r.lockIn === "Some optionality" ? "lock-some" : "lock-portable";
          return (
            <div className="dep-row" key={i}>
              <span className="dep-platform">{r.platform}</span>
              <span className={cls}>{r.lockIn}</span>
              <span className="dep-note-cell">{r.note}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PairedEngagementSection({ pairedEngagement }) {
  const pe = pairedEngagement;
  if (!pe || !pe.enabled) return null;
  return (
    <div className="section">
      <div className="section-kicker">Paired Engagement</div>
      <h3 className="section-heading">Agency and brand — compared</h3>
      <div className="section-rule" />
      {pe.rebuttalDisclosure && (
        <div className="pair-flag">
          <span style={{ flexShrink: 0 }}>⚠</span>
          <div><strong style={{ color: "var(--r-exposed)" }}>Disclosure divergence.</strong> {pe.rebuttalDisclosure}</div>
        </div>
      )}
      {pe.optimisationLogic && (
        <div className="pair-flag" style={{ marginTop: "0.75rem" }}>
          <span style={{ flexShrink: 0 }}>◎</span>
          <div><strong style={{ color: "var(--r-aware)" }}>Optimisation logic.</strong> {pe.optimisationLogic}</div>
        </div>
      )}
      {pe.measurementIndependence && (
        <div className="pair-flag" style={{ marginTop: "0.75rem" }}>
          <span style={{ flexShrink: 0 }}>◎</span>
          <div><strong style={{ color: "var(--r-aware)" }}>Measurement independence.</strong> {pe.measurementIndependence}</div>
        </div>
      )}
    </div>
  );
}

function DeclarationSection({ data }) {
  return (
    <div className="section">
      <div className="section-kicker">Independence Declaration</div>
      <h3 className="section-heading">Vendor neutrality</h3>
      <div className="section-rule" />
      <div className="declaration-card">
        <div className="declaration-body">
          Systems That Decide takes no referral fees, holds no preferred platform relationships, and does not implement the
          technology it advises on. Recommendations made through this diagnostic are based solely on the client&rsquo;s
          infrastructure, objectives, and risk profile. Andrew Gilbert has no commercial relationship with any platform
          vendor or agency that would benefit from the findings in this report. This engagement is conducted under a
          confidentiality agreement. Responses and findings are not shared with any third party without the explicit
          written consent of the client.
        </div>
        <div className="declaration-sigs">
          <div className="sig-block">
            <div className="sig-line" />
            <div className="sig-label">Andrew Gilbert, Systems That Decide · {data.date}</div>
          </div>
          <div className="sig-block">
            <div className="sig-line" />
            <div className="sig-label">{data.name}{data.org ? ", " + data.org : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadershipBriefingSection({ data, highRisks }) {
  if (!data.exec && !highRisks.length && !data.closingQuote) return null;
  return (
    <div className="section">
      <div className="section-kicker">Leadership Briefing</div>
      <h3 className="section-heading">One-page summary for senior leadership</h3>
      <div className="section-rule" />
      <div className="briefing-badge">◎ Auto-composed · not for client distribution</div>
      {data.closingQuote && (
        <div className="closing-quote">
          <blockquote>{data.closingQuote}</blockquote>
          <cite>Verbatim response to the closing question · {data.name}, {data.date}</cite>
        </div>
      )}
      {data.exec && (
        <React.Fragment>
          <div className="briefing-sub">Executive summary</div>
          <div style={{ fontSize: "0.9rem", color: "var(--r-fg-muted)", lineHeight: 1.78 }}>
            {fmtParas(data.exec).map((p, i) => <p key={i} style={{ marginBottom: "0.85rem" }}>{p}</p>)}
          </div>
        </React.Fragment>
      )}
      {highRisks.length > 0 && (
        <React.Fragment>
          <div className="briefing-sub">Priority risks (High severity)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {highRisks.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: "0.85rem", fontSize: "0.86rem", color: "var(--r-fg-muted)", lineHeight: 1.6 }}>
                <span className="sev-high" style={{ flexShrink: 0, minWidth: "2.5rem" }}>HIGH</span>
                <span>{r.description}{r.mitigation ? " — " + r.mitigation : ""}</span>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function ReportFooter({ typeLabel }) {
  return (
    <div className="report-footer">
      This report was prepared by Andrew Gilbert, Systems That Decide, based on responses provided during the Agentic
      Readiness Diagnostic. Scores are finalised after review of the questionnaire and the working session. The
      benchmark shown is an indicative position for typical ANZ mid-market {typeLabel.toLowerCase()}s and is provided
      for context only. This report is confidential and prepared solely for the named recipient.
      <br /><br />
      Systems That Decide · andrew@systemsthatdecide.io
    </div>
  );
}

// ---------------------------------------------------------------
// Top-level page
// ---------------------------------------------------------------

function DiagnosticResultsPage() {
  // Computed once, synchronously, from location.search — there's nothing
  // async here (no session check, no fetch), so a lazy useState initialiser
  // is enough; no loading flash needed.
  const [data] = React.useState(() => parseData());
  const [barsReady, setBarsReady] = React.useState(false);

  React.useEffect(() => {
    if (!data) return;
    // Bars render at width:0 on the first paint so the CSS width
    // transition actually has something to animate from, then flip to
    // their real widths a tick later (mirrors the original's
    // requestAnimationFrame + setTimeout fallback).
    const raf = requestAnimationFrame(() => setBarsReady(true));
    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!data) {
    return <div className="report-wrap"><LockedState /></div>;
  }

  const tier = TIERS[data.tier] || TIERS.Aware;
  const typeLabel = data.type === "agency" ? "Agency" : "Brand";
  const dims = data.dims || [];
  const scores = dims.map((d) => d.score || 0);
  const bench = BENCHMARK[data.type === "agency" ? "agency" : "brand"];
  const benchTotal = bench.reduce((a, b) => a + b, 0);
  const rr = (data.riskRegister || []).filter((r) => r.description);
  const highRisks = rr.filter((r) => r.severity === "High");

  return (
    <div className="report-wrap">
      <PrintButton />
      <ReportHeader data={data} typeLabel={typeLabel} />
      <HeroBlock data={data} tier={tier} scores={scores} bench={bench} />
      <HeadlinesSection headlines={data.headlines} />
      <RadarSection scores={scores} bench={bench} typeLabel={typeLabel} benchTotal={benchTotal} />
      <ExecSummarySection exec={data.exec} />
      <DimensionsSection dims={dims} bench={bench} barsReady={barsReady} />
      <NextStepsSection steps={data.steps} />
      <RiskRegisterSection riskRegister={data.riskRegister} />
      <AgenticExposureSection agenticExposure={data.agenticExposure} />
      <StackMapSection stackMap={data.stackMap} />
      <DependencyMapSection dependencyMap={data.dependencyMap} />
      <PairedEngagementSection pairedEngagement={data.pairedEngagement} />
      <DeclarationSection data={data} />
      <LeadershipBriefingSection data={data} highRisks={highRisks} />
      <ReportFooter typeLabel={typeLabel} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<DiagnosticResultsPage />);
