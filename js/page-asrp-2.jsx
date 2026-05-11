// Page: ASRP — part 2: Five Diagnostic Dimensions, Maturity Tiers, Vendor Neutrality, Self-Assessment.

const DIMENSIONS = [
  {
    n: "01",
    name: "Data Infrastructure Maturity",
    desc: "The quality, accessibility and structural coherence of your first-party data, and how it is collected, stored, governed and made available to platforms.",
    q: "If a procurement process started tomorrow, could you describe the structure of your first-party data without reaching for someone else?",
  },
  {
    n: "02",
    name: "Platform Architecture & Dependency Risk",
    desc: "The degree to which advertising infrastructure is structurally dependent on a small number of vendors, and what that means for lock-in and decisioning autonomy.",
    q: "Could you move 30% of spend off any single platform within a quarter, with measurement intact?",
  },
  {
    n: "03",
    name: "Decisioning Architecture",
    desc: "The clarity and coherence of existing decision-making structures. Who decides what, on what information, within what constraints, and with what override capability.",
    q: "When the algorithm makes a consequential call you would not have made, who notices, and who has authority to step in?",
  },
  {
    n: "04",
    name: "Human-to-Machine Handoff Readiness",
    desc: "Preparedness to manage a media operation where bidding, budget, creative selection and audience construction are increasingly made by automated systems.",
    q: "Do your activation teams understand the boundary between what the platform decides and what they decide, well enough to defend it?",
  },
  {
    n: "05",
    name: "Organisational Alignment",
    desc: "Whether your organisational structure, internal politics and leadership alignment can support coherent infrastructure decisions across functions.",
    q: "Could the marketing, finance and technology leads agree on what 'good' looks like for the next platform decision before the meeting starts?",
  },
];

const FiveDimensions = () => (
  <Section alt screenLabel="asrp-dimensions">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The five diagnostic dimensions</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
        Five lenses on the same question: is your infrastructure ready for systems that decide on your behalf?
      </h2>
    </Reveal>
    <FadeUp delay={160}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 56px", maxWidth: 720 }}>
        Each dimension carries a self-assessment question. Read it as a check on recognition, not a quiz. If the question lands, the dimension is probably worth investigating.
      </p>
    </FadeUp>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
      {DIMENSIONS.map((d, i) => (
        <FadeUp key={d.n} delay={i * 80}>
          <div style={{
            background: "var(--bg)", border: "1px solid var(--border)",
            padding: 32, display: "flex", flexDirection: "column", gap: 16,
            boxSizing: "border-box",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: "0.2em", color: "var(--gold)" }}>{d.n}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, color: "var(--fg)", margin: 0, lineHeight: 1.25 }}>{d.name}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
            <div style={{ paddingTop: 18, borderTop: "1px solid var(--border)", marginTop: 8 }}>
              <Label tone="muted" style={{ marginBottom: 10 }}>Ask yourself</Label>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "normal", fontSize: 17, color: "var(--gold-light)", lineHeight: 1.5, margin: 0 }}>
                &ldquo;{d.q}&rdquo;
              </p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

// ── Maturity tiers — horizontal progression ─────────────────────────────
const TIERS = [
  { range: "0 – 8", name: "Exposed", desc: "Infrastructure is not equipped for agentic systems. Immediate remediation required across multiple dimensions before further investment makes sense.", color: "var(--status-risk)" },
  { range: "9 – 13", name: "Aware", desc: "Some understanding of the shift. Steps taken in places. Infrastructure remains patchy and reactive. Decisions still made under pressure rather than from posture.", color: "var(--status-caution)" },
  { range: "14 – 17", name: "Structured", desc: "Coherent infrastructure. Functioning governance. Gaps tend to sit in measurement, clean room readiness, or cross-channel signal coherence.", color: "var(--gold)" },
  { range: "18 – 20", name: "Positioned", desc: "Mature, intentional architecture. Proactive decisions on roadmap and procurement. The work shifts to staying ahead of market structural change.", color: "var(--status-confirmed)" },
];

