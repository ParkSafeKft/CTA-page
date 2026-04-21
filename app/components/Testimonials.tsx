const QUOTES = [
  {
    q: "Végre egy bringás app, ami tényleg magyar városokra van szabva. A szegedi ivókutak mind benne vannak — életmentő nyáron.",
    a: "Kata B.",
    r: "SZEGED",
    c: "var(--green-100)",
    num: "01",
  },
  {
    q: "Reggelente az első dolgom: megnézem hol szabad a tároló a munkahely mellett. Soha többé nem láncolom ki a kapuhoz.",
    a: "Bence T.",
    r: "BUDAPEST",
    c: "var(--green)",
    num: "02",
  },
  {
    q: "Gyalog dolgozom, de a párom ezt használja és letöltöttem csak kíváncsiságból. Végül én is elkezdtem bringázni.",
    a: "Eszter L.",
    r: "DEBRECEN",
    c: "var(--cream)",
    num: "03",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "90px 28px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <span className="sec-num">§ 08 / VOICES</span>
        <h2
          className="hx"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)", letterSpacing: "-0.05em" }}
        >
          A <span style={{ color: "var(--green)" }}>KÖZÖSSÉG</span> MONDJA.
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
      `}</style>
    </section>
  );
}
