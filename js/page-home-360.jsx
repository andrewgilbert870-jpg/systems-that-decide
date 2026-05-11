// Section: 360° Ecosystem Experience.
// Six sector cards representing Andrew's cross-ecosystem operator background.
// Clicking a card expands an inline panel with experience context.

const SECTORS = [
  {
    key: "brand",
    icon: "domain",
    label: "Brand",
    title: "The brand seat",
    body: "Launched The Wallet Advantage at Afterpay (Block Inc.), the first payments-native commerce media product in ANZ. Built the brand-side commercial model end to end, working directly with Australia's largest FMCG, fashion, and beauty advertisers. Understands what brands actually need from their media investment, not what they're sold.",
  },
  {
    key: "agency",
    icon: "groups",
    label: "Agency",
    title: "The agency seat",
    body: "Commercial relationships spanning major holdcos and independent agencies across ANZ built over sixteen years. Deep understanding of agency economics: principal media, arbitrage models, incentive structures, and how the shift to agentic buying is repricing the intermediary position. Knows what agencies say and what they mean.",
  },
  {
    key: "publisher",
    icon: "article",
    label: "Publisher",
    title: "The publisher seat",
    body: "Built 60% market share at Integral Ad Science ANZ, working daily with premium publishers on verification, brand safety, and inventory quality. Understands sell-side economics from the inside: how publishers make floor decisions, what drives yield, and why publisher agents are not a future concept.",
  },
  {
    key: "adtech",
    icon: "memory",
    label: "Adtech",
    title: "The adtech seat",
    body: "Director Commercial & Solutions AUSEA at Yahoo DSP from 2019 to 2025. Led 2,550% revenue growth across the region. Deep programmatic architecture knowledge: DSP, SSP, DMP, identity resolution, measurement, and the full stack that sits between a brief and a bid. Has seen every layer of this infrastructure from the inside.",
  },
  {
    key: "payments",
    icon: "payments",
    label: "Payments",
    title: "The payments seat",
    body: "Launched the first payments-native commerce media product in ANZ at Afterpay (Block Inc.). Understands how purchase-signal data (what people actually bought) differs structurally from intent-based targeting. The closed loop between payment, product, and re-targeting is the operating model most of retail media is still trying to replicate.",
  },
  {
    key: "retail-media",
    icon: "storefront",
    label: "Retail Media",
    title: "The retail media seat",
    body: "Commerce media built from the ground up. Understands the retailer-as-media-owner model from the inside: clean room data partnerships, first-party signal monetisation, and the agency buying relationships that determine whether a retail media network reaches scale or stalls at launch. Coles and Woolworths are not the whole story.",
  },
];

const EcosystemExperience = () => {
  const [openKey, setOpenKey] = React.useState(null);
  const panelRef = React.useRef(null);

  const toggle = (key) => {
    const next = openKey === key ? null : key;
    setOpenKey(next);
    if (next && panelRef.current) {
      setTimeout(() => {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    }
  };

  const active = SECTORS.find((s) => s.key === openKey) || null;

  return (
    <Section screenLabel="home-360" alt>
      <FadeUp>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 400,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--gold)", margin: "0 0 36px",
        }}>360° Ecosystem Experience</p>
      </FadeUp>

      {/* Six sector cards */}
      <div className="sectors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
        {SECTORS.map((s, i) => {
          const isOpen = s.key === openKey;
          return (
            <FadeUp key={s.key} delay={i * 60}>
              <button
                onClick={() => toggle(s.key)}
                aria-expanded={isOpen}
                aria-controls="sector-panel"
                style={{
                  width: "100%",
                  background: isOpen ? "rgba(154,139,71,0.09)" : "var(--bg)",
                  border: "1px solid " + (isOpen ? "rgba(154,139,71,0.35)" : "var(--border)"),
                  borderRight: i < SECTORS.length - 1 ? "none" : "1px solid " + (isOpen ? "rgba(154,139,71,0.35)" : "var(--border)"),
                  padding: "32px 20px 28px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  transition: "background 260ms ease, border-color 260ms ease",
                  color: "inherit",
                  fontFamily: "inherit",
                  textAlign: "center",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) e.currentTarget.style.background = "rgba(154,139,71,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) e.currentTarget.style.background = "var(--bg)";
                }}
              >
                {/* Icon */}
                <span
                  className="material-symbols-outlined"
                  aria-hidden
                  style={{
                    fontFamily: "'Material Symbols Outlined'",
                    fontSize: 28,
                    color: isOpen ? "var(--gold-light)" : "var(--gold)",
                    fontWeight: "normal",
                    fontVariationSettings: "'opsz' 24, 'wght' 300, 'FILL' 0",
                    lineHeight: 1,
                    transition: "color 260ms ease",
                  }}
                >
                  {s.icon}
                </span>

                {/* Label */}
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: isOpen ? "var(--gold)" : "var(--fg-muted)",
                  transition: "color 260ms ease",
                }}>
                  {s.label}
                </span>

                {/* Active indicator dot */}
                {isOpen && (
                  <span style={{
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--gold)",
                  }} aria-hidden />
                )}
              </button>
            </FadeUp>
          );
        })}
      </div>

      {/* Expandable panel */}
      <div
        id="sector-panel"
        ref={panelRef}
        role="region"
        aria-live="polite"
        aria-atomic="true"
        style={{
          maxHeight: active ? 320 : 0,
          overflow: "hidden",
          transition: "max-height 0.36s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "var(--surface-raised)",
          border: active ? "1px solid rgba(154,139,71,0.22)" : "1px solid transparent",
          borderTop: "none",
        }}
      >
        {active && (
          <div style={{ padding: "32px 40px 36px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }}>
            {/* Left: icon + label */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span
                className="material-symbols-outlined"
                aria-hidden
                style={{
                  fontFamily: "'Material Symbols Outlined'",
                  fontSize: 40,
                  color: "var(--gold)",
                  fontWeight: "normal",
                  fontVariationSettings: "'opsz' 40, 'wght' 200, 'FILL' 0",
                  lineHeight: 1,
                }}
              >
                {active.icon}
              </span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                color: "var(--fg)",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: 0,
              }}>
                {active.title}
              </h3>
            </div>

            {/* Right: body text */}
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              color: "var(--fg-muted)",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: 680,
              paddingTop: 6,
            }}>
              {active.body}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .sectors-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .sectors-grid button { border-right: 1px solid var(--border) !important; }
          .sectors-grid button:nth-child(n+4) { border-top: none !important; }
          #sector-panel > div { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .sectors-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sectors-grid button { border-right: 1px solid var(--border) !important; }
          .sectors-grid button:nth-child(odd):last-child { grid-column: span 2; }
        }
      `}</style>
    </Section>
  );
};

Object.assign(window, { EcosystemExperience, SECTORS });
