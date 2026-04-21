// CTA + Footer
function FinalCTA() {
  return (
    <section style={{padding: '120px 28px', maxWidth: 1400, margin: '0 auto', position: 'relative'}}>
      <div style={{background: 'var(--green)', border: '3px solid var(--ink)', padding: '80px 40px', position: 'relative', overflow: 'hidden', boxShadow: '12px 12px 0 0 var(--ink)'}}>
        {/* Huge background number */}
        <div className="hx" style={{position: 'absolute', right: -20, bottom: -60, fontSize: 360, lineHeight: 0.8, color: 'var(--ink)', opacity: 0.1, pointerEvents: 'none', letterSpacing: '-0.05em'}}>2026</div>

        {/* Floating sticker labels */}
        <div style={{position: 'absolute', top: 30, left: 30, transform: 'rotate(-5deg)', background: 'var(--ink)', color: 'var(--green-100)', padding: '6px 14px', border: '2.5px solid var(--ink)', fontFamily: 'Archivo Black', fontSize: 13, letterSpacing: '0.03em'}} className="wobble">
          100% INGYENES
        </div>

        <div style={{position: 'relative', zIndex: 2}}>
          <div className="mono" style={{fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 24}}>§ 09 / DOWNLOAD</div>
          <h2 className="hx" style={{fontSize: 'clamp(64px, 11vw, 180px)', marginBottom: 28, letterSpacing: '-0.06em'}}>
            ÜLJ<br/>
            <span style={{display: 'inline-block', background: 'var(--ink)', color: 'var(--green-100)', padding: '0 20px'}}>NYEREGBE</span>.<br/>
            MI VEZETÜNK.
          </h2>
          <p style={{fontSize: 19, maxWidth: 580, marginBottom: 40, fontWeight: 500, lineHeight: 1.5, borderLeft: '5px solid var(--ink)', paddingLeft: 18}}>
            <strong>928K+</strong> POI / <strong>8</strong> magyar nagyváros / <strong>EU</strong> lefedettség.
          </p>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <button className="btn ink big" style={{fontSize: 16}}>
              <Ic.Apple s={20}/> App Store
            </button>
            <button className="btn big" style={{background: 'var(--green-100)', color: 'var(--ink)', fontSize: 16}}>
              <Ic.Play s={18}/> Google Play
            </button>
          </div>
          <div className="mono" style={{fontSize: 11, marginTop: 28, fontWeight: 700, letterSpacing: '0.1em'}}>
            iOS 15+ / ANDROID 10+ / ~48 MB
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{background: 'var(--ink)', color: 'var(--paper)', borderTop: '3px solid var(--ink)', padding: '60px 28px 30px'}}>
      <div style={{maxWidth: 1400, margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40, borderBottom: '2px solid rgba(255,255,255,0.15)'}} className="foot-grid">
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
              <img src="assets/logo.png" alt="" style={{width: 44, height: 44, border: '2.5px solid var(--paper)'}}/>
              <span className="hx" style={{fontSize: 26, letterSpacing: '-0.04em'}}>PARKSAFE<span style={{color: 'var(--green)'}}>/</span></span>
            </div>
            <p style={{opacity: 0.7, fontSize: 14, lineHeight: 1.55, maxWidth: 360, fontFamily: 'JetBrains Mono', fontWeight: 500}}>
              A városi bringás operációs rendszere. <br/>Magyar termék — magyar közösség — magyar városok.
            </p>
          </div>
          {[
            { t: 'TERMÉK', l: ['Térkép', 'Teljesítmény', 'Challenge-ek', 'Sync-ek'] },
            { t: 'KÖZÖSSÉG', l: ['Blog', 'Ranglisták', 'POI-t jelölni', 'Discord'] },
            { t: 'CÉG', l: ['Rólunk', 'Sajtó', 'Adatvédelem', 'ÁSZF'] },
          ].map((c, i) => (
            <div key={i}>
              <div className="hx" style={{fontSize: 13, marginBottom: 16, color: 'var(--green-100)', letterSpacing: '0.02em'}}>→ {c.t}</div>
              {c.l.map(l => <div key={l} style={{marginBottom: 8}}><a href="#" className="mono" style={{fontSize: 12, opacity: 0.8, fontWeight: 700, letterSpacing: '0.05em'}}>{l}</a></div>)}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: 28, flexWrap: 'wrap', gap: 16}}>
          <div className="mono" style={{fontSize: 11, opacity: 0.5, fontWeight: 700, letterSpacing: '0.1em'}}>© 2026 PARKSAFE — MADE IN HU</div>
          <div className="mono" style={{fontSize: 11, opacity: 0.5, fontWeight: 700, letterSpacing: '0.1em'}}>v4.2 / 8,120 POI ● ONLINE</div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .foot-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}

window.FinalCTA = FinalCTA;
window.Footer = Footer;
