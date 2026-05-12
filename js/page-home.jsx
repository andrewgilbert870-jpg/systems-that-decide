// Page: Home — anchor for the journey.
// Structure: Hero → PinnedNarrative → Thesis → ScaleRecord → FlagshipPreview (ledger) → HomeLibrary → ScopingStrip

// ── HeroNodeNetwork — Three.js particle/node network behind the hero ─────
// Full-bleed canvas with cursor-following camera drift.
// Disabled on mobile and when prefers-reduced-motion is set.
const HeroNodeNetwork = () => {
  const canvasRef = React.useRef(null);
  const mouseRef  = React.useRef({ x: 0, y: 0 });
  const isMobile = React.useRef(
    typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
  ).current;
  const prefersReduced = React.useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  React.useEffect(() => {
    if (isMobile || prefersReduced) return;
    if (!canvasRef.current) return;
    if (typeof THREE === 'undefined') return;

    const canvas = canvasRef.current;

    // Track mouse for camera drift
    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 1000);
    camera.position.z = 100;

    // ── Geometry — 55 nodes, wide spread to fill the hero ───────────────
    const NODE_COUNT = 55;
    const SPREAD_X = 130, SPREAD_Y = 70, SPREAD_Z = 45;
    const pts = Array.from({ length: NODE_COUNT }, () => ({
      x: (Math.random() - 0.5) * SPREAD_X,
      y: (Math.random() - 0.5) * SPREAD_Y,
      z: (Math.random() - 0.5) * SPREAD_Z,
    }));

    // Nodes — two sizes for depth: larger foreground, smaller background
    pts.forEach(p => {
      const isFg = p.z > 0;
      const geo  = new THREE.SphereGeometry(isFg ? 1.1 : 0.65, 5, 4);
      const mat  = new THREE.MeshBasicMaterial({
        color: 0x9a8b47,
        transparent: true,
        opacity: isFg ? 0.75 : 0.40,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(p.x, p.y, p.z);
      scene.add(m);
    });

    // Edges — two thresholds: dense local connections + sparse long ones
    const edgeVerts   = [];
    const edgeVertsFar = [];
    const MAX_CLOSE  = 26;
    const MAX_FAR    = 48;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (d < MAX_CLOSE) {
          edgeVerts.push(
            new THREE.Vector3(pts[i].x, pts[i].y, pts[i].z),
            new THREE.Vector3(pts[j].x, pts[j].y, pts[j].z)
          );
        } else if (d < MAX_FAR && Math.random() < 0.18) {
          edgeVertsFar.push(
            new THREE.Vector3(pts[i].x, pts[i].y, pts[i].z),
            new THREE.Vector3(pts[j].x, pts[j].y, pts[j].z)
          );
        }
      }
    }
    if (edgeVerts.length) {
      const geo = new THREE.BufferGeometry().setFromPoints(edgeVerts);
      scene.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
        color: 0x9a8b47, transparent: true, opacity: 0.38,
      })));
    }
    if (edgeVertsFar.length) {
      const geo = new THREE.BufferGeometry().setFromPoints(edgeVertsFar);
      scene.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
        color: 0x9a8b47, transparent: true, opacity: 0.12,
      })));
    }

    // ── Resize ───────────────────────────────────────────────────────────
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Animation — slow drift + cursor-following camera offset ──────────
    let frameId, t = 0;
    // Smoothed camera target
    let camX = 0, camY = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.006;

      // Slow auto-rotation
      scene.rotation.y = Math.sin(t * 0.8) * 0.22;
      scene.rotation.x = Math.cos(t * 0.55) * 0.10;

      // Cursor-following camera drift — smooth lerp
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      camX += (mx * 8  - camX) * 0.04;
      camY += (-my * 4 - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer.dispose();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (isMobile || prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
};

// ── Hero — full-bleed spatial network, serif display headline ────────────
const HomeHero = ({ onEnquire, onSecondary }) => {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShown(true), 100);
    return () => clearTimeout(t);
  }, []);

  const clip = (delay = 0) => ({
    clipPath: shown ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
    transition: `clip-path 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const lift = (delay = 0) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                 transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section style={{
      position: "relative",
      minHeight: "88vh",
      padding: "clamp(112px, 15vw, 188px) 24px clamp(80px, 10vw, 128px)",
      overflow: "hidden",
      background: "var(--bg)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center",
    }}>
      {/* Three.js node network — full bleed behind content */}
      <HeroNodeNetwork />

      {/* Left-side vignette so serif headline stays readable over the network */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "linear-gradient(90deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.60) 48%, transparent 78%)",
      }} />

      {/* Bottom vignette — dissolves network into the section below */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
        {/* Eyebrow */}
        <div style={{ ...clip(0), marginBottom: 32 }}>
          <Label>Independent advisory · ANZ</Label>
        </div>

        {/* Main headline — Instrument Serif at full display scale */}
        <div style={{ ...clip(100), marginBottom: 36 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(52px, 9vw, 104px)", lineHeight: 0.97,
            letterSpacing: "-0.03em",
            color: "var(--fg)", margin: 0, maxWidth: 860, textWrap: "balance",
          }}>
            Who controls the systems that decide.
          </h1>
        </div>

        {/* Lead */}
        <div style={{ ...lift(280), marginBottom: 52, maxWidth: 580 }}>
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 400,
            fontSize: "clamp(16px, 1.2vw, 18px)",
            color: "var(--fg-muted)", lineHeight: 1.75, margin: 0,
          }}>
            PMax, Advantage+, and Koa are already making decisions your team never sees. Systems That Decide is the independent advisory practice of Andrew Gilbert. Sixteen years operating across the buy-side stack, now outside it, with no platform to defend and no implementation work to sell.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ ...lift(400), display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <PrimaryBtn onClick={onEnquire}>
              Book a scoping call <MIcon name="arrow_forward" size={15} />
            </PrimaryBtn>
            <SecondaryBtn onClick={onSecondary}>Read the Library</SecondaryBtn>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--fg-subtle)",
          }}>
            30 minutes · No commitment · Andrew responds within one business day
          </span>
        </div>

        {/* Scroll cue */}
        <div style={{ ...lift(560), marginTop: 72, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 1, background: "var(--gold-tint-30)" }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--fg-subtle)",
          }}>
            Scroll to map the stack
          </span>
        </div>
      </div>
    </section>
  );
};

// ── EcosystemIntro — qualifying filter + bridge to the stack map ─────────
const EcosystemIntro = () => (
  <section style={{
    background: "var(--surface)",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    padding: "clamp(56px, 8vw, 88px) clamp(24px, 4vw, 96px)",
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="eco-intro-grid">
        <div>
          <Reveal axis="x" style={{ marginBottom: 20 }}>
            <Label>Who this is for</Label>
          </Reveal>
          <Reveal axis="x" delay={80}>
            <h2 style={{
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(24px, 2.8vw, 34px)", letterSpacing: "-0.01em",
              color: "var(--fg)", lineHeight: 1.15, margin: 0,
            }}>
              If your media budget runs through Google, Meta, or a DSP, the question has already moved on.
            </h2>
          </Reveal>
        </div>
        <FadeUp delay={120}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.8, margin: "0 0 20px", maxWidth: 560 }}>
            The practice works with brands, agencies, and publishers operating inside an agentic media stack who need analysis that doesn't come from inside it. The question is not whether agentic systems are in your buy. It's whether your infrastructure was built to operate alongside them, and what it costs you when it wasn't.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 32, height: 1, background: "rgba(154,139,71,0.25)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
            }}>Scroll to map the stack</span>
          </div>
        </FadeUp>
      </div>
    </div>
    <style>{`@media (max-width: 760px) { .eco-intro-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
  </section>
);

// ── AudienceSection — three-panel audience filter ────────────────────────
const AUDIENCE_PANELS = [
  {
    label: "Brand",
    heading: "Your agency says it's fine.",
    body: "PMax and Advantage+ are making decisions inside your media buy that your agency can't fully audit. The question is whether your infrastructure was built to work alongside those systems, or whether you're running inside someone else's algorithm with no read on the outcome.",
  },
  {
    label: "Independent agency",
    heading: "Your clients will ask before you're ready.",
    body: "Agentic buying compresses the margin model most independent agencies depend on. The question isn't whether this affects your business. It's whether you have a clear position on the other side of it before your clients ask.",
  },
  {
    label: "Publisher",
    heading: "You're not losing deals. You're being skipped.",
    body: "Agentic systems don't buy the way human traders do. They optimise for structured signals and auction legibility. If your inventory isn't readable to the systems making the decisions, you're not losing deals to a competitor. You're being excluded before the auction starts.",
  },
];

const AudienceSection = () => (
  <section style={{
    background: "var(--bg)",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    padding: "clamp(64px, 9vw, 96px) clamp(24px, 4vw, 96px)",
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <Reveal axis="x" style={{ marginBottom: 14 }}>
        <Label>Where you sit in the shift</Label>
      </Reveal>
      <Reveal axis="x" delay={80}>
        <h2 style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(24px, 2.8vw, 36px)", letterSpacing: "-0.01em",
          color: "var(--fg)", lineHeight: 1.1,
          margin: "0 0 clamp(40px, 5vw, 64px)", maxWidth: 640,
        }}>
          The shift looks different depending on where you sit inside the stack.
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }} className="audience-grid">
        {AUDIENCE_PANELS.map((p, i) => (
          <FadeUp key={i} delay={i * 120}>
            <div style={{
              background: "var(--bg)",
              borderTop: "2px solid var(--gold)",
              padding: "clamp(24px, 3vw, 36px)",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <Label>{p.label}</Label>
              <h3 style={{
                fontFamily: "var(--font-heading)", fontWeight: 600,
                fontSize: "clamp(17px, 1.6vw, 21px)", letterSpacing: "-0.01em",
                color: "var(--fg)", lineHeight: 1.3, margin: 0,
              }}>{p.heading}</h3>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 15,
                color: "var(--fg-muted)", lineHeight: 1.75, margin: 0,
                flex: 1,
              }}>{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 860px) { .audience-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

// ── ChapterGate — full-viewport tonal break between the ecosystem map and thesis ─
// A single Instrument Serif italic statement, no label, no eyebrow.
// The background shifts to a slightly warmer dark to signal a chapter change.
const ChapterGate = () => {
  const ref = React.useRef(null);
  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (rect.top / vh);
      setPct(Math.max(0, Math.min(1, raw)));
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
    <div ref={ref} style={{
      position: "relative",
      minHeight: "24vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#100F0A",
      borderTop: "1px solid rgba(154,139,71,0.12)",
      borderBottom: "1px solid rgba(154,139,71,0.12)",
      overflow: "hidden",
      padding: "clamp(40px, 5vw, 64px) clamp(24px, 6vw, 120px)",
    }}>
      {/* Radial gold haze — grows as the section scrolls into view */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(154,139,71,0.06) 0%, transparent 70%)",
        opacity: pct,
        transition: "opacity 120ms linear",
      }} />

      {/* The statement */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900 }}>
        <Reveal axis="x">
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(28px, 4.2vw, 56px)",
            lineHeight: 1.25, letterSpacing: "-0.025em",
            color: "var(--fg)", margin: 0,
            textWrap: "balance",
          }}>
            The system benefits from your confusion.
          </p>
        </Reveal>
        <Reveal axis="x" delay={180}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--gold)", margin: "32px 0 0",
          }}>
            Sixteen years inside changes what you can see.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

