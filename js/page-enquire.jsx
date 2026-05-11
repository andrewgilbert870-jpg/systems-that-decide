// Page: Enquire — scoping form with light validation + journey + direct contact.

const ENGAGEMENT_OPTIONS = [
  "Agentic Stack Readiness Program",
  "Team Education",
  "Executive Advisory",
  "Market Entry & Expansion",
  "Transaction Advisory",
  "Not yet sure",
];

const HORIZON_OPTIONS = [
  { v: "now",     l: "Now",            d: "Decision is on the desk" },
  { v: "quarter", l: "This quarter",   d: "Scoping the question" },
  { v: "year",    l: "This year",      d: "Building the case" },
  { v: "later",   l: "Exploratory",    d: "Mapping the territory" },
];

const EnquireHero = () => (
  <PageHero
    eyebrow="Start a conversation"
    title="Tell me what you are trying to decide. I will respond within one business day."
    lead="The scoping conversation is 30 minutes. Closed-room. No quote at the end of the call. The aim is to establish whether an engagement is the right starting point and which one."
  />
);

const FormField = ({ label, hint, children, error, required }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
      <Label tone={error ? "error" : "default"}>{label}{required && <span style={{ color: "var(--gold)", marginLeft: 4 }}>·</span>}</Label>
      {hint && !error && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.04em" }}>{hint}</span>}
      {error && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gold-light)", letterSpacing: "0.04em" }}>{error}</span>}
    </div>
    {children}
  </div>
);

const inputStyle = (focused, hasError) => ({
  width: "100%", boxSizing: "border-box",
  background: "var(--surface)",
  border: `1px solid ${hasError ? "var(--gold)" : focused ? "var(--gold-tint-50)" : "var(--border)"}`,
  borderBottom: `1px solid ${hasError ? "var(--gold)" : focused ? "var(--gold)" : "var(--border-strong)"}`,
  padding: "16px 18px",
  fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg)",
  outline: "none", transition: "border-color 200ms ease, background 200ms ease",
  resize: "vertical",
});

const TextInput = ({ value, onChange, placeholder, error, type = "text" }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      placeholder={placeholder}
      style={inputStyle(focused, !!error)} />
  );
};

const TextArea = ({ value, onChange, placeholder, error, rows = 5 }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      placeholder={placeholder} rows={rows}
      style={{ ...inputStyle(focused, !!error), lineHeight: 1.55 }} />
  );
};

const SegmentChoice = ({ options, value, onChange }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
    {options.map((opt, i) => {
      const v = typeof opt === "string" ? opt : opt.v;
      const l = typeof opt === "string" ? opt : opt.l;
      const d = typeof opt === "string" ? null : opt.d;
      const active = value === v;
      return (
        <button key={i} type="button" onClick={() => onChange(v)} style={{
          flex: d ? "1 1 200px" : "0 0 auto",
          background: active ? "var(--gold-tint-12)" : "var(--surface)",
          border: `1px solid ${active ? "var(--gold)" : "var(--border)"}`,
          color: active ? "var(--gold-light)" : "var(--fg)",
          padding: d ? "14px 18px" : "12px 18px",
          fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
          cursor: "pointer", textAlign: "left",
          transition: "all 200ms ease",
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4,
        }}>
          <span>{l}</span>
          {d && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: active ? "var(--gold)" : "var(--fg-subtle)", letterSpacing: "0.04em" }}>{d}</span>}
        </button>
      );
    })}
  </div>
);

