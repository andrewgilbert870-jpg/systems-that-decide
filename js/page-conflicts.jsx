// Page: Conflicts of Interest — the independence model in detail.

const ConflictsHero = () => (
  <PageHero
    eyebrow="Conflicts of interest"
    title="Independence is not a claim. It is a model with no contracts pointing the other way."
    lead="The practice has no vendor relationships, no platform partnerships, no certification revenue, no referral arrangements. This page documents what that means structurally, and how conflicts are handled when they arise."
  />
);

const CONFLICT_TYPES = [
  {
    category: "Structural conflicts. Eliminated by design.",
    items: [
      {
        t: "No vendor relationships",
        d: "The practice holds no platform partnerships, reseller agreements, certification arrangements, or co-marketing deals with any company in the digital advertising or marketing technology ecosystem. There is no preferred supplier list and no commercial relationship with any vendor whose products may appear in analysis or recommendations.",
      },
      {
        t: "No referral fees",
        d: "The practice does not receive commission, kickback, or referral payment of any kind on what it recommends, names, or points clients toward. The analysis ends where the document ends. There is no financial consequence to what gets recommended.",
      },
      {
        t: "No implementation work",
        d: "The practice does not run media, configure platforms, stand up infrastructure, or build technology. There is no implementation revenue, and therefore no financial incentive to recommend a particular path because the next step involves a build engagement.",
      },
    ],
  },
  {
    category: "Situational conflicts. Disclosed before work begins.",
    items: [
      {
        t: "Prior employment relationships",
        d: "Andrew previously held senior roles at Yahoo DSP (2019–2025) and Afterpay / Block Inc. (2022–2024). If an engagement involves evaluating either of those organisations, their products, or direct competitors in a way that could be affected by prior knowledge, that prior relationship is disclosed to the client before work begins. The client decides whether to proceed.",
      },
      {
        t: "Concurrent engagements",
        d: "The practice takes multiple clients in the same market. If two concurrent engagements raise a conflict, not merely a competitive relationship but a situation where information from one would materially affect the other, the client with the earlier engagement is informed. The later engagement is declined or scoped to exclude the conflict.",
      },
      {
        t: "Personal market positions",
        d: "If a personal investment, advisory relationship, or other market position exists that could create even a plausible appearance of conflict with a specific engagement, that is disclosed to the client before the engagement proceeds.",
      },
    ],
  },
];

const ConflictStructure = () => (
  <Section screenLabel="conflicts-structure">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The conflict framework</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Two categories. One eliminated by structure, one managed by disclosure.
      </h2>
    </Reveal>
    <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
      {CONFLICT_TYPES.map((section, si) => (
        <FadeUp key={si} delay={si * 80}>
          <div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--gold)", margin: "0 0 28px",
            }}>{section.category}</p>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {section.items.map((item, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) 1.15fr",
                  gap: 48, padding: "28px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "start",
                }} className="conflict-row">
                  <h3 style={{
                    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 18,
                    color: "var(--fg)", margin: 0, lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}>{item.t}</h3>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)",
                    lineHeight: 1.75, margin: 0,
                  }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
    <style>{`@media (max-width: 760px) { .conflict-row { grid-template-columns: 1fr !important; gap: 12px !important; } }`}</style>
  </Section>
);

const ConflictProcess = () => (
  <Section alt screenLabel="conflicts-process">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>What happens when a conflict arises</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(28px, 3.6vw, 40px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 40px", maxWidth: 800,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Disclosure before work begins, not after a problem surfaces.
      </h2>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
      {[
        {
          n: "01",
          t: "Identified at scoping",
          d: "Potential conflicts are assessed during the scoping call. The engagement is structured to exclude conflicted material, or the conflict is disclosed and the client decides whether to proceed.",
        },
        {
          n: "02",
          t: "Mid-engagement discovery",
          d: "If a conflict emerges during an engagement (through new information or a shift in scope), the client is notified immediately. The work pauses on the conflicted material until the client decides how to proceed.",
        },
        {
          n: "03",
          t: "Decline where necessary",
          d: "Some engagements cannot be structured around a conflict. Where a conflict cannot be resolved through disclosure or scope adjustment, the engagement is declined. This has happened.",
        },
      ].map((s, i) => (
        <FadeUp key={i} delay={i * 80}>
          <div style={{
            background: "var(--bg)", border: "1px solid var(--border)",
            borderTop: "2px solid var(--gold)", padding: 28, height: "100%",
            boxSizing: "border-box",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
              letterSpacing: "0.2em", color: "var(--gold)",
            }}>{s.n}</span>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 19,
              color: "var(--fg)", margin: "12px 0 10px", lineHeight: 1.25,
            }}>{s.t}</h3>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)",
              lineHeight: 1.7, margin: 0,
            }}>{s.d}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const ConflictsPullquote = () => (
  <Section screenLabel="conflicts-pullquote">
    <FadeUp>
      <PullQuote>
        Independence only means something if there is a situation in which an independent view could cost the practice something. The model is built so that situation never arises.
      </PullQuote>
    </FadeUp>
  </Section>
);

const ConflictsPage = ({ onEnquire }) => (
  <div data-screen-label="Conflicts">
    <ConflictsHero />
    <ConflictStructure />
    <ConflictProcess />
    <ConflictsPullquote />
    <ScopingStrip onEnquire={onEnquire} headline="Questions about the independence model can be raised at any point." body="Including before the scoping call. Andrew responds within one business day." />
  </div>
);

Object.assign(window, { ConflictsPage });
