// Page: About — Andrew Gilbert / the practice.

// ── OperatorTagRow — gold icon + label for each operator category ─────────
const OPERATOR_TAGS = [
  { label: "Sydney",       icon: "location_on" },
  { label: "Brand",        icon: "domain" },
  { label: "Agency",       icon: "groups" },
  { label: "Publisher",    icon: "article" },
  { label: "Adtech",       icon: "memory" },
  { label: "Payments",     icon: "payments" },
  { label: "Retail Media", icon: "storefront" },
];

const OperatorTagRow = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", marginTop: 14 }}>
    {OPERATOR_TAGS.map((tag, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <MIcon name={tag.icon} size={13} color="var(--gold)" />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--fg-muted)", letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>{tag.label}</span>
      </div>
    ))}
  </div>
);

// ── HeadshotChromaKey — removes blue studio background via canvas ─────────
// Tries the pre-processed nobg.png first; if missing, loads the original JPG,
// pixel-loops to zero out alpha where blue strongly dominates r and g,
// then renders the result as a data URL.
const HeadshotChromaKey = () => {
  const [processedSrc, setProcessedSrc] = React.useState(null);

  const applyChromaKey = React.useCallback((jpgSrc) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const blueExcess = b - Math.max(r, g);
        if (blueExcess > 18 && b > 45) {
          // Smooth fade: fully transparent at blueExcess ≥ 70, partial below
          const t = Math.min(1, (blueExcess - 18) / 52);
          d[i + 3] = Math.round((1 - t) * d[i + 3]);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };
    img.src = jpgSrc;
  }, []);

  if (processedSrc) {
    return (
      <img
        src={processedSrc}
        alt="Andrew Gilbert"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
      />
    );
  }

  return (
    <img
      src="assets/andrew-gilbert-nobg.png"
      alt="Andrew Gilbert"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
      onError={() => applyChromaKey("assets/andrew-gilbert.jpg")}
    />
  );
};

// ── BuySideStackDiagram — D3 agentic layer flow ───────────────────────────
const STACK_NODES = [
  { id: "brands",    label: "Brands",           sub: "Advertiser",    col: 0, row: 0 },
  { id: "data",      label: "Data Platforms",   sub: "Intelligence",  col: 0, row: 1 },
  { id: "agencies",  label: "Agencies",         sub: "Orchestration", col: 1, row: 0 },
  { id: "dsp",       label: "Buying Platforms", sub: "Bid + Budget",  col: 2, row: 0 },
  { id: "ssp",       label: "Supply Platforms", sub: "Yield + Access",col: 3, row: 0 },
  { id: "publishers",label: "Publishers",       sub: "Destination",   col: 4, row: 0 },
];

const STACK_EDGES = [
  { s: "brands",   t: "agencies"  },
  { s: "data",     t: "agencies"  },
  { s: "agencies", t: "dsp"       },
  { s: "dsp",      t: "ssp"       },
  { s: "ssp",      t: "publishers"},
];