const ScopingForm = () => {
  const [form, setForm] = React.useState({
    name: "", role: "", company: "", email: "",
    engagement: "", horizon: "", context: "",
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [step, setStep] = React.useState(1); // 1 of 2 — context shown after primary fields

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Use a valid email";
    if (!form.company.trim()) e.company = "Required";
    if (!form.engagement) e.engagement = "Pick one";
    if (!form.horizon) e.horizon = "Pick one";
    if (!form.context.trim() || form.context.trim().length < 20) e.context = "A sentence or two of context";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)", padding: "clamp(40px, 6vw, 72px)", textAlign: "left" }}>
        <Label style={{ marginBottom: 16 }}>Received</Label>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(28px, 3.6vw, 40px)", color: "var(--fg)", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: 0, textWrap: "balance" }}>
          Thank you, {form.name.split(" ")[0]}. The note is in.
        </h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 620 }}>
          Andrew will reply within one business day, usually less. The next step is a 30-minute scoping call. There is no quote at the end of the call and no commitment from your side.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="library.html" style={{ textDecoration: "none" }}>
            <SecondaryBtn>Read the Library while you wait <MIcon name="arrow_forward" size={16} /></SecondaryBtn>
          </a>
        </div>
      </div>
    );
  }

  const canAdvance = form.name && form.email && form.company && form.engagement && form.horizon
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <form onSubmit={submit} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--gold)", padding: "clamp(28px, 4vw, 48px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
        <Label>Scoping enquiry</Label>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.06em" }}>
          STEP {step} OF 2
        </span>
      </div>

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
            <FormField label="Your name" required error={errors.name}>
              <TextInput value={form.name} onChange={set("name")} placeholder="" error={errors.name} />
            </FormField>
            <FormField label="Role" hint="Optional">
              <TextInput value={form.role} onChange={set("role")} placeholder="CMO, CFO, Head of Strategy…" />
            </FormField>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
            <FormField label="Company" required error={errors.company}>
              <TextInput value={form.company} onChange={set("company")} error={errors.company} />
            </FormField>
            <FormField label="Work email" required error={errors.email}>
              <TextInput value={form.email} onChange={set("email")} type="email" error={errors.email} />
            </FormField>
          </div>
          <FormField label="Which engagement are you considering?" required error={errors.engagement}>
            <SegmentChoice options={ENGAGEMENT_OPTIONS} value={form.engagement} onChange={set("engagement")} />
          </FormField>
          <FormField label="Decision horizon" required error={errors.horizon}>
            <SegmentChoice options={HORIZON_OPTIONS} value={form.horizon} onChange={set("horizon")} />
          </FormField>

          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 12 }}>
            <button type="button" onClick={() => { if (validate()) setStep(2); }} disabled={!canAdvance} style={{
              cursor: canAdvance ? "pointer" : "not-allowed",
              opacity: canAdvance ? 1 : 0.4,
              background: "var(--gold)", border: "1px solid var(--gold)", color: "var(--ink-on-gold)",
              padding: "16px 28px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 10, transition: "all 200ms ease",
            }}>
              Continue <MIcon name="arrow_forward" size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <FormField
            label="Briefly: what are you trying to decide?"
            required
            hint={`${form.context.length}/600 · a paragraph is fine`}
            error={errors.context}
          >
            <TextArea value={form.context} onChange={(v) => v.length <= 600 && set("context")(v)} rows={6}
              placeholder="What is on the desk, what is already in motion, and what you are trying to get clear on. No NDA needed for this stage."
              error={errors.context} />
          </FormField>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: 20 }}>
            <Label tone="muted" style={{ marginBottom: 10 }}>What happens next</Label>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
              Andrew will respond within one business day. If the engagement looks like a fit, the next step is a 30-minute scoping call. If it isn&rsquo;t, you&rsquo;ll get a direct read on what is, and a pointer to who is better placed.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 12 }}>
            <button type="button" onClick={() => setStep(1)} style={{
              cursor: "pointer", background: "transparent", border: "1px solid var(--border)", color: "var(--fg-muted)",
              padding: "16px 24px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <MIcon name="arrow_back" size={16} /> Back
            </button>
            <button type="submit" style={{
              cursor: "pointer",
              background: "var(--gold)", border: "1px solid var(--gold)", color: "var(--ink-on-gold)",
              padding: "16px 28px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              Send enquiry <MIcon name="arrow_forward" size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        input::placeholder, textarea::placeholder { color: var(--fg-subtle); opacity: 0.7; }
        @media (max-width: 720px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
};

const DirectContact = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
    <div>
      <Label style={{ marginBottom: 14 }}>Direct</Label>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, color: "var(--fg)", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: 0 }}>
        Or skip the form.
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
        Email or LinkedIn message both reach Andrew directly. Same response window.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[
        { label: "Email", value: "andrew@systemsthatdecide.io", href: "mailto:andrew@systemsthatdecide.io", icon: "mail" },
        { label: "LinkedIn", value: "linkedin.com/in/andrew-gilbert", href: "https://www.linkedin.com/", icon: "person" },
        { label: "Substack", value: "systemsthatdecide.substack.com", href: "https://systemsthatdecide.substack.com/", icon: "book" },
      ].map((c, i) => (
        <a key={i} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener" style={{
          textDecoration: "none", color: "var(--fg)",
          display: "flex", alignItems: "center", gap: 16,
          padding: "18px 20px", background: "var(--surface)", border: "1px solid var(--border)",
          transition: "border-color 200ms ease, background 200ms ease",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-tint-50)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <span style={{ width: 36, height: 36, display: "grid", placeItems: "center", background: "var(--gold-tint-12)", border: "1px solid var(--gold-tint-30)", color: "var(--gold)" }}>
            <MIcon name={c.icon} size={18} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg)" }}>{c.value}</div>
          </div>
          <MIcon name="arrow_forward" size={18} />
        </a>
      ))}
    </div>

    <div style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
      <Label tone="muted" style={{ marginBottom: 10 }}>Response window</Label>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
        One business day, Sydney time.
      </p>
    </div>
  </div>
);

