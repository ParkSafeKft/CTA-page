'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Wheel = dynamic(
  () => import('react-custom-roulette').then((m) => m.Wheel),
  { ssr: false }
);

const data = [
  { option: 'TELEFONTARTÓ', style: { backgroundColor: '#34aa56', textColor: '#0a1f12' } },
  { option: '+50 XP',       style: { backgroundColor: '#fffef9', textColor: '#0a1f12' } },
  { option: 'SAJNOS NEM',   style: { backgroundColor: '#0a1f12', textColor: '#f7f5f0' } },
  { option: '+100 XP',      style: { backgroundColor: '#efece4', textColor: '#0a1f12' } },
  { option: 'DOM 50%',      style: { backgroundColor: '#ec4899', textColor: '#0a1f12' } },
  { option: '+50 XP',       style: { backgroundColor: '#fffef9', textColor: '#0a1f12' } },
  { option: 'SAJNOS NEM',   style: { backgroundColor: '#0a1f12', textColor: '#f7f5f0' } },
  { option: '+100 XP',      style: { backgroundColor: '#efece4', textColor: '#0a1f12' } },
];

const resultCopy: Record<string, { title: string; body: string }> = {
  'TELEFONTARTÓ': { title: 'NYERTÉL EGY TELEFONTARTÓT!', body: 'Vedd át az asztalnál.' },
  'DOM 50%':      { title: '50% DOM KUPON!',             body: 'Vedd át az asztalnál.' },
  '+50 XP':       { title: '+50 XP AZ APPBAN!',          body: 'Szólj a felhasználóneveddel.' },
  '+100 XP':      { title: '+100 XP AZ APPBAN!',         body: 'Szólj a felhasználóneveddel.' },
  'SAJNOS NEM':   { title: 'SAJNOS NEM NYERTÉL',         body: 'Legközelebb több szerencsét!' },
};

export default function WheelPage() {
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  function handleSpin() {
    if (spinning) return;
    setResult(null);
    setPrizeIndex(Math.floor(Math.random() * data.length));
    setSpinning(true);
  }

  function handleStop() {
    setSpinning(false);
    setResult(data[prizeIndex].option);
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

      <div style={{ filter: 'drop-shadow(6px 6px 0 var(--ink))' }}>
        <Wheel
          mustStartSpinning={spinning}
          prizeNumber={prizeIndex}
          data={data}
          onStopSpinning={handleStop}
          outerBorderColor="#0a1f12"
          outerBorderWidth={6}
          innerBorderColor="#0a1f12"
          innerBorderWidth={2}
          radiusLineColor="#0a1f12"
          radiusLineWidth={2}
          fontFamily="Archivo Black, sans-serif"
          fontSize={16}
          textDistance={62}
          spinDuration={0.6}
        />
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="btn big"
        style={{ marginTop: 28, minWidth: 220, justifyContent: 'center' }}
      >
        {spinning ? 'PÖRÖG...' : 'PÖRGESS!'}
      </button>

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
            if (e.target === e.currentTarget) setResult(null);
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
            <button className="btn big" onClick={() => setResult(null)}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
