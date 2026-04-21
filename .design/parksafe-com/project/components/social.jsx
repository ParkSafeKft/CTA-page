// Social / community / gamification — achievement UI style
function Social() {
  // 8 kiválogatott badge a 17-ből, vegyes kategóriák, random sorrendben
  const badges = [
    { n: 'Night Rider',     ic: 'Moon',     d: '10+ túra 22:00 és hajnal 4:00 között',   cat: 'IDŐ',           rarity: 'EPIC',      progress: 100, xp: 500,  date: '2026.03.14', earned: true,  tone: 'green' },
    { n: 'Community Hero',  ic: 'People',   d: '20 érvényes probléma bejelentése',       cat: 'KÖZÖSSÉG',      rarity: 'RARE',      progress: 85,  xp: 400,  date: null,         earned: false, tone: 'blue'  },
    { n: 'Speedster',       ic: 'Flash',    d: 'Érj el 30 km/h-t egy túra során',        cat: 'TELJESÍTMÉNY', rarity: 'EPIC',      progress: 100, xp: 500,  date: '2026.01.22', earned: true,  tone: 'green' },
    { n: 'On a Roll',       ic: 'Flame',    d: '7 napos aktivitási sorozat',             cat: 'STREAK',        rarity: 'RARE',      progress: 100, xp: 300,  date: '2026.02.08', earned: true,  tone: 'orange'},
    { n: 'Globe Trotter',   ic: 'Earth',    d: 'Teljesíts kihívást 3 különböző városban',cat: 'FELFEDEZÉS',   rarity: 'LEGENDARY', progress: 66,  xp: 1000, date: null,         earned: false, tone: 'green' },
    { n: 'Weekend Warrior', ic: 'Calendar', d: '10 túra hétvégéken',                     cat: 'TELJESÍTMÉNY', rarity: 'COMMON',    progress: 100, xp: 200,  date: '2025.11.30', earned: true,  tone: 'ink'   },
    { n: 'Map Scout',       ic: 'Compass',  d: '20 különböző helyszín megtekintése',     cat: 'FELFEDEZÉS',   rarity: 'COMMON',    progress: 100, xp: 150,  date: '2025.09.12', earned: true,  tone: 'blue'  },
    { n: 'City Racer',      ic: 'Podium',   d: 'Top 3 helyezés egy napi kihívásban',     cat: 'VERSENY',       rarity: 'LEGENDARY', progress: 33,  xp: 1000, date: null,         earned: false, tone: 'green' },
  ];

  const tones = {
    green:  { bg: '#34aa56', fg: '#ffffff', accent: '#14532d' },
    blue:   { bg: '#3b82f6', fg: '#ffffff', accent: '#1e40af' },
    orange: { bg: '#f59e0b', fg: '#0a1f12', accent: '#92400e' },
    ink:    { bg: '#0a1f12', fg: '#dcfce7', accent: '#2a3a2f' },
  };

  const rarityColor = {
    COMMON:    '#9ca3af',
    RARE:      '#3b82f6',
    EPIC:      '#a855f7',
    LEGENDARY: '#f59e0b',
  };

  const AchievementRow = ({b, i, last}) => {
    const t = tones[b.tone];
    const Icon = Ic[b.ic];
    const dim = !b.earned;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr auto',
        alignItems: 'stretch',
        borderBottom: last ? 'none' : '2.5px solid var(--ink)',
        background: dim ? 'var(--paper-2)' : 'var(--cream)',
        position: 'relative',
        opacity: dim ? 0.85 : 1,
      }}>
        {/* ICON CELL */}
        <div style={{
          background: dim ? '#e5e0d4' : t.bg,
          color: dim ? '#6b7280' : t.fg,
          borderRight: '2.5px solid var(--ink)',
          display: 'grid', placeItems: 'center',
          position: 'relative',
        }}>
          {/* rarity stripe */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 5,
            background: rarityColor[b.rarity],
          }}/>
          <Icon s={34}/>
          {dim && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'grid', placeItems: 'center',
              background: 'rgba(10,31,18,0.15)',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700,
                color: 'var(--ink)', background: 'var(--paper)',
                padding: '2px 6px', border: '2px solid var(--ink)',
                letterSpacing: '0.1em',
              }}>LOCKED</div>
            </div>
          )}
        </div>

        {/* META CELL */}
        <div style={{padding: '14px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, minWidth: 0}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap'}}>
            <div className="hx" style={{fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase'}}>
              {b.n}
            </div>
            <span className="mono" style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
              color: '#fff', background: rarityColor[b.rarity],
              padding: '3px 7px',
              border: '1.5px solid var(--ink)',
            }}>{b.rarity}</span>
            <span className="mono" style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--ink-soft)',
            }}>§ {b.cat}</span>
          </div>
          <div className="mono" style={{fontSize: 11, fontWeight: 500, color: 'var(--ink-soft)', lineHeight: 1.35}}>
            → {b.d}
          </div>
          {/* progress bar */}
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 4}}>
            <div style={{flex: 1, height: 8, background: 'var(--paper-2)', border: '1.5px solid var(--ink)', position: 'relative', overflow: 'hidden'}}>
              <div style={{
                position: 'absolute', inset: 0, right: 'auto',
                width: `${b.progress}%`,
                background: b.earned
                  ? `repeating-linear-gradient(-45deg, ${t.bg} 0, ${t.bg} 4px, ${t.accent} 4px, ${t.accent} 8px)`
                  : 'var(--green)',
              }}/>
            </div>
            <span className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', minWidth: 38, textAlign: 'right'}}>
              {b.progress}%
            </span>
          </div>
        </div>

        {/* STATUS CELL */}
        <div style={{
          padding: '12px 18px',
          borderLeft: '2.5px solid var(--ink)',
          background: b.earned ? 'var(--green-100)' : 'var(--paper-2)',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center',
          minWidth: 150,
        }}>
          {b.earned ? (
            <>
              <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--green-deep)', marginBottom: 2}}>
                ✓ TELJESÍTVE
              </div>
              <div className="mono" style={{fontSize: 11, fontWeight: 700, marginBottom: 4}}>{b.date}</div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                <span className="hx" style={{fontSize: 20, letterSpacing: '-0.04em', color: 'var(--green-deep)'}}>+{b.xp}</span>
                <span className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em'}}>XP</span>
              </div>
            </>
          ) : (
            <>
              <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ink-soft)', marginBottom: 2}}>
                FOLYAMATBAN
              </div>
              <div className="mono" style={{fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--ink-soft)'}}>
                {b.progress === 33 ? '1 / 3' : b.progress === 66 ? '2 / 3' : '17 / 20'}
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                <span className="hx" style={{fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink-soft)'}}>+{b.xp}</span>
                <span className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7}}>XP</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const earnedCount = badges.filter(b => b.earned).length;
  const totalXP = badges.filter(b => b.earned).reduce((s, b) => s + b.xp, 0);
  const visibleBadges = badges.slice(0, 4);
  const remainingCount = 17 - visibleBadges.length;

  return (
    <section id="social" style={{padding: '100px 28px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{marginBottom: 56, maxWidth: 820}}>
        <span className="sec-num">§ 07 / COMMUNITY</span>
        <h2 className="hx" style={{fontSize: 'clamp(52px, 7.5vw, 112px)', marginBottom: 16, letterSpacing: '-0.05em'}}>
          TEKERJ <span style={{color: 'var(--green)'}}>EGYÜTT</span>.<br/>FEJLŐDJETEK EGYÜTT.
        </h2>
        <p style={{fontSize: 18, maxWidth: 640, lineHeight: 1.5, fontWeight: 500, borderLeft: '4px solid var(--ink)', paddingLeft: 16}}>
          17 kitűző. Időalapú, teljesítményalapú, közösségi és streak kihívások — gyűjtsd be mind.
        </p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20}} className="social-grid">
        {/* Left: Achievements list */}
        <div style={{background: 'var(--paper-2)', border: '3px solid var(--ink)', boxShadow: 'var(--shadow-lg)'}}>
          {/* Header bar */}
          <div style={{padding: '18px 22px', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap'}}>
            <div>
              <div className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--green-100)', marginBottom: 4}}>
                → ACHIEVEMENTS / PROFIL
              </div>
              <div className="hx" style={{fontSize: 22, letterSpacing: '-0.03em'}}>KITŰZŐK & KIHÍVÁSOK</div>
            </div>
            <div style={{display: 'flex', gap: 0, border: '2.5px solid var(--green-100)'}}>
              <div style={{padding: '6px 14px', borderRight: '2.5px solid var(--green-100)'}}>
                <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--green-100)', opacity: 0.7}}>TELJESÍTVE</div>
                <div className="hx" style={{fontSize: 18, letterSpacing: '-0.03em'}}>{earnedCount} / 17</div>
              </div>
              <div style={{padding: '6px 14px'}}>
                <div className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--green-100)', opacity: 0.7}}>ÖSSZ. XP</div>
                <div className="hx" style={{fontSize: 18, letterSpacing: '-0.03em', color: 'var(--green-100)'}}>{totalXP.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Rows — csak 4, hogy egyvonalba legyen a jobb oldallal */}
          {visibleBadges.map((b, i) => <AchievementRow key={i} b={b} i={i} last={i === visibleBadges.length - 1}/>)}

          {/* Footer: "és még sok más" */}
          <div style={{
            padding: '16px 22px',
            background: 'var(--green-100)',
            borderTop: '3px solid var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{
                width: 44, height: 44,
                background: 'var(--ink)', color: 'var(--green-100)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'Archivo Black', fontSize: 16, letterSpacing: '-0.02em',
                border: '2.5px solid var(--ink)',
              }}>+{remainingCount}</div>
              <div>
                <div className="hx" style={{fontSize: 15, letterSpacing: '-0.02em', textTransform: 'uppercase'}}>És még {remainingCount} kitűző vár</div>
                <div className="mono" style={{fontSize: 11, fontWeight: 600, color: 'var(--ink-soft)'}}>Minden úttal közelebb a következőhöz.</div>
              </div>
            </div>
            <button className="btn" style={{padding: '10px 16px', fontSize: 12}}>
              <Ic.Arrow s={14}/> ÖSSZES MEGNYITÁSA
            </button>
          </div>
        </div>

        {/* Right: Community numbers + fun fact */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <div style={{background: 'var(--cream)', border: '3px solid var(--ink)', boxShadow: 'var(--shadow)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--green-100)', borderBottom: '3px solid var(--ink)'}}>
              <div className="hx" style={{fontSize: 18, letterSpacing: '-0.03em'}}>KÖZÖSSÉG / LIVE</div>
              <span className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.1em'}}>2026</span>
            </div>
            {[
              { l: 'Regisztrált bringás', v: '315' },
              { l: 'Rögzített túra', v: '221' },
              { l: 'Megtett táv', v: '1,189 km' },
              { l: 'Szintemelkedés', v: '33,880 m' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px',
                borderBottom: i < 3 ? '2px solid var(--ink)' : 'none',
                background: i % 2 ? 'var(--paper-2)' : 'transparent',
              }}>
                <span className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase'}}>→ {s.l}</span>
                <span className="hx" style={{fontSize: 22, letterSpacing: '-0.04em'}}>{s.v}</span>
              </div>
            ))}
          </div>

          <div style={{background: 'var(--ink)', color: 'var(--paper)', border: '3px solid var(--ink)', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden'}}>
            {/* Header */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '2.5px solid var(--green-100)', background: 'rgba(52,170,86,0.12)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <Ic.Leaf s={14}/>
                <span className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--green-100)'}}>→ IMPACT / 2026</span>
              </div>
              <span className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.55}}>YTD</span>
            </div>

            {/* Primary metric — CO2 */}
            <div style={{padding: '18px 18px 14px', borderBottom: '2px dashed rgba(220,252,231,0.18)'}}>
              <div className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--green-100)', opacity: 0.7, marginBottom: 6}}>CO₂ MEGTAKARÍTÁS</div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6}}>
                <div className="hx" style={{fontSize: 44, letterSpacing: '-0.05em', lineHeight: 0.9, color: 'var(--green-100)'}}>249</div>
                <div className="hx" style={{fontSize: 18, letterSpacing: '-0.03em', opacity: 0.7}}>KG</div>
              </div>
              <div className="mono" style={{fontSize: 11, fontWeight: 500, opacity: 0.7, lineHeight: 1.35}}>
                autó helyett bringa · <strong style={{color: 'var(--green-100)'}}>= 1,189 km</strong> kibocsátás-mentes
              </div>
            </div>

            {/* Secondary grid */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
              <div style={{padding: '14px 16px', borderRight: '2px dashed rgba(220,252,231,0.18)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6}}>
                  <Ic.Heart s={12}/>
                  <span className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7}}>ELÉGETT KCAL</span>
                </div>
                <div className="hx" style={{fontSize: 22, letterSpacing: '-0.04em', lineHeight: 1}}>47,560</div>
                <div className="mono" style={{fontSize: 9, fontWeight: 500, opacity: 0.5, marginTop: 3}}>~132 Big Mac</div>
              </div>
              <div style={{padding: '14px 16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6}}>
                  <Ic.Tree s={12}/>
                  <span className="mono" style={{fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7}}>= FA / ÉV</span>
                </div>
                <div className="hx" style={{fontSize: 22, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--green-100)'}}>11.3</div>
                <div className="mono" style={{fontSize: 9, fontWeight: 500, opacity: 0.5, marginTop: 3}}>elnyelt CO₂</div>
              </div>
            </div>

            {/* Footer note */}
            <div style={{padding: '10px 18px', background: 'rgba(52,170,86,0.08)', borderTop: '2px solid var(--green-100)'}}>
              <span className="mono" style={{fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', opacity: 0.75}}>
                Minden tekerés számít. ↴
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .social-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ========== TESTIMONIALS ==========
function Testimonials() {
  const quotes = [
    { q: 'Végre egy bringás app, ami tényleg magyar városokra van szabva. A szegedi ivókutak mind benne vannak — életmentő nyáron.', a: 'Kata B.', r: 'SZEGED', c: 'var(--green-100)', num: '01' },
    { q: 'Reggelente az első dolgom: megnézem hol szabad a tároló a munkahely mellett. Soha többé nem láncolom ki a kapuhoz.', a: 'Bence T.', r: 'BUDAPEST', c: 'var(--green)', num: '02' },
    { q: 'Gyalog dolgozom, de a párom ezt használja és letöltöttem csak kíváncsiságból. Végül én is elkezdtem bringázni.', a: 'Eszter L.', r: 'DEBRECEN', c: 'var(--cream)', num: '03' },
  ];
  return (
    <section style={{padding: '90px 28px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{marginBottom: 48}}>
        <span className="sec-num">§ 08 / VOICES</span>
        <h2 className="hx" style={{fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '-0.05em'}}>
          A <span style={{color: 'var(--green)'}}>KÖZÖSSÉG</span> MONDJA.
        </h2>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '3px solid var(--ink)'}} className="quote-grid">
        {quotes.map((q, i) => (
          <div key={i} style={{padding: 28, background: q.c, borderRight: i < 2 ? '3px solid var(--ink)' : 'none', position: 'relative'}} className="quote-cell">
            <div className="mono" style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 14}}>
              TESTIMONIAL / {q.num}
            </div>
            <div className="hx" style={{fontSize: 80, lineHeight: 0.6, marginBottom: 14, letterSpacing: '-0.05em'}}>"</div>
            <p style={{fontSize: 16, lineHeight: 1.45, fontWeight: 500, marginBottom: 24}}>{q.q}</p>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '2.5px solid var(--ink)'}}>
              <div style={{width: 40, height: 40, background: 'var(--ink)', color: q.c, display: 'grid', placeItems: 'center', fontFamily: 'Archivo Black', fontSize: 16}}>{q.a[0]}</div>
              <div>
                <div className="hx" style={{fontSize: 14, letterSpacing: '-0.02em'}}>{q.a.toUpperCase()}</div>
                <div className="mono" style={{fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.8}}>→ {q.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 900px) { .quote-grid { grid-template-columns: 1fr !important; } .quote-cell { border-right: none !important; border-bottom: 3px solid var(--ink) !important; } .quote-cell:last-child { border-bottom: none !important; } }`}</style>
    </section>
  );
}

window.Social = Social;
window.Testimonials = Testimonials;
