// Agentic Readiness Diagnostic — survey engine.
// Self-mounts into #app (bypasses the bootstrap.jsx Shell — this page
// needs a focused, full-bleed UI, same as the original prototype).
//
// Auth: trusts the existing portal session (sessionStorage.std_portal_auth)
// rather than rendering the prototype's own login screen. If there's no
// valid session, we redirect to login.html; if the diagnostic is already
// marked complete for this client, we redirect to portal.html.
//
// Question/copy data, scoring-relevant IDs, and the Formspree payload shape
// are unchanged from the original prototype so the admin scoring tool keeps
// working against the same field names.

// TODO (confirm before launch): this endpoint ID is carried over unchanged
// from the original prototype, where it was commented "Formspree endpoint
// (live)". Confirm in the Formspree dashboard that form xbdvrkzz is the one
// connected to Andrew's account and the inbox that should receive diagnostic
// submissions, not a placeholder/test form from the prototype build. See
// deployment notes for the full pre-launch checklist.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdvrkzz";

// ---------------------------------------------------------------
// Pure data helpers (ported from the prototype's vanilla-JS engine)
// ---------------------------------------------------------------

function pltKey(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase().slice(0, 24);
}

function makePlatformQ(tmpl, platform, platformIdx) {
  const key = pltKey(platform);
  const repl = (s) => s.replace(/\{platform\}/g, platform);
  return Object.assign({}, tmpl, {
    id: "plt_" + key + "_" + tmpl._qNum,
    text: repl(tmpl.text),
    options: tmpl.options.map(repl),
    _platform: platform,
    _platformIdx: platformIdx,
    _isPlatformQ: true,
  });
}

function makeGateQ(selectedPlatforms) {
  return {
    id: "ctx_5_sig",
    text: "You selected quite a few platforms. Which of these are significant to your business — meaning they account for meaningful ongoing budget or client spend? (Select all that apply. The following questions will only cover the platforms you select here.)",
    type: "checkbox",
    required: true,
    options: selectedPlatforms,
    _isGate: true,
  };
}

function getDiagnostic(diagnosticType) {
  const D = window.STD_DATA;
  if (!diagnosticType || !D) return null;
  return {
    context: diagnosticType === "brand" ? D.BRAND_CONTEXT : D.AGENCY_CONTEXT,
    dimensions: diagnosticType === "brand" ? D.BRAND_DIMENSIONS : D.AGENCY_DIMENSIONS,
  };
}

function buildSteps(diagnosticType, answers) {
  const d = getDiagnostic(diagnosticType);
  if (!d) return [];
  const steps = [];
  steps.push({ kind: "intro", key: "context", dimNumber: 0, section: d.context });

  d.context.questions.forEach((q) => {
    steps.push({ kind: "question", key: "context", section: d.context, q });

    if (q.id === "ctx_5") {
      const selected = [].concat(answers["ctx_5"] || []);
      const isMany = selected.length >= 6;

      if (isMany) {
        const gateQ = makeGateQ(selected);
        steps.push({ kind: "question", key: "context", section: d.context, q: gateQ });
      }

      const gateAnswered = [].concat(answers["ctx_5_sig"] || []);
      const active = isMany && gateAnswered.length ? gateAnswered : selected;

      if (active.length) {
        const blockTemplate =
          diagnosticType === "agency"
            ? window.STD_DATA.PLATFORM_BLOCK_AGENCY || []
            : window.STD_DATA.PLATFORM_BLOCK_BRAND || [];

        active.forEach((platform, idx) => {
          steps.push({ kind: "platform-intro", key: "context", platform, platformIdx: idx, total: active.length });
          blockTemplate.forEach((tmpl) => {
            steps.push({ kind: "question", key: "context", section: d.context, q: makePlatformQ(tmpl, platform, idx) });
          });
        });
      }
    }
  });

  d.dimensions.forEach((dim) => {
    steps.push({ kind: "intro", key: dim.number, dimNumber: dim.number, section: dim });
    dim.questions.forEach((q) => steps.push({ kind: "question", key: dim.number, section: dim, q }));
  });
  steps.push({ kind: "review" });
  return steps;
}

