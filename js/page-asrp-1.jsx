// Page: ASRP — flagship product page with interactive 5-question self-assessment.

const ENTRY_POINTS = [
  { n: "01", t: "Decision in front of you", d: "About to make a significant platform call. DSP, data infrastructure, clean room, in-house shift. A vendor across the table. You need an independent view before you commit." },
  { n: "02", t: "Stack you cannot map", d: "The media stack has grown in ways nobody fully understands. Agency relationships changed. Integrations accumulated. People moved on. You need a map, a risk register, and a clear account of where you are locked in." },
  { n: "03", t: "Agentic systems already inside", d: "PMax, Advantage+ and Koa are operating inside your media buy. You want to know whether your infrastructure was designed for that, or whether it hands them authority by default." },
];

const ASRPHero = ({ onScrollToAssessment }) => (
  <section style={{ position: "relative", padding: "clamp(96px, 14vw, 168px) 24px clamp(56px, 8vw, 96px)", overflow: "hidden", background: "var(--bg)" }}>
    <HeroDotGrid />
    <Watermark size="64vw" opacity={0.04} style={{ right: "-20vw", top: "-10vh" }} />
    <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <FadeUp><Label style={{ marginBottom: 24 }}>The Agentic Stack Readiness Program</Label></FadeUp>
      <FadeUp delay={120}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(40px, 6.4vw, 76px)", lineHeight: 1.04, letterSpacing: "-0.005em",
          color: "var(--fg)", margin: "0 0 24px", maxWidth: 1120, textWrap: "balance",
        }}>
          A structured engagement for organisations whose media stack is already running on agentic systems.
        </h1>
      </FadeUp>
      <FadeUp delay={240}>
        <p style={{
          fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "clamp(17px, 1.4vw, 21px)",
          color: "var(--fg)", lineHeight: 1.55, maxWidth: 880, margin: "0 0 40px",
        }}>
          Built for ANZ agencies and brand-side teams operating media at scale. Anchored by a scored Diagnostic. Vendor-neutral by structure, not by claim.
        </p>
      </FadeUp>
      <FadeUp delay={360}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <PrimaryBtn onClick={onScrollToAssessment}>Take the 90-second self-assessment <MIcon name="arrow_forward" size={16} /></PrimaryBtn>
          <SecondaryBtn href="#components" onClick={(e) => { e.preventDefault(); document.getElementById("components")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>See the four components</SecondaryBtn>
        </div>
      </FadeUp>
    </div>
  </section>
);

const EntryPoints = () => (
  <Section alt screenLabel="asrp-entry">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>Three places this engagement starts</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--fg)", lineHeight: 1.15, margin: "0 0 56px", maxWidth: 800, letterSpacing: "-0.02em", textWrap: "balance" }}>
        Most clients arrive in one of three positions.
      </h2>
    </Reveal>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
      {ENTRY_POINTS.map((e, i) => (
        <FadeUp key={i} delay={i * 100}>
          <div style={{
            background: "var(--gold-tint-08)", border: "1px solid var(--gold-tint-20)",
            padding: 32, height: "100%", boxSizing: "border-box",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", color: "var(--gold)" }}>{e.n}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, color: "var(--fg)", margin: 0, lineHeight: 1.25 }}>{e.t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{e.d}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

// ── Four components ─────────────────────────────────────────────────────
const ComponentCard = ({ num, name, isPrereq, oneLine, what, receive, structure, prereq }) => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderTop: isPrereq ? "2px solid var(--gold)" : "1px solid var(--border)",
    padding: "clamp(28px, 3.5vw, 44px)",
    display: "grid", gridTemplateColumns: isPrereq ? "minmax(0, 1.1fr) 1fr" : "1fr",
    gap: isPrereq ? 48 : 0,
  }} className={isPrereq ? "comp-flagship" : ""}>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: "0.2em", color: "var(--gold)" }}>{num}</span>
        {isPrereq && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-stat)", background: "var(--gold-tint-08)", border: "1px solid var(--gold-tint-30)", padding: "4px 10px" }}>Entry point · prerequisite</span>}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: isPrereq ? "clamp(26px, 3vw, 36px)" : 24, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: 0 }}>{name}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: isPrereq ? 18 : 16, fontWeight: 500, color: "var(--fg)", lineHeight: 1.6, margin: "0 0 12px" }}>{oneLine}</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{what}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: isPrereq ? 0 : 28, marginTop: isPrereq ? 0 : 24, borderTop: isPrereq ? "none" : "1px solid var(--border)" }}>
      <div>
        <Label tone="muted" style={{ marginBottom: 10 }}>What you receive</Label>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {receive.map((r, i) => (
            <li key={i} style={{ display: "flex", gap: 10, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.5 }}>
              <span style={{ color: "var(--gold)", marginTop: 2 }}>·</span><span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label tone="muted" style={{ marginBottom: 10 }}>Engagement structure</Label>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>{structure}</p>
      </div>
      {prereq && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
          Requires Diagnostic
        </p>
      )}
    </div>
    <style>{`
      @media (max-width: 920px) {
        .comp-flagship { grid-template-columns: 1fr !important; gap: 28px !important; }
      }
    `}</style>
  </div>
);

// ── ComponentSequenceDiagram — D3 horizontal process flow ────────────────
const COMP_STEPS = [
  { n: "01", label: "Agentic Readiness\nDiagnostic", tag: "Entry point · prerequisite", gold: true },
  { n: "02", label: "Technology\nMapping", tag: "Built on Diagnostic findings", gold: false },
  { n: "03", label: "The\nRoadmap", tag: "Sequenced by dependency", gold: false },
  { n: "04", label: "Advisory\nRetainer", tag: "Standing relationship", gold: false },
];

function drawComponentSequence(svgEl, W) {
  if (typeof d3 === "undefined" || !svgEl || W < 10) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  const H = 188;
  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);

  const PAD_X = 12;
  const TOTAL_W = W - PAD_X * 2;
  const N = COMP_STEPS.length;
  const ARROW_W = Math.min(40, TOTAL_W * 0.06);
  const BOX_W = (TOTAL_W - ARROW_W * (N - 1)) / N;
  const BOX_H = 96;
  const BOX_Y = (H - BOX_H) / 2;

  COMP_STEPS.forEach((step, i) => {
    const bx = PAD_X + i * (BOX_W + ARROW_W);

    const g = svg.append("g").attr("opacity", reducedMotion ? 1 : 0);

    // Box background
    g.append("rect")
      .attr("x", bx).attr("y", BOX_Y)
      .attr("width", BOX_W).attr("height", BOX_H)
      .attr("fill", step.gold ? "rgba(154,139,71,0.10)" : "rgba(255,255,255,0.03)")
      .attr("stroke", step.gold ? "rgba(154,139,71,0.55)" : "rgba(255,255,255,0.10)")
      .attr("stroke-width", step.gold ? 1.5 : 1)
      .attr("rx", 2);

    // Top accent bar on node 01
    if (step.gold) {
      g.append("rect")
        .attr("x", bx).attr("y", BOX_Y)
        .attr("width", BOX_W).attr("height", 2)
        .attr("fill", "rgba(154,139,71,0.7)")
        .attr("rx", 1);
    }

    // Number
    g.append("text")
      .attr("x", bx + 14).attr("y", BOX_Y + 22)
      .style("font-family", "var(--font-mono)").style("font-size", "10px")
      .style("font-weight", "700").style("letter-spacing", "0.18em")
      .style("fill", "rgba(154,139,71,0.9)")
      .text(step.n);

    // Label — split on \n
    const lines = step.label.split("\n");
    lines.forEach((line, li) => {
      g.append("text")
        .attr("x", bx + 14).attr("y", BOX_Y + 42 + li * 18)
        .style("font-family", "var(--font-sans)").style("font-size", W > 700 ? "13px" : "11px")
        .style("font-weight", "600").style("fill", "rgba(240,237,232,0.92)")
        .text(line);
    });

    // Tag line
    if (W > 480) {
      g.append("text")
        .attr("x", bx + 14).attr("y", BOX_Y + BOX_H - 14)
        .style("font-family", "var(--font-mono)").style("font-size", "9px")
        .style("letter-spacing", "0.04em")
        .style("fill", step.gold ? "rgba(154,139,71,0.75)" : "rgba(255,255,255,0.28)")
        .text(step.tag);
    }

    // Arrow to next
    if (i < N - 1) {
      const ax = bx + BOX_W;
      const ay = H / 2;
      const arrowEnd = ax + ARROW_W;

      svg.append("line")
        .attr("x1", ax + 4).attr("y1", ay)
        .attr("x2", arrowEnd - 8).attr("y2", ay)
        .attr("stroke", "rgba(154,139,71,0.35)")
        .attr("stroke-width", 1.5)
        .attr("opacity", reducedMotion ? 1 : 0)
        .transition().delay(i * 120 + 80).duration(300).attr("opacity", 1);

      // Arrowhead
      svg.append("polygon")
        .attr("points", `${arrowEnd - 8},${ay - 5} ${arrowEnd},${ay} ${arrowEnd - 8},${ay + 5}`)
        .attr("fill", "rgba(154,139,71,0.45)")
        .attr("opacity", reducedMotion ? 1 : 0)
        .transition().delay(i * 120 + 80).duration(300).attr("opacity", 1);
    }

    // Staggered fade-in
    if (!reducedMotion) {
      g.transition().delay(i * 120).duration(400).attr("opacity", 1);
    }
  });

  // Dependency note below arrow between 01 and 02
  if (W > 560) {
    const depX = PAD_X + BOX_W + ARROW_W / 2;
    svg.append("text")
      .attr("x", depX).attr("y", BOX_Y + BOX_H + 30)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-mono)").style("font-size", "11px")
      .style("font-weight", "700").style("letter-spacing", "0.10em")
      .style("fill", "rgba(154,139,71,0.7)")
      .text("02 · 03 · 04 require 01");
  }
}

const ComponentSequenceDiagram = () => {
  const wrapRef = React.useRef(null);
  const svgRef  = React.useRef(null);
  const active  = React.useRef(false);

  const redraw = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el || !active.current) return;
    drawComponentSequence(svgRef.current, el.getBoundingClientRect().width);
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
      marginBottom: 56,
      padding: "clamp(20px, 3vw, 36px) clamp(16px, 4vw, 40px) clamp(24px, 3vw, 40px)",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderTop: "2px solid rgba(154,139,71,0.4)",
      borderRadius: 2,
      overflow: "hidden",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(154,139,71,0.55)", margin: "0 0 20px",
      }}>Component sequence</p>
      <div ref={wrapRef} style={{ width: "100%", lineHeight: 0 }}>
        <svg ref={svgRef} style={{ display: "block", width: "100%", overflow: "visible" }} aria-label="The four ASRP components shown as a sequential process flow: Diagnostic → Technology Mapping → Roadmap → Advisory Retainer" />
      </div>
    </div>
  );
};