function drawBuySideStack(svgEl, W) {
  if (typeof d3 === "undefined" || !svgEl || W < 10) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  const H = 220;
  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);

  const COLS = 5;
  const PAD_X = 16;
  const USABLE_W = W - PAD_X * 2;
  const COL_W = USABLE_W / COLS;
  const NODE_W = Math.min(COL_W * 0.78, 140);
  const NODE_H = 64;
  const ROW_TOP = 30;
  const ROW_BOTTOM = 122;

  // Compute node centres
  const nodePos = {};
  STACK_NODES.forEach(n => {
    const cx = PAD_X + n.col * COL_W + COL_W / 2;
    const cy = n.row === 0 ? ROW_TOP + NODE_H / 2 : ROW_BOTTOM + NODE_H / 2;
    nodePos[n.id] = { cx, cy, x: cx - NODE_W / 2, y: n.row === 0 ? ROW_TOP : ROW_BOTTOM };
  });

  // Agentic layer banner
  const agentBannerY = 8;
  svg.append("rect")
    .attr("x", PAD_X).attr("y", agentBannerY)
    .attr("width", USABLE_W).attr("height", H - agentBannerY - 8)
    .attr("fill", "none")
    .attr("stroke", "rgba(154,139,71,0.10)")
    .attr("stroke-width", 1)
    .attr("rx", 3);

  svg.append("text")
    .attr("x", PAD_X + 10).attr("y", agentBannerY + 17)
    .style("font-family", "var(--font-mono)").style("font-size", "11px")
    .style("font-weight", "700").style("letter-spacing", "0.16em")
    .style("fill", "rgba(154,139,71,0.6)").style("text-transform", "uppercase")
    .text("Agentic layer");

  // Edges
  STACK_EDGES.forEach((edge, i) => {
    const s = nodePos[edge.s];
    const t = nodePos[edge.t];
    if (!s || !t) return;

    const isCross = edge.s === "brands" || edge.s === "data";
    const x1 = isCross ? s.cx + NODE_W / 2 : s.cx + NODE_W / 2;
    const y1 = s.cy;
    const x2 = t.cx - NODE_W / 2;
    const y2 = t.cy;

    if (isCross && edge.s === "data") {
      // Diagonal from data → agencies
      svg.append("path")
        .attr("d", `M ${x1},${y1} C ${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`)
        .attr("fill", "none")
        .attr("stroke", "rgba(154,139,71,0.28)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3 3");
    } else {
      svg.append("line")
        .attr("x1", x1).attr("y1", y1)
        .attr("x2", x2 - 6).attr("y2", y2)
        .attr("stroke", "rgba(154,139,71,0.35)")
        .attr("stroke-width", 1.5);

      // Arrowhead
      svg.append("polygon")
        .attr("points", `${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`)
        .attr("fill", "rgba(154,139,71,0.45)");
    }
  });

  // Nodes
  STACK_NODES.forEach((n, i) => {
    const pos = nodePos[n.id];
    const isFirst = n.id === "brands" || n.id === "data";

    const g = svg.append("g").attr("opacity", reducedMotion ? 1 : 0);

    g.append("rect")
      .attr("x", pos.x).attr("y", pos.y)
      .attr("width", NODE_W).attr("height", NODE_H)
      .attr("fill", isFirst ? "rgba(154,139,71,0.07)" : "rgba(255,255,255,0.03)")
      .attr("stroke", "rgba(154,139,71,0.30)")
      .attr("stroke-width", 1)
      .attr("rx", 2);

    // Top accent
    g.append("rect")
      .attr("x", pos.x).attr("y", pos.y)
      .attr("width", NODE_W).attr("height", 2)
      .attr("fill", "rgba(154,139,71,0.55)")
      .attr("rx", 1);

    g.append("text")
      .attr("x", pos.cx).attr("y", pos.y + 26)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-sans)").style("font-size", W > 600 ? "12px" : "10px")
      .style("font-weight", "600").style("fill", "rgba(240,237,232,0.92)")
      .text(n.label);

    g.append("text")
      .attr("x", pos.cx).attr("y", pos.y + 42)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-mono)").style("font-size", "9px")
      .style("letter-spacing", "0.06em").style("fill", "rgba(154,139,71,0.65)")
      .text(n.sub);

    if (!reducedMotion) {
      g.transition().delay(i * 100).duration(380).attr("opacity", 1);
    }
  });

  // "Buy-side →" label at right
  svg.append("text")
    .attr("x", W - PAD_X - 4).attr("y", ROW_TOP + NODE_H / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-family", "var(--font-mono)").style("font-size", "8px")
    .style("letter-spacing", "0.12em").style("fill", "rgba(154,139,71,0.35)")
    .text("buy-side →");
}

const BuySideStackDiagram = () => {
  const wrapRef = React.useRef(null);
  const svgRef  = React.useRef(null);
  const active  = React.useRef(false);

  const redraw = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el || !active.current) return;
    drawBuySideStack(svgRef.current, el.getBoundingClientRect().width);
  }, []);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || active.current) return;
      active.current = true;
      redraw();
      obs.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px 120px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [redraw]);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => redraw());
    ro.observe(el);
    return () => ro.disconnect();
  }, [redraw]);

  return (
    <div style={{
      padding: "clamp(16px, 3vw, 28px)",
      border: "1px solid var(--border)",
      background: "var(--bg)",
      borderRadius: 2,
      overflow: "hidden",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "rgba(154,139,71,0.7)", margin: "0 0 16px",
      }}>The buy-side stack · agentic layer</p>
      <div ref={wrapRef} style={{ width: "100%", lineHeight: 0 }}>
        <svg
          ref={svgRef}
          style={{ display: "block", width: "100%", overflow: "visible" }}
          aria-label="The agentic buy-side stack: Brands and Data Platforms connecting through Agencies, Buying Platforms, Supply Platforms to Publishers"
        />
      </div>
    </div>
  );
};

