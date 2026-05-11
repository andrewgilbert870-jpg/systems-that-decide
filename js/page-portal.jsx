// Client Portal — authenticated area.
// Auth is validated from sessionStorage on mount.
// If no valid session exists, redirects to login.html.
// Diagnostic submission and results viewer will be layered in here next.

const PortalPage = () => {
  const [auth, setAuth] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    // Validate session
    try {
      const raw = sessionStorage.getItem("std_portal_auth");
      if (!raw) { window.location.replace("login.html"); return; }
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.code || !parsed.name) { window.location.replace("login.html"); return; }
      // Session expires after 8 hours
      if (Date.now() - (parsed.authenticatedAt || 0) > 8 * 60 * 60 * 1000) {
        sessionStorage.removeItem("std_portal_auth");
        window.location.replace("login.html");
        return;
      }
      setAuth(parsed);
      setReady(true);
    } catch (e) {
      window.location.replace("login.html");
    }
  }, []);

  const logout = () => {
    try { sessionStorage.removeItem("std_portal_auth"); } catch (e) {}
    window.location.replace("login.html");
  };

  if (!ready) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--fg-muted)", textTransform: "uppercase" }}>
          Verifying session…
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Portal header strip */}
      <div style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          height: 52,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "var(--gold-tint-08)", border: "1px solid var(--border-gold)",
              color: "var(--gold)", padding: "3px 10px", borderRadius: 2,
            }}>Client Portal</span>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 13,
              color: "var(--fg-muted)",
            }}>Welcome, {auth.name}</span>
          </div>
          <button
            onClick={logout}
            style={{
              background: "transparent", border: "none",
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--fg-subtle)", cursor: "pointer",
              padding: "4px 0",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-subtle)"}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main portal content */}
      <Section screenLabel="portal-home">
        <FadeUp>
          <Label style={{ marginBottom: 16 }}>Your engagement</Label>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 52px)", color: "var(--fg)",
            lineHeight: 1.08, letterSpacing: 0, margin: "0 0 16px",
          }}>
            Agentic Stack Readiness Program
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-muted)",
            lineHeight: 1.65, margin: "0 0 56px", maxWidth: 640,
          }}>
            This is your private workspace for the engagement. The Diagnostic questionnaire and your results will live here once the assessment is underway.
          </p>
        </FadeUp>

        {/* Status cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {/* Diagnostic status */}
          <FadeUp>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderTop: "2px solid var(--gold)",
              padding: 28,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <Label>01 · Diagnostic</Label>
                <StatusPill status={auth.diagnosticComplete ? "complete" : "pending"} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: 20, color: "var(--fg)", margin: "0 0 10px", lineHeight: 1.25,
              }}>
                {auth.diagnosticComplete ? "Submitted, results below" : "Awaiting your responses"}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: "0 0 20px" }}>
                {auth.diagnosticComplete
                  ? "Your diagnostic has been reviewed. Scroll down to see your scored results and risk register."
                  : "The 25-question diagnostic questionnaire is your entry point into the program. It takes approximately 30 minutes."}
              </p>
              {!auth.diagnosticComplete && (
                <a
                  href="diagnostic.html"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--gold)", textDecoration: "none",
                    borderBottom: "1px solid var(--gold-tint-30)", paddingBottom: 2,
                    transition: "border-color 200ms ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--gold-tint-30)"}
                >
                  Start diagnostic
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              )}
            </div>
          </FadeUp>

          {/* Technology Mapping */}
          <FadeUp delay={120}>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: 28,
              opacity: auth.diagnosticComplete ? 1 : 0.5,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <Label>02 · Technology Mapping</Label>
                <StatusPill status="locked" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: 20, color: "var(--fg)", margin: "0 0 10px", lineHeight: 1.25,
              }}>
                Structural fit framework
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
                Maps your current stack against the live agentic platform landscape. Unlocks after Diagnostic review.
              </p>
            </div>
          </FadeUp>

          {/* Roadmap */}
          <FadeUp delay={240}>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: 28,
              opacity: 0.5,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <Label>03 · Roadmap</Label>
                <StatusPill status="locked" />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: 20, color: "var(--fg)", margin: "0 0 10px", lineHeight: 1.25,
              }}>
                Foundation → Integration → Optimisation
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
                Sequenced implementation roadmap, ordered by dependency. Delivered after Technology Mapping.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Placeholder for results — shown only when diagnostic is complete */}
        {auth.diagnosticComplete ? (
          <FadeUp>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border-gold)",
              padding: "36px 40px",
            }}>
              <Label style={{ marginBottom: 16 }}>Your diagnostic results</Label>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                Your scored results, risk register, and platform map will appear here once the review is complete.
              </p>
            </div>
          </FadeUp>
        ) : (
          <FadeUp>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderLeft: "4px solid var(--gold-tint-30)",
              padding: "24px 28px",
              display: "flex", alignItems: "flex-start", gap: 16,
            }}>
              <span className="material-symbols-outlined" style={{
                fontFamily: "'Material Symbols Outlined'",
                fontSize: 20, color: "var(--gold)", lineHeight: 1,
                fontVariationSettings: "'opsz' 20, 'wght' 300",
                flexShrink: 0, marginTop: 2,
              }}>info</span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Next step: </strong>
                Complete the Diagnostic questionnaire above. Once submitted, your results will be reviewed and a scored report with risk register will be published here, typically within 5 business days.
              </p>
            </div>
          </FadeUp>
        )}

        {/* Contact strip */}
        <FadeUp>
          <div style={{
            marginTop: 56,
            paddingTop: 40,
            borderTop: "1px solid var(--border)",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20,
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: "var(--fg)", margin: "0 0 6px", lineHeight: 1.3 }}>
                Questions about your engagement?
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", margin: 0, lineHeight: 1.6 }}>
                Reach out directly. All advisory work is handled personally.
              </p>
            </div>
            <a href="mailto:andrew@systemsthatdecide.io" style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--gold)", textDecoration: "none",
              border: "1px solid var(--border-gold)", padding: "10px 18px",
              transition: "border-color 200ms ease, background 200ms ease",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.background = "var(--gold-tint-08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-gold)"; e.currentTarget.style.background = "transparent"; }}
            >
              andrew@systemsthatdecide.io
            </a>
          </div>
        </FadeUp>

      </Section>
    </>
  );
};

// Small status pill component used by portal cards
const StatusPill = ({ status }) => {
  const map = {
    pending:  { label: "Pending",   bg: "rgba(201,135,58,0.12)",  border: "rgba(201,135,58,0.3)",  color: "#C9873A" },
    complete: { label: "Complete",  bg: "rgba(74,124,89,0.12)",   border: "rgba(74,124,89,0.3)",   color: "#4A7C59" },
    locked:   { label: "Locked",    bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)", color: "var(--fg-subtle)" },
  };
  const s = map[status] || map.locked;
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
      background: s.bg, border: `1px solid ${s.border}`,
      color: s.color, padding: "3px 8px", borderRadius: 2,
    }}>
      {s.label}
    </span>
  );
};

Object.assign(window, { PortalPage, StatusPill });
