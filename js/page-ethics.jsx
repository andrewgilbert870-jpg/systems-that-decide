// Page: Ethics — the operating principles behind the practice.

const EthicsHero = () => (
  <PageHero
    eyebrow="Ethics"
    title="The operating principles behind the practice."
    lead="Independent advisory only means something if the independence holds under pressure. These are the principles the practice is built on. Not aspirations, not disclaimers. Structural commitments that govern how the work is done."
  />
);

const ETHICS_PRINCIPLES = [
  {
    n: "01",
    title: "The analysis goes where the evidence points.",
    body: "The job is to tell clients what the evidence supports, not what they want to hear and not what makes the next engagement more likely. If the finding is uncomfortable, it goes in the document. If the answer is that a different practitioner is better placed to help, that is what gets said.",
  },
  {
    n: "02",
    title: "Confidentiality is unconditional.",
    body: "Client engagements are confidential. No case studies, no references, no 'a client of mine once' stories without explicit written permission. The analysis produced in an engagement belongs to the client. It does not circulate in any form without their agreement.",
  },
  {
    n: "03",
    title: "No engagement accepted where the outcome is pre-determined.",
    body: "If the shape of the brief suggests the client wants validation for a decision already made, that is a conversation, not an engagement. Engagements begin with a scoping call for this reason. If the work cannot be independent, it does not proceed.",
  },
  {
    n: "04",
    title: "Conflicts are disclosed before work begins, not after.",
    body: "If any prior relationship, vendor contact, or market position creates even a plausible appearance of conflict with a particular engagement, that is disclosed to the client before the engagement is agreed. The client decides whether to proceed. The full conflicts framework is on its own page.",
  },
  {
    n: "05",
    title: "The practice does not trade on client relationships.",
    body: "Being engaged by an organisation does not mean that organisation's name, logo or category appears in any marketing, pitch, or public communication without explicit written permission. The practice does not use client names to build new business.",
  },
  {
    n: "06",
    title: "Research is cited. Uncertainty is named.",
    body: "Public research and Library writing cites sources specifically. Where evidence is limited, uncertain or contested, that is named in the document. The practice does not present contested positions as established fact. The methodology behind research is documented separately.",
  },
];

const EthicsPrinciples = () => (
  <Section screenLabel="ethics-principles">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The principles</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Six principles. Each with a specific behavioural commitment behind it.
      </h2>
    </Reveal>
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {ETHICS_PRINCIPLES.map((p, i) => (
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
            }}>{p.n}</span>
            <div>
              <h3 style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 19,
                color: "var(--fg)", margin: "0 0 12px", lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>{p.title}</h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)",
                lineHeight: 1.75, margin: 0, maxWidth: 720,
              }}>{p.body}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const EthicsRaising = () => (
  <Section alt screenLabel="ethics-raising">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>If something is wrong</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(28px, 3.6vw, 40px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 28px", maxWidth: 800,
        letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Any concern about how a principle is being applied can be raised directly.
      </h2>
    </Reveal>
    <FadeUp delay={120}>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)",
        lineHeight: 1.75, margin: "0 0 36px", maxWidth: 680,
      }}>
        If something in an engagement feels inconsistent with what is written here, raise it. Directly, by email. The response will be substantive and within one business day. If a principle needs clarifying or amending based on a specific situation, that conversation is welcome.
      </p>
      <a href="mailto:andrew@systemsthatdecide.io" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)",
        textDecoration: "none", paddingBottom: 3,
        borderBottom: "1px solid rgba(154,139,71,0.3)",
        transition: "border-color 250ms ease",
      }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(154,139,71,0.3)"}
      >
        andrew@systemsthatdecide.io <MIcon name="arrow_forward" size={13} />
      </a>
    </FadeUp>
  </Section>
);

const EthicsPage = ({ onEnquire }) => (
  <div data-screen-label="Ethics">
    <EthicsHero />
    <EthicsPrinciples />
    <EthicsRaising />
    <ScopingStrip onEnquire={onEnquire} headline="The scoping call is the starting point." body="30 minutes. No commitment. Andrew responds within one business day." />
  </div>
);

Object.assign(window, { EthicsPage });
