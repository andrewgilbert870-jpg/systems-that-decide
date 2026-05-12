// Section: The Agentic Advertising Ecosystem.
// Six entities along the buy. Click a node to open a shared panel
// showing NOW (what's live) and FORWARD SIGNAL (what's emerging),
// with an ANZ callout. Sources: agentic_buying_research v1, 1 May 2026.
//
// Variable mapping vs the brief:
//   --black/--card  → var(--bg) / var(--surface)
//   --rule          → var(--border-faint)
//   --gold-border   → var(--border-gold)        (rgba(154,139,71,0.20))
//   --gold-bg       → var(--gold-tint-08)
//   --white         → var(--fg)
//   --grey-mid      → var(--fg-muted)
//   --grey-dim      → var(--fg-subtle)
//   Playfair        → var(--font-display)       (Space Grotesk leads)

const ECO_ENTITIES = [
  {
    key: "brands",
    num: "01 / Advertiser",
    title: "Brands",
    desc: "How advertisers are deploying and preparing for agent-driven buying",
    tag: "Buy-Side Input",
    panelTitle: "Brands · the optimisation target moves to machine parsability",
    now: [
      "ChatGPT Instant Checkout live with Glossier, SKIMS, Coach, Kate Spade.",
      "Walmart–OpenAI partnership running ~3× lower conversion than direct, an early warning, not a disqualifier.",
      "brand.json, llms.txt, GTINs and Schema.org Product markup becoming hygiene, not advantage.",
      "Bunnings Buddy live as Australia's first consumer-facing brand agent.",
    ],
    next: [
      "Brand collapses into a structured object that an agent can address, and the story-to-people layer is no longer the optimisation target.",
      "Product feeds, support content and reviews tuned to agent parsing become a primary brand investment.",
      "Amazon v. Perplexity Comet (Mar 2026) becomes the legal lever: who is allowed to act on whose behalf.",
      "Agent-mediated conversion gap closes as routing logic and signal density mature.",
    ],
    anz: "Coles and Woolworths gate the basket. Agent-readability of the AU FMCG range becomes a P&L question, not a marketing one.",
  },
  {
    key: "agencies",
    num: "02 / Intermediary",
    title: "Agencies",
    desc: "The changing role of the agency inside an automated buying stack",
    tag: "Orchestration",
    panelTitle: "Agencies · production margin re-prices around agentic infrastructure",
    now: [
      "Publicis CoreAI committed €300m over three years; Atomic 212 inside Publicis ANZ.",
      "WPP Open Pro shipped; Omnicom + IPG closed November 2025; Dentsu restructuring under JPY 328bn loss.",
      "Stagwell first holdco on TTD Koa; ANA: 58% of advertisers used principal-based buying (Mar 2026).",
      "Briefing, RFPs, audience research, pacing and post-buy reconciliation now executable by agents.",
    ],
    next: [
      "Fee model and production model split. Holdcos that own infrastructure absorb production margin; independents without an infra thesis lose the work agents have taken.",
      "Strategy and creative origination retain value, sitting upstream of where the agent operates.",
      "TTD–Publicis dispute and WPP exit from OpenPath signal the open coalition fracturing into platform-aligned camps.",
      "Agency P&L re-prices around model access, agent ops and measurement, not headcount.",
    ],
    anz: "Atomic 212 inside Publicis is the local shape of this shift. Mid-market AU independents face the sharpest squeeze through 2027.",
  },
  {
    key: "buying-platforms",
    num: "03 / Buy-Side",
    title: "Buying Platforms",
    desc: "DSPs and demand infrastructure embedding agentic decision-making",
    tag: "Bid + Budget",
    panelTitle: "Buying Platforms · decisioning has already moved inside the buy",
    now: [
      "PMax, Advantage+, Koa, Yahoo DSP \u201CYours, Mine, Ours\u201D, PubMatic AgenticOS and DV360 Ads Advisor operating inside live buys.",
      "TTD share down ~40% YTD, the market's read on the open-web DSP position.",
      "Yahoo DSP YMO live in AU + SG; PubMatic AgenticOS live in AU since 27 Apr 2026.",
      "Amazon DSP MCP server live in 36 countries, the first material walled-garden bridge.",
    ],
    next: [
      "The bid request becomes the unit of power, and whoever owns it owns the auction.",
      "DSP layer either collapses into the platform layer or wins by becoming the routing fabric for external agents.",
      "TTD Koa moves from closed alpha to open access; Basis Compass and Equativ Maestro compete on planning-time compression.",
      "Cross-channel orchestration breaks the walled-garden moat, or the moat hardens into a regulatory question.",
    ],
    anz: "AU is among the first markets where agentic decisioning is GA across both Yahoo DSP and PubMatic, the testing ground for the rest of APAC.",
  },
  {
    key: "data-platforms",
    num: "04 / Intelligence",
    title: "Data Platforms",
    desc: "Measurement, identity, and modelling becoming the agent's nervous system",
    tag: "Truth + Identity",
    panelTitle: "Data Platforms · MMM renaissance, agentic edge",
    now: [
      "Meridian open-sourced 29 Jan 2025; Sellforte Media Buyer Agent in market; Mutinex MAITE shipping; Lifesight Mia GA 24 Mar 2026.",
      "Last-click MTA broken; Privacy Sandbox abandoned; MMM is back as the credible frame.",
      "Hershey–Mutinex running monthly MMM across the full portfolio, the operating model the rest of the market is benchmarking against.",
      "Gartner: ~45% of vendor AI agents fail expectations, almost always against poor input data.",
    ],
    next: [
      "Agentic MMMs push bid changes directly into Google, Meta and TikTok in self-drive mode. The loop closes without a human in the seat.",
      "Agent clock (seconds) and measurement clock (weeks) converge, and the platform that closes the gap takes the optimisation budget.",
      "Working-media share rises (ANA already at 43.9%) as fees compress and infrastructure becomes the line item.",
      "Identity rebuilt on first-party + clean-room joins, not third-party graphs.",
    ],
    anz: "AU Privacy Act ADM disclosure obligations land Dec 2026; measurement vendors with auditable agent decisions get the budget.",
  },
  {
    key: "supply-platforms",
    num: "05 / Sell-Side",
    title: "Supply Platforms",
    desc: "SSPs building agent interfaces as protocol wars reshape inventory access",
    tag: "Yield + Access",
    panelTitle: "Supply Platforms · the seller agent matures, quietly",
    now: [
      "Magnite seller agent in SpringServe ran the first AdCP test buy in December 2025.",
      "Index Exchange shipping containerised, impression-level decisioning.",
      "OpenXBuild claiming ~70% CPConv reductions across early agentic test campaigns.",
      "AgenticAdvertising.org founded 15 Oct 2025, with Yahoo, PubMatic, Scope3, Optable, Swivel and Triton as anchor members; 23+ total by April 2026.",
    ],
    next: [
      "Yield decisions move pre-auction, with floor logic, audience and creative priority decided by the seller agent before the bid request leaves.",
      "AdCP 3.0 GA + AAMP framework (16 Mar 2026) become the dominant agent-to-agent protocols.",
      "The walled-garden bridge (Amazon MCP is the first crack) is the most under-priced asset in the stack.",
      "Magnite expansion with Kepler, MiQ and Disney (Apr 2026) is the operating template, not the headline.",
    ],
    anz: "IAB Tech Lab Agent Registry live 3 Mar 2026; AU publishers and SSPs that register first set the local schema.",
  },
  {
    key: "publishers",
    num: "06 / Destination",
    title: "Publishers",
    desc: "Content owners adapting to agent-mediated discovery and direct deal negotiation",
    tag: "Inventory + Audience",
    panelTitle: "Publishers · endpoint or invisibility",
    now: [
      "First live agent-to-agent buy ran on LG Ads inventory on 16 October 2025, the day after AgenticAdvertising.org was founded.",
      "/.well-known/adagents.json adoption growing across premium supply.",
      "REA Group is the most agentic-active AU publisher across discovery, listing parsing and partner integration.",
      "Publishers without an addressable agent endpoint are being crawled, summarised and skipped.",
    ],
    next: [
      "Publishers that publish a brand-shaped agent endpoint participate in agent-to-agent flow; those that don't sit outside the routing graph entirely.",
      "Direct deal negotiation gets agent-mediated, with terms, floors, packages and exclusivity all encoded into the endpoint.",
      "JCDecaux global programmatic via Viooh sets the OOH template; CTV concentration accelerates the same pattern.",
      "Editorial standards and agent-discoverability collide; premium publishers either define the contract or get priced as commodity supply.",
    ],
    anz: "Seven/SCA merger (Jan 2026) and IAB Australia's adoption of the IAB Tech Lab roadmap make AU TV + audio the most concentrated agentic supply market globally.",
  },
];