const MaturityTiers = ({ activeIdx }) => (
  <Section screenLabel="asrp-tiers">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The maturity tiers</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
        A score, then a posture. The number is a starting point, not a verdict.
      </h2>
    </Reveal>
    <FadeUp delay={160}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 64px", maxWidth: 720 }}>
        Most ANZ organisations land between Aware and Structured. Few are Exposed by intent. None are Positioned by accident.
      </p>
    </FadeUp>

    {/* Continuous scale */}
    <FadeUp>
      <div style={{ position: "relative", marginBottom: 48 }}>
        <div style={{ display: "flex", height: 4, background: "var(--border)" }}>
          {TIERS.map((t, i) => (
            <div key={i} style={{ flex: 1, background: t.color, opacity: activeIdx == null || activeIdx === i ? 1 : 0.25, transition: "opacity 400ms ease" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.14em" }}>
          <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span>
        </div>
      </div>
    </FadeUp>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="tier-grid">
      {TIERS.map((t, i) => {
        const isActive = activeIdx === i;
        return (
          <FadeUp key={i} delay={i * 100}>
            <div style={{
              background: isActive ? "var(--surface)" : "var(--surface-raised)",
              border: isActive ? `1px solid ${t.color}` : "1px solid var(--border)",
              borderTop: `2px solid ${t.color}`,
              padding: 28, height: "100%", display: "flex", flexDirection: "column", gap: 12,
              transition: "background 400ms ease, border-color 400ms ease, transform 400ms ease",
              transform: isActive ? "translateY(-4px)" : "none",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: t.color, textTransform: "uppercase" }}>Score {t.range}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, color: "var(--fg)", margin: 0, lineHeight: 1.1, letterSpacing: 0 }}>{t.name}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
            </div>
          </FadeUp>
        );
      })}
    </div>
    <style>{`
      @media (max-width: 980px) { .tier-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 560px) { .tier-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </Section>
);

// ── Self-assessment quiz: 5 questions, lands in a tier ──────────────────
const ASSESSMENT_QUESTIONS = [
  { id: "data", dim: "Data Infrastructure", q: "How would you describe the state of your first-party data infrastructure today?",
    opts: [
      { v: 1, t: "Fragmented across systems we do not fully control." },
      { v: 2, t: "Inventoried but governance is informal." },
      { v: 3, t: "Documented, governed, and made available to platforms with intent." },
      { v: 4, t: "Audited and architected as a strategic asset, refreshed regularly." },
    ]},
  { id: "dependency", dim: "Platform Dependency", q: "If you needed to move a third of programmatic spend off a single platform, how would that go?",
    opts: [
      { v: 1, t: "It would be a multi-quarter project with significant measurement loss." },
      { v: 2, t: "Possible, but optionality has not been tested in years." },
      { v: 3, t: "Possible inside a quarter with measurement mostly intact." },
      { v: 4, t: "Already designed for portability. Decisions consider lock-in by default." },
    ]},
  { id: "decisioning", dim: "Decisioning Architecture", q: "When an algorithm makes a consequential call your team would not have made, what happens?",
    opts: [
      { v: 1, t: "It is rarely noticed until it shows up in results." },
      { v: 2, t: "Noticed by activation. Escalation paths are unclear." },
      { v: 3, t: "Noticed and reviewed. Override authority is defined." },
      { v: 4, t: "Monitored continuously against named thresholds with documented decision rights." },
    ]},
  { id: "handoff", dim: "Human-to-Machine Handoff", q: "How well does the team understand where automation begins and human judgement ends?",
    opts: [
      { v: 1, t: "Mostly trust the platform defaults and adjust if things break." },
      { v: 2, t: "Aware of the boundary in places, not consistently." },
      { v: 3, t: "Defined and trained. Activation can defend the boundary in a vendor meeting." },
      { v: 4, t: "Boundary is operationalised in process, contracts and measurement." },
    ]},
  { id: "alignment", dim: "Organisational Alignment", q: "How aligned are marketing, finance and technology on what good looks like for the next platform decision?",
    opts: [
      { v: 1, t: "We tend to find out we disagree mid-way through the procurement." },
      { v: 2, t: "Aligned on principles. Less so on what the principles mean in practice." },
      { v: 3, t: "Working framework in place. Disagreements surface early." },
      { v: 4, t: "Joint operating model. Decisions documented, reviewed, owned." },
    ]},
];

const TIER_FOR_SCORE = (score) => {
  if (score <= 8) return 0;
  if (score <= 13) return 1;
  if (score <= 17) return 2;
  return 3;
};

const SelfAssessment = ({ onEnquire, anchor }) => {
  const [step, setStep] = React.useState(0); // 0 = intro, 1..5 = questions, 6 = result
  const [answers, setAnswers] = React.useState({});

  const total = ASSESSMENT_QUESTIONS.length;
  const isQuestion = step >= 1 && step <= total;
  const isResult = step === total + 1;

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const tierIdx = TIER_FOR_SCORE(score);
  const tier = TIERS[tierIdx];

  const select = (id, v) => {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    setTimeout(() => setStep(s => s + 1), 220);
  };

  const restart = () => { setAnswers({}); setStep(0); };

  return (
    <Section alt id={anchor} screenLabel="asrp-assessment">
      <Reveal axis="x" style={{ marginBottom: 16 }}>
        <Label>90-second self-assessment</Label>
      </Reveal>
      <Reveal axis="x" delay={80}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
          Five questions. A directional score. No data leaves the page.
        </h2>
      </Reveal>
      <FadeUp delay={160}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 48px", maxWidth: 720 }}>
          The full Diagnostic is a structured engagement, not a form. This assessment is a directional read, designed to surface recognition. The numeric output is not a verdict.
        </p>
      </FadeUp>

      <div style={{
        background: "var(--bg)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)",
        padding: "clamp(28px, 4vw, 48px)", maxWidth: 920, margin: "0 auto", minHeight: 480,
        display: "flex", flexDirection: "column",
      }}>
        {/* Progress strip */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {ASSESSMENT_QUESTIONS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3,
              background: (isQuestion && i < step) || isResult ? "var(--gold)" : "var(--border)",
              transition: "background 400ms ease",
            }} />
          ))}
        </div>

        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
            <div>
              <Label tone="muted" style={{ marginBottom: 12 }}>Five questions · five dimensions</Label>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 26, color: "var(--fg)", margin: "0 0 14px", lineHeight: 1.25 }}>
                A directional read on your agentic readiness.
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
                Pick the answer closest to your reality. The system maps your responses onto the same four tiers used in the Diagnostic. The result is a starting point for a conversation.
              </p>
            </div>
            <div style={{ marginTop: "auto", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <PrimaryBtn onClick={() => setStep(1)}>Begin <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
            </div>
          </div>
        )}

        {isQuestion && (() => {
          const q = ASSESSMENT_QUESTIONS[step - 1];
          return (
            <div key={q.id} style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, animation: "fadeStep 400ms ease both" }}>
              <Label tone="muted">Question {step} of {total} · {q.dim}</Label>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(22px, 2.4vw, 28px)", color: "var(--fg)", margin: 0, lineHeight: 1.3, maxWidth: 720 }}>
                {q.q}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {q.opts.map((o) => {
                  const selected = answers[q.id] === o.v;
                  return (
                    <button key={o.v} onClick={() => select(q.id, o.v)} style={{
                      textAlign: "left", cursor: "pointer", background: selected ? "var(--gold-tint-08)" : "transparent",
                      border: selected ? "1px solid var(--gold)" : "1px solid var(--border)",
                      color: "var(--fg)", padding: "16px 20px",
                      fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5,
                      transition: "background 200ms ease, border-color 200ms ease",
                    }}
                      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = "var(--gold-tint-30)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}}
                      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}}
                    >
                      {o.t}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", paddingTop: 24 }}>
                <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{
                  background: "transparent", border: "none", color: "var(--fg-muted)", cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                }}>← Back</button>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {step}/{total}
                </span>
              </div>
            </div>
          );
        })()}

        {isResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, animation: "fadeStep 500ms ease both" }}>
            <Label tone="muted">Directional result</Label>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline" }} className="result-grid">
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "clamp(72px, 9vw, 120px)", color: "var(--gold-stat)", lineHeight: 1, letterSpacing: 0 }}>
                {score}
                <span style={{ fontSize: "0.4em", color: "var(--fg-subtle)" }}> / {total * 4}</span>
              </span>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: "0.2em", color: tier.color, textTransform: "uppercase" }}>Tier · {tier.range}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(32px, 4vw, 48px)", color: "var(--fg)", margin: "10px 0 16px", lineHeight: 1, letterSpacing: 0 }}>{tier.name}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{tier.desc}</p>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: "20px 24px", background: "var(--gold-tint-08)", border: "1px solid var(--gold-tint-20)", borderLeft: "4px solid var(--gold)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg)", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "var(--gold-light)", fontWeight: 600 }}>This is directional, not diagnostic.</strong>{" "}
                The full Diagnostic scores each dimension separately, weighted, with evidence and a written risk register. The output is a 0&ndash;20 score by dimension and an integrated readiness picture, not five averaged answers.
              </p>
            </div>

            <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <PrimaryBtn onClick={onEnquire}>Book a scoping call <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
              <SecondaryBtn onClick={restart}>Restart assessment</SecondaryBtn>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeStep { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (max-width: 720px) { .result-grid { grid-template-columns: 1fr !important; gap: 16px !important; } }
      `}</style>
    </Section>
  );
};

const VendorNeutrality = () => (
  <Section screenLabel="asrp-neutrality">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" }} className="neutrality-grid">
      <div>
        <Reveal axis="x" style={{ marginBottom: 16 }}>
          <Label>Vendor neutrality</Label>
        </Reveal>
        <Reveal axis="x" delay={80}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            The conflict, named directly.
          </h2>
        </Reveal>
      </div>
      <FadeUp delay={120}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
            In the ANZ market, every consultancy has platform relationships. Every agency earns margin on what it recommends. Every reseller has a quota. That is the conflict, and it is not unusual. It is structural.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
            Systems That Decide does not implement. It does not resell. It does not take referral fees. There are no platform partnerships, named or unnamed. Every recommendation can be traced to the finding it came from, not the relationship behind it.
          </p>
        </div>
      </FadeUp>
    </div>
    <div style={{ marginTop: 56 }}>
      <FadeUp delay={240}>
        <PullQuote attribution="Andrew Gilbert · Founder">
          The analysis is the product. I am not incentivised by what you buy next, but by how well you understand what you already have.
        </PullQuote>
      </FadeUp>
    </div>
    <style>{`
      @media (max-width: 880px) { .neutrality-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
    `}</style>
  </Section>
);

const ASRPPage = ({ onEnquire }) => {
  const scrollToAssessment = () => {
    document.getElementById("self-assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div data-screen-label="ASRP">
      <ASRPHero onScrollToAssessment={scrollToAssessment} />
      <EntryPoints />
      <FourComponents />
      <FiveDimensions />
      <MaturityTiers />
      <SelfAssessment anchor="self-assessment" onEnquire={onEnquire} />
      <VendorNeutrality />
      <ScopingStrip onEnquire={onEnquire} />
    </div>
  );
};

Object.assign(window, { DIMENSIONS, TIERS, FiveDimensions, MaturityTiers, SelfAssessment, VendorNeutrality, ASRPPage });
