// Buttons, StatCounter, PostCard, FeaturedCard, LedgerRow, MandateBlock, Watermark, ScoringBar.

const PrimaryBtn = ({ children, onClick, href }) => (
  <a href={href} onClick={onClick} style={{
    cursor: "pointer", textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "13px 24px", minHeight: 44,   /* 44px touch target minimum */
    background: "var(--gold)", color: "#0D0D0D",
    fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
    letterSpacing: "0.14em", textTransform: "uppercase",
    transition: "background 250ms ease",
    boxSizing: "border-box",
  }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--gold-light)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "var(--gold)"}
  >{children}</a>
);

const SecondaryBtn = ({ children, onClick, href }) => (
  <a href={href} onClick={onClick} style={{
    cursor: "pointer", textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "13px 24px", minHeight: 44,   /* 44px touch target minimum */
    background: "transparent", color: "var(--gold)",
    border: "1px solid var(--gold-tint-40)",
    fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
    letterSpacing: "0.14em", textTransform: "uppercase",
    transition: "background 250ms ease, border-color 250ms ease",
    boxSizing: "border-box",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold-tint-08)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--gold-tint-40)"; }}
  >{children}</a>
);

const LinkBtn = ({ children, onClick, href }) => (
  <a href={href} onClick={onClick} style={{
    cursor: "pointer", textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8,
    color: "var(--gold)", fontFamily: "var(--font-mono)", fontWeight: 700,
    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
    paddingBottom: 3, borderBottom: "1px solid var(--gold-tint-30)",
    transition: "border-color 250ms ease, gap 300ms cubic-bezier(0.16, 1, 0.3, 1)",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.gap = "14px"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gold-tint-30)"; e.currentTarget.style.gap = "8px"; }}
  >{children}</a>
);

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

const StatCounter = ({ value, label, context, large = false }) => {
  const ref = React.useRef(null);
  const [text, setText] = React.useState(value);
  const animated = React.useRef(false);
  React.useEffect(() => {
    const m = String(value).match(/^([~]?)(\d[\d,]*)([%]?)$/);
    if (!m) return;
    const pre = m[1] || ""; const target = parseFloat(m[2].replace(/,/g, "")); const suf = m[3] || "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText(`${pre}0${suf}`);
    const root = document.querySelector(".app-scroll");
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      const dur = 1400; const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const n = Math.round(easeOutCubic(t) * target);
        if (t < 1) { setText(`${pre}${n.toLocaleString()}${suf}`); requestAnimationFrame(tick); }
        else setText(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3, root: root || null });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const numSize = large ? "clamp(56px, 7vw, 88px)" : "clamp(40px, 5vw, 64px)";
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: numSize, color: "var(--gold-stat)", lineHeight: 1, marginBottom: 16, letterSpacing: 0 }}>{text}</span>
      <Label style={{ marginBottom: 8 }}>{label}</Label>
      {context && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.5 }}>{context}</span>}
    </div>
  );
};

// ── PostCard — improved hover: left border wipe instead of box-shadow lift ─
const PostCard = ({ post, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a onClick={onClick} href={post.href} target={post.href ? "_blank" : undefined} rel="noopener" style={{
      cursor: "pointer", textDecoration: "none", display: "block",
      background: hover ? "var(--surface-raised)" : "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderRight: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      borderLeft: hover ? "2px solid var(--gold)" : "2px solid transparent",
      padding: hover ? "28px 28px 28px 26px" : "28px",
      transition: "border-color 280ms ease, padding 280ms ease, background 280ms ease",
    }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <Label style={{ marginBottom: 14 }}>{post.date}</Label>
      <h3 style={{
        fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 20,
        color: hover ? "var(--gold)" : "var(--fg)", lineHeight: 1.3, margin: "0 0 14px",
        letterSpacing: 0, transition: "color 280ms ease",
      }}>{post.title}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 22px" }}>
        {post.excerpt}
      </p>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Read on Substack <MIcon name="arrow_forward" size={13} />
      </span>
    </a>
  );
};

const FeaturedCard = ({ label, title, body, footer, accent = true, height }) => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderTop: accent ? "2px solid var(--gold)" : "1px solid var(--border)",
    padding: 32, height: height || "100%", boxSizing: "border-box",
    display: "flex", flexDirection: "column", gap: 16,
  }}>
    {label && <Label>{label}</Label>}
    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: 20, color: "var(--fg)", margin: 0, lineHeight: 1.25, letterSpacing: 0 }}>{title}</h3>
    {body && <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{body}</p>}
    {footer && <div style={{ marginTop: "auto", paddingTop: 16 }}>{footer}</div>}
  </div>
);

// ── LedgerRow — tabular / manifest style for program components ───────────
// Replaces the generic 2×2 card grid for the ASRP flagship preview.
const LedgerRow = ({ number, title, description, isLast = false, onAction, actionLabel }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr auto",
        gap: "0 32px",
        alignItems: "start",
        padding: "24px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
        cursor: onAction ? "pointer" : "default",
        borderLeft: hover && onAction ? "2px solid var(--gold)" : "2px solid transparent",
        paddingLeft: hover && onAction ? 14 : 0,
        transition: "border-color 250ms ease, padding-left 250ms ease",
      }}
      onClick={onAction}
    >
      {/* Number */}
      <span style={{
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10,
        letterSpacing: "0.16em", color: "var(--gold)", paddingTop: 4,
        textTransform: "uppercase",
      }}>{number}</span>

      {/* Content */}
      <div>
        <h4 style={{
          fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18,
          color: "var(--fg)", margin: "0 0 8px", lineHeight: 1.3,
          transition: "color 250ms ease",
        }}>{title}</h4>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
          {description}
        </p>
      </div>

      {/* Action */}
      {onAction && (
        <div style={{
          opacity: hover ? 1 : 0,
          transition: "opacity 250ms ease",
          paddingTop: 2,
          flexShrink: 0,
        }}>
          <MIcon name="arrow_forward" size={16} color="var(--gold)" />
        </div>
      )}
    </div>
  );
};

