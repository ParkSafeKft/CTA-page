'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Wheel = dynamic(
  () => import('react-custom-roulette').then((m) => m.Wheel),
  { ssr: false }
);

const STORAGE_KEY = 'parksafe-wheel-stock-v1';
const MAX_STOCK = 4;
const FALLBACK_LABEL = '+300 XP';

type Stock = { phoneHolder: number; dom: number };
const DEFAULT_STOCK: Stock = { phoneHolder: 4, dom: 4 };

const BASE_DATA = [
  { key: 'phoneHolder', option: 'TELEFONTARTÓ', style: { backgroundColor: '#34aa56', textColor: '#0a1f12' } },
  { key: 'xp50',        option: '+50 XP',       style: { backgroundColor: '#fffef9', textColor: '#0a1f12' } },
  { key: 'nothing',     option: 'SAJNOS NEM',   style: { backgroundColor: '#0a1f12', textColor: '#f7f5f0' } },
  { key: 'xp100',       option: '+100 XP',      style: { backgroundColor: '#efece4', textColor: '#0a1f12' } },
  { key: 'dom',         option: 'DOM 50%',      style: { backgroundColor: '#ec4899', textColor: '#0a1f12' } },
  { key: 'xp50',        option: '+50 XP',       style: { backgroundColor: '#fffef9', textColor: '#0a1f12' } },
  { key: 'nothing',     option: 'SAJNOS NEM',   style: { backgroundColor: '#0a1f12', textColor: '#f7f5f0' } },
  { key: 'xp100',       option: '+100 XP',      style: { backgroundColor: '#efece4', textColor: '#0a1f12' } },
];

const FALLBACK_STYLE = { backgroundColor: '#efece4', textColor: '#2a3a2f' };

function resolveData(stock: Stock) {
  return BASE_DATA.map((slice) => {
    if (slice.key === 'phoneHolder' && stock.phoneHolder === 0) {
      return { ...slice, key: 'fallback', option: FALLBACK_LABEL, style: FALLBACK_STYLE };
    }
    if (slice.key === 'dom' && stock.dom === 0) {
      return { ...slice, key: 'fallback', option: FALLBACK_LABEL, style: FALLBACK_STYLE };
    }
    return slice;
  });
}

const resultCopy: Record<string, { title: string; body: string }> = {
  phoneHolder: { title: 'NYERTÉL EGY TELEFONTARTÓT!', body: 'Vedd át az asztalnál.' },
  dom:         { title: '50% DOM KUPON!',             body: 'Vedd át az asztalnál.' },
  xp50:        { title: '+50 XP AZ APPBAN!',          body: 'Szólj a felhasználóneveddel.' },
  xp100:       { title: '+100 XP AZ APPBAN!',         body: 'Szólj a felhasználóneveddel.' },
  fallback:    { title: '+300 XP AZ APPBAN!',         body: 'Szólj a felhasználóneveddel.' },
  nothing:     { title: 'SAJNOS NEM NYERTÉL',         body: 'Legközelebb több szerencsét!' },
};

function clamp(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(MAX_STOCK, Math.floor(n)));
}