function totalQuestions(steps) {
  return steps.filter((s) => s.kind === "question").length;
}
function questionOrdinal(steps, idx) {
  let n = 0;
  for (let i = 0; i <= idx && i < steps.length; i++) if (steps[i].kind === "question") n++;
  return n;
}
function questionsCompletedBefore(steps, idx) {
  let n = 0;
  for (let i = 0; i < idx && i < steps.length; i++) if (steps[i].kind === "question") n++;
  return n;
}
function prettyQId(id) {
  return id.replace("ctx_", "0.").replace("d", "").replace("_", ".");
}
function isAnswered(q, answers) {
  const v = answers[q.id];
  if (q.type === "checkbox") return v && v.length > 0;
  return v && v.toString().trim() !== "";
}

// ---------------------------------------------------------------
// Component
// ---------------------------------------------------------------

const DiagnosticPage = () => {
  const [ready, setReady] = React.useState(false);
  const [diag, setDiag] = React.useState(null);
  const [navDir, setNavDir] = React.useState("fwd");
  const [showErr, setShowErr] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [cheerLine, setCheerLine] = React.useState("");
  const [cheerFlash, setCheerFlash] = React.useState(false);
  const advanceTimerRef = React.useRef(null);
  // Mirrors `diag` for handlers that fire from a setTimeout (e.g. the
  // auto-advance after a radio click) — those closures are pinned to the
  // render that scheduled them, so without this ref they'd validate
  // against answers from BEFORE the just-saved click, not after.
  const diagRef = React.useRef(null);
  React.useEffect(() => { diagRef.current = diag; }, [diag]);

  // Validate session, then seed (or resume) the diagnostic's own state.
  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem("std_portal_auth");
      if (!raw) { window.location.replace("login.html"); return; }
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.code || !parsed.name) { window.location.replace("login.html"); return; }
      if (Date.now() - (parsed.authenticatedAt || 0) > 8 * 60 * 60 * 1000) {
        sessionStorage.removeItem("std_portal_auth");
        window.location.replace("login.html");
        return;
      }
      if (parsed.diagnosticComplete) { window.location.replace("portal.html"); return; }

      let initial = {
        phase: "type",
        diagnosticType: null,
        stepIndex: 0,
        answers: {},
        seenThresholds: [],
        submitting: false,
      };
      try {
        const savedRaw = sessionStorage.getItem("std_diag_state");
        if (savedRaw) {
          const saved = JSON.parse(savedRaw);
          if (saved && saved.clientCode === parsed.code && saved.phase && saved.phase !== "complete") {
            initial = Object.assign(initial, saved);
          }
        }
      } catch (e) {}
      initial.clientCode = parsed.code;
      initial.clientName = parsed.name;

      setDiag(initial);
      setReady(true);
    } catch (e) {
      window.location.replace("login.html");
    }
  }, []);

  // Persist on every change.
  React.useEffect(() => {
    if (!diag) return;
    try { sessionStorage.setItem("std_diag_state", JSON.stringify(diag)); } catch (e) {}
  }, [diag]);

  const steps = diag && diag.phase === "flow" ? buildSteps(diag.diagnosticType, diag.answers) : [];
  const currentStep = steps[diag && diag.stepIndex] || null;
  const total = totalQuestions(steps);

  let done = 0, label = "", isQuestionStep = false;
  if (diag && diag.phase === "flow" && currentStep) {
    const d = getDiagnostic(diag.diagnosticType);
    if (currentStep.kind === "question") {
      isQuestionStep = true;
      done = questionOrdinal(steps, diag.stepIndex);
      label = currentStep.key === "context" ? "Background" : `Dimension ${d.dimensions[currentStep.key - 1].number} · ${d.dimensions[currentStep.key - 1].short}`;
    } else if (currentStep.kind === "intro" || currentStep.kind === "platform-intro") {
      done = questionsCompletedBefore(steps, diag.stepIndex);
      label = currentStep.kind === "intro"
        ? (currentStep.dimNumber === 0 ? "Background" : `Dimension ${currentStep.dimNumber} of 6`)
        : "Background";
    } else { // review
      done = total; label = "Review & submit";
    }
  }
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Threshold cheers + rotating encouragement line.
  React.useEffect(() => {
    if (!diag || diag.phase !== "flow" || !currentStep) return;
    const COPY = window.STD_DATA.STD_COPY;
    let flashLine = null;
    if (currentStep.kind === "question") {
      for (const t of COPY.thresholds) {
        if (pct >= t.at && !diag.seenThresholds.includes(t.at)) {
          flashLine = t.line;
          setDiag((d) => (d.seenThresholds.includes(t.at) ? d : { ...d, seenThresholds: [...d.seenThresholds, t.at] }));
        }
      }
      if (questionOrdinal(steps, diag.stepIndex) === total) flashLine = COPY.lastQuestionLine;
    }
    if (flashLine) {
      setCheerLine(flashLine);
      setCheerFlash(false);
      requestAnimationFrame(() => setCheerFlash(true));
    } else {
      setCheerFlash(false);
      const idx = currentStep.kind === "question" ? questionOrdinal(steps, diag.stepIndex) : 0;
      setCheerLine(COPY.rotating[idx % COPY.rotating.length]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diag && diag.stepIndex, diag && diag.phase]);

  // Scroll to top + focus first textarea on step change.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (diag && diag.phase === "flow" && currentStep && currentStep.kind === "question" && currentStep.q.type === "textarea") {
      const el = document.getElementById("ta_" + currentStep.q.id);
      if (el) setTimeout(() => el.focus(), 120);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diag && diag.phase, diag && diag.stepIndex]);

  // Keyboard: Enter to continue, number keys to pick options.
  // Hoisted above the loading-state early return below — every hook in this
  // component must run unconditionally on every render (including the
  // "Verifying session…" render where ready/diag are still null), otherwise
  // React throws "Rendered more hooks than during the previous render" the
  // moment the session check resolves and the component renders one hook
  // fewer than before. No dependency array is intentional: the listener is
  // torn down and re-added every render so its closure always sees the
  // current diag/steps/goNext/selectRadio/toggleCheckbox, this guards
  // against the loading render too (diag is null then, so the early
  // `if (!diag...)` inside onKeyDown bails before touching anything that
  // hasn't been defined yet in this render).
  React.useEffect(() => {
    function onKeyDown(e) {
      if (!diag || diag.phase !== "flow") return;
      const step = steps[diag.stepIndex];
      if (!step) return;
      const inText = ["TEXTAREA", "INPUT"].includes(document.activeElement.tagName);
      if (e.key === "Enter" && !inText) {
        e.preventDefault();
        if (step.kind === "intro" || step.kind === "platform-intro" || step.kind === "question") goNext();
      }
      if (step.kind === "question" && (step.q.type === "radio" || step.q.type === "checkbox") && !inText) {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= step.q.options.length) {
          const opt = step.q.options[n - 1];
          if (step.q.type === "radio") selectRadio(step.q, opt);
          else toggleCheckbox(step.q, opt);
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  if (!ready || !diag) {
    return (
      <div className="verify-msg"><p>Verifying session…</p></div>
    );
  }

  const saveAnswer = (qid, val) => setDiag((d) => ({ ...d, answers: { ...d.answers, [qid]: val } }));

  const selectType = (t) => setDiag((d) => ({ ...d, diagnosticType: t }));
  const handleTypeNext = () => {
    if (!diag.diagnosticType) return;
    setNavDir("fwd");
    setDiag((d) => ({ ...d, phase: "flow", stepIndex: 0 }));
  };

  const goNext = () => {
    // Guard against the rare double-advance: a manual "Continue" click
    // landing while a radio auto-advance timer is still pending.
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    // Read from diagRef, not the outer `diag` closure — selectRadio's
    // deferred auto-advance call reaches this function after a state
    // update it just triggered, and the closure must see that update.
    const d = diagRef.current || diag;
    const curSteps = buildSteps(d.diagnosticType, d.answers);
    const step = curSteps[d.stepIndex];
    if (step && step.kind === "question") {
      if (step.q.required && !isAnswered(step.q, d.answers)) { setShowErr(true); return; }
    }
    setShowErr(false);
    setNavDir("fwd");
    const nextIndex = Math.min(d.stepIndex + 1, curSteps.length - 1);
    setTimeout(() => setDiag((dd) => ({ ...dd, stepIndex: nextIndex })), 120);
  };

  const handleBack = () => {
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    setShowErr(false);
    if (diag.phase === "type") { window.location.href = "portal.html"; return; }
    if (diag.phase !== "flow") return;
    setNavDir("back");
    if (diag.stepIndex === 0) {
      setTimeout(() => setDiag((d) => ({ ...d, phase: "type" })), 120);
    } else {
      const prevIndex = Math.max(0, diag.stepIndex - 1);
      setTimeout(() => setDiag((d) => ({ ...d, stepIndex: prevIndex })), 120);
    }
  };

  const selectRadio = (q, val) => {
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    saveAnswer(q.id, val);
    setShowErr(false);
    const triggered = q.followUp ? q.followUp.triggers.includes(val) : false;
    if (triggered) {
      setTimeout(() => {
        const t = document.getElementById("ta_fu_" + q.id);
        if (t) t.focus();
      }, 200);
    } else {
      advanceTimerRef.current = setTimeout(() => { advanceTimerRef.current = null; goNext(); }, 430);
    }
  };

  const toggleCheckbox = (q, val) => {
    const cur = diag.answers[q.id] || [];
    const next = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val];
    saveAnswer(q.id, next);
    setShowErr(false);
    if (q.followUp) {
      const triggered = q.followUp.triggers.some((t) => next.includes(t));
      if (triggered) {
        setTimeout(() => {
          const t = document.getElementById("ta_fu_" + q.id);
          if (t) t.focus();
        }, 200);
      }
    }
  };

  const handleSubmit = async () => {
    if (diag.submitting) return;
    setDiag((d) => ({ ...d, submitting: true }));
    setSubmitError(false);

    const d = getDiagnostic(diag.diagnosticType);
    const payload = {
      _subject: `STD Diagnostic · ${diag.clientName} · ${diag.diagnosticType === "brand" ? "Brand" : "Agency"} Diagnostic`,
      client_name: diag.clientName,
      access_code: diag.clientCode,
      diagnostic_type: diag.diagnosticType === "brand" ? "Brand" : "Agency",
      submitted_at: new Date().toISOString(),
    };

    if (diag.answers["ctx_5_fu"]) payload["[Background] ctx_5_other_platforms"] = diag.answers["ctx_5_fu"];

    const selected = [].concat(diag.answers["ctx_5"] || []);
    const gateAnswered = [].concat(diag.answers["ctx_5_sig"] || []);
    const activePlatforms = selected.length >= 6 && gateAnswered.length ? gateAnswered : selected;
    if (activePlatforms.length) {
      payload["platform_names"] = activePlatforms.join(", ");
      activePlatforms.forEach((platform) => {
        const key = pltKey(platform);
        for (let q = 1; q <= 5; q++) {
          const id = "plt_" + key + "_" + q;
          const v = diag.answers[id];
          if (v) payload["[Platform: " + platform + "] Q" + q] = v;
        }
      });
      if (diag.answers["ctx_5_sig"]) payload["[Background] ctx_5_sig"] = gateAnswered.join("; ");
    }

    d.context.questions.forEach((q) => {
      const v = diag.answers[q.id];
      payload[`[Background] ${q.id}`] = Array.isArray(v) ? v.join("; ") : v || "";
    });
    d.dimensions.forEach((dim) => {
      dim.questions.forEach((q) => {
        const v = diag.answers[q.id];
        payload[`[Dim ${dim.number} - ${dim.title}] Q${q.id}`] = Array.isArray(v) ? v.join("; ") : v || "";
        if (q.followUp) {
          const fv = diag.answers[q.id + "_fu"];
          if (fv) payload[`[Dim ${dim.number}] Q${q.id}_followup`] = fv;
        }
      });
    });

    try {
      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (resp.ok) {
        try { sessionStorage.removeItem("std_diag_state"); } catch (e) {}
        setNavDir("fwd");
        setDiag((d2) => ({ ...d2, phase: "complete", submitting: false }));
      } else {
        throw new Error("Network error");
      }
    } catch (e) {
      setDiag((d2) => ({ ...d2, submitting: false }));
      setSubmitError(true);
    }
  };

  // ---------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------

  const renderType = () => (
    <>
      <div className="eyebrow">Step 1 of 2 · Choose your track</div>
      <h2 className="display-h">Which diagnostic applies to your organisation?</h2>
      <p className="lede">Select the version that best fits. This determines the question set you'll complete, and there's no wrong door.</p>
      <div className="type-cards">
        <div className={`type-card ${diag.diagnosticType === "brand" ? "selected" : ""}`} onClick={() => selectType("brand")}>
          <div className="type-tag">Brand Diagnostic</div>
          <div className="type-title">Brand or Advertiser</div>
          <div className="type-desc">You are a brand, advertiser, or in-house marketing team. You buy media, directly or through an agency, to reach consumers.</div>
        </div>
        <div className={`type-card ${diag.diagnosticType === "agency" ? "selected" : ""}`} onClick={() => selectType("agency")}>
          <div className="type-tag">Agency Diagnostic</div>
          <div className="type-title">Media Agency</div>
          <div className="type-desc">You are a media agency, performance agency, or specialist managing advertising on behalf of brand clients.</div>
        </div>
      </div>
      <div className="controls solo">
        <button className="btn btn-primary" onClick={handleTypeNext} disabled={!diag.diagnosticType}>Continue →</button>
      </div>
    </>
  );

  const renderPlatformIntro = (step) => (
    <div className="paper-card">
      <div className="intro-kicker">Platform {step.platformIdx + 1} of {step.total}</div>
      <h2 className="display-h">{step.platform}</h2>
      <p className="intro-body">Five quick questions about how this platform fits into your current setup. Single-select only, choose the option that most accurately describes your situation.</p>
      <div className="controls solo">
        <button className="btn btn-primary" onClick={goNext}>Start ›</button>
      </div>
    </div>
  );

  const renderIntro = (step) => {
    const isContext = step.dimNumber === 0;
    const d = getDiagnostic(diag.diagnosticType);
    const COPY = window.STD_DATA.STD_COPY;

    let doneBanner = null;
    if (diag.stepIndex > 0) {
      const prevKey = isContext ? null : (step.dimNumber === 1 ? 0 : step.dimNumber - 1);
      if (prevKey !== null && COPY.sectionDone[prevKey]) {
        doneBanner = <div className="intro-done"><span className="tick">✓</span> {COPY.sectionDone[prevKey]}</div>;
      }
    }

    let orbit = null;
    if (!isContext) {
      orbit = (
        <div className="dim-orbit">
          {d.dimensions.map((dim) => {
            const cls = dim.number < step.dimNumber ? "done" : dim.number === step.dimNumber ? "cur" : "";
            return <span className={`o ${cls}`} key={dim.number}></span>;
          })}
        </div>
      );
    }

    const startLine = COPY.sectionStart[isContext ? "context" : step.dimNumber] || "";
    const title = isContext ? step.section.label : step.section.title;

    return (
      <div className="paper-card">
        {doneBanner}
        {orbit}
        {isContext ? (
          <div className="intro-kicker">Background</div>
        ) : (
          <div className="intro-kicker"><span className="num">{String(step.dimNumber).padStart(2, "0")}</span> Dimension {step.dimNumber} of 6</div>
        )}
        <h2 className="display-h">{title}</h2>
        <p className="intro-body">{step.section.intro}</p>
        {startLine && <div className="intro-start">{startLine}</div>}
        <div className={`controls ${diag.stepIndex === 0 ? "solo" : ""}`}>
          {diag.stepIndex !== 0 && <button className="btn btn-ghost" onClick={handleBack}>← Back</button>}
          <button className="btn btn-primary" onClick={goNext}>{isContext ? "Begin →" : "Start dimension →"}</button>
        </div>
      </div>
    );
  };

  const renderQuestion = (step) => {
    const q = step.q;
    const d = getDiagnostic(diag.diagnosticType);
    const secShort = step.key === "context" ? "Background" : d.dimensions[step.key - 1].short;
    const val = diag.answers[q.id];

    let inputEl = null;
    let followEl = null;

    if (q.type === "radio") {
      inputEl = (
        <div className="opts">
          {q.options.map((opt, i) => (
            <div key={opt} className={`opt radio ${val === opt ? "selected" : ""}`} onClick={() => selectRadio(q, opt)}>
              <span className="key">{i + 1}</span>
              <span className="marker"></span>
              <span className="label">{opt}</span>
            </div>
          ))}
        </div>
      );
      if (q.followUp) {
        const show = val && q.followUp.triggers.includes(val);
        const fv = diag.answers[q.id + "_fu"] || "";
        followEl = (
          <div className="follow" style={{ display: show ? "block" : "none" }}>
            <label className="field-label">{q.followUp.text}</label>
            <textarea className="ta" id={`ta_fu_${q.id}`} rows={3} value={fv} onChange={(e) => saveAnswer(q.id + "_fu", e.target.value)} />
          </div>
        );
      }
    } else if (q.type === "checkbox") {
      const vals = val || [];
      inputEl = (
        <div className="opts">
          {q.options.map((opt, i) => (
            <div key={opt} className={`opt check ${vals.includes(opt) ? "selected" : ""}`} onClick={() => toggleCheckbox(q, opt)}>
              <span className="key">{i + 1}</span>
              <span className="marker"></span>
              <span className="label">{opt}</span>
            </div>
          ))}
        </div>
      );
      if (q.followUp) {
        const vals2 = val || [];
        const show2 = q.followUp.triggers.some((t) => vals2.includes(t));
        const fv2 = diag.answers[q.id + "_fu"] || "";
        followEl = (
          <div className="follow" style={{ display: show2 ? "block" : "none" }}>
            <label className="field-label">{q.followUp.text}</label>
            <textarea className="ta" id={`ta_fu_${q.id}`} rows={3} value={fv2} onChange={(e) => saveAnswer(q.id + "_fu", e.target.value)} />
          </div>
        );
      }
    } else {
      inputEl = (
        <>
          <textarea
            className="ta"
            id={`ta_${q.id}`}
            rows={5}
            placeholder="Answer as specifically and honestly as you can."
            value={val || ""}
            onChange={(e) => saveAnswer(q.id, e.target.value)}
          />
          <div className="ta-hint">Approximate and honest beats precise and optimistic. Plain language is fine.</div>
        </>
      );
    }

    return (
      <>
        <div className="q-top">
          <span className="q-num">Q {prettyQId(q.id)}</span>
          <span className="q-sec">{secShort}</span>
        </div>
        <p className="q-lead">{q.text}{q.required && <span className="q-req">*</span>}</p>
        {q.rationale && <div className="q-rationale">{q.rationale}</div>}
        {inputEl}
        {followEl}
        <div className={`q-err ${showErr ? "show" : ""}`}>A response is required to continue.</div>
        <div className="controls">
          <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="kbd-hint">Press <b>Enter</b> to continue</span>
            <button className="btn btn-primary" onClick={goNext}>Continue →</button>
          </div>
        </div>
      </>
    );
  };

  const renderReview = () => {
    const d = getDiagnostic(diag.diagnosticType);
    const typeLabel = diag.diagnosticType === "brand" ? "Brand Diagnostic" : "Agency Diagnostic";
    return (
      <>
        <div className="eyebrow">The finish line</div>
        <h2 className="display-h">That's the whole picture.</h2>
        <p className="lede" style={{ marginBottom: "1.4rem" }}>
          You've completed all six dimensions of the <strong style={{ color: "var(--d-fg)" }}>{typeLabel}</strong>. Give it a final glance, then send it through. Andrew reviews submissions within 24 hours.
        </p>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-check">✓</span>
            <span className="review-text"><strong>Background questions</strong> complete</span>
          </div>
          {d.dimensions.map((dim) => {
            const answered = dim.questions.filter((q) => {
              const v = diag.answers[q.id];
              if (q.type === "checkbox") return v && v.length > 0;
              return v && v.toString().trim() !== "";
            }).length;
            return (
              <div className="review-item" key={dim.number}>
                <span className="review-check">✓</span>
                <span className="review-text"><strong>Dimension {dim.number}: {dim.title}</strong>, {answered} of {dim.questions.length} answered</span>
              </div>
            );
          })}
        </div>
        <div className="notice">
          <strong>What happens next.</strong> Once you submit, Andrew prepares your readiness report. You'll get an email when it's ready, typically within 24 hours.
        </div>
        <div className="controls">
          <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={diag.submitting}>
            {diag.submitting ? (<><span className="spinner"></span> Submitting…</>) : "Submit Diagnostic →"}
          </button>
        </div>
        {submitError && (
          <div className="q-err show" style={{ marginTop: "0.9rem", textAlign: "right" }}>
            There was a problem submitting. Please try again or contact Andrew directly.
          </div>
        )}
      </>
    );
  };

  const renderComplete = () => (
    <div className="paper-card paper-card--complete">
      <div className="done-mark">✓</div>
      <h2 className="display-h">Diagnostic submitted</h2>
      <p className="complete-body">
        Thank you, <strong>{diag.clientName}</strong>. Your responses are in.
        <br /><br />
        Andrew will review them and prepare your Agentic Readiness report. You'll receive an email when your results are ready, typically within 24 hours.
        <br /><br />
        Questions in the meantime? Reach Andrew at <a href="mailto:andrew@systemsthatdecide.io">andrew@systemsthatdecide.io</a>.
      </p>
    </div>
  );

  let stageContent = null;
  if (diag.phase === "type") stageContent = renderType();
  else if (diag.phase === "complete") stageContent = renderComplete();
  else if (diag.phase === "flow" && currentStep) {
    if (currentStep.kind === "intro") stageContent = renderIntro(currentStep);
    else if (currentStep.kind === "platform-intro") stageContent = renderPlatformIntro(currentStep);
    else if (currentStep.kind === "question") stageContent = renderQuestion(currentStep);
    else if (currentStep.kind === "review") stageContent = renderReview();
  }

  const exitVisible = diag.phase === "type" || diag.phase === "flow";
  const saveVisible = diag.phase === "flow";
  const progShow = diag.phase === "flow";

  return (
    <>
      <nav className="nav">
        <button className="nav-exit" style={{ visibility: exitVisible ? "visible" : "hidden" }} onClick={handleBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back
        </button>
        <a href="portal.html" className="nav-logo" aria-label="Systems That Decide">
          <svg width="22" height="22" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="44" stroke="#9A8B47" strokeWidth="3.6" fill="none" />
            <polygon points="50,6 94,50 50,94 6,50" stroke="#9A8B47" strokeWidth="1.4" fill="none" />
            <circle cx="50" cy="6" r="3.4" fill="#9A8B47" />
            <circle cx="94" cy="50" r="3.4" fill="#9A8B47" />
            <circle cx="50" cy="94" r="3.4" fill="#9A8B47" />
            <circle cx="6" cy="50" r="3.4" fill="#9A8B47" />
          </svg>
          <span className="wm-bold">Systems</span>
          <span className="wm-light">That Decide</span>
        </a>
        <span className="nav-save" style={{ visibility: saveVisible ? "visible" : "hidden" }}><span className="dot"></span> Progress saved</span>
      </nav>

      <header className={`prog ${progShow ? "show" : ""}`}>
        <div className="prog-inner">
          <div className="prog-meta">
            <span className="prog-label">{label}</span>
            <span className="prog-count">{isQuestionStep ? (<><b>{done}</b> / {total}</>) : (<>{done} / {total}</>)}</span>
          </div>
          <div className="prog-track"><div className="prog-fill" style={{ width: pct + "%" }}></div></div>
          <div className={`prog-cheer ${cheerFlash ? "flash" : ""}`}>{cheerLine}</div>
        </div>
      </header>

      <div className={`stage-wrap ${progShow ? "" : "no-prog"}`}>
        <div id="stage">
          <div className={`panel ${navDir === "back" ? "back" : ""}`} key={diag.phase + "-" + diag.stepIndex}>
            {stageContent}
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<DiagnosticPage />);

Object.assign(window, { DiagnosticPage });