const PullQuote = ({ children, attribution }) => (
  <div style={{ background: "var(--surface)", borderLeft: "3px solid var(--gold)", padding: "clamp(32px, 5vw, 56px) clamp(28px, 5vw, 64px)" }}>
    <blockquote style={{
      fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "normal",
      fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--gold)", lineHeight: 1.5,
      maxWidth: 900, margin: 0,
    }}>
      &ldquo;{children}&rdquo;
    </blockquote>
    {attribution && <p style={{
      fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-subtle)",
      letterSpacing: "0.18em", textTransform: "uppercase", margin: "24px 0 0",
    }}>{attribution}</p>}
  </div>
);

const Watermark = ({ size = "70vw", opacity = 0.04, style }) => (
  <div aria-hidden style={{ position: "absolute", pointerEvents: "none", ...style }}>
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, opacity }}>
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--gold)" strokeWidth="0.6" />
      <polygon points="50,6 94,50 50,94 6,50" fill="none" stroke="var(--gold)" strokeWidth="0.3" />
      <circle cx="50" cy="6" r="1.2" fill="var(--gold)" />
      <circle cx="94" cy="50" r="1.2" fill="var(--gold)" />
      <circle cx="50" cy="94" r="1.2" fill="var(--gold)" />
      <circle cx="6" cy="50" r="1.2" fill="var(--gold)" />
    </svg>
  </div>
);

// HeroDotGrid kept for backward compat on non-home pages
const HeroDotGrid = ({ opacity = 1 }) => (
  <div aria-hidden style={{
    position: "absolute", inset: 0, pointerEvents: "none", opacity,
    backgroundImage: "radial-gradient(circle, rgba(154,139,71,0.06) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
  }} />
);

// ── Section wrapper ─────────────────────────────────────────────────────
const Section = ({ children, alt = false, padded = true, style, id, screenLabel }) => (
  <section id={id} data-screen-label={screenLabel} style={{
    background: alt ? "var(--surface)" : "var(--bg)",
    padding: padded ? "clamp(72px, 10vw, 120px) 24px" : 0,
    borderTop: alt ? "1px solid var(--border)" : "none",
    borderBottom: alt ? "1px solid var(--border)" : "none",
    position: "relative",
    ...style,
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>{children}</div>
  </section>
);

// ── Page-hero used across detail pages ─────────────────────────────────
const PageHero = ({ eyebrow, title, lead, children }) => (
  <section style={{ position: "relative", padding: "clamp(80px, 12vw, 144px) 24px clamp(56px, 8vw, 96px)", overflow: "hidden", background: "var(--bg)" }}>
    <HeroDotGrid />
    <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal axis="x" style={{ marginBottom: 24 }}><Label>{eyebrow}</Label></Reveal>
      <Reveal axis="x" delay={120}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: "clamp(40px, 6.4vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "var(--fg)", margin: "0 0 24px", maxWidth: 1100, textWrap: "balance",
        }}>{title}</h1>
      </Reveal>
      {lead && (
        <FadeUp delay={240}>
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "clamp(17px, 1.4vw, 20px)",
            color: "var(--fg)", lineHeight: 1.55, maxWidth: 820, margin: 0,
          }}>{lead}</p>
        </FadeUp>
      )}
      {children && <FadeUp delay={360}><div style={{ marginTop: 40 }}>{children}</div></FadeUp>}
    </div>
  </section>
);

// ── CTA strip — scoping call ────────────────────────────────────────────
const ScopingStrip = ({ onEnquire, headline, body }) => (
  <Section alt screenLabel="cta-scoping">
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "center" }} className="cta-grid">
      <div style={{ borderLeft: "3px solid var(--gold)", padding: "12px 0 12px 28px" }}>
        <Label style={{ marginBottom: 16 }}>Get started</Label>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", color: "var(--fg)", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
          {headline || "The Diagnostic is the starting point."}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: 620 }}>
          {body || "A 30-minute scoping call to establish whether the Diagnostic is the right entry point for your organisation, and what the engagement would look like."}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }} className="cta-actions">
        <PrimaryBtn onClick={onEnquire}>Book a scoping call <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
        <a href="mailto:andrew@systemsthatdecide.io" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em",
          textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid var(--gold-tint-30)", paddingBottom: 2,
        }}>andrew@systemsthatdecide.io</a>
      </div>
    </div>
    <style>{`
      @media (max-width: 880px) {
        .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      }
    `}</style>
  </Section>
);

Object.assign(window, {
  PrimaryBtn, SecondaryBtn, LinkBtn,
  StatCounter, PostCard, FeaturedCard, LedgerRow, PullQuote, Watermark, HeroDotGrid,
  Section, PageHero, ScopingStrip,
});
