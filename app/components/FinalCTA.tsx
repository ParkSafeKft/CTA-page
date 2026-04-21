import { Ic } from "./Icons";

export default function FinalCTA() {
  return (
    <section
      className="cta-section"
      style={{
        padding: "120px 28px",
        maxWidth: 1400,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="cta-card"
        style={{
          background: "var(--green)",
          border: "3px solid var(--ink)",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "12px 12px 0 0 var(--ink)",
        }}
      >
        <div
          aria-hidden
          className="hx cta-bg-year"
          style={{
            position: "absolute",
            right: -20,
            bottom: -60,
            fontSize: "clamp(180px, 32vw, 360px)",
            lineHeight: 0.8,
            color: "var(--ink)",
            opacity: 0.1,
            pointerEvents: "none",
            letterSpacing: "-0.05em",
          }}
        >
          2026
        </div>

        <div
          className="wobble cta-sticker"
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            transform: "rotate(-5deg)",
            background: "var(--ink)",
            color: "var(--green-100)",
            padding: "6px 14px",
            border: "2.5px solid var(--ink)",
            fontFamily: "var(--font-archivo-black), 'Archivo Black', sans-serif",
            fontSize: 13,
            letterSpacing: "0.03em",
          }}
        >
          100% INGYENES
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            className="mono"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 24,
            }}
          >
            § 09 / DOWNLOAD
          </div>
          <h2
            className="hx cta-headline"
            style={{
              fontSize: "clamp(44px, 11vw, 180px)",
              marginBottom: 28,
              letterSpacing: "-0.06em",
            }}
          >
            ÜLJ
            <br />
            <span
              className="cta-pill"
              style={{
                display: "inline-block",
                background: "var(--ink)",
                color: "var(--green-100)",
                padding: "0 20px",
              }}
            >
              NYEREGBE
            </span>
            .
            <br />
            MI VEZETÜNK.
          </h2>
          <p
            style={{
              fontSize: 19,
              maxWidth: 580,
              marginBottom: 40,
              fontWeight: 500,
              lineHeight: 1.5,
              borderLeft: "5px solid var(--ink)",
              paddingLeft: 18,
            }}
          >
            <strong>928K+</strong> POI / <strong>8</strong> magyar nagyváros /{" "}
            <strong>EU</strong> lefedettség.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn ink big" style={{ fontSize: 16 }}>
              <Ic.Apple s={20} /> App Store
            </button>
            <button
              className="btn big"
              style={{
                background: "var(--green-100)",
                color: "var(--ink)",
                fontSize: 16,
              }}
            >
              <Ic.Play s={18} /> Google Play
            </button>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              marginTop: 28,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            iOS 15+ / ANDROID 10+ / ~48 MB
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .cta-section { padding: 60px 16px !important; }
          .cta-card { padding: 88px 22px 56px !important; box-shadow: 6px 6px 0 0 var(--ink) !important; }
          .cta-pill { padding: 0 12px !important; }
        }
        @media (max-width: 420px) {
          .cta-card { padding: 80px 18px 48px !important; }
          .cta-sticker { top: 20px !important; left: 18px !important; font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}
