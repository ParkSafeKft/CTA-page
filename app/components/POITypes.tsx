import { Ic, type IconKey } from "./Icons";

type POI = {
  n: string;
  d: string;
  c: string;
  fg: string;
  ic: IconKey;
  count: string;
  code: string;
};

const TYPES: POI[] = [
  {
    n: "Kerékpártárolók",
    d: "Fedett, kamerás, 24/7. Szűrd arra amit szeretsz.",
    c: "var(--green)",
    fg: "var(--ink)",
    ic: "Bike",
    count: "658K",
    code: "PRK",
  },
  {
    n: "Ivókutak",
    d: "Hogy sose szomjazz útközben. Részletes városi lefedettség.",
    c: "var(--blue)",
    fg: "var(--paper)",
    ic: "Droplet",
    count: "224K",
    code: "WTR",
  },
  {
    n: "Szervizek + boltok",
    d: "Defektjavítás, fékbeállítás, alkatrészek, új bringák.",
    c: "var(--green-100)",
    fg: "var(--ink)",
    ic: "Wrench",
    count: "31K",
    code: "SRV",
  },
  {
    n: "Javítóállomások",
    d: "Önkiszolgáló szerelőpont, pumpa, szerszám — ingyen.",
    c: "var(--pink)",
    fg: "var(--ink)",
    ic: "Zap",
    count: "13K",
    code: "RPR",
  },
  {
    n: "EU lefedettség",
    d: "Majdnem minden EU-s országban — nem csak itthon működik.",
    c: "var(--cream)",
    fg: "var(--ink)",
    ic: "Map",
    count: "EU",
    code: "GEO",
  },
  {
    n: "Plusz folyamatosan",
    d: "Biciklis-barát kávézók, pihenőhelyek — közösség bővíti.",
    c: "var(--ink)",
    fg: "var(--green-100)",
    ic: "Sparkle",
    count: "+",
    code: "+++",
  },
];

export default function POITypes() {
  return (
    <section
      className="poi-section"
      style={{ padding: "100px 28px", maxWidth: 1400, margin: "0 auto" }}
    >
      <div style={{ marginBottom: 56, maxWidth: 820 }}>
        <span className="sec-num">§ 03 / POI INDEX</span>
        <h2
          className="hx"
          style={{
            fontSize: "clamp(48px, 7vw, 104px)",
            marginBottom: 16,
            letterSpacing: "-0.05em",
          }}
        >
          NEM CSAK
          <br />
          <span style={{ color: "var(--green)" }}>EGY</span> DOLOG.
        </h2>
        <p
          style={{
            fontSize: 18,
            maxWidth: 620,
            lineHeight: 1.5,
            fontWeight: 500,
            borderLeft: "4px solid var(--ink)",
            paddingLeft: 16,
          }}
        >
          A ParkSafe <strong>komplett</strong> biciklis térkép — nem csak tárolók.
          Minden, ami városi bringázáshoz kell, <strong>egy</strong> app-ban.
        </p>
      </div>

      <div
        className="poi-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          border: "3px solid var(--ink)",
        }}
      >
        {TYPES.map((t, i) => {
          const Icon = Ic[t.ic];
          return (
            <div
              key={i}
              className="poi-cell"
              style={{
                padding: 28,
                background: t.c,
                color: t.fg,
                minHeight: 240,
                borderRight: i % 3 !== 2 ? "3px solid var(--ink)" : "none",
                borderBottom: i < 3 ? "3px solid var(--ink)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="mono"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 14,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  opacity: 0.6,
                }}
              >
                {String(i + 1).padStart(2, "0")} / 06
              </div>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: t.fg,
                  color: t.c,
                  border: `3px solid ${t.fg}`,
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                }}
              >
                <Icon s={32} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}
                >
                  [{t.code}]
                </span>
                <span
                  className="hx"
                  style={{ fontSize: 22, letterSpacing: "-0.03em" }}
                >
                  {t.n.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 18, opacity: 0.9 }}>
                {t.d}
              </div>
              <div
                className="hx"
                style={{
                  fontSize: 36,
                  letterSpacing: "-0.04em",
                  position: "absolute",
                  bottom: 16,
                  right: 20,
                  opacity: 0.9,
                }}
              >
                {t.count}
                <span style={{ fontSize: 16 }}>+</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .poi-section { padding: 64px 20px !important; }
          .poi-grid { grid-template-columns: 1fr 1fr !important; }
          .poi-cell { border-right: none !important; border-bottom: 3px solid var(--ink) !important; }
          .poi-cell:nth-last-child(-n+2) { border-bottom: none !important; }
          .poi-cell:nth-child(odd) { border-right: 3px solid var(--ink) !important; }
        }
        @media (max-width: 600px) {
          .poi-section { padding: 56px 16px !important; }
          .poi-grid { grid-template-columns: 1fr !important; }
          .poi-cell { padding: 22px !important; min-height: auto !important; border-right: none !important; border-bottom: 3px solid var(--ink) !important; }
          .poi-cell:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
