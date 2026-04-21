'use client';

import Wheel from './components/Wheel';
import { BASE_SLICES } from './slices';

export default function WheelPage() {
  return (
    <main
      className="grid-bg"
      style={{
        minHeight: '100vh',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <span className="sec-num">§ WHEEL / PARKSAFE EVENT</span>
      <h1
        className="hx"
        style={{
          fontSize: 'clamp(44px, 9vw, 96px)',
          textAlign: 'center',
          margin: '16px 0 40px',
          letterSpacing: '-0.05em',
        }}
      >
        PÖRGESS ÉS{' '}
        <span style={{ color: 'var(--green)' }}>NYERJ</span>!
      </h1>
      <Wheel slices={BASE_SLICES} />
    </main>
  );
}