export default function WheelPage() {
  const [stock, setStock] = useState<Stock>(DEFAULT_STOCK);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Stock>;
        setStock({
          phoneHolder: clamp(parsed.phoneHolder ?? DEFAULT_STOCK.phoneHolder),
          dom: clamp(parsed.dom ?? DEFAULT_STOCK.dom),
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stock));
    } catch {}
  }, [stock]);

  const data = resolveData(stock);

  function handleSpin() {
    if (spinning) return;
    setResult(null);
    setPrizeIndex(Math.floor(Math.random() * data.length));
    setSpinning(true);
  }

  function handleStop() {
    setSpinning(false);
    setResult(data[prizeIndex].key);
  }

  function closeResult() {
    if (result === 'phoneHolder') {
      setStock((s) => ({ ...s, phoneHolder: clamp(s.phoneHolder - 1) }));
    } else if (result === 'dom') {
      setStock((s) => ({ ...s, dom: clamp(s.dom - 1) }));
    }
    setResult(null);
  }

  function toggleFullscreen() {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  return (
    <main
      className="grid-bg"
      style={{
        minHeight: '100vh',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <span className="sec-num">§ WHEEL / PARKSAFE EVENT</span>
      <h1
        className="hx"
        style={{
          fontSize: 'clamp(40px, 8vw, 80px)',
          textAlign: 'center',
          margin: '16px 0 32px',
          letterSpacing: '-0.05em',
        }}
      >
        PÖRGESS ÉS{' '}
        <span style={{ color: 'var(--green)' }}>NYERJ</span>!
      </h1>

      <div className="wheel-scale-wrap" style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
        <div
          className="wheel-scale"
          style={{
            position: 'relative',
            lineHeight: 0,
          }}
        >
          <Wheel
            mustStartSpinning={spinning}
            prizeNumber={prizeIndex}
            data={data}
            onStopSpinning={handleStop}
            outerBorderColor="#0a1f12"
            outerBorderWidth={8}
            innerBorderColor="#0a1f12"
            innerBorderWidth={3}
            radiusLineColor="#0a1f12"
            radiusLineWidth={2.5}
            fontFamily="Archivo Black, sans-serif"
            fontSize={11}
            textDistance={55}
            spinDuration={0.6}
          />

          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            aria-label="Pörgess"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '4px solid var(--ink)',
              background: spinning ? 'var(--paper-2)' : 'var(--green)',
              color: spinning ? 'var(--ink-soft)' : '#fff',
              fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif',
              fontSize: 18,
              letterSpacing: '-0.02em',
              cursor: spinning ? 'not-allowed' : 'pointer',
              boxShadow: spinning ? '2px 2px 0 0 var(--ink)' : '5px 5px 0 0 var(--ink)',
              transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              zIndex: 5,
              lineHeight: 1,
            }}
          >
            {spinning ? 'PÖRÖG...' : 'PÖRGESS!'}
          </button>
        </div>
      </div>

      <style>{`
        .wheel-scale { transform: scale(1.9); transform-origin: center; margin: 150px 0 170px; }
        @media (max-width: 1200px) { .wheel-scale { transform: scale(1.55); margin: 110px 0 130px; } }
        @media (max-width: 900px) { .wheel-scale { transform: scale(1.2); margin: 70px 0 80px; } }
        @media (max-width: 640px) { .wheel-scale { transform: scale(0.9); margin: 20px 0 30px; } }
      `}</style>

      {result && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,31,18,0.55)',
            display: 'grid',
            placeItems: 'center',
            padding: 16,
            zIndex: 100,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeResult();
          }}
        >
          <div
            className="card-lg"
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '32px 28px',
              background: 'var(--cream)',
              textAlign: 'center',
            }}
          >
            <h2 className="hx" style={{ fontSize: 28, margin: '0 0 12px' }}>
              {resultCopy[result].title}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 24, lineHeight: 1.4 }}>
              {resultCopy[result].body}
            </p>
            <button className="btn big" onClick={closeResult}>
              OK
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Teljes képernyő"
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          width: 44,
          height: 44,
          border: '2.5px solid var(--ink)',
          background: 'var(--paper-2)',
          boxShadow: '2px 2px 0 0 var(--ink)',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          zIndex: 90,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path
            d="M4 9 V4 H9 M20 9 V4 H15 M4 15 V20 H9 M20 15 V20 H15"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {adminOpen && (
          <div
            className="card-lg"
            style={{ width: 260, padding: '16px 16px 14px', background: 'var(--cream)' }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--ink-soft)',
                marginBottom: 14,
              }}
            >
              § STOCK
            </div>

            <StockRow
              label="Telefontartó"
              value={stock.phoneHolder}
              onChange={(n) => setStock((s) => ({ ...s, phoneHolder: clamp(n) }))}
            />
            <div style={{ height: 12 }} />
            <StockRow
              label="Dom 50%"
              value={stock.dom}
              onChange={(n) => setStock((s) => ({ ...s, dom: clamp(n) }))}
            />

            <button
              type="button"
              onClick={() => setStock(DEFAULT_STOCK)}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '9px 12px',
                border: '2.5px solid var(--ink)',
                background: 'var(--ink)',
                color: '#fff',
                fontFamily: 'var(--font-inter), "Inter", sans-serif',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 0 var(--ink)',
              }}
            >
              RESET {MAX_STOCK} / {MAX_STOCK}
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label={adminOpen ? 'Panel bezárása' : 'Admin panel'}
          onClick={() => setAdminOpen((v) => !v)}
          style={{
            width: 44,
            height: 44,
            border: '2.5px solid var(--ink)',
            background: adminOpen ? 'var(--cream)' : 'var(--paper-2)',
            boxShadow: '2px 2px 0 0 var(--ink)',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {adminOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 3 L15 15 M15 3 L3 15" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <circle cx="12" cy="12" r="3" stroke="var(--ink)" strokeWidth="2" />
              <path
                d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </main>
  );
}

function StockRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
        <span className="hx" style={{ fontSize: 18, letterSpacing: '-0.02em' }}>
          {value} / {MAX_STOCK}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <StepButton onClick={() => onChange(value - 1)} disabled={value <= 0}>
          −
        </StepButton>
        <StepButton onClick={() => onChange(value + 1)} disabled={value >= MAX_STOCK}>
          +
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        height: 36,
        border: '2.5px solid var(--ink)',
        background: disabled ? 'var(--paper-2)' : '#fff',
        color: disabled ? 'var(--ink-soft)' : 'var(--ink)',
        fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif',
        fontSize: 18,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '2px 2px 0 0 var(--ink)',
      }}
    >
      {children}
    </button>
  );
}
