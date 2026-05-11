// Systems That Decide — shared atoms (logo, nav, footer, Reveal, Label, MIcon, ScrollProgress).
// All Babel scripts share window scope; every export is attached at the bottom.

const Mark = ({ size = 28, opacity = 1, stroke = "#9A8B47" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, display: "block" }} aria-hidden="true">
    <circle cx="50" cy="50" r="44" fill="none" stroke={stroke} strokeWidth="3.6" />
    <polygon points="50,6 94,50 50,94 6,50" fill="none" stroke={stroke} strokeWidth="1.4" />
    <circle cx="50" cy="6" r="3.4" fill={stroke} />
    <circle cx="94" cy="50" r="3.4" fill={stroke} />
    <circle cx="50" cy="94" r="3.4" fill={stroke} />
    <circle cx="6" cy="50" r="3.4" fill={stroke} />
  </svg>
);

const LogoHorizontal = ({ markSize = 28 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <Mark size={markSize} />
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "var(--fg)" }}>Systems</span>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 15, color: "var(--fg)" }}>That Decide</span>
    </div>
  </div>
);

const LogoStacked = ({ markSize = 40 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
    <Mark size={markSize} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.2 }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "var(--fg)" }}>Systems</span>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 15, color: "var(--fg)" }}>That Decide</span>
    </div>
  </div>
);

// Eyebrow / label — Space Mono caps in gold. tone="muted" for inline metadata.
const Label = ({ children, tone = "gold", style }) => (
  <p style={{
    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: tone === "muted" ? "var(--fg-muted)" : "var(--gold)", margin: 0, ...style
  }}>
    {children}
  </p>
);