const FourComponents = () => (
  <Section id="components" screenLabel="asrp-components">
    <Reveal axis="x" style={{ marginBottom: 16 }}>
      <Label>The four components</Label>
    </Reveal>
    <Reveal axis="x" delay={80}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 24px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
        One sequenced engagement. Diagnostic first. Everything else builds from that finding.
      </h2>
    </Reveal>
    <FadeUp delay={160}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 40px", maxWidth: 720 }}>
        The Diagnostic is standalone or prerequisite. Components two, three and four cannot start without it. The findings shape what comes next, in that order.
      </p>
    </FadeUp>

    {/* Process flow diagram — D3 component sequence */}
    <FadeUp delay={80}>
      <ComponentSequenceDiagram />
    </FadeUp>

    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <FadeUp>
        <ComponentCard
          num="01" name="The Agentic Readiness Diagnostic" isPrereq
          oneLine="A scored assessment across five dimensions, delivered as a structured findings report."
          what="The Diagnostic establishes a baseline. It tells you where your infrastructure stands today, where the immediate exposures are, and what the dependency map actually looks like across vendors, agencies and platforms."
          receive={[
            "Scored readiness report (0–20)",
            "Risk register, ranked by severity and time horizon",
            "Platform dependency map across DSPs, ad servers, data infrastructure and clean rooms",
          ]}
          structure="Pre-work questionnaire (60–90 minutes) · Two working sessions (90 minutes each) · One findings review (60 minutes) · Branded PDF report within 10 business days."
        />
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24 }}>
        <FadeUp delay={100}>
          <ComponentCard
            num="02" name="Technology Mapping"
            oneLine="Structural fit framework applied to the current agentic platform landscape."
            what="Not a vendor ranking. The output is a procurement-grade evaluation, framed by your specific risk register and built to survive a procurement process where every vendor will claim every capability."
            receive={[
              "Evaluation criteria derived from Diagnostic findings",
              "Platform landscape map across DSPs, agentic buying, clean rooms and measurement",
              "Procurement readiness brief",
            ]}
            structure="Targeted research phase · One working session · Written brief delivered within 15 business days."
            prereq
          />
        </FadeUp>
        <FadeUp delay={200}>
          <ComponentCard
            num="03" name="The Roadmap"
            oneLine="Phased blueprint: Foundation, Integration, Optimisation. Sequenced by dependency."
            what="Foundation covers 0 to 6 months. Integration covers 6 to 18. Optimisation covers 18 to 36. The roadmap names what to build, what to buy, what to retire, and in what order. STD advises on construction, not execution."
            receive={[
              "36-month phased roadmap",
              "Build versus buy framework, applied to your stack",
              "Vendor selection guide, by phase",
            ]}
            structure="Three working sessions across four weeks · Roadmap document and one executive readout."
            prereq
          />
        </FadeUp>
        <FadeUp delay={300}>
          <ComponentCard
            num="04" name="Ongoing Advisory Retainer"
            oneLine="Monthly retainer for organisations that want a standing independent view on the moving market."
            what="Tailored to your live risk register and roadmap. Calibrated to where the actual decisions sit. Six-month minimum. The retainer is a relationship, not a deliverable schedule."
            receive={[
              "Quarterly roadmap review",
              "Monthly market briefing",
              "On-call async access (4 hours per month, 24-hour business response)",
              "One additional working session per quarter",
            ]}
            structure="Monthly cadence · Six-month minimum · Renews quarterly thereafter."
            prereq
          />
        </FadeUp>
      </div>
    </div>
  </Section>
);

Object.assign(window, { ENTRY_POINTS, ASRPHero, EntryPoints, ComponentSequenceDiagram, FourComponents });
