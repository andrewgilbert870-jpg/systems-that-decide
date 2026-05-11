// Shared bootstrap — wires Nav + page body + Footer + Tweaks for every HTML file.
// Each HTML page sets window.__PAGE to one of: home, asrp, advisory, library, about, enquire.

const PAGE_REGISTRY = {
  home:        { id: "home",        label: "home",        Component: window.HomePage },
  asrp:        { id: "asrp",       label: "asrp",        Component: window.ASRPPage },
  advisory:    { id: "advisory",   label: "advisory",    Component: window.AdvisoryPage },
  library:     { id: "library",    label: "library",     Component: window.LibraryPage },
  about:       { id: "about",      label: "about",       Component: window.AboutPage },
  enquire:     { id: "enquire",    label: "enquire",     Component: window.EnquirePage },
  portal:      { id: "portal",     label: "portal",      Component: window.PortalPage },
  ethics:      { id: "ethics",     label: "ethics",      Component: window.EthicsPage },
  conflicts:   { id: "conflicts",  label: "conflicts",   Component: window.ConflictsPage },
  methodology: { id: "methodology",label: "methodology", Component: window.MethodologyPage },
};

const HREFS = {
  home:        "index.html",
  asrp:        "asrp.html",
  advisory:    "advisory.html",
  library:     "library.html",
  about:       "about.html",
  enquire:     "enquire.html",
  portal:      "portal.html",
  login:       "login.html",
  ethics:      "ethics.html",
  conflicts:   "conflicts.html",
  methodology: "methodology.html",
};

const DEV_MODE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bodyFont": "ibm",
  "goldIntensity": "default"
}/*EDITMODE-END*/;

const BODY_FONT_STACKS = {
  inter:    `"Inter", "Calibri", system-ui, -apple-system, "Segoe UI", sans-serif`,
  georgia:  `"Georgia", "Iowan Old Style", "Apple Garamond", "Baskerville", serif`,
  ibm:      `"IBM Plex Sans", "Inter", system-ui, sans-serif`,
  mono:     `"Space Mono", "SFMono-Regular", "Roboto Mono", Menlo, monospace`,
};

const GOLD_PALETTES = {
  default: { gold: "#9A8B47", light: "#BBA55F", stat: "#C4A84A" },
  warm:    { gold: "#B89544", light: "#D4B85F", stat: "#E0BB42" },
  bright:  { gold: "#D4A93F", light: "#E8C260", stat: "#F0CC3D" },
  deep:    { gold: "#7A6F38", light: "#9A8B47", stat: "#AA9540" },
};

const goNav = (id) => {
  const here = window.__PAGE || "home";
  if (id === here) {
    const root = document.querySelector(".app-scroll");
    if (root) root.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.href = HREFS[id] || HREFS.home;
};

const goEnquire = () => {
  if ((window.__PAGE || "home") === "enquire") {
    const root = document.querySelector(".app-scroll");
    if (root) root.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.href = HREFS.enquire;
};

const Shell = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Inject IBM Plex Sans on demand for the body-font tweak.
  React.useEffect(() => {
    if (t.bodyFont === "ibm" && !document.getElementById("ibmplex-link")) {
      const l = document.createElement("link");
      l.id = "ibmplex-link";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
  }, [t.bodyFont]);

  // Apply tweaks live on :root.
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-sans", BODY_FONT_STACKS[t.bodyFont] || BODY_FONT_STACKS.inter);
    const p = GOLD_PALETTES[t.goldIntensity] || GOLD_PALETTES.default;
    root.style.setProperty("--gold", p.gold);
    root.style.setProperty("--gold-light", p.light);
    root.style.setProperty("--gold-stat", p.stat);
  }, [t.bodyFont, t.goldIntensity]);

  const pageKey = window.__PAGE || "home";
  const entry = PAGE_REGISTRY[pageKey] || PAGE_REGISTRY.home;
  const PageComponent = entry.Component;

  return (
    <div className="app-shell">
      <Nav active={entry.id} onNavigate={goNav} onEnquire={goEnquire} />
      <main>
        {PageComponent
          ? <PageComponent
              onEnquire={goEnquire}
              onPrimary={() => goNav("asrp")}
              onSecondary={() => goNav("library")}
              onNavigate={goNav}
            />
          : <div style={{ padding: 96, textAlign: "center", color: "var(--fg-muted)" }}>Loading…</div>
        }
      </main>
      <Footer onNavigate={goNav} />

      {DEV_MODE && (
        <TweaksPanel title="Tweaks" defaultPosition={{ x: 24, y: 24 }} side="right">
        <TweakSection label="Body typography" />
        <TweakRadio
          label="Body font"
          value={t.bodyFont}
          options={[
            { value: "inter",   label: "Inter" },
            { value: "georgia", label: "Georgia" },
            { value: "ibm",     label: "IBM Plex" },
            { value: "mono",    label: "Mono" },
          ]}
          onChange={(v) => setTweak("bodyFont", v)}
        />
        <TweakSection label="Gold intensity" />
        <TweakRadio
          label="Tone"
          value={t.goldIntensity}
          options={[
            { value: "deep",    label: "Deep" },
            { value: "default", label: "Signal" },
            { value: "warm",    label: "Warm" },
            { value: "bright",  label: "Bright" },
          ]}
          onChange={(v) => setTweak("goldIntensity", v)}
        />
      </TweaksPanel>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Shell />);

Object.assign(window, { Shell, goNav, goEnquire });
