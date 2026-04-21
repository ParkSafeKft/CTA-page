const COLS: { t: string; l: string[] }[] = [
  { t: "TERMÉK", l: ["Térkép", "Teljesítmény", "Challenge-ek", "Sync-ek"] },
  { t: "KÖZÖSSÉG", l: ["Blog", "Ranglisták", "POI-t jelölni", "Discord"] },
  { t: "CÉG", l: ["Rólunk", "Sajtó", "Adatvédelem", "ÁSZF"] },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderTop: "3px solid var(--ink)",
        padding: "60px 28px 30px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="foot-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            paddingBottom: 40,
            borderBottom: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt=""
                aria-hidden
                style={{ width: 44, height: 44, border: "2.5px solid var(--paper)" }}
              />
              <span className="hx" style={{ fontSize: 26, letterSpacing: "-0.04em" }}>
                PARKSAFE<span style={{ color: "var(--green)" }}>/</span>
              </span>
            </div>
            <p
              className="mono"
              style={{
                opacity: 0.7,
                fontSize: 14,
                lineHeight: 1.55,
                maxWidth: 360,
                fontWeight: 500,
              }}
            >
              A városi bringás operációs rendszere.
              <br />
              Magyar termék — magyar közösség — magyar városok.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div
                className="hx"
                style={{
                  fontSize: 13,
                  marginBottom: 16,
                  color: "var(--green-100)",
                  letterSpacing: "0.02em",
                }}
              >
                → {c.t}
              </div>
              {c.l.map((l) => (
                <div key={l} style={{ marginBottom: 8 }}>
                  <a
                    href="#"
                    className="mono"
                    style={{
                      fontSize: 12,
                      opacity: 0.8,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              opacity: 0.5,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            © 2026 PARKSAFE — MADE IN HU
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              opacity: 0.5,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            v4.2 / 8,120 POI ● ONLINE
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .foot-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}
