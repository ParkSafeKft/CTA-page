import { Ic } from "./Icons";

export default function Hero() {
  return (
    <section
      className="grid-bg hero-section"
      style={{
        position: "relative",
        padding: "56px 28px 80px",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 28,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span className="sec-num" style={{ margin: 0 }}>§ 01 / MANIFESTO</span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                background: "var(--green-100)",
                border: "2.5px solid var(--ink)",
                letterSpacing: "0.06em",
              }}
            >
              ● 928K+ POI / 150+ CITIES / EU
            </span>
          </div>

          <h1
            className="hx hero-headline"
            style={{
              fontSize: "clamp(44px, 10vw, 140px)",
              marginBottom: 28,
              letterSpacing: "-0.055em",
            }}
          >
            URBAN
            <br />
            <span
              style={{
                display: "inline-block",
                background: "var(--ink)",
                color: "var(--green-100)",
                padding: "0 18px",
                marginLeft: -2,
              }}
            >
              CYCLISTS
            </span>
            <br />
            <span style={{ color: "var(--green)" }}>NEVER</span> GET LOST.
          </h1>

          <p
            style={{
              fontSize: 19,
              maxWidth: 540,
              marginBottom: 32,
              fontWeight: 500,
              lineHeight: 1.5,
              color: "var(--ink-soft)",
              borderLeft: "5px solid var(--ink)",
              paddingLeft: 18,
            }}
          >
            Racks, repair shops, stores, drinking fountains, repair stations — on one map.
            Route planner, performance tracking, community challenges.
            <strong style={{ color: "var(--ink)", display: "block", marginTop: 8 }}>
              → One app for everyday cycling.
            </strong>
          </p>

          <div
            className="hero-buttons"
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 44,
            }}
          >
            <button className="btn big">
              <Ic.Apple s={18} /> App Store
            </button>
            <button className="btn ink big">
              <Ic.Play s={16} /> Google Play
            </button>
            <button className="btn ghost big">
              <Ic.Map s={18} /> MAP →
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              padding: "16px 18px",
              border: "2.5px solid var(--ink)",
              background: "var(--cream)",
              maxWidth: 520,
            }}
          >
            <div style={{ display: "flex" }}>
              {["#ff4d1a", "#d6ff4a", "#2a3fff", "#ff2d87", "#111111"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    background: c,
                    border: "2.5px solid var(--ink)",
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                />
              ))}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 2,
                  color: "var(--green)",
                  marginBottom: 2,
                  alignItems: "center",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ic.Star key={i} s={14} />
                ))}
                <span
                  className="mono"
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  4.8 / 5.0
                </span>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink-soft)",
                  textTransform: "uppercase",
                }}
              >
                Cycling community. EU-wide map.
              </div>
            </div>
          </div>
        </div>

        {/* Right: hero mockup */}
        <div className="hero-right" style={{ position: "relative", minHeight: 640 }}>
          <div
            className="hero-right-bg"
            style={{
              position: "absolute",
              top: 40,
              right: 0,
              width: "100%",
              height: 520,
              background: "var(--green-100)",
              border: "3px solid var(--ink)",
              zIndex: 0,
              boxShadow: "var(--shadow-lg)",
            }}
          />
          <div
            className="mono"
            style={{
              position: "absolute",
              top: 30,
              right: -10,
              zIndex: 2,
              fontSize: 10,
              fontWeight: 700,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            FIG.01 — APP PREVIEW / EU
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "grid",
              placeItems: "center",
              padding: "40px 20px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero_mockup.png"
              alt="ParkSafe app screenshot"
              style={{
                width: "95%",
                maxWidth: 460,
                filter: "drop-shadow(10px 10px 0 var(--ink))",
              }}
            />
          </div>

          {/* sticker: rack */}
          <div
            className="hero-sticker-1"
            style={{
              position: "absolute",
              top: 20,
              left: -10,
              padding: "10px 14px",
              background: "var(--green)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              zIndex: 10,
              transform: "rotate(-3deg)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--ink)",
                color: "var(--green)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Ic.Bike s={18} />
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" }}
              >
                → RACK
              </div>
              <div className="hx" style={{ fontSize: 15 }}>
                120 M
              </div>
            </div>
          </div>

          {/* sticker: repair */}
          <div
            className="hero-sticker-2"
            style={{
              position: "absolute",
              top: 200,
              right: -20,
              padding: "10px 14px",
              background: "var(--green-100)",
              color: "var(--ink)",
              border: "3px solid var(--ink)",
              zIndex: 10,
              transform: "rotate(4deg)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--ink)",
                color: "var(--green-100)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Ic.Wrench s={18} />
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" }}
              >
                → REPAIR
              </div>
              <div className="hx" style={{ fontSize: 15 }}>
                OPEN
              </div>
            </div>
          </div>

          {/* sticker: fountain */}
          <div
            className="hero-sticker-3"
            style={{
              position: "absolute",
              bottom: 60,
              right: 30,
              padding: "10px 14px",
              background: "var(--blue)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              zIndex: 10,
              transform: "rotate(-2deg)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--paper)",
                color: "var(--blue)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Ic.Droplet s={18} />
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" }}
              >
                → FOUNTAIN
              </div>
              <div className="hx" style={{ fontSize: 15 }}>
                MAIN SQ.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-right { min-height: 520px !important; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 36px 16px 56px !important; }
          .hero-right { min-height: 440px !important; }
          .hero-right-bg { height: 400px !important; top: 30px !important; }
          .hero-buttons .btn.big { padding: 14px 18px !important; font-size: 14px !important; }
          .hero-sticker-1 { top: 10px !important; left: 0 !important; transform: rotate(-3deg) scale(0.82) !important; transform-origin: top left !important; }
          .hero-sticker-2 { top: 160px !important; right: 0 !important; transform: rotate(4deg) scale(0.82) !important; transform-origin: top right !important; }
          .hero-sticker-3 { bottom: 20px !important; right: 0 !important; transform: rotate(-2deg) scale(0.82) !important; transform-origin: bottom right !important; }
        }
      `}</style>
    </section>
  );
}
