// Page: Advisory — overview of the four other engagements + retainer model.

const ENGAGEMENTS = [
  {
    n: "01", name: "Team Education",
    pitch: "Half-day or full-day workshops on how the systems your team buys from actually work.",
    body: "Built from the inside of those systems, not from vendor documentation. Aimed at commercial and marketing teams who need to operate confidently in a market where the platforms set most of the rules. The session is closed-room, not branded, and it is not a sales pitch for anything.",
    receive: ["Half-day or full-day format", "Custom-built to your stack and team", "Pre-session brief and post-session reading list"],
    when: "Use when the activation team can run the platforms but cannot defend the choices in a procurement meeting.",
  },
  {
    n: "02", name: "Executive Advisory",
    pitch: "A standing retainer for leadership teams that want an unconflicted outside view.",
    body: "Regular briefings, pressure-testing of strategy, on-call analysis when the structure of a market shifts. Calibrated to where the actual decisions sit. Not a deliverable schedule. A relationship that survives the moments the agency cannot tell you what they really think.",
    receive: ["Quarterly leadership briefing", "Monthly written market read", "On-call async access between sessions"],
    when: "Use when the board is asking questions the executive team cannot fully answer without a vendor in the room.",
  },
  {
    n: "03", name: "Market Entry & Expansion",
    pitch: "Independent ground truth for technology companies entering or expanding in ANZ.",
    body: "For platforms outside the region considering entry, and for those who have launched and want to sense-check their commercial strategy before committing further capital. The work is structural: who buys, who decides, where the gravitational centres are, and what the market will not accept.",
    receive: ["Market structure read on the relevant category", "Buy-side decisioning map", "Commercial strategy review"],
    when: "Use before the regional commitment is made, or before doubling down on a strategy that has not produced the expected outcome.",
  },
  {
    n: "04", name: "Transaction Advisory",
    pitch: "Independent assessment for investors, acquirers and boards.",
    body: "Diligence on assets in programmatic, marketing technology, retail media or measurement. Independent from any party in the deal. The work is technical and structural, not financial. The aim is to make sure the asset is what the seller says it is, and that the thesis is what the market will support.",
    receive: ["Technical and structural diligence", "Competitive position read", "Risk register against the investment thesis"],
    when: "Use when the deal team needs an independent operator's read separate from the deal advisor's incentives.",
  },
];

const AdvisoryHero = ({ onEnquire }) => (
  <PageHero
    eyebrow="Engagements alongside the program"
    title="Four further engagement formats. One mandate."
    lead="The Agentic Stack Readiness Program is the flagship. These are the engagements that sit alongside it. Each is structurally independent, vendor-neutral by model, and built around a specific decision."
  >
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <PrimaryBtn onClick={onEnquire}>Discuss an engagement <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
    </div>
  </PageHero>
);

const EngagementRow = ({ e, isFirst }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) 1.15fr", gap: 56,
    padding: "44px 0", borderTop: isFirst ? "2px solid var(--gold)" : "1px solid var(--border)",
    alignItems: "start",
  }} className="eng-row">
    <div>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)" }}>{e.n}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--fg)", margin: "12px 0 14px", lineHeight: 1.15, letterSpacing: 0 }}>{e.name}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 500, color: "var(--fg)", lineHeight: 1.55, margin: 0 }}>{e.pitch}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>{e.body}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="eng-meta">
        <div>
          <Label style={{ marginBottom: 10 }}>What you receive</Label>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {e.receive.map((r, i) => (
              <li key={i} style={{ display: "flex", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--gold)" }}>·</span><span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label style={{ marginBottom: 10 }}>When it fits</Label>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>{e.when}</p>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 880px) {
        .eng-row { grid-template-columns: 1fr !important; gap: 24px !important; }
        .eng-meta { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </div>
);

const AdvisoryEngagements = () => (
  <Section screenLabel="advisory-engagements">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>Engagements</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880, textWrap: "balance" }}>
        Four formats. Each calibrated to where a specific decision sits.
      </h2>
    </Reveal>
    <div>
      {ENGAGEMENTS.map((e, i) => (
        <FadeUp key={i} delay={i * 80}><EngagementRow e={e} isFirst={i === 0} /></FadeUp>
      ))}
    </div>
  </Section>
);

const HowItWorks = () => (
  <Section alt screenLabel="advisory-how">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>How an engagement works</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880, textWrap: "balance" }}>
        Four steps. No surprises. No locked-in vendor recommendation at the end.
      </h2>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
      {[
        { n: "01", t: "Scoping call", d: "30 minutes. We agree what is in scope, what is not, and whether the engagement is the right starting point. No commitment." },
        { n: "02", t: "Pre-work", d: "A short questionnaire and a request for the artefacts already in your stack. The work begins before the first meeting." },
        { n: "03", t: "Working sessions", d: "Closed-room. Calibrated to the people who actually decide. Documented, but not dressed-up." },
        { n: "04", t: "Findings & ownership", d: "You own the document, the framework and the analysis. There is no follow-on quote, no implementation upsell." },
      ].map((s, i) => (
        <FadeUp key={i} delay={i * 100}>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)", padding: 28, height: "100%" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)" }}>{s.n}</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 20, color: "var(--fg)", margin: "12px 0 10px", lineHeight: 1.25 }}>{s.t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{s.d}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const AdvisoryPage = ({ onEnquire }) => (
  <div data-screen-label="Advisory">
    <AdvisoryHero onEnquire={onEnquire} />
    <AdvisoryEngagements />
    <HowItWorks />
    <ScopingStrip onEnquire={onEnquire} headline="Start with a 30-minute scoping call." body="A scoping call covers what you are trying to decide, what is already in motion, and whether one of these engagements is the right starting point. Andrew responds within one business day." />
  </div>
);

Object.assign(window, { ENGAGEMENTS, AdvisoryPage });