// ── Thesis ────────────────────────────────────────────────────────────────
const Thesis = () => (
  <Section alt screenLabel="home-thesis">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="thesis-grid">
      <div>
        <Reveal axis="x" style={{ marginBottom: 18 }}>
          <Label>The practitioner&rsquo;s thesis</Label>
        </Reveal>
        <Reveal axis="x" delay={80}>
          <blockquote style={{
            fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(22px, 2.6vw, 32px)",
            color: "var(--gold)", lineHeight: 1.38, margin: 0,
            letterSpacing: "-0.015em", maxWidth: 520,
          }}>
            The system benefits from your confusion. Sixteen years inside changes what you can see.
          </blockquote>
        </Reveal>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <FadeUp delay={100}>
          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: "var(--fg)", margin: "0 0 10px", lineHeight: 1.3 }}>
            Every consultancy has platform relationships.
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0, maxWidth: 560 }}>
            Every agency earns margin on what it recommends. The only advice worth having is advice with no stake in the answer. No implementation, no referral fees, no preferred suppliers.
          </p>
        </FadeUp>
        <FadeUp delay={200}>
          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: "var(--fg)", margin: "0 0 10px", lineHeight: 1.3 }}>
            Google, Meta and TTD shape ANZ programmatic.
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0, maxWidth: 560 }}>
            The concentration is unusually high relative to global peers. PMax, Advantage+ and Koa are agentic systems already operating inside your media buy. Your infrastructure was almost certainly not designed for that.
          </p>
        </FadeUp>
      </div>
    </div>
    <style>{`@media (max-width: 880px) { .thesis-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
  </Section>
);

// ── ScaleRecord — editorial ledger layout ────────────────────────────────
// Large mono numerals on left, label + context on right. One per row,
// separated by hairline rules. More editorial than the equal-card SaaS grid.
const STATS = [
  { value: "2550%", label: "Revenue growth",        context: "Yahoo DSP AUSEA, 2019–2025" },
  { value: "60%",   label: "Market share built",    context: "Integral Ad Science ANZ" },
  { value: "16",    label: "Years inside the system", context: "Brand · Agency · Publisher · Adtech" },
  { value: "$0",    label: "Vendor commissions",    context: "No referral fees. Ever." },
];

const ScaleRecord = () => (
  <Section screenLabel="home-scale">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="scale-outer-grid">
      {/* Left: heading block */}
      <div style={{ position: "sticky", top: 80 }}>
        <Reveal axis="x" style={{ marginBottom: 16 }}>
          <Label>The scale record</Label>
        </Reveal>
        <Reveal axis="x" delay={80}>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(26px, 3.2vw, 38px)", letterSpacing: "-0.02em",
            color: "var(--fg)", lineHeight: 1.1, margin: "0 0 28px", textWrap: "balance",
          }}>
            Sixteen years inside the infrastructure of advertising decisions.
          </h2>
        </Reveal>
        <FadeUp delay={140}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: "1px solid var(--border)" }}>
            {[
              { year: "2022–2024", role: "VP Advertising, Afterpay Ads (Block Inc.)", note: "Launched ANZ's first payments-native commerce media product." },
              { year: "2019–2025", role: "Director Commercial & Solutions AUSEA, Yahoo DSP", note: "Led the AUSEA commercial team during 2,550% revenue growth." },
            ].map((r, i) => (
              <div key={i} style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: 6 }}>{r.year}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14, color: "var(--fg)", display: "block", marginBottom: 4, lineHeight: 1.4 }}>{r.role}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.55 }}>{r.note}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Right: stat ledger rows */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {STATS.map((s, i) => (
          <Reveal key={i} axis="y" delay={i * 80}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.6fr",
              gap: "clamp(16px, 3vw, 40px)",
              padding: "clamp(28px, 4vw, 48px) 0",
              borderBottom: "1px solid var(--border)",
              alignItems: "center",
            }}>
              {/* Number — animated counter */}
              <StatCounter value={s.value} label="" context="" />
              {/* Label + context */}
              <div>
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 600,
                  fontSize: "clamp(15px, 1.4vw, 18px)", letterSpacing: "-0.01em",
                  color: "var(--fg)", margin: "0 0 6px", lineHeight: 1.3,
                }}>{s.label}</p>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em",
                  color: "var(--fg-muted)", margin: 0, lineHeight: 1.5,
                }}>{s.context}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 860px) {
        .scale-outer-grid { grid-template-columns: 1fr !important; }
        .scale-outer-grid > div:first-child { position: static !important; }
      }
    `}</style>
  </Section>
);