const ECO_BG  = "rgba(154,139,71,0.09)";   // active node fill
const ECO_BR  = "rgba(154,139,71,0.35)";   // active node border

const EcosystemBoard = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  const refs = React.useRef([]);

  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const focusable = refs.current.filter(Boolean);
    const idx = focusable.indexOf(document.activeElement);
    if (idx === -1) return;
    const next = e.key === "ArrowRight"
      ? (idx + 1) % focusable.length
      : (idx - 1 + focusable.length) % focusable.length;
    focusable[next].focus();
  };

  const entity = openIdx === null ? null : ECO_ENTITIES[openIdx];

  return (
    <Section screenLabel="home-ecosystem" id="ecosystem">
      <Reveal axis="x" style={{ marginBottom: 18 }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 400,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--gold)", margin: 0,
        }}>The Agentic Advertising Ecosystem</p>
      </Reveal>
      <Reveal axis="x" delay={80}>
        <h2 id="ecosystem-heading" style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(32px, 4.6vw, 52px)", color: "var(--fg)",
          lineHeight: 1.08, letterSpacing: "-0.02em",
          margin: "0 0 18px", maxWidth: 920, textWrap: "balance",
        }}>
          Where agentic systems are taking hold.
        </h2>
      </Reveal>
      <FadeUp delay={140}>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)",
          lineHeight: 1.65, margin: "0 0 56px", maxWidth: 720,
        }}>
          Six entities run the buy. Four already have agentic decision-making operating inside live campaigns. Click any node to read what is live now and where the signal is moving.
        </p>
      </FadeUp>

      <FadeUp delay={180}>
        <div className="eco-flow" role="tablist" aria-label="Agentic ecosystem entities"
          onKeyDown={onKeyDown}
          style={{ display: "flex" }}>
          {ECO_ENTITIES.map((e, i) => {
            const isOpen = i === openIdx;
            const isFirst = i === 0;
            const isLast = i === ECO_ENTITIES.length - 1;
            return (
              <button
                key={e.key}
                ref={(el) => (refs.current[i] = el)}
                role="tab"
                id={`eco-tab-${e.key}`}
                aria-controls="eco-panel"
                aria-expanded={isOpen}
                data-entity={e.key}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className={"eco-node" + (isOpen ? " is-open" : "")}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  textAlign: "left", cursor: "pointer",
                  background: isOpen ? ECO_BG : "var(--surface)",
                  color: "inherit",
                  fontFamily: "inherit",
                  border: "1px solid " + (isOpen ? ECO_BR : "var(--border-faint)"),
                  borderRight: isLast ? "1px solid " + (isOpen ? ECO_BR : "var(--border-faint)") : "none",
                  borderRadius: isFirst ? "4px 0 0 4px" : isLast ? "0 4px 4px 0" : 0,
                  padding: "22px 20px",
                  display: "flex", flexDirection: "column", gap: 10,
                  position: "relative",
                  transition: "background 280ms ease, border-color 280ms ease",
                }}
              >
                <span className="eco-num" style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--gold)",
                }}>{e.num}</span>
                <span className="eco-title" style={{
                  fontFamily: "var(--font-display)", fontWeight: 600,
                  fontSize: 20, color: "var(--fg)", lineHeight: 1.2,
                }}>{e.title}</span>
                <span className="eco-desc" style={{
                  fontFamily: "var(--font-sans)", fontSize: 13,
                  color: "var(--fg-muted)", lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>{e.desc}</span>
                <span className="eco-toggle" aria-hidden style={{
                  position: "absolute", top: 18, right: 18,
                  width: 20, height: 20, borderRadius: "50%",
                  border: "1px solid var(--border-gold)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: "var(--gold)",
                  fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700,
                  lineHeight: 1, transition: "border-color 280ms ease",
                }}>{isOpen ? "−" : "+"}</span>
              </button>
            );
          })}
        </div>
      </FadeUp>

      <div
        id="eco-panel"
        className={"eco-panel" + (entity ? " open" : "")}
        role="tabpanel"
        aria-live="polite"
        aria-atomic="true"
        aria-labelledby={entity ? `eco-tab-${entity.key}` : undefined}
        style={{
          maxHeight: entity ? 1100 : 0,
          overflow: "hidden",
          background: "var(--surface)",
          border: "1px solid rgba(154,139,71,0.28)",
          borderTop: "none",
          borderRadius: "0 0 4px 4px",
          transition: "max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {entity && (
          <div>
            <div className="eco-panel-header" style={{
              padding: "28px 32px 20px",
              borderBottom: "1px solid var(--border-faint)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: 16, flexWrap: "wrap",
            }}>
              <h3 id="eco-panel-title" style={{
                fontFamily: "var(--font-display)", fontWeight: 600,
                fontSize: "1.25rem", color: "var(--fg)", margin: 0, lineHeight: 1.3,
              }}>{entity.panelTitle}</h3>
              <span id="eco-panel-tag" style={{
                fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.12em",
                background: "rgba(154,139,71,0.10)",
                border: "1px solid rgba(154,139,71,0.22)",
                borderRadius: 2, padding: "4px 10px",
                color: "var(--gold)",
              }}>{entity.tag}</span>
            </div>

            <div className="eco-panel-cols" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
              <div className="eco-col-now" style={{ padding: "28px 32px 32px" }}>
                <div className="eco-col-label" style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  fontFamily: "var(--font-mono)", fontSize: "clamp(14px, 1.75vw, 22px)", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--fg-muted)", marginBottom: 24,
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-muted)", flexShrink: 0 }} />
                  Now · What&rsquo;s Live
                </div>
                <ul className="eco-items" style={{
                  listStyle: "none", padding: 0, margin: 0,
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12,
                }}>
                  {entity.now.map((t, i) => (
                    <li key={i} style={{
                      fontFamily: "var(--font-sans)", fontSize: "0.9375rem",
                      lineHeight: 1.6, color: "var(--fg-muted)",
                      paddingLeft: 14, position: "relative",
                    }}>
                      <span aria-hidden style={{
                        position: "absolute", left: 0, top: 8,
                        width: 4, height: 4, borderRadius: "50%",
                        background: "var(--fg-subtle)",
                      }} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="eco-anz-note" style={{
                  marginTop: 18, padding: "12px 14px",
                  background: "rgba(154,139,71,0.06)",
                  borderLeft: "2px solid rgba(154,139,71,0.35)",
                  fontFamily: "var(--font-sans)", fontSize: "0.875rem",
                  color: "var(--fg-muted)", lineHeight: 1.6,
                }}>
                  <strong style={{ color: "var(--gold)", fontWeight: 600, letterSpacing: "0.04em" }}>ANZ · </strong>{entity.anz}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          #ecosystem .eco-flow { display: grid !important; grid-template-columns: repeat(3, minmax(0,1fr)) !important; }
          #ecosystem .eco-node { border-right: 1px solid var(--border-faint) !important; }
          #ecosystem .eco-node.is-open { border-right-color: ${ECO_BR} !important; }
          #ecosystem .eco-node:nth-child(1), #ecosystem .eco-node:nth-child(4) { border-radius: 4px 0 0 4px !important; }
          #ecosystem .eco-node:nth-child(3), #ecosystem .eco-node:nth-child(6) { border-radius: 0 4px 4px 0 !important; }
          #ecosystem .eco-node:nth-child(n+4) { border-top: none !important; }
        }
        @media (max-width: 720px) {
          #ecosystem .eco-flow { grid-template-columns: 1fr 1fr !important; }
          #ecosystem .eco-node { border-radius: 0 !important; border-right: 1px solid var(--border-faint) !important; }
          #ecosystem .eco-panel-cols { grid-template-columns: 1fr !important; }
          #ecosystem .eco-col-now { border-right: none !important; border-bottom: 1px solid var(--border-faint) !important; }
        }
      `}</style>
    </Section>
  );
};

// ── PinnedNarrative ───────────────────────────────────────────────────────
// Scroll-driven centerpiece. 600vh outer container, 100vh sticky panel.
// Left: vertical node chain. Right: clip-path-animated entity detail.
// Mobile: falls back to stacked accordion (EcosystemBoard).

const NodeChain = ({ entities, activeIdx }) => {
  return (
    <div style={{
      padding: "0 clamp(40px, 5.5vw, 80px)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      borderRight: "1px solid var(--border)",
      position: "relative", overflow: "hidden", height: "100%",
    }}>
      {/* Section label */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-subtle)",
        margin: "0 0 52px",
      }}>The Agentic Advertising Ecosystem</p>

      {/* Node list */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        {entities.map((entity, i) => {
          const isActive = i === activeIdx;
          const isPast   = i < activeIdx;
          return (
            <div key={entity.key} style={{ display: "flex", alignItems: "flex-start", gap: 24, position: "relative" }}>
              {/* Vertical connector line + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
                <div style={{
                  width: isActive ? 14 : 9,
                  height: isActive ? 14 : 9,
                  borderRadius: "50%",
                  background: isActive ? "var(--gold)" : isPast ? "rgba(154,139,71,0.45)" : "#2A2825",
                  border: isActive ? "2px solid var(--gold-light)" : isPast ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 0 14px rgba(154,139,71,0.45)" : "none",
                  transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  flexShrink: 0,
                }} />
                {i < entities.length - 1 && (
                  <div style={{
                    width: 1,
                    height: isActive ? 88 : 72,
                    background: isPast
                      ? "linear-gradient(to bottom, rgba(154,139,71,0.4), rgba(154,139,71,0.12))"
                      : "rgba(255,255,255,0.06)",
                    transition: "all 500ms ease",
                    margin: "6px 0",
                  }} />
                )}
              </div>

              {/* Label block */}
              <div style={{ paddingBottom: isActive ? 16 : 0 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--gold)" : isPast ? "rgba(154,139,71,0.5)" : "rgba(255,255,255,0.18)",
                  display: "block", marginBottom: 5,
                  transition: "color 400ms ease",
                }}>{entity.num}</span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isActive ? 28 : 17,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--fg)" : isPast ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)",
                  display: "block",
                  lineHeight: 1.15,
                  letterSpacing: isActive ? "-0.01em" : 0,
                  transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}>{entity.title}</span>
                {isActive && (
                  <div style={{ animation: "fadeIn 350ms ease forwards" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "var(--gold)",
                      display: "block", marginTop: 6, marginBottom: 8, opacity: 0.7,
                    }}>{entity.tag}</span>
                    <p style={{
                      fontFamily: "var(--font-sans)", fontSize: 14,
                      color: "var(--fg-muted)", lineHeight: 1.65,
                      margin: 0, maxWidth: 260,
                    }}>{entity.desc}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress counter + scroll cue — bottom left */}
      <div style={{ position: "absolute", bottom: 48, left: "clamp(32px, 5vw, 72px)", display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
          color: "var(--fg-subtle)",
        }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(entities.length).padStart(2, "0")}
        </span>
        {/* Animated scroll indicator — prominent on first entity, fades once user is moving */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
          opacity: activeIdx <= 1 ? 1 : 0,
          transition: "opacity 700ms ease",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "rgba(154,139,71,0.55)",
          }}>scroll to advance</span>
          <div style={{ animation: "scrollBounce 1.6s ease-in-out infinite", paddingLeft: 1 }}>
            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5.5" y1="0" x2="5.5" y2="13" stroke="rgba(154,139,71,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M1 9 L5.5 14 L10 9" stroke="rgba(154,139,71,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scrollBounce { 0%, 100% { transform: translateY(0); } 60% { transform: translateY(5px); } }
      `}</style>
    </div>
  );
};

