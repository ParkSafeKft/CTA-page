const QUOTES = [
  {
    q: "Finally a cycling app actually built for my city. All the local drinking fountains are in it — a lifesaver in summer.",
    a: "Kata B.",
    r: "SZEGED",
    c: "var(--green-100)",
    num: "01",
  },
  {
    q: "First thing in the morning: I check which racks are free near the office. Never chaining my bike to a gate again.",
    a: "Bence T.",
    r: "BUDAPEST",
    c: "var(--green)",
    num: "02",
  },
  {
    q: "I walk to work, but my partner uses it so I downloaded it out of curiosity. Ended up cycling myself.",
    a: "Eszter L.",
    r: "DEBRECEN",
    c: "var(--cream)",
    num: "03",
  },
];

export default function Testimonials() {
  return (
    <section className="quote-section" style={{ padding: "90px 28px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <span className="sec-num">§ 08 / VOICES</span>
        <h2
          className="hx"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)", letterSpacing: "-0.05em" }}
        >
          THE <span style={{ color: "var(--green)" }}>COMMUNITY</span> SPEAKS.
        </h2>
      </div>
      <div
        className="quote-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          border: "3px solid var(--ink)",
        }}
      >
        {QUOTES.map((q, i) => (
          <div
            key={i}
            className="quote-cell"
            style={{
              padding: 28,
              background: q.c,
              borderRight: i < 2 ? "3px solid var(--ink)" : "none",
              position: "relative",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                marginBottom: 14,
              }}
            >
              TESTIMONIAL / {q.num}
            </div>
            <div
              className="hx"
              style={{
                fontSize: 80,
                lineHeight: 0.6,
                marginBottom: 14,
                letterSpacing: "-0.05em",
              }}
            >
              &ldquo;
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.45, fontWeight: 500, marginBottom: 24 }}>
              {q.q}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingTop: 14,
                borderTop: "2.5px solid var(--ink)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--ink)",
                  color: q.c,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-archivo-black), 'Archivo Black', sans-serif",
                  fontSize: 16,
                }}
              >
                {q.a[0]}
              </div>
              <div>
                <div className="hx" style={{ fontSize: 14, letterSpacing: "-0.02em" }}>
                  {q.a.toUpperCase()}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    opacity: 0.8,
                  }}
                >
                  → {q.r}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .quote-grid { grid-template-columns: 1fr !important; }
          .quote-cell { border-right: none !important; border-bottom: 3px solid var(--ink) !important; }
          .quote-cell:last-child { border-bottom: none !important; }
        }
        @media (max-width: 640px) {
          .quote-section { padding: 56px 16px !important; }
          .quote-cell { padding: 22px !important; }
        }
      `}</style>
    </section>
  );
}
