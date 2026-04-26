import { Fragment } from "react";

const ITEMS = [
  "BIKE RACKS",
  "REPAIR SHOPS",
  "BIKE STORES",
  "DRINKING FOUNTAINS",
  "REPAIR STATIONS",
  "ROUTES",
  "CHALLENGES",
  "FRIENDS",
  "PERFORMANCE",
];

export default function TopMarquee() {
  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "14px 0",
        borderBottom: "3px solid var(--ink)",
        overflow: "hidden",
      }}
    >
      <div className="marquee">
        <div
          className="marquee-track mono"
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              style={{ display: "inline-flex", gap: 40, alignItems: "center" }}
            >
              {ITEMS.map((it, j) => (
                <Fragment key={j}>
                  <span style={{ color: j % 3 === 1 ? "var(--acid)" : "var(--paper)" }}>
                    ※ {it}
                  </span>
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