// ── Reveal — clip-path wipe, replaces the overused fade-up ────────────────
// axis="x"  : horizontal wipe left→right (for headlines, labels)
// axis="y"  : upward lift with improved easing (for blocks)
const Reveal = ({ children, delay = 0, axis = "y", style }) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); clearTimeout(timer); } },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    const timer = setTimeout(() => { setShown(true); obs.disconnect(); }, 3000);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  const xStyle = {
    clipPath: shown ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
    transition: `clip-path 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  const yStyle = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                 transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  return (
    <div ref={ref} style={{ ...(axis === "x" ? xStyle : yStyle), ...style }}>
      {children}
    </div>
  );
};

// Keep FadeUp as alias for backward compat on other pages — improved easing
const FadeUp = ({ children, delay = 0, y = 18 }) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); clearTimeout(timer); } },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    const timer = setTimeout(() => { setShown(true); obs.disconnect(); }, 3000);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                   transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>{children}</div>
  );
};

// MIcon — inline SVG icons, no font dependency.
const MICON_PATHS = {
  arrow_forward: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  arrow_back:    <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  close:         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  menu:          <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  lock:          <><rect x="3" y="11" width="18" height="11" rx="2" fill="none"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none"/></>,
  open_in_new:   <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
  // Operator tag icons — About page
  location_on:   <><path d="M12 2a6 6 0 0 0-6 6c0 5 6 14 6 14s6-9 6-14a6 6 0 0 0-6-6z"/><circle cx="12" cy="8" r="2"/></>,
  domain:        <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 9l9-5 9 5"/><path d="M9 21v-6h6v6"/></>,
  groups:        <><circle cx="9" cy="8" r="3"/><path d="M3 21c0-3.314 2.686-6 6-6s6 2.686 6 6"/><path d="M16 5a3 3 0 0 1 0 6M22 21c0-3.314-2-6-5-6"/></>,
  article:       <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></>,
  memory:        <><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v5M12 2v5M15 2v5M9 17v5M12 17v5M15 17v5M2 9h5M2 12h5M2 15h5M17 9h5M17 12h5M17 15h5"/></>,
  payments:      <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 9h20M6 13h4M16 13h2"/></>,
  storefront:    <><path d="M3 9h18M3 9l2-4h14l2 4M3 9v12h18V9"/><path d="M9 21v-7h6v7"/></>,
};
const MIcon = ({ name, size = 18, color = "currentColor", style }) => {
  const paths = MICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      {paths}
    </svg>
  );
};

// ── ScrollProgress — thin gold bar at top of viewport ────────────────────
const ScrollProgress = () => {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const scrollEl = document.querySelector(".app-scroll") || document.documentElement;
      const scrollTop = scrollEl.scrollTop || window.scrollY || 0;
      const scrollHeight = (scrollEl.scrollHeight || document.body.scrollHeight) - (scrollEl.clientHeight || window.innerHeight);
      const pct = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
      setWidth(pct);
    };
    const scrollEl = document.querySelector(".app-scroll");
    if (scrollEl) scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (scrollEl) scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 2,
      width: `${width}%`, background: "var(--gold)",
      zIndex: 200, pointerEvents: "none",
      transition: "width 80ms linear",
    }} aria-hidden />
  );
};

// ── Nav: centered wordmark — services on left wing, content + enquire on right ─
// Breaks from the default three-column logo-left pattern. On scroll the bar
// compresses and the wordmark text fades, leaving only the mark centred.
const Nav = ({ active, onNavigate, onEnquire }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(false);

  React.useEffect(() => {
    const scrollEl = document.querySelector(".app-scroll");
    const handler = () => {
      const top = scrollEl ? scrollEl.scrollTop : window.scrollY;
      setScrolled(top > 32);
    };
    if (scrollEl) scrollEl.addEventListener("scroll", handler, { passive: true });
    else window.addEventListener("scroll", handler, { passive: true });
    return () => {
      if (scrollEl) scrollEl.removeEventListener("scroll", handler);
      else window.removeEventListener("scroll", handler);
    };
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const leftLinks  = [
    { id: "asrp",     label: "Readiness" },
    { id: "advisory", label: "Advisory" },
  ];
  const rightLinks = [
    { id: "library",  label: "Library" },
    { id: "about",    label: "About" },
  ];
  const allLinks = [...leftLinks, ...rightLinks];

  const goAndClose = (id) => { onNavigate(id); setOpen(false); };

  const wingLink = (id, label) => {
    const isActive = id === active;
    return (
      <a key={id} href={`${id}.html`}
        onClick={(e) => { e.preventDefault(); onNavigate(id); }}
        style={{
          cursor: "pointer", textDecoration: "none",
          fontFamily: "var(--font-mono)", fontWeight: isActive ? 700 : 400,
          fontSize: 12, letterSpacing: "0.13em", textTransform: "uppercase",
          color: isActive ? "var(--gold)" : "rgba(255,255,255,0.42)",
          paddingBottom: 2,
          borderBottom: isActive ? "1px solid var(--gold)" : "1px solid transparent",
          transition: "color 220ms ease, border-color 220ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.88)"; }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.42)"; }}
      >
        {label}
      </a>
    );
  };

  const NAV_H = scrolled ? 64 : 80;

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(13,13,13,0.96)" : "var(--bg)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        transition: "background 350ms ease, height 350ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {!isNarrow ? (
          /* ── Desktop: three equal columns — left links / center mark / right links ── */
          <div style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 32px",
            height: NAV_H, display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            transition: "height 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {/* Left wing — services */}
            <nav style={{ display: "flex", alignItems: "center", gap: 28, justifyContent: "flex-start" }}>
              {leftLinks.map(l => wingLink(l.id, l.label))}
            </nav>

            {/* Center — brand mark + wordmark, collapses to mark-only on scroll */}
            <a href="index.html" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
              style={{ cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 13 }}
              data-screen-label="nav-logo">
              <Mark size={scrolled ? 28 : 34} />
              <div style={{
                overflow: "hidden",
                maxWidth: scrolled ? 0 : 200,
                opacity: scrolled ? 0 : 1,
                transition: "max-width 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease",
                whiteSpace: "nowrap",
              }}>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16, color: "var(--fg)" }}>Systems</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 16, color: "var(--fg-muted)" }}>That Decide</span>
                </div>
              </div>
            </a>

            {/* Right wing — content + divider + enquire */}
            <nav style={{ display: "flex", alignItems: "center", gap: 28, justifyContent: "flex-end" }}>
              {rightLinks.map(l => wingLink(l.id, l.label))}

              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.10)", flexShrink: 0 }} />

              <a href="login.html" aria-label="Client login" style={{
                cursor: "pointer", textDecoration: "none",
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.13em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.20)",
                display: "inline-flex", alignItems: "center", gap: 4,
                transition: "color 200ms ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.20)"}
              >
                <MIcon name="lock" size={11} />
                Login
              </a>

              <a onClick={onEnquire} style={{
                cursor: "pointer", textDecoration: "none",
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "var(--gold)",
                paddingBottom: 2, borderBottom: "1px solid var(--gold-tint-30)",
                transition: "border-color 250ms ease, color 250ms ease",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gold-tint-30)"; e.currentTarget.style.color = "var(--gold)"; }}
              >
                Enquire
              </a>
            </nav>
          </div>
        ) : (
          /* ── Mobile: mark centred + hamburger right ── */
          <div style={{
            padding: "0 20px", height: 56,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <a href="index.html" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
              style={{ cursor: "pointer", textDecoration: "none" }}>
              <Mark size={24} />
            </a>
            <button onClick={() => setOpen(o => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
              style={{ background: "transparent", border: "none", color: "var(--fg)", padding: "4px", cursor: "pointer", display: "inline-flex" }}>
              <MIcon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {isNarrow && open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: "56px 0 0 0", zIndex: 49,
          background: "rgba(13,13,13,0.97)", backdropFilter: "blur(16px)",
          padding: "40px 28px", display: "flex", flexDirection: "column", gap: 32,
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[...allLinks, { id: "enquire", label: "Enquire" }].map(l => {
              const isActive = l.id === active;
              return (
                <a key={l.id} href={`${l.id}.html`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); goAndClose(l.id === "enquire" ? "enquire" : l.id); }}
                  style={{
                    cursor: "pointer", textDecoration: "none",
                    fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 24,
                    letterSpacing: "-0.01em",
                    color: isActive ? "var(--gold)" : "rgba(255,255,255,0.82)",
                  }}>
                  {l.label}
                </a>
              );
            })}
          </nav>
          <a href="mailto:andrew@systemsthatdecide.io" style={{
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-muted)",
            letterSpacing: "0.1em", textDecoration: "none", marginTop: "auto",
          }}>
            andrew@systemsthatdecide.io
          </a>
        </div>
      )}
    </div>
  );
};

// ── Footer ───────────────────────────────────────────────────────────────
const Footer = ({ onNavigate }) => {
  const cols = [
    { head: "Engagements", items: [
      { label: "Readiness Program", to: "asrp" },
      { label: "Team Education", to: "advisory" },
      { label: "Executive Advisory", to: "advisory" },
      { label: "Market Entry & Expansion", to: "advisory" },
      { label: "Transaction Advisory", to: "advisory" },
    ]},
    { head: "The Practice", items: [
      { label: "About", to: "about" },
      { label: "The Library", to: "library" },
      { label: "Enquire", to: "enquire" },
    ]},
    { head: "Independence", items: [
      { label: "Ethics", to: "ethics" },
      { label: "Conflicts of interest", to: "conflicts" },
      { label: "Methodology", to: "methodology" },
    ]},
  ];
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 1.2fr) repeat(3, 1fr)", gap: 48 }} className="footer-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <a href="index.html" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ cursor: "pointer", textDecoration: "none" }}>
              <LogoHorizontal markSize={32} />
            </a>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0, maxWidth: 280 }}>
              Independent advisory for ANZ agencies and brands navigating the shift to agentic media buying.
            </p>
            <a href="mailto:andrew@systemsthatdecide.io" style={{
              fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gold)", textDecoration: "none",
              borderBottom: "1px solid var(--gold-tint-30)", paddingBottom: 2, alignSelf: "flex-start",
              letterSpacing: "0.06em",
            }}>andrew@systemsthatdecide.io</a>
          </div>
          {cols.map((c, i) => (
            <div key={i}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, color: "var(--gold)",
                letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px",
              }}>{c.head}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {c.items.map((it, j) => (
                  <li key={j}>
                    <a href={`${it.to}.html`} onClick={(e) => { e.preventDefault(); onNavigate(it.to); }} style={{
                      cursor: "pointer", textDecoration: "none", color: "var(--fg-muted)",
                      fontFamily: "var(--font-sans)", fontSize: 14, transition: "color 250ms ease",
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
                    >{it.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", margin: 0, textTransform: "uppercase" }}>
            © 2026 Systems That Decide · Independent Advisory Model
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--fg-subtle)", margin: 0, textTransform: "uppercase" }}>
            Andrew Gilbert · Sydney
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #BBA55F;
          outline-offset: 3px;
        }
      `}</style>
    </footer>
  );
};

// Export --font-heading as a JS constant for inline styles in other components
window.__FONT_HEADING = "var(--font-heading)";

Object.assign(window, { Mark, LogoHorizontal, LogoStacked, Label, FadeUp, Reveal, MIcon, Nav, Footer, ScrollProgress });
