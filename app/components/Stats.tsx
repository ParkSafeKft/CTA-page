export default function Stats() {
  const stats = [
    { n: "928K+", l: "POIs on the map" },
    { n: "658K+", l: "bike racks" },
    { n: "224K+", l: "drinking fountains" },
    { n: "150+", l: "major cities" },
    { n: "EU", l: "coverage" },
  ];

  const accent = (i: number) =>
    i === 1 ? "var(--acid)" : i === 3 ? "var(--orange)" : "var(--paper)";

  return (
    <section
      className="stats-section"
      style={{
        background: "var(--ink)",
        borderTop: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        padding: "40px 28px",
        color: "var(--paper)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--green-100)",
            marginBottom: 20,
          }}
        >
          § 02 / NUMBERS — LIVE DATA / 2026.04
        </div>
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                borderLeft: i > 0 ? "2px solid rgba(255,255,255,0.2)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
                paddingRight: 12,
              }}
            >
              <div
                className="hx"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  color: accent(i),
                }}
              >
                {s.n}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginTop: 6,
                  opacity: 0.75,
                  letterSpacing: "0.08em",
                }}
              >
                → {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 20px 16px !important; }
          .stats-grid > div { border-left: none !important; padding-left: 0 !important; padding-right: 0 !important; }
        }
        @media (max-width: 560px) {
          .stats-section { padding: 32px 16px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 18px 14px !important; }
          .stats-grid > div:last-child { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}