const EnquireBody = () => (
  <Section screenLabel="enquire-form">
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr", gap: 56, alignItems: "start" }} className="enq-grid">
      <FadeUp><ScopingForm /></FadeUp>
      <FadeUp delay={120}><DirectContact /></FadeUp>
    </div>
    <style>{`@media (max-width: 980px) { .enq-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
  </Section>
);

const EnquireFAQ = () => {
  const FAQ = [
    { q: "Is the scoping call free?", a: "Yes. 30 minutes, no charge, no quote at the end of the call. The aim is to establish whether an engagement is the right starting point and which one." },
    { q: "Will you sign an NDA before the call?", a: "Not for scoping. The conversation stays at the level needed to assess fit. If the engagement proceeds, an NDA is in place before any documents are exchanged." },
    { q: "Do you take retainer clients with platforms or vendors?", a: "No. The practice does not hold platform partnerships, reseller arrangements, certification revenue or referral fees. The independence model is documented on the About page." },
    { q: "Where is the practice based?", a: "Sydney. Engagements run across ANZ and South-East Asia. Working sessions are in-room where useful and remote where it is not." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <Section alt screenLabel="enquire-faq">
      <Reveal axis="x" style={{ marginBottom: 16 }}>
        <Label>Before you write</Label>
      </Reveal>
      <Reveal axis="x" delay={80}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 48px)", color: "var(--fg)", lineHeight: 1.1, margin: "0 0 48px", maxWidth: 880, letterSpacing: "-0.02em", textWrap: "balance" }}>
          The four questions everyone asks first.
        </h2>
      </Reveal>
      <div style={{ maxWidth: 920 }}>
        {FAQ.map((f, i) => (
          <FadeUp key={i} delay={i * 60}>
            <div style={{ borderTop: i === 0 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: "100%", textAlign: "left", padding: "26px 0",
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
              }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, color: "var(--fg)", lineHeight: 1.3 }}>{f.q}</span>
                <span style={{ color: "var(--gold)", transition: "transform 300ms ease", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>
                  <MIcon name="add" size={22} />
                </span>
              </button>
              <div style={{
                maxHeight: open === i ? 240 : 0, overflow: "hidden",
                transition: "max-height 400ms ease, opacity 400ms ease, padding 400ms ease",
                opacity: open === i ? 1 : 0,
                padding: open === i ? "0 0 26px" : "0",
              }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.75, margin: 0, maxWidth: 760 }}>{f.a}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
};

const EnquirePage = () => (
  <div data-screen-label="Enquire">
    <EnquireHero />
    <EnquireBody />
    <EnquireFAQ />
  </div>
);

Object.assign(window, { EnquirePage });
