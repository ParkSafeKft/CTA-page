import { Ic, type IconKey } from "./Icons";

const BARS = [
  { v: 24, big: false },
  { v: 38, big: false },
  { v: 52, big: false },
  { v: 68, big: false },
  { v: 200, big: true },
  { v: 45, big: false },
  { v: 78, big: false },
] as const;

const DAYS = ["H", "K", "Sz", "Cs", "P", "Sz", "V"];

type Row = { l: string; v: string; i: IconKey };
const ROWS: Row[] = [
  { l: "Távolság", v: "142.8 km", i: "Route" },
  { l: "Idő nyeregben", v: "6ó 24p", i: "Clock" },
  { l: "Átlagsebesség", v: "22.3 km/h", i: "Zap" },
  { l: "Szintkülönbség", v: "384 m ↑", i: "Activity" },
];

const SHARDS: React.CSSProperties[] = [
  {
    left: -36,
    top: -16,
    width: 12,
    height: 18,
    clipPath: "polygon(85% 0, 100% 100%, 0 70%)",
    transform: "rotate(-55deg)",
  },
  {
    left: -18,
    top: -34,
    width: 9,
    height: 14,
    clipPath: "polygon(100% 20%, 70% 100%, 0 0)",
    transform: "rotate(-30deg)",
  },
  {
    left: "50%",
    top: -40,
    marginLeft: -6,
    width: 12,
    height: 16,
    clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    transform: "rotate(8deg)",
  },
  {
    right: -16,
    top: -30,
    width: 10,
    height: 14,
    clipPath: "polygon(0 0, 100% 60%, 30% 100%)",
    transform: "rotate(35deg)",
  },
  {
    right: -34,
    top: -14,
    width: 14,
    height: 18,
    clipPath: "polygon(0 20%, 100% 0, 20% 100%)",
    transform: "rotate(55deg)",
  },
];

export default function Fitness() {
  return (
    <section
      id="fitness"
      style={{
        padding: "100px 28px",
        background: "var(--ink)",
        color: "var(--paper)",
        borderTop: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(214,255,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(214,255,74,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--green-100)",
            marginBottom: 28,
          }}
        >
          § 06 / PERFORMANCE LOG — ÖSSZES ADATOD, EGYBEN
        </div>

        <div
          className="fit-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="hx"
              style={{
                fontSize: "clamp(52px, 7.5vw, 108px)",
                marginBottom: 24,
                letterSpacing: "-0.05em",
              }}
            >
              NEM CSAK
              <br />
              ELÉRSZ.
              <br />
              <span style={{ color: "var(--green-100)" }}>FEJLŐDSZ</span>
              <br />
              IS.
            </h2>
            <p
              style={{
                fontSize: 18,
                maxWidth: 480,
                lineHeight: 1.5,
                marginBottom: 32,
                opacity: 0.8,
                fontWeight: 500,
                borderLeft: "4px solid var(--orange)",
                paddingLeft: 16,
              }}
            >
              Minden utad automatikusan rögzül — távolság, idő, sebesség, szintkülönbség, kalória.
              Heti / havi / éves statisztikák + ismerősök összehasonlítása.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                border: "2.5px solid var(--acid)",
                marginBottom: 28,
              }}
            >
              {[
                { l: "Rögzített túra", v: "221" },
                { l: "Megtett táv", v: "1,189" },
                { l: "Szintemelkedés", v: "33.8K" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: 14,
                    borderRight: i < 2 ? "2.5px solid var(--acid)" : "none",
                  }}
                >
                  <div
                    className="hx"
                    style={{
                      fontSize: 34,
                      color:
                        i === 0
                          ? "var(--acid)"
                          : i === 1
                          ? "var(--orange)"
                          : "var(--paper)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      opacity: 0.7,
                      marginTop: 4,
                      letterSpacing: "0.08em",
                    }}
                  >
                    → {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mock */}
          <div
            style={{
              background: "var(--paper)",
              color: "var(--ink)",
              padding: 24,
              border: "3px solid var(--ink)",
              boxShadow: "10px 10px 0 0 var(--acid)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                paddingBottom: 14,
                borderBottom: "2.5px solid var(--ink)",
              }}
            >
              <div>
                <div
                  className="mono"
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em" }}
                >
                  WEEK.17 / 2026
                </div>
                <div className="hx" style={{ fontSize: 24, letterSpacing: "-0.04em" }}>
                  TELJESÍTMÉNY
                </div>
              </div>
              <div
                className="mono"
                style={{
                  padding: "4px 10px",
                  background: "var(--ink)",
                  color: "var(--green-100)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                +18% ↑
              </div>
            </div>

            {/* bars */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 140,
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "2.5px solid var(--ink)",
                position: "relative",
                overflow: "visible",
              }}
            >
              {BARS.map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${b.v}%`,
                    background: b.big ? "#34aa56" : "var(--ink)",
                    border: b.big ? "none" : "2px solid var(--ink)",
                    position: "relative",
                  }}
                >
                  {b.big && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/logo_white.png"
                        alt=""
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "110%",
                          maxWidth: 44,
                          height: "auto",
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      />
                      {SHARDS.map((style, k) => (
                        <div
                          key={k}
                          aria-hidden
                          style={{
                            position: "absolute",
                            background: "var(--paper)",
                            filter: "drop-shadow(1px 1px 0 rgba(10,31,18,0.3))",
                            zIndex: 4,
                            ...style,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div
              className="mono"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
            >
              {DAYS.map((d, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    flex: 1,
                    textAlign: "center",
                    opacity: i === 6 ? 1 : 0.55,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {ROWS.map((r, i) => {
              const Icon = Ic[r.i];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1.5px dashed var(--ink)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        background: "var(--ink)",
                        color: "var(--green-100)",
                        border: "2px solid var(--ink)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon s={16} />
                    </div>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {r.l}
                    </span>
                  </div>
                  <span className="hx" style={{ fontSize: 18, letterSpacing: "-0.03em" }}>
                    {r.v}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .fit-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
