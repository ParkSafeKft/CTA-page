import { Ic, type IconKey } from "./Icons";

type Feat = { t: string; d: string; ic: IconKey; n: string };

const FEATURES: Feat[] = [
  {
    t: "Community POIs",
    d: "You mark points, upload photos, leave ratings. The map is by the community, for the community.",
    ic: "Users",
    n: "01",
  },
  {
    t: "Offline saving",
    d: "Download your city, works without data. No signal anxiety on tour.",
    ic: "Map",
    n: "02",
  },
  {
    t: "Favorites + notes",
    d: "Quick access, your own notes on every point (\"key at the snack bar\").",
    ic: "Heart",
    n: "03",
  },
  {
    t: "Community reports",
    d: "Broken fountain? Closed shop? The community reports it, everyone sees it.",
    ic: "Flag",
    n: "04",
  },
  {
    t: "Ride tracking",
    d: "Automatic GPS tracking — distance, time, speed, elevation, calories.",
    ic: "Route",
    n: "05",
  },
  {
    t: "GPX export",
    d: "Every ride is exportable and shareable.",
    ic: "Download",
    n: "06",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="feat-section"
      style={{ padding: "100px 28px", maxWidth: 1400, margin: "0 auto" }}
    >
      <div
        style={{
          marginBottom: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <span className="sec-num">§ 05 / FEATURES</span>
          <h2
            className="hx"
            style={{ fontSize: "clamp(48px, 7vw, 100px)", letterSpacing: "-0.05em" }}
          >
            WHAT EVERY
            <br />
            CYCLIST <span style={{ color: "var(--green)" }}>NEEDS</span>.
          </h2>
        </div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "10px 14px",
            border: "2.5px solid var(--ink)",
            background: "var(--green-100)",
          }}
        >
          06 MODULES — FULL LIST →
        </div>
      </div>

      <div
        className="feat-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
      >
        {FEATURES.map((f, i) => {
          const Icon = Ic[f.ic];
          return (
            <div
              key={i}
              className="card"
              style={{
                padding: 26,
                background: "var(--cream)",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "var(--ink)",
                  color: "var(--green-100)",
                  padding: "4px 10px",
                  fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {f.n}
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--ink)",
                  color: "var(--green)",
                  border: "2.5px solid var(--ink)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 18,
                }}
              >
                <Icon s={26} />
              </div>
              <div
                className="hx"
                style={{ fontSize: 22, marginBottom: 10, letterSpacing: "-0.03em" }}
              >
                {f.t.toUpperCase()}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>
                {f.d}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .feat-section { padding: 64px 20px !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .feat-section { padding: 56px 16px !important; }
          .feat-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feat-grid .card { min-height: auto !important; padding: 22px !important; }
        }
      `}</style>
    </section>
  );
}
