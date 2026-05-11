// Page: Methodology — how the research and engagement work is structured.

const MethodologyHero = () => (
  <PageHero
    eyebrow="Methodology"
    title="How the research is conducted and how the engagement work runs."
    lead="Two separate but related methodologies. The first governs published research: the Library and the Substack series. The second governs engagement work: how findings are developed, documented, and transferred to clients."
  />
);

const RESEARCH_STANDARDS = [
  {
    n: "01",
    t: "Primary sources, named where possible",
    d: "The research underlying the Agentic Advertising Library and the Systems That Decide Substack series draws on company announcements, earnings calls, regulatory filings, published academic and industry research, and direct practitioner observation. Sources are cited in the document or post where the claim appears. Where a source cannot be named (because it came through a practitioner relationship, an NDA-covered context, or background conversation), that is noted explicitly.",
  },
  {
    n: "02",
    t: "Date and version discipline",
    d: "Agentic infrastructure is moving faster than most publishing cycles. Every research piece carries a reference date. Claims about what is 'live' or 'in market' are accurate as of that date. If a piece has been materially updated since first publication, the update date and the nature of the change are noted. Readers should verify currency of specific technical claims before acting on them.",
  },
  {
    n: "03",
    t: "Uncertainty is named, not smoothed over",
    d: "Where evidence is limited, conflicting, or based on a single source, that is stated. The research does not present contested positions as settled. Where two credible sources conflict, both are noted and the nature of the conflict is characterised. The practice does not resolve uncertainty through confident assertion.",
  },
  {
    n: "04",
    t: "ANZ specificity",
    d: "The practice is based in Sydney and focussed on the ANZ market. Global research is cross-referenced against ANZ market conditions where relevant, and distinctions are drawn where the ANZ situation differs materially from global patterns. AU and NZ regulatory context is treated as a separate reference frame from European or US frameworks.",
  },
  {
    n: "05",
    t: "AI-assisted research, human-edited output",
    d: "Some research phases use AI tools for synthesis, pattern identification, and drafting. All published output is reviewed, corrected, and rewritten by Andrew before publication. AI-generated text is not published without substantive editorial intervention. The analytical judgement and the editorial voice in all published material is human.",
  },
];

const ENGAGEMENT_STANDARDS = [
  {
    n: "01",
    t: "Closed-room, no recording without consent",
    d: "Working sessions are not recorded without explicit client consent given before the session begins. Notes are taken by the practice. Summaries are provided to the client. The client controls distribution of session materials.",
  },
  {
    n: "02",
    t: "Pre-work shapes the findings",
    d: "Every engagement begins with a pre-work questionnaire and a review of materials the client provides: existing platform contracts, agency agreements, tech-stack documentation, prior audits. The findings are grounded in the client's actual position, not a generic framework applied generically.",
  },
  {
    n: "03",
    t: "Findings document within agreed timeframes",
    d: "Delivery timelines are agreed at the scoping stage and held to. If a delay is unavoidable (because new information materially changes the analysis), the client is notified before the original deadline, with a revised date.",
  },
  {
    n: "04",
    t: "Scored Diagnostic methodology",
    d: "The Agentic Readiness Diagnostic scores across five dimensions: platform dependency, data infrastructure, identity resolution, measurement architecture, and agentic readiness. Each dimension is scored 0–4. The aggregate score (0–20) determines the readiness tier. The scoring rubric is documented in the Diagnostic report itself, so the client can see precisely why each score was assigned.",
  },
  {
    n: "05",
    t: "The client owns the output",
    d: "Every document produced in an engagement belongs to the client. It is not licensed, not retained, not used as background material for other clients. The practice does not use client-specific findings as inputs to research published in the Library or Substack without explicit written permission.",
  },
];

const ResearchMethodology = () => (
  <Section screenLabel="methodology-research">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>Research methodology</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 20px", maxWidth: 880,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Standards for published research: the Library and the Substack series.
      </h2>
    </Reveal>
    <FadeUp delay={120}>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)",
        lineHeight: 1.75, margin: "0 0 48px", maxWidth: 720,
      }}>
        The research cut-off for the Agentic Buying research series is 1 May 2026. Any claim about a live system refers to that date. Readers should verify current deployment status of specific products before making decisions.
      </p>
    </FadeUp>
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {RESEARCH_STANDARDS.map((s, i) => (
        <FadeUp key={i} delay={i * 60}>
          <div style={{
            display: "grid", gridTemplateColumns: "48px 1fr",
            gap: "0 32px", padding: "32px 0",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10,
              letterSpacing: "0.16em", color: "var(--gold)", paddingTop: 4,
              textTransform: "uppercase",
            }}>{s.n}</span>
            <div>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 19,
                color: "var(--fg)", margin: "0 0 12px", lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>{s.t}</h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)",
                lineHeight: 1.75, margin: 0, maxWidth: 720,
              }}>{s.d}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const EngagementMethodology = () => (
  <Section alt screenLabel="methodology-engagement">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>Engagement methodology</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Standards for engagement work: how findings are developed, documented, and owned.
      </h2>
    </Reveal>
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {ENGAGEMENT_STANDARDS.map((s, i) => (
        <FadeUp key={i} delay={i * 60}>
          <div style={{
            display: "grid", gridTemplateColumns: "48px 1fr",
            gap: "0 32px", padding: "32px 0",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10,
              letterSpacing: "0.16em", color: "var(--gold)", paddingTop: 4,
              textTransform: "uppercase",
            }}>{s.n}</span>
            <div>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 19,
                color: "var(--fg)", margin: "0 0 12px", lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>{s.t}</h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)",
                lineHeight: 1.75, margin: 0, maxWidth: 720,
              }}>{s.d}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const MethodologyPage = ({ onEnquire }) => (
  <div data-screen-label="Methodology">
    <MethodologyHero />
    <ResearchMethodology />
    <EngagementMethodology />
    <ScopingStrip onEnquire={onEnquire} headline="Questions about research or engagement methodology are welcome before the scoping call." body="Andrew responds within one business day." />
  </div>
);

Object.assign(window, { MethodologyPage });
