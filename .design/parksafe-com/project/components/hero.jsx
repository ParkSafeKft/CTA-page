const { useState: uS, useEffect: uE, useRef: uR } = React;

// ========== NAV ==========
function Nav() {
  return (
    <nav style={{position: 'sticky', top: 0, zIndex: 50, background: 'var(--paper)', borderBottom: '3px solid var(--ink)'}}>
      <div style={{maxWidth: 1400, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24}}>
        <a href="#" style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <img src="assets/logo.png" alt="ParkSafe" style={{width: 40, height: 40, border: '3px solid var(--ink)', borderRadius: 0}}/>
          <span className="hx" style={{fontSize: 24, letterSpacing: '-0.04em'}}>PARKSAFE<span style={{color: 'var(--green)'}}>/</span></span>
        </a>
        <div style={{display: 'flex', alignItems: 'center', gap: 28}} className="nav-links">
          {[['Térkép', '#map'], ['Funkciók', '#features'], ['Teljesítmény', '#fitness'], ['Közösség', '#social'], ['Blog', '#']].map(([l, h]) => (
            <a key={l} href={h} style={{fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>{l}</a>
          ))}
          <button className="btn" style={{padding: '10px 16px', fontSize: 12}}>
            <Ic.Download s={14}/> Letöltés
          </button>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .nav-links a { display: none; } }`}</style>
    </nav>
  );
}

// ========== MARQUEE ==========
function TopMarquee() {
  const items = [
    'BICIKLITÁROLÓK',
    'SZERVIZEK',
    'BICIKLIBOLTOK',
    'IVÓKUTAK',
    'REPAIR STATIONÖK',
    'ÚTVONALAK',
    'CHALLENGE-EK',
    'ISMERŐSÖK',
    'TELJESÍTMÉNY',
  ];
  return (
    <div style={{background: 'var(--ink)', color: 'var(--paper)', padding: '14px 0', borderBottom: '3px solid var(--ink)', overflow: 'hidden'}}>
      <div className="marquee">
        <div className="marquee-track mono" style={{fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em'}}>
          {Array(4).fill(0).map((_, i) => (
            <span key={i} style={{display: 'inline-flex', gap: 40, alignItems: 'center'}}>
              {items.map((it, j) => (
                <React.Fragment key={j}>
                  <span style={{color: j % 3 === 1 ? 'var(--acid)' : 'var(--paper)'}}>※ {it}</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== HERO ==========
function Hero() {
  return (
    <section style={{position: 'relative', padding: '56px 28px 80px', maxWidth: 1400, margin: '0 auto'}} className="grid-bg">
      <div style={{display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 48, alignItems: 'center'}} className="hero-grid">
        <div>
          {/* Document-style metadata row */}
          <div style={{display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center'}}>
            <span className="sec-num" style={{margin: 0}}>§ 01 / MANIFESTO</span>
            <span className="mono" style={{fontSize: 11, fontWeight: 700, padding: '4px 10px', background: 'var(--green-100)', border: '2.5px solid var(--ink)', letterSpacing: '0.06em'}}>
              ● 928K+ POI / 8 VÁROS / EU
            </span>
          </div>

          <h1 className="hx" style={{fontSize: 'clamp(64px, 9vw, 140px)', marginBottom: 28, letterSpacing: '-0.055em'}}>
            A VÁROS<br/>
            <span style={{display: 'inline-block', background: 'var(--ink)', color: 'var(--green-100)', padding: '0 18px', marginLeft: -2}}>BRINGÁSAI</span><br/>
            <span style={{color: 'var(--green)'}}>NEM</span> TÉVEDNEK EL.
          </h1>

          <p style={{fontSize: 19, maxWidth: 540, marginBottom: 32, fontWeight: 500, lineHeight: 1.5, color: 'var(--ink-soft)', borderLeft: '5px solid var(--ink)', paddingLeft: 18}}>
            Tárolók, szervizek, boltok, ivókutak, javítóállomások — egy térképen.
            Útvonaltervező, teljesítmény-tracking, közösségi challenge-ek.
            <strong style={{color: 'var(--ink)', display: 'block', marginTop: 8}}>→ Egy app a biciklis mindennapokhoz.</strong>
          </p>

          <div style={{display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44}}>
            <button className="btn big">
              <Ic.Apple s={18}/> App Store
            </button>
            <button className="btn ink big">
              <Ic.Play s={16}/> Google Play
            </button>
            <button className="btn ghost big">
              <Ic.Map s={18}/> TÉRKÉP →
            </button>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', padding: '16px 18px', border: '2.5px solid var(--ink)', background: 'var(--cream)', maxWidth: 520}}>
            <div style={{display: 'flex'}}>
              {['#ff4d1a','#d6ff4a','#2a3fff','#ff2d87','#111111'].map((c, i) => (
                <div key={i} style={{width: 36, height: 36, background: c, border: '2.5px solid var(--ink)', marginLeft: i > 0 ? -8 : 0}}/>
              ))}
            </div>
            <div>
              <div style={{display: 'flex', gap: 2, color: 'var(--green)', marginBottom: 2}}>
                {[1,2,3,4,5].map(i => <Ic.Star key={i} s={14}/>)}
                <span className="mono" style={{marginLeft: 8, fontSize: 12, fontWeight: 700, color: 'var(--ink)'}}>4.8 / 5.0</span>
              </div>
              <div className="mono" style={{fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase'}}>Magyar közösség. EU-s térkép.</div>
            </div>
          </div>
        </div>

        {/* Right: hero mockup */}
        <div style={{position: 'relative', minHeight: 640}}>
          {/* Background grid panel */}
          <div style={{position: 'absolute', top: 40, right: 0, width: '100%', height: 520, background: 'var(--green-100)', border: '3px solid var(--ink)', zIndex: 0, boxShadow: 'var(--shadow-lg)'}}/>
          {/* Corner crosshairs */}
          <div style={{position: 'absolute', top: 30, right: -10, zIndex: 2, fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700, writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>FIG.01 — APP PREVIEW / HU</div>

          <div style={{position: 'relative', zIndex: 5, display: 'grid', placeItems: 'center', padding: '40px 20px'}}>
            <img src="assets/hero_mockup.png" alt="ParkSafe app" style={{width: '95%', maxWidth: 460, filter: 'drop-shadow(10px 10px 0 var(--ink))'}}/>
          </div>

          {/* Sticker cards — now square */}
          <div style={{position: 'absolute', top: 20, left: -10, padding: '10px 14px', background: 'var(--green)', color: 'var(--ink)', border: '3px solid var(--ink)', zIndex: 10, transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow)'}}>
            <div style={{width: 32, height: 32, background: 'var(--ink)', color: 'var(--green)', display: 'grid', placeItems: 'center'}}>
              <Ic.Bike s={18}/>
            </div>
            <div>
              <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em'}}>→ TÁROLÓ</div>
              <div className="hx" style={{fontSize: 15}}>120 M</div>
            </div>
          </div>
          <div style={{position: 'absolute', top: 200, right: -20, padding: '10px 14px', background: 'var(--green-100)', color: 'var(--ink)', border: '3px solid var(--ink)', zIndex: 10, transform: 'rotate(4deg)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow)'}}>
            <div style={{width: 32, height: 32, background: 'var(--ink)', color: 'var(--green-100)', display: 'grid', placeItems: 'center'}}>
              <Ic.Wrench s={18}/>
            </div>
            <div>
              <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em'}}>→ SZERVIZ</div>
              <div className="hx" style={{fontSize: 15}}>NYITVA</div>
            </div>
          </div>
          <div style={{position: 'absolute', bottom: 60, right: 30, padding: '10px 14px', background: 'var(--blue)', color: 'var(--paper)', border: '3px solid var(--ink)', zIndex: 10, transform: 'rotate(-2deg)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow)'}}>
            <div style={{width: 32, height: 32, background: 'var(--paper)', color: 'var(--blue)', display: 'grid', placeItems: 'center'}}>
              <Ic.Droplet s={18}/>
            </div>
            <div>
              <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em'}}>→ IVÓKÚT</div>
              <div className="hx" style={{fontSize: 15}}>DEÁK TÉR</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ========== STATS STRIP ==========
function Stats() {
  const stats = [
    { n: '928K+', l: 'POI a térképen' },
    { n: '658K+', l: 'kerékpártároló' },
    { n: '224K+', l: 'ivókút' },
    { n: '8', l: 'magyar nagyváros' },
    { n: 'EU', l: 'lefedettség' },
  ];
  return (
    <section style={{background: 'var(--ink)', borderTop: '3px solid var(--ink)', borderBottom: '3px solid var(--ink)', padding: '40px 28px', color: 'var(--paper)'}}>
      <div style={{maxWidth: 1400, margin: '0 auto'}}>
        <div className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--green-100)', marginBottom: 20}}>
          § 02 / NUMBERS — ÉLŐ ADATOK / 2026.04
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0}} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{borderLeft: i > 0 ? '2px solid rgba(255,255,255,0.2)' : 'none', paddingLeft: i > 0 ? 24 : 0, paddingRight: 12}}>
              <div className="hx" style={{fontSize: 'clamp(40px, 5vw, 72px)', color: i === 1 ? 'var(--acid)' : i === 3 ? 'var(--orange)' : 'var(--paper)'}}>{s.n}</div>
              <div className="mono" style={{fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginTop: 6, opacity: 0.75, letterSpacing: '0.08em'}}>→ {s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; } .stats-grid > div { border-left: none !important; padding-left: 0 !important; } }`}</style>
    </section>
  );
}

window.Nav = Nav;
window.TopMarquee = TopMarquee;
window.Hero = Hero;
window.Stats = Stats;
