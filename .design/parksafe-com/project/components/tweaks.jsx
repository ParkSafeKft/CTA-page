const { useState: uST, useEffect: uET } = React;
function TweaksPanel() {
  const [active, setActive] = uST(false);
  const [cfg, setCfg] = uST(window.__TWEAKS__ || {});

  uET(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setActive(true);
      else if (e.data?.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  uET(() => {
    const root = document.documentElement;
    const tones = {
      paper: { bg: '#f7f5f0', bg2: '#efece4' },
      cream: { bg: '#fffbf2', bg2: '#f5efe0' },
      mint:  { bg: '#f0fdf4', bg2: '#dcfce7' },
      stone: { bg: '#f5f5f4', bg2: '#e7e5e4' },
    };
    const t = tones[cfg.bgTone] || tones.paper;
    root.style.setProperty('--paper', t.bg);
    root.style.setProperty('--paper-2', t.bg2);
  }, [cfg]);

  const update = (k, v) => {
    const next = { ...cfg, [k]: v };
    setCfg(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  if (!active) return null;
  const bgTones = ['paper', 'cream', 'mint', 'stone'];

  return (
    <div style={{position: 'fixed', bottom: 24, right: 24, zIndex: 1000, background: '#fff', border: '2.5px solid #0a1f12', boxShadow: '6px 6px 0 0 #0a1f12', width: 300, padding: 18, borderRadius: 10, fontFamily: 'Inter, sans-serif', color: '#0a1f12'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <div className="hx" style={{fontSize: 16}}>TWEAKS</div>
        <div className="mono" style={{fontSize: 10, fontWeight: 700, background: '#34aa56', color: '#fff', padding: '3px 8px', borderRadius: 999}}>LIVE</div>
      </div>
      <div style={{marginBottom: 14}}>
        <div className="mono" style={{fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase'}}>Háttér tónus</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6}}>
          {bgTones.map(t => (
            <button key={t} onClick={() => update('bgTone', t)} style={{border: '2px solid #0a1f12', padding: '8px 4px', borderRadius: 6, background: cfg.bgTone === t ? '#34aa56' : '#fff', color: cfg.bgTone === t ? '#fff' : '#0a1f12', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer'}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom: 6}}>
        <div className="mono" style={{fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase'}}>Matricák</div>
        <button onClick={() => update('showStickers', !cfg.showStickers)} style={{width: '100%', border: '2px solid #0a1f12', padding: 8, borderRadius: 6, background: cfg.showStickers ? '#34aa56' : '#fff', color: cfg.showStickers ? '#fff' : '#0a1f12', fontFamily: 'Archivo Black', fontSize: 12, cursor: 'pointer', textTransform: 'uppercase'}}>
          {cfg.showStickers ? '✓ BE' : '✗ KI'}
        </button>
      </div>
      <div className="mono" style={{fontSize: 10, opacity: 0.5, textAlign: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px dashed #0a1f12'}}>A ParkSafe zöld mindig #34aa56</div>
    </div>
  );
}
window.TweaksPanel = TweaksPanel;