const EntityDetail = ({ entity, idx }) => {
  const [revealed, setRevealed] = React.useState(false);
  const prevIdx = React.useRef(idx);

  React.useEffect(() => {
    if (idx === prevIdx.current) return;
    prevIdx.current = idx;
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 40);
    return () => clearTimeout(t);
  }, [idx]);

  // On first mount, reveal immediately
  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  const clip = (delay = 0) => ({
    clipPath: revealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
    transition: `clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const fade = (delay = 0) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 500ms ease ${delay}ms`,
  });

  return (
    <div style={{
      padding: "0 clamp(32px, 5vw, 72px)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      overflow: "hidden", height: "100%",
      position: "relative",
    }}>
      {/* Top progress bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "var(--border)",
      }}>
        <div style={{
          height: "100%",
          background: "var(--gold)",
          width: `${((idx + 1) / 6) * 100}%`,
          transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>

      {/* Entity index + tag */}
      <div style={{ ...clip(0), marginBottom: 20 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--gold)",
        }}>
          {entity.num} · {entity.tag}
        </span>
      </div>

      {/* Headline */}
      <div style={{ ...clip(80), marginBottom: 32 }}>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: "clamp(22px, 2.8vw, 32px)", color: "var(--fg)",
          lineHeight: 1.2, margin: 0, letterSpacing: "-0.01em",
          maxWidth: 560,
        }}>{entity.panelTitle}</h2>
      </div>

      {/* Divider */}
      <div style={{ ...fade(100), height: 1, background: "var(--border)", marginBottom: 24 }} />

      {/* NOW — ledger rows */}
      <div style={{ ...fade(140), marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg-muted)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
            Now · What&rsquo;s Live
          </span>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {entity.now.map((item, i) => (
            <li key={i} style={{
              display: "grid", gridTemplateColumns: "28px 1fr",
              gap: "0 12px", padding: "11px 0",
              borderBottom: "1px solid var(--border-faint)",
              alignItems: "baseline",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold-tint-40)", letterSpacing: "0.06em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6 }}>
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* FORWARD SIGNAL */}
      <div style={{ ...fade(220), marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>
            Forward Signal
          </span>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {entity.next.slice(0, 2).map((item, i) => (
            <li key={i} style={{
              display: "grid", gridTemplateColumns: "28px 1fr",
              gap: "0 12px", padding: "11px 0",
              borderBottom: i < 1 ? "1px solid var(--border-faint)" : "none",
              alignItems: "baseline",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(154,139,71,0.5)", letterSpacing: "0.06em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* ANZ callout */}
      <div style={{ ...fade(300) }}>
        <div style={{
          padding: "12px 16px",
          background: "rgba(154,139,71,0.06)",
          borderLeft: "2px solid rgba(154,139,71,0.35)",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ANZ ·{" "}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>
            {entity.anz}
          </span>
        </div>
      </div>

      {/* Entity counter — bottom right */}
      <div style={{
        position: "absolute", bottom: 36, right: "clamp(32px, 5vw, 72px)",
        ...fade(400),
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
        }}>
          {entity.num.split(" / ")[1].toLowerCase()} layer
        </span>
      </div>
    </div>
  );
};

// PinnedNarrative — uses position:fixed driven by JS phase detection.
// position:sticky is silently broken whenever an ancestor has overflow-x:hidden
// (which .app-scroll does). Fixed + getBoundingClientRect is the reliable alternative.
const PinnedNarrative = () => {
  const containerRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [phase, setPhase] = React.useState("before"); // "before" | "active" | "after"
  const prevIdx = React.useRef(0);
  const prevPhase = React.useRef("before");
  const rafRef = React.useRef(null);
  const NAV_H = 60;
  const PANEL_H = `calc(100vh - ${NAV_H}px)`;

  // Respect prefers-reduced-motion: skip scroll-driven pinning entirely and
  // render the static stacked layout instead (same as mobile fallback).
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (reducedMotion) return; // no scroll listener needed

    const tick = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Phase detection
      let newPhase;
      if (rect.top > NAV_H) {
        newPhase = "before";
      } else if (rect.bottom <= vh) {
        newPhase = "after";
      } else {
        newPhase = "active";
      }
      if (newPhase !== prevPhase.current) {
        prevPhase.current = newPhase;
        setPhase(newPhase);
      }

      // Active entity index — based on how far through the container we've scrolled
      const totalScrollable = rect.height - (vh - NAV_H);
      if (totalScrollable > 0) {
        const scrolled = Math.max(0, NAV_H - rect.top);
        const raw = Math.min(1, scrolled / totalScrollable);
        const count = ECO_ENTITIES.length;
        const newIdx = Math.min(Math.floor(raw * count), count - 1);
        if (newIdx !== prevIdx.current) {
          prevIdx.current = newIdx;
          setActiveIdx(newIdx);
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        tick();
      });
    };

    const scrollEl = document.querySelector(".app-scroll");
    if (scrollEl) scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial phase/index
    tick();
    return () => {
      if (scrollEl) scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  // Panel positioning switches between three modes:
  //   before  → absolute top:0 (sits at top of tall container, not yet on screen)
  //   active  → fixed to viewport, clearing the nav
  //   after   → absolute bottom:0 (panel rests at bottom of container once scrolled past)
  const panelPos = phase === "active"
    ? { position: "fixed", top: NAV_H, left: 0, right: 0, height: PANEL_H, zIndex: 10 }
    : phase === "after"
    ? { position: "absolute", bottom: 0, left: 0, right: 0, height: PANEL_H }
    : { position: "absolute", top: 0, left: 0, right: 0, height: PANEL_H };

  // prefers-reduced-motion: skip the scroll-driven experience, render static stack
  if (reducedMotion) {
    return (
      <div>
        <EcosystemBoard />
      </div>
    );
  }

  return (
    <div>
      {/* ── Desktop: pinned scroll experience ── */}
      <div className="pinned-narrative-desktop">
        {/* Tall container gives the scrollable distance that drives the fixed panel.
            65vh per entity (vs 100vh) means each step needs ~half a screen of scroll — much more responsive. */}
        <div ref={containerRef} style={{ height: `${ECO_ENTITIES.length * 65}vh`, position: "relative" }}>
          <div style={{
            ...panelPos,
            display: "grid", gridTemplateColumns: "1fr 1.4fr",
            overflow: "hidden",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}>
            <NodeChain entities={ECO_ENTITIES} activeIdx={activeIdx} />
            <EntityDetail entity={ECO_ENTITIES[activeIdx]} idx={activeIdx} />
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked cards ── */}
      <div className="pinned-narrative-mobile">
        <EcosystemBoard />
      </div>
    </div>
  );
};

// ── Agentic Milestones Timeline — D3 v7 ──────────────────────────────────
// Requires d3 loaded globally via CDN before this file runs.
// Shows the compressed Jan 2025–Apr 2026 window of infrastructure events
// that underpins the site's thesis: "decisioning has already moved."

const TIMELINE_MILESTONES = [
  { date: new Date(2025, 0, 29),  label: "Meridian",            sub: "Google MMM open-sourced",    above: false },
  { date: new Date(2025, 9, 15),  label: "AgenticAds.org",      sub: "Founded · first A2A buy",    above: true  },
  { date: new Date(2025, 10, 15), label: "Omnicom × IPG",       sub: "Holdco merger closes",       above: false },
  { date: new Date(2025, 11, 15), label: "Magnite AdCP",        sub: "First agent test buy",       above: true  },
  { date: new Date(2026, 0, 15),  label: "Seven / SCA",         sub: "AU media consolidates",      above: false },
  { date: new Date(2026, 2, 3),   label: "Agent Registry",      sub: "IAB Tech Lab live",          above: true  },
  { date: new Date(2026, 2, 24),  label: "Lifesight Mia",       sub: "Agentic MMM, GA",            above: false },
  { date: new Date(2026, 3, 27),  label: "PubMatic AgenticOS",  sub: "Live in AU + SG",            above: true  },
];

function drawAgenticTimeline(svgEl, W) {
  if (typeof d3 === "undefined" || !svgEl || W < 10) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  const H     = 300;
  const MX    = 6;         // side margin
  const AY    = 140;       // axis y — slightly above centre for asymmetric label space
  const LIFT  = 90;        // label distance from axis
  const DOT_R = 5;

  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);

  const xScale = d3.scaleTime()
    .domain([new Date(2024, 11, 15), new Date(2026, 5, 10)])
    .range([MX, MX + W - MX * 2 - 40]); // leave room for "NOW →" label

  // Background axis line
  svg.append("line")
    .attr("x1", MX).attr("y1", AY)
    .attr("x2", MX + W - MX * 2 - 40).attr("y2", AY)
    .attr("stroke", "rgba(154,139,71,0.25)")
    .attr("stroke-width", 1);

  // "NOW →" end marker
  svg.append("text")
    .attr("x", MX + W - MX * 2 - 36).attr("y", AY + 4)
    .style("font-family", "var(--font-mono)").style("font-size", "11px")
    .style("letter-spacing", "0.12em").style("fill", "rgba(154,139,71,0.5)")
    .text("NOW →");

  // Quarter tick + label marks — only on wider screens
  if (W > 560) {
    d3.timeMonths(new Date(2025, 0, 1), new Date(2026, 5, 1), 3).forEach(q => {
      const qx = xScale(q);
      svg.append("line")
        .attr("x1", qx).attr("y1", AY - 6)
        .attr("x2", qx).attr("y2", AY + 6)
        .attr("stroke", "rgba(255,255,255,0.09)").attr("stroke-width", 1);
      svg.append("text")
        .attr("x", qx).attr("y", AY + 20).attr("text-anchor", "middle")
        .style("font-family", "var(--font-mono)").style("font-size", "11px")
        .style("letter-spacing", "0.08em").style("fill", "rgba(255,255,255,0.18)")
        .text(d3.timeFormat("%b '%y")(q));
    });
  }

  // Compute base label x positions and resolve collisions
  const fs = W > 900 ? 14 : W > 640 ? 13 : 11;
  const MIN_LABEL_GAP = fs * 7.5; // approx max label width in px
  const dotXs  = TIMELINE_MILESTONES.map(ev => xScale(ev.date));
  const labelXs = dotXs.slice(); // start with labels at dot positions

  // Iterative spreading: push overlapping neighbours apart
  for (let iter = 0; iter < 6; iter++) {
    for (let i = 1; i < labelXs.length; i++) {
      if (Math.abs(labelXs[i] - labelXs[i - 1]) < MIN_LABEL_GAP) {
        const mid   = (labelXs[i - 1] + labelXs[i]) / 2;
        labelXs[i - 1] = mid - MIN_LABEL_GAP / 2;
        labelXs[i]     = mid + MIN_LABEL_GAP / 2;
      }
    }
  }

  // Event elements
  TIMELINE_MILESTONES.forEach((ev, i) => {
    const ex  = dotXs[i];
    const lx  = labelXs[i];
    const dir = ev.above ? -1 : 1;
    const labelY = AY + dir * LIFT;
    // connector: from just past dot to just before label
    const cStart = AY + dir * (DOT_R + 2);
    const cEnd   = labelY - dir * 20;

    const g = svg.append("g").attr("opacity", reducedMotion ? 1 : 0);

    // Dashed connector line — diagonal if label was shifted
    g.append("line")
      .attr("x1", ex).attr("y1", cStart)
      .attr("x2", lx).attr("y2", cEnd)
      .attr("stroke", "rgba(154,139,71,0.22)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2 3");

    // Dot on axis
    g.append("circle")
      .attr("cx", ex).attr("cy", AY).attr("r", DOT_R)
      .attr("fill", "rgba(154,139,71,0.7)")
      .attr("stroke", "rgba(154,139,71,0.35)").attr("stroke-width", 1.5);

    // Main label
    g.append("text")
      .attr("x", lx)
      .attr("y", ev.above ? labelY - 12 : labelY - 1)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-sans)").style("font-size", `${fs}px`)
      .style("font-weight", "600").style("fill", "rgba(240,237,232,0.92)")
      .text(ev.label);

    // Sub label
    g.append("text")
      .attr("x", lx)
      .attr("y", ev.above ? labelY + 5 : labelY + 16)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-mono)").style("font-size", "10px")
      .style("letter-spacing", "0.07em").style("fill", "rgba(154,139,71,0.7)")
      .text(ev.sub);

    // Staggered fade-in
    if (!reducedMotion) {
      g.transition().delay(i * 100).duration(450).attr("opacity", 1);
    }
  });
}

const AgenticTimeline = () => {
  const wrapRef  = React.useRef(null);
  const svgRef   = React.useRef(null);
  const activeRef = React.useRef(false); // true once IntersectionObserver fires

  // Redraw helper
  const redraw = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el || !activeRef.current) return;
    drawAgenticTimeline(svgRef.current, el.getBoundingClientRect().width);
  }, []);

  // Fire once when section enters viewport
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || activeRef.current) return;
      activeRef.current = true;
      redraw();
      obs.disconnect();
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [redraw]);

  // Redraw on container resize
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => redraw());
    ro.observe(el);
    return () => ro.disconnect();
  }, [redraw]);

  return (
    <div ref={wrapRef} style={{ width: "100%", lineHeight: 0 }}>
      <svg ref={svgRef} style={{ display: "block", width: "100%", overflow: "visible" }} />
    </div>
  );
};

// ── TimelineSection — wraps AgenticTimeline in a branded section shell ────
const TimelineSection = () => (
  <Section screenLabel="home-timeline">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The pace of change</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(30px, 4vw, 44px)", color: "var(--fg)",
        lineHeight: 1.08, margin: "0 0 14px", maxWidth: 840, textWrap: "balance",
        letterSpacing: "-0.02em",
      }}>
        Fifteen months of structural shift.
      </h2>
    </Reveal>
    <FadeUp delay={140}>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)",
        lineHeight: 1.75, margin: "0 0 48px", maxWidth: 680,
      }}>
        From Meridian's open-source release in January 2025 to PubMatic's live agentic deployment in April 2026.
        Every event below represents a production system, not a roadmap item.
      </p>
    </FadeUp>
    <AgenticTimeline />
  </Section>
);

Object.assign(window, { EcosystemBoard, ECO_ENTITIES, PinnedNarrative, AgenticTimeline, TimelineSection });
