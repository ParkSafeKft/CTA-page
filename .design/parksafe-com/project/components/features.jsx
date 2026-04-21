// POI discovery + Features section
const { useState: uSf, useEffect: uEf } = React;

// ========== POI TYPES GRID ==========
function POITypes() {
  const types = [
    { n: 'Kerékpártárolók', d: 'Fedett, kamerás, 24/7. Szűrd arra amit szeretsz.', c: 'var(--green)', fg: 'var(--ink)', ic: 'Bike', count: '658K', code: 'PRK' },
    { n: 'Ivókutak', d: 'Hogy sose szomjazz útközben. Részletes városi lefedettség.', c: 'var(--blue)', fg: 'var(--paper)', ic: 'Droplet', count: '224K', code: 'WTR' },
    { n: 'Szervizek + boltok', d: 'Defektjavítás, fékbeállítás, alkatrészek, új bringák.', c: 'var(--green-100)', fg: 'var(--ink)', ic: 'Wrench', count: '31K', code: 'SRV' },
    { n: 'Javítóállomások', d: 'Önkiszolgáló szerelőpont, pumpa, szerszám — ingyen.', c: 'var(--pink)', fg: 'var(--ink)', ic: 'Zap', count: '13K', code: 'RPR' },
    { n: 'EU lefedettség', d: 'Majdnem minden EU-s országban — nem csak itthon működik.', c: 'var(--cream)', fg: 'var(--ink)', ic: 'Map', count: 'EU', code: 'GEO' },
    { n: 'Plusz folyamatosan', d: 'Biciklis-barát kávézók, pihenőhelyek — közösség bővíti.', c: 'var(--ink)', fg: 'var(--green-100)', ic: 'Sparkle', count: '+', code: '+++' },
  ];
  return (
    <section style={{padding: '100px 28px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{marginBottom: 56, maxWidth: 820}}>
        <span className="sec-num">§ 03 / POI INDEX</span>
        <h2 className="hx" style={{fontSize: 'clamp(48px, 7vw, 104px)', marginBottom: 16, letterSpacing: '-0.05em'}}>
          NEM CSAK<br/><span style={{color: 'var(--green)'}}>EGY</span> DOLOG.
        </h2>
        <p style={{fontSize: 18, maxWidth: 620, lineHeight: 1.5, fontWeight: 500, borderLeft: '4px solid var(--ink)', paddingLeft: 16}}>
          A ParkSafe <strong>komplett</strong> biciklis térkép — nem csak tárolók. Minden, ami városi bringázáshoz kell, <strong>egy</strong> app-ban.
        </p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '3px solid var(--ink)'}} className="poi-grid">
        {types.map((t, i) => {
          const Icon = Ic[t.ic];
          return (
            <div key={i} style={{
              padding: 28, background: t.c, color: t.fg, minHeight: 240,
              borderRight: (i % 3 !== 2) ? '3px solid var(--ink)' : 'none',
              borderBottom: (i < 3) ? '3px solid var(--ink)' : 'none',
              position: 'relative', overflow: 'hidden'
            }} className="poi-cell">
              <div className="mono" style={{position: 'absolute', top: 10, right: 14, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', opacity: 0.6}}>
                {String(i+1).padStart(2,'0')} / 06
              </div>
              <div style={{width: 64, height: 64, background: t.fg, color: t.c, border: '3px solid ' + t.fg, display: 'grid', placeItems: 'center', marginBottom: 20}}>
                <Icon s={32}/>
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10}}>
                <span className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.1em'}}>[{t.code}]</span>
                <span className="hx" style={{fontSize: 22, letterSpacing: '-0.03em'}}>{t.n.toUpperCase()}</span>
              </div>
              <div style={{fontSize: 14, lineHeight: 1.5, marginBottom: 18, opacity: 0.9}}>{t.d}</div>
              <div className="hx" style={{fontSize: 36, letterSpacing: '-0.04em', position: 'absolute', bottom: 16, right: 20, opacity: 0.9}}>
                {t.count}<span style={{fontSize: 16}}>+</span>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 900px) { .poi-grid { grid-template-columns: 1fr 1fr !important; } .poi-cell { border-right: none !important; border-bottom: 3px solid var(--ink) !important; } }
        @media (max-width: 600px) { .poi-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ========== MAP SHOWCASE ==========
function MapShowcase() {
  const [tab, setTab] = uSf(0);
  const tabs = [
    { n: 'Felfedezés', code: 'EXPLORE', img: 'assets/map_city.png', desc: 'Szűrd típusra: csak tárolók, csak szervizek, vagy minden együtt. Clustered markerek, real-time nyitvatartás.' },
    { n: 'Részletek', code: 'DETAIL', img: 'assets/map_detail.png', desc: 'Minden ponthoz: fényképek, értékelések, felszereltség (fedett / kamerás / 24/7), közösségi bejelentések.' },
    { n: 'Útvonal', code: 'ROUTE', img: 'assets/screen_nav.png', desc: 'Biciklis-barát navigáció — bike lane-ek, kevésbé forgalmas útvonalak, elkerülhető dombok.' },
  ];
  return (
    <section id="map" style={{background: 'var(--paper-2)', borderTop: '3px solid var(--ink)', borderBottom: '3px solid var(--ink)', padding: '100px 28px'}}>
      <div style={{maxWidth: 1400, margin: '0 auto'}}>
        <div style={{marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap'}}>
          <div>
            <span className="sec-num">§ 04 / THE MAP</span>
            <h2 className="hx" style={{fontSize: 'clamp(44px, 6vw, 88px)', letterSpacing: '-0.05em'}}>
              MINDEN PONT.<br/>EGY <span style={{color: 'var(--green)'}}>TÉRKÉP</span>.
            </h2>
          </div>
          <div style={{display: 'flex', gap: 0, border: '3px solid var(--ink)', background: 'var(--cream)', boxShadow: 'var(--shadow)'}}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                padding: '14px 22px', fontFamily: 'Archivo Black', fontSize: 13,
                border: 'none', borderRight: i < tabs.length-1 ? '3px solid var(--ink)' : 'none',
                background: tab === i ? 'var(--green)' : 'transparent',
                color: tab === i ? '#fff' : 'var(--ink)',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.03em',
                transition: 'background .12s ease, color .12s ease',
                minWidth: 120, textAlign: 'center'
              }}
              onMouseEnter={(e) => { if (tab !== i) e.currentTarget.style.background = 'var(--green-100)'; }}
              onMouseLeave={(e) => { if (tab !== i) e.currentTarget.style.background = 'transparent'; }}
              >{tab === i ? '→ ' : ''}{t.n}</button>
            ))}
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, border: '3px solid var(--ink)', background: 'var(--cream)'}} className="map-grid">
          <div style={{background: 'var(--ink)', overflow: 'hidden', position: 'relative', aspectRatio: '1 / 1.15', borderRight: '3px solid var(--ink)'}} className="map-img-wrap">
            <img src={tabs[tab].img} alt={tabs[tab].n} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            {/* crosshair overlay */}
            <div style={{position: 'absolute', top: 16, left: 16, padding: '6px 10px', background: 'var(--green-100)', border: '2.5px solid var(--ink)'}} className="mono">
              <div style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6}}>
                <span style={{width: 7, height: 7, background: 'var(--ink)'}} className="blink"></span>
                LIVE / {tabs[tab].code}
              </div>
            </div>
            <div style={{position: 'absolute', bottom: 16, right: 16, padding: '6px 10px', background: 'var(--ink)', color: 'var(--green-100)'}} className="mono">
              <span style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.08em'}}>47.498°N / 19.040°E</span>
            </div>
          </div>

          <div style={{padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10}}>
              MODE [{String(tab+1).padStart(2,'0')}] — {tabs[tab].code}
            </div>
            <div className="hx" style={{fontSize: 48, marginBottom: 18, letterSpacing: '-0.04em'}}>{tabs[tab].n.toUpperCase()}</div>
            <p style={{fontSize: 17, lineHeight: 1.5, marginBottom: 28, fontWeight: 500}}>
              {tabs[tab].desc}
            </p>
            <div style={{display: 'flex', flexDirection: 'column', gap: 0, border: '2.5px solid var(--ink)'}}>
              {[
                'Közösségi pontosítások & fényképek',
                'Minden pont szerkeszthető — te is hozzáadhatsz',
                'Mentett helyek szinkronizálódnak eszközök között',
              ].map((t, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderBottom: i < 2 ? '2.5px solid var(--ink)' : 'none', background: i % 2 ? 'var(--paper-2)' : 'transparent'}}>
                  <span className="mono" style={{fontSize: 11, fontWeight: 700, color: 'var(--green)'}}>→</span>
                  <span style={{fontSize: 14, fontWeight: 600}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .map-grid { grid-template-columns: 1fr !important; } .map-img-wrap { border-right: none !important; border-bottom: 3px solid var(--ink) !important; } }`}</style>
    </section>
  );
}

// ========== FEATURES 3x2 GRID ==========
function Features() {
  const feats = [
    { t: 'Közösségi POI-k', d: 'Te jelölsz pontokat, fényképeket töltesz fel, értékelsz. A térkép a közösségtől van, a közösségnek.', ic: 'Users', n: '01' },
    { t: 'Offline mentés', d: 'Letöltöd a városod, GPS adat nélkül is megy. Túra közben nincs signal-szorongás.', ic: 'Map', n: '02' },
    { t: 'Kedvencek + jegyzetek', d: 'Gyors hozzáférés, saját jegyzetek minden ponthoz ("kulcs a büfénél").', ic: 'Heart', n: '03' },
    { t: 'Közösségi jelentések', d: 'Defektes ivókút? Bezárt szerviz? A közösség jelzi, mindenki lát mindent.', ic: 'Flag', n: '04' },
    { t: 'Túra rögzítés', d: 'Automatikus GPS tracking — táv, idő, sebesség, szintemelkedés, kalória.', ic: 'Route', n: '05' },
    { t: 'GPX export', d: 'Minden utad exportálható és megosztható.', ic: 'Download', n: '06' },
  ];
  return (
    <section id="features" style={{padding: '100px 28px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap'}}>
        <div style={{maxWidth: 720}}>
          <span className="sec-num">§ 05 / FEATURES</span>
          <h2 className="hx" style={{fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '-0.05em'}}>
            AMIT EGY<br/>BRINGÁS <span style={{color: 'var(--green)'}}>VÁR</span>.
          </h2>
        </div>
        <div className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '10px 14px', border: '2.5px solid var(--ink)', background: 'var(--green-100)'}}>
          06 MODUL — TELJES LISTA →
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}} className="feat-grid">
        {feats.map((f, i) => {
          const Icon = Ic[f.ic];
          return (
            <div key={i} className="card" style={{padding: 26, background: 'var(--cream)', minHeight: 240, display: 'flex', flexDirection: 'column', position: 'relative'}}>
              <div style={{position: 'absolute', top: 0, right: 0, background: 'var(--ink)', color: 'var(--green-100)', padding: '4px 10px', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em'}}>
                {f.n}
              </div>
              <div style={{width: 56, height: 56, background: 'var(--ink)', color: 'var(--green)', border: '2.5px solid var(--ink)', display: 'grid', placeItems: 'center', marginBottom: 18}}>
                <Icon s={26}/>
              </div>
              <div className="hx" style={{fontSize: 22, marginBottom: 10, letterSpacing: '-0.03em'}}>{f.t.toUpperCase()}</div>
              <div style={{fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)'}}>{f.d}</div>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 900px) { .feat-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

window.POITypes = POITypes;
window.MapShowcase = MapShowcase;
window.Features = Features;
