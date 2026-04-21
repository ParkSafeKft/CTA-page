"use client";

import { useState } from "react";

const TABS = [
  {
    n: "Felfedezés",
    code: "EXPLORE",
    img: "/assets/map_city.png",
    desc: "Szűrd típusra: csak tárolók, csak szervizek, vagy minden együtt. Clustered markerek, real-time nyitvatartás.",
  },
  {
    n: "Részletek",
    code: "DETAIL",
    img: "/assets/map_detail.png",
    desc: "Minden ponthoz: fényképek, értékelések, felszereltség (fedett / kamerás / 24/7), közösségi bejelentések.",
  },
  {
    n: "Útvonal",
    code: "ROUTE",
    img: "/assets/screen_nav.png",
    desc: "Biciklis-barát navigáció — bike lane-ek, kevésbé forgalmas útvonalak, elkerülhető dombok.",
  },
];

export default function MapShowcase() {
  const [tab, setTab] = useState(0);
  const active = TABS[tab];

  return (
    <section
      id="map"
      style={{
        background: "var(--paper-2)",
        borderTop: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
        padding: "100px 28px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="sec-num">§ 04 / THE MAP</span>
            <h2
              className="hx"
              style={{ fontSize: "clamp(44px, 6vw, 88px)", letterSpacing: "-0.05em" }}
            >
              MINDEN PONT.
              <br />
              EGY <span style={{ color: "var(--green)" }}>TÉRKÉP</span>.
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              border: "3px solid var(--ink)",
              background: "var(--cream)",
              boxShadow: "var(--shadow)",
            }}
          >
            {TABS.map((t, i) => {
              const isActive = tab === i;
              return (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  style={{
                    padding: "14px 22px",
                    fontFamily: "var(--font-archivo-black), 'Archivo Black', sans-serif",
                    fontSize: 13,
                    border: "none",
                    borderRight: i < TABS.length - 1 ? "3px solid var(--ink)" : "none",
                    background: isActive ? "var(--green)" : "transparent",
                    color: isActive ? "#fff" : "var(--ink)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    transition: "background .12s ease, color .12s ease",
                    minWidth: 120,
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "var(--green-100)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isActive ? "→ " : ""}
                  {t.n}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="map-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 0,
            border: "3px solid var(--ink)",
            background: "var(--cream)",
          }}
        >
          <div
            className="map-img-wrap"
            style={{
              background: "var(--ink)",
              overflow: "hidden",
              position: "relative",
              aspectRatio: "1 / 1.15",
              borderRight: "3px solid var(--ink)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.img}
              alt={active.n}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="mono"
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                padding: "6px 10px",
                background: "var(--green-100)",
                border: "2.5px solid var(--ink)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  className="blink"
                  style={{ width: 7, height: 7, background: "var(--ink)" }}
                />
                LIVE / {active.code}
              </div>
            </div>
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                padding: "6px 10px",
                background: "var(--ink)",
                color: "var(--green-100)",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>
                47.498°N / 19.040°E
              </span>
            </div>
          </div>

          <div
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: 10,
              }}
            >
              MODE [{String(tab + 1).padStart(2, "0")}] — {active.code}
            </div>
            <div
              className="hx"
              style={{
                fontSize: 48,
                marginBottom: 18,
                letterSpacing: "-0.04em",
              }}
            >
              {active.n.toUpperCase()}
            </div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.5,
                marginBottom: 28,
                fontWeight: 500,
              }}
            >
              {active.desc}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2.5px solid var(--ink)",
              }}
            >
              {[
                "Közösségi pontosítások & fényképek",
                "Minden pont szerkeszthető — te is hozzáadhatsz",
                "Mentett helyek szinkronizálódnak eszközök között",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 14px",
                    borderBottom: i < 2 ? "2.5px solid var(--ink)" : "none",
                    background: i % 2 ? "var(--paper-2)" : "transparent",
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 11, fontWeight: 700, color: "var(--green)" }}
                  >
                    →
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .map-grid { grid-template-columns: 1fr !important; }
          .map-img-wrap { border-right: none !important; border-bottom: 3px solid var(--ink) !important; }
        }
      `}</style>
    </section>
  );
}