const AboutHero = () => (
  <PageHero
    eyebrow="About"
    title="Sixteen years inside the systems that decide. Now operating outside them."
    lead="Systems That Decide is the independent advisory practice of Andrew Gilbert. The practice exists for one reason: to provide structural clarity to organisations operating inside an agentic media stack, with no commercial conflict in the analysis."
  />
);

const Operator = () => (
  <Section screenLabel="about-operator">
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) 1.2fr", gap: 64, alignItems: "start" }} className="operator-grid">
      <FadeUp>
        <div style={{ position: "relative", aspectRatio: "4 / 5", background: "var(--bg)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <HeadshotChromaKey />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(13,13,13,0.7) 100%)" }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Label tone="muted" style={{ marginBottom: 8 }}>Founder</Label>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, color: "var(--fg)", margin: 0, lineHeight: 1.2, letterSpacing: 0 }}>Andrew Gilbert</h3>
          <OperatorTagRow />
        </div>
      </FadeUp>
      <div>
        <Reveal axis="x" style={{ marginBottom: 16 }}>
          <Label>The operator&rsquo;s view</Label>
        </Reveal>
        <Reveal axis="x" delay={80}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.01em", textWrap: "balance" }}>
            What sixteen years inside changes about what you can see.
          </h2>
        </Reveal>
        <FadeUp delay={160}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.75, margin: "0 0 18px" }}>
            Most analysis of the agentic shift is written from outside the systems. Read by people who have never run a P&amp;L against them. The structural mechanics, the commercial incentives, the way contracts and product roadmaps actually get written, are largely missing from public discussion.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.75, margin: "0 0 18px" }}>
            The practice exists in that gap. The work is to translate sixteen years of operating decisions into clarity for the people now making them. The advice is direct. The analysis travels with the engagement, not the relationship.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
            That position is structural. The practice does not implement, does not resell, does not earn a referral on what it recommends. There is no platform partnership to defend. No vendor margin in the answer.
          </p>
        </FadeUp>
      </div>
    </div>
    <style>{`
      @media (max-width: 880px) { .operator-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
    `}</style>
  </Section>
);