// ── FlagshipPreview — ledger format ──────────────────────────────────────
const FlagshipPreview = ({ onLearnMore }) => {
  const steps = [
    { n: "01", t: "Diagnostic", d: "Scored 0–20. Risk register. Platform map. Structured entry point or standalone assessment, typically completed in two weeks." },
    { n: "02", t: "Technology Mapping", d: "Structural fit framework against the live agentic platform landscape. Identifies where your infrastructure breaks against each system." },
    { n: "03", t: "Roadmap", d: "Foundation, Integration, Optimisation: sequenced by dependency, not ambition. Built around what's actually possible in your operating context." },
    { n: "04", t: "Advisory Retainer", d: "Standing relationship. Quarterly reviews. On-call analysis when decisions are live. No agenda except the one you bring." },
  ];
  return (
    <Section alt screenLabel="home-flagship">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 72, alignItems: "start" }} className="flagship-grid">
        {/* Left: description */}
        <div>
          <Reveal axis="x" style={{ marginBottom: 18 }}>
            <Label>The flagship engagement</Label>
          </Reveal>
          <Reveal axis="x" delay={80}>
            <h2 style={{
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
              lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.02em",
            }}>
              The Agentic Stack Readiness Program.
            </h2>
          </Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: "0 0 36px" }}>
            A four-component structured engagement, anchored by a scored Diagnostic. Built for organisations operating inside an agentic media stack, where decisioning has already shifted to algorithms and infrastructure has not caught up.
          </p>
          <LinkBtn onClick={onLearnMore}>See the full program <MIcon name="arrow_forward" size={13} /></LinkBtn>
        </div>

        {/* Right: ledger rows */}
        <FadeUp delay={120}>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {steps.map((s, i) => (
              <LedgerRow
                key={s.n}
                number={s.n}
                title={s.t}
                description={s.d}
                isLast={i === steps.length - 1}
                onAction={onLearnMore}
                actionLabel="See details"
              />
            ))}
          </div>
        </FadeUp>
      </div>
      <style>{`@media (max-width: 980px) { .flagship-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </Section>
  );
};

// ── HomeLibrary — staggered asymmetric layout ─────────────────────────────
const HomeLibrary = ({ onAll }) => (
  <Section screenLabel="home-library">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 52 }}>
      <div>
        <Reveal axis="x" style={{ marginBottom: 16 }}>
          <Label>From the library</Label>
        </Reveal>
        <Reveal axis="x" delay={80}>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)",
            lineHeight: 1.06, margin: 0, maxWidth: 720, textWrap: "balance",
            letterSpacing: "-0.02em",
          }}>
            The practitioner&rsquo;s view, in long form.
          </h2>
        </Reveal>
      </div>
      <FadeUp delay={120}>
        <LinkBtn onClick={onAll}>All essays <MIcon name="arrow_forward" size={13} /></LinkBtn>
      </FadeUp>
    </div>

    {/* Staggered: first post larger (2/3), rest equal */}
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 1, background: "var(--border)" }} className="lib-grid">
      {LIBRARY_POSTS.slice(0, 3).map((p, i) => (
        <FadeUp key={i} delay={i * 100}>
          <PostCard post={p} />
        </FadeUp>
      ))}
    </div>
    <style>{`
      @media (max-width: 960px) { .lib-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 640px) { .lib-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </Section>
);

// ── HomePage ──────────────────────────────────────────────────────────────
const HomePage = ({ onNavigate, onEnquire }) => (
  <div>
    <ScrollProgress />
    <HomeHero onEnquire={onEnquire} onSecondary={() => onNavigate("library")} />
    <EcosystemIntro />
    <AudienceSection />
    <PinnedNarrative />
    <ChapterGate />
    <Thesis />
    <ScaleRecord />
    <TimelineSection />
    <FlagshipPreview onLearnMore={() => onNavigate("asrp")} />
    <HomeLibrary onAll={() => onNavigate("library")} />
    <ScopingStrip onEnquire={onEnquire} />
  </div>
);

Object.assign(window, { HomePage });
