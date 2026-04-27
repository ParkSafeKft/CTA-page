import { Ic } from "./Icons";

export default function Nav() {
  const links: [string, string][] = [
    ["Map", "#map"],
    ["Features", "#features"],
    ["Performance", "#fitness"],
    ["Community", "#social"],
    ["Blog", "#"],
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: "3px solid var(--ink)",
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a href="#" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="ParkSafe"
            style={{ width: 40, height: 40, border: "3px solid var(--ink)" }}
          />
          <span className="hx nav-logo-text" style={{ fontSize: 24, letterSpacing: "-0.04em" }}>
            PARKSAFE<span style={{ color: "var(--green)" }}>/</span>
          </span>
        </a>

        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="mono nav-link"
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </a>
          ))}
          <button className="btn nav-cta" style={{ padding: "10px 16px", fontSize: 12 }}>
            <Ic.Download s={14} /> Download
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .nav-links .nav-link { display: none; }
        }
        @media (max-width: 640px) {
          .nav-inner { padding: 10px 14px !important; gap: 10px !important; }
          .nav-logo img { width: 34px !important; height: 34px !important; }
          .nav-logo-text { font-size: 18px !important; }
          .nav-cta { padding: 8px 12px !important; font-size: 11px !important; }
        }
      `}</style>
    </nav>
  );
}