const ScaleSection = () => (
  <Section alt screenLabel="about-scale">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The scale record</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
        Operator-level work across the buy-side, sell-side and payments-native commerce media.
      </h2>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 64 }}>
      <FadeUp><StatCounter value="2550%" label="Revenue growth" context="Yahoo DSP AUSEA, 2019–2025" /></FadeUp>
      <FadeUp delay={120}><StatCounter value="60%" label="Market share built" context="Integral Ad Science ANZ" /></FadeUp>
      <FadeUp delay={240}><StatCounter value="16" label="Years inside the system" context="Six categories of operator role" /></FadeUp>
    </div>

    <FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="role-grid">
        <FeaturedCard label="2022–2024" title="VP Advertising · Afterpay Ads (Block Inc.)"
          body="Launched the first payments-native commerce media product in ANZ. Designed the commercial model end to end and built the operating function that ran it." accent />
        <FeaturedCard label="2019–2025" title="Director Commercial & Solutions AUSEA · Yahoo DSP"
          body="Led the AUSEA commercial team across Australia, NZ and South-East Asia during 2,550% revenue growth. Senior operator across DSP, retail media and measurement." accent />
      </div>
      <style>{`@media (max-width: 720px) { .role-grid { grid-template-columns: 1fr !important; } }`}</style>
    </FadeUp>

    <FadeUp delay={120}>
      <div style={{ marginTop: 32, padding: "32px 0", borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline" }} className="prior-grid">
        <Label tone="muted">Prior</Label>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0, maxWidth: 820 }}>
          Helped build Integral Ad Science in ANZ to roughly 60% market share. Senior commercial roles across publisher and adtech, and earlier work on the agency and brand side. Six categories of operator role across the same set of systems.
        </p>
      </div>
      <style>{`@media (max-width: 720px) { .prior-grid { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
    </FadeUp>
  </Section>
);

const IndependenceModel = () => (
  <Section screenLabel="about-independence">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The independence model</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 920, letterSpacing: "-0.02em", textWrap: "balance" }}>
        Independence is not a claim. It is a model with no contracts pointing the other way.
      </h2>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 56 }}>
      {[
        { t: "No implementation work", d: "The practice does not run media, configure platforms or stand up infrastructure. Recommendations are not a path to a build engagement." },
        { t: "No vendor relationships", d: "No platform partnerships. No reseller margin. No certification revenue. No co-marketing arrangements with the systems being evaluated." },
        { t: "No referral fees", d: "No commission on what is recommended, named or unnamed. The analysis ends where the document ends. The next conversation is yours to have." },
      ].map((c, i) => (
        <FadeUp key={i} delay={i * 100}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)", padding: 32, height: "100%" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 22, color: "var(--fg)", margin: "0 0 14px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>{c.t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{c.d}</p>
          </div>
        </FadeUp>
      ))}
    </div>
    <FadeUp>
      <PullQuote attribution="The mandate quote">
        The analysis is the product. I am not incentivised by what you buy next, but by how well you understand what you already have.
      </PullQuote>
    </FadeUp>
  </Section>
);

const AdvisoryModel = () => (
  <Section alt screenLabel="about-advisory-model">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The advisory model</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
        How an engagement actually runs. What you own at the end.
      </h2>
    </Reveal>
    <FadeUp delay={160}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 56px", maxWidth: 720 }}>
        A short, structural read. Designed to make a CMO confident they understand what they are buying before they call.
      </p>
    </FadeUp>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="advisory-cols">
      <FadeUp>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 24, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>Scoping conversation</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
          A 30-minute call. The aim is to establish whether an engagement is the right starting point and which one. We discuss what you are trying to decide, what is already in motion, who else is around the table. There is no quote at the end of the call, no commitment, no follow-up sales process.
        </p>
      </FadeUp>
      <FadeUp delay={120}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 24, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>What you own at the end</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
          You own the document, the framework, the risk register, the analysis. It is yours to share with the board, the agency, the platform, the deal team. There is no licensing, no follow-on subscription required to use what you commissioned. The analysis is not retained behind a portal.
        </p>
      </FadeUp>
      <FadeUp delay={240}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 24, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>Where the work happens</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
          Closed-room sessions with the people who decide. Pre-work and findings happen async. The cadence is calibrated to the engagement type: short and dense for the Diagnostic, sustained and quarterly for retainer relationships, focused and time-boxed for transaction work.
        </p>
      </FadeUp>
      <FadeUp delay={360}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 24, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>What ends, what continues</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
          A defined-scope engagement ends when the document is delivered. A retainer continues monthly with a six-month minimum. There is no auto-renewing contract. No notice period structured to make leaving expensive.
        </p>
      </FadeUp>
    </div>
    <style>{`@media (max-width: 880px) { .advisory-cols { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
  </Section>
);

// ── StackDiagram — shows the six-entity buy-side structure ───────────────
const StackDiagram = () => (
  <Section alt screenLabel="about-stack-diagram">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The buy-side structure</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(26px, 3.4vw, 38px)", color: "var(--fg)",
        lineHeight: 1.1, margin: "0 0 14px", maxWidth: 800, letterSpacing: "-0.02em", textWrap: "balance",
      }}>
        Six entities. One flow. Sixteen years of operating across all of them.
      </h2>
    </Reveal>
    <FadeUp delay={160}>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)",
        lineHeight: 1.75, margin: "0 0 36px", maxWidth: 680,
      }}>
        The agentic shift is not uniform across this stack. Each entity is restructuring differently.
        Brands face a parsability problem. Agencies face a margin problem. DSPs face a routing problem.
        The analysis is grounded in having operated inside each layer.
      </p>
    </FadeUp>
    <FadeUp delay={80}>
      <BuySideStackDiagram />
    </FadeUp>
  </Section>
);

const AboutPage = ({ onEnquire }) => (
  <div data-screen-label="About">
    <AboutHero />
    <Operator />
    <StackDiagram />
    <ScaleSection />
    <IndependenceModel />
    <AdvisoryModel />
    <ScopingStrip onEnquire={onEnquire} headline="If you want an independent view, a scoping call is the starting point." body="30 minutes. Andrew responds within one business day. No commitment, no quote at the end of the call." />
  </div>
);

Object.assign(window, { AboutPage });
