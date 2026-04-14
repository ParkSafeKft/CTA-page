import { useEffect, useRef, useState, useCallback } from 'react';
import { ParkingSquare, Navigation, Map, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Keyframes & global styles ─────────────────────────────────────────── */
const STYLES = `
  @keyframes gridPan {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-18px) rotate(1deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.8; }
  }
  @keyframes countUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scrollX {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes navBlur {
    from { backdrop-filter: blur(0px); background: transparent; }
    to   { backdrop-filter: blur(20px); background: rgba(10,15,10,0.85); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%       { transform: scale(1.3); opacity: 1; }
  }

  .hero-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.6rem, 6vw, 5.2rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #f0f4f0;
  }
  .section-headline {
    font-family: 'DM Serif Display', serif;
  }
  .grain-overlay {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.045;
    mix-blend-mode: overlay;
  }
  .animate-fadeUp { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-slideUp { animation: slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .float-phone { animation: float 6s ease-in-out infinite; }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .scroll-track { animation: scrollX 22s linear infinite; }
  .scroll-track:hover { animation-play-state: paused; }

  .card-glass {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(52,170,86,0.12);
    backdrop-filter: blur(12px);
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-glass:hover {
    border-color: rgba(52,170,86,0.5);
    transform: translateY(-4px);
    box-shadow: 0 0 30px rgba(52,170,86,0.12), 0 20px 40px rgba(0,0,0,0.4);
  }
  .store-btn {
    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
    cursor: pointer;
  }
  .store-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 28px rgba(52,170,86,0.45), 0 8px 24px rgba(0,0,0,0.5);
    filter: brightness(1.08);
  }
  .store-btn:active { transform: scale(0.98); }

  .nav-scrolled {
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(10,15,10,0.88);
    border-bottom: 1px solid rgba(52,170,86,0.15);
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }
  .carousel-slide {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
  }
  .dot-active { animation: dotPulse 1.5s ease-in-out infinite; }

  .hero-number {
    font-family: 'DM Serif Display', serif;
    background: linear-gradient(135deg, #34aa56 0%, #5ddc82 50%, #34aa56 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .green-glow-radial {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(52,170,86,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
`;

/* ─── City Grid SVG background ──────────────────────────────────────────── */
function CityGrid() {
  const lines: JSX.Element[] = [];
  const SPACING = 60;
  const COUNT = 18;
  for (let i = 0; i <= COUNT; i++) {
    const pos = i * SPACING;
    lines.push(
      <line key={`h${i}`} x1="0" y1={pos} x2={COUNT * SPACING} y2={pos}
        stroke="rgba(52,170,86,0.13)" strokeWidth="1" />,
      <line key={`v${i}`} x1={pos} y1="0" x2={pos} y2={COUNT * SPACING}
        stroke="rgba(52,170,86,0.13)" strokeWidth="1" />
    );
    if (i % 4 === 0 && i > 0) {
      lines.push(
        <line key={`hb${i}`} x1="0" y1={pos} x2={COUNT * SPACING} y2={pos}
          stroke="rgba(52,170,86,0.22)" strokeWidth="1.5" />,
        <line key={`vb${i}`} x1={pos} y1="0" x2={pos} y2={COUNT * SPACING}
          stroke="rgba(52,170,86,0.22)" strokeWidth="1.5" />
      );
    }
  }
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
    }}>
      <svg
        style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '120%', height: '120%',
          animation: 'gridPan 18s linear infinite',
        }}
        viewBox={`0 0 ${18 * 60} ${18 * 60}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {lines}
      </svg>
    </div>
  );
}

/* ─── Phone Mockup ───────────────────────────────────────────────────────── */
function PhoneMockup({ currentSlide, onPrev, onNext, totalSlides }: {
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  totalSlides: number;
}) {
  const slides = ['/demo2.png', '/demo1.png', '/demo3.png', '/demo4.png', '/demo5.png'];

  return (
    <div className="float-phone" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Phone frame */}
      <div style={{
        width: '260px', height: '520px',
        borderRadius: '44px',
        background: 'linear-gradient(145deg, #1a2a1a 0%, #0d1a0d 100%)',
        border: '2px solid rgba(52,170,86,0.35)',
        boxShadow: `
          0 0 0 1px rgba(52,170,86,0.12),
          0 30px 80px rgba(0,0,0,0.7),
          0 0 60px rgba(52,170,86,0.15),
          inset 0 0 30px rgba(52,170,86,0.05)
        `,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: '16px', left: '50%',
          transform: 'translateX(-50%)',
          width: '80px', height: '24px',
          background: '#0a0f0a',
          borderRadius: '12px',
          zIndex: 10,
          border: '1px solid rgba(52,170,86,0.2)',
        }} />
        {/* Screen */}
        <div style={{
          position: 'absolute', inset: '6px',
          borderRadius: '39px',
          overflow: 'hidden',
          background: '#f0f0f0',
        }}>
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`App screen ${i + 1}`}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === currentSlide ? 1 : 0,
                transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          ))}
        </div>
        {/* Green screen glow at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30px',
          background: 'linear-gradient(to top, rgba(52,170,86,0.15), transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }} />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onPrev} style={{
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'rgba(52,170,86,0.12)',
          border: '1px solid rgba(52,170,86,0.3)',
          color: '#34aa56',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.12)')}
        >
          <ChevronLeft size={16} />
        </button>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === currentSlide ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === currentSlide ? '#34aa56' : 'rgba(52,170,86,0.3)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        <button onClick={onNext} style={{
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'rgba(52,170,86,0.12)',
          border: '1px solid rgba(52,170,86,0.3)',
          color: '#34aa56',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.12)')}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ─── Store Buttons ──────────────────────────────────────────────────────── */
function StoreButtons({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? '56px' : size === 'sm' ? '40px' : '48px';
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div className="store-btn">
        <img src="/appstore.png" alt="Download on the App Store" style={{ height: h, borderRadius: '10px', display: 'block' }} />
      </div>
      <div className="store-btn">
        <img src="/googleplay.png" alt="Get it on Google Play" style={{ height: h, borderRadius: '10px', display: 'block' }} />
      </div>
    </div>
  );
}

/* ─── Counter ────────────────────────────────────────────────────────────── */
function useCounter(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration]);
  return count;
}

function StatCounter({ value, label, suffix = '', triggered }: {
  value: number; label: string; suffix?: string; triggered: boolean;
}) {
  const count = useCounter(value, 1800, triggered);
  const display = value >= 1000000
    ? `${(count / 1000000).toFixed(count === 0 ? 0 : 1)}M`
    : count >= 1000 ? `${count.toLocaleString()}` : `${count}`;

  return (
    <div style={{ textAlign: 'center', padding: '0 32px' }}>
      <div style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
        fontWeight: 400,
        background: 'linear-gradient(135deg, #34aa56, #7be09a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1.1,
      }}>
        {display}{suffix}
      </div>
      <div style={{
        color: 'rgba(232,237,232,0.5)',
        fontSize: '0.82rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginTop: '6px',
        fontWeight: 500,
      }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, description, delay, visible }: {
  icon: JSX.Element; title: string; description: string;
  delay: number; visible: boolean;
}) {
  return (
    <div
      className="card-glass"
      style={{
        borderRadius: '20px',
        padding: '36px 32px',
        flex: '1',
        minWidth: '260px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '14px',
        background: 'rgba(52,170,86,0.12)',
        border: '1px solid rgba(52,170,86,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
        color: '#34aa56',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '1.35rem',
        fontWeight: 400,
        color: '#f0f4f0',
        marginBottom: '12px',
        lineHeight: 1.2,
      }}>
        {title}
      </h3>
      <p style={{
        color: 'rgba(232,237,232,0.55)',
        fontSize: '0.92rem',
        lineHeight: 1.7,
        fontWeight: 400,
      }}>
        {description}
      </p>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const TOTAL_SLIDES = 5;

  const prevSlide = useCallback(() => setCurrentSlide(s => (s - 1 + TOTAL_SLIDES) % TOTAL_SLIDES), []);
  const nextSlide = useCallback(() => setCurrentSlide(s => (s + 1) % TOTAL_SLIDES), []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch/swipe
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextSlide() : prevSlide();
    touchStart.current = null;
  };

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(() => setHeroVisible(true), 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.target === cardsRef.current && e.isIntersecting) setCardsVisible(true);
        if (e.target === statsRef.current && e.isIntersecting) setStatsVisible(true);
        if (e.target === ctaRef.current && e.isIntersecting) setCtaVisible(true);
      });
    }, { threshold: 0.15 });
    if (cardsRef.current) obs.observe(cardsRef.current);
    if (statsRef.current) obs.observe(statsRef.current);
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  const cities = ['Amsterdam', 'Berlin', 'Vienna', 'Budapest', 'Prague', 'Warsaw', 'Paris', 'Zürich', 'Copenhagen', 'Rotterdam'];

  return (
    <>
      <style>{STYLES}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(20px, 5vw, 60px)',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s ease',
      }}
        className={navScrolled ? 'nav-scrolled' : ''}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="ParkSafe" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.3rem',
            color: '#f0f4f0',
            letterSpacing: '-0.01em',
          }}>ParkSafe</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <StoreButtons size="sm" />
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: 'clamp(100px, 12vh, 140px) clamp(20px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0f0a 0%, #0d1a0d 60%, #0a0f0a 100%)',
      }}>
        <CityGrid />
        <div className="grain-overlay" />

        {/* Radial glow */}
        <div className="glow-pulse" style={{
          position: 'absolute', top: '50%', left: '35%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(52,170,86,0.1) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          display: 'flex', alignItems: 'center',
          gap: 'clamp(40px, 6vw, 100px)',
          flexWrap: 'wrap',
        }}>
          {/* Left: Copy */}
          <div style={{ flex: '1', minWidth: '300px', maxWidth: '580px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(52,170,86,0.08)',
              border: '1px solid rgba(52,170,86,0.25)',
              borderRadius: '100px',
              padding: '6px 14px',
              marginBottom: '32px',
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.1s',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34aa56' }} className="dot-active" />
              <span style={{ fontSize: '0.78rem', color: 'rgba(52,170,86,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Launching Sunday
              </span>
            </div>

            <h1
              className="hero-headline"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(30px)',
                transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
              }}
            >
              <span className="hero-number">2.000.000+</span>
              {' '}bike parking spots across Europe.{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(240,244,240,0.7)' }}>Finally mapped.</em>
            </h1>

            <p style={{
              color: 'rgba(232,237,232,0.55)',
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              lineHeight: 1.75,
              marginTop: '24px',
              maxWidth: '480px',
              fontWeight: 400,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
            }}>
              Plan safer routes. Find parking instantly.<br />
              Own the city on two wheels.
            </p>

            <div style={{
              marginTop: '40px',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
            }}>
              <StoreButtons size="lg" />
            </div>

            {/* Trust badge */}
            <div style={{
              marginTop: '40px',
              display: 'flex', alignItems: 'center', gap: '20px',
              flexWrap: 'wrap',
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.65s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(52,170,86,0.15)', border: '1px solid rgba(52,170,86,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34aa56" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'rgba(232,237,232,0.45)', fontWeight: 400 }}>Free to download</span>
              </div>
              <div style={{ width: '1px', height: '16px', background: 'rgba(232,237,232,0.12)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(52,170,86,0.15)', border: '1px solid rgba(52,170,86,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34aa56" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'rgba(232,237,232,0.45)', fontWeight: 400 }}>iOS & Android</span>
              </div>
              <div style={{ width: '1px', height: '16px', background: 'rgba(232,237,232,0.12)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(52,170,86,0.15)', border: '1px solid rgba(52,170,86,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34aa56" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'rgba(232,237,232,0.45)', fontWeight: 400 }}>100+ European cities</span>
              </div>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div style={{
            flex: '0 0 auto',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateY(30px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
          }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <PhoneMockup
              currentSlide={currentSlide}
              onPrev={prevSlide}
              onNext={nextSlide}
              totalSlides={TOTAL_SLIDES}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: heroVisible ? 0.4 : 0, transition: 'opacity 1s ease 1s',
          zIndex: 2,
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,237,232,0.6)' }}>Scroll</span>
          <svg width="1" height="32" viewBox="0 0 1 32"><line x1="0.5" y1="0" x2="0.5" y2="32" stroke="rgba(52,170,86,0.5)" strokeWidth="1" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" /></line></svg>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px, 12vh, 130px) clamp(20px, 6vw, 80px)',
        background: '#0a0f0a',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: 'rgba(52,170,86,0.8)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>
              Everything you need
            </p>
            <h2 className="section-headline" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#f0f4f0',
              lineHeight: 1.15,
            }}>
              Built for the urban cyclist.
            </h2>
          </div>

          <div
            ref={cardsRef}
            style={{
              display: 'flex', gap: '20px', flexWrap: 'wrap',
              alignItems: 'stretch',
            }}
          >
            <FeatureCard
              icon={<ParkingSquare size={22} />}
              title="Bike Parking"
              description="2M+ verified spots mapped across Europe. Never circle the block again — find secure parking in seconds."
              delay={0}
              visible={cardsVisible}
            />
            <FeatureCard
              icon={<Navigation size={22} />}
              title="Safe Navigation"
              description="Routes scored by bike lanes, road quality & traffic. Not just the fastest path — the safest one for you."
              delay={120}
              visible={cardsVisible}
            />
            <FeatureCard
              icon={<Map size={22} />}
              title="Bike Infrastructure"
              description="Repair shops, water stations, elevation profiles. Everything a cyclist needs, in one place."
              delay={240}
              visible={cardsVisible}
            />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 80px)',
        background: 'linear-gradient(180deg, #0a0f0a 0%, #0c160c 50%, #0a0f0a 100%)',
        borderTop: '1px solid rgba(52,170,86,0.08)',
        borderBottom: '1px solid rgba(52,170,86,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(52,170,86,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} className="glow-pulse" />

        <div ref={statsRef} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 className="section-headline" style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400,
              color: '#f0f4f0',
              marginBottom: '8px',
            }}>
              Works in Amsterdam, Berlin, Vienna & 100+ cities
            </h2>
            <p style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.9rem' }}>
              And growing every week.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
            gap: '0',
            margin: '56px 0',
          }}>
            <StatCounter value={2000000} label="Parking Spots" suffix="+" triggered={statsVisible} />
            <div style={{ width: '1px', background: 'rgba(52,170,86,0.15)', margin: '0 4px' }} />
            <StatCounter value={100} label="Cities" suffix="+" triggered={statsVisible} />
            <div style={{ width: '1px', background: 'rgba(52,170,86,0.15)', margin: '0 4px' }} />
            <StatCounter value={3} label="Countries" triggered={statsVisible} />
          </div>

          {/* City pills - scrolling */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{
              display: 'flex',
              width: 'max-content',
            }}
              className="scroll-track"
            >
              {[...cities, ...cities].map((city, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '8px 20px',
                  margin: '0 6px',
                  borderRadius: '100px',
                  background: 'rgba(52,170,86,0.06)',
                  border: '1px solid rgba(52,170,86,0.18)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                  color: 'rgba(232,237,232,0.6)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34aa56', marginRight: '8px', opacity: 0.7 }} />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(100px, 14vh, 160px) clamp(20px, 6vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0f0a',
      }}>
        {/* Big radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(52,170,86,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} className="glow-pulse" />

        <div className="grain-overlay" />

        <div ref={ctaRef} style={{
          maxWidth: '720px', margin: '0 auto',
          position: 'relative', zIndex: 2,
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(52,170,86,0.08)',
            border: '1px solid rgba(52,170,86,0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34aa56' }} className="dot-active" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(52,170,86,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Almost here
            </span>
          </div>

          <h2 className="section-headline" style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f0f4f0',
            marginBottom: '20px',
          }}>
            Ride smarter.<br />
            <em style={{ color: '#34aa56', fontStyle: 'italic' }}>Starting Sunday.</em>
          </h2>

          <p style={{
            color: 'rgba(232,237,232,0.45)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: '44px',
          }}>
            Join thousands of cyclists who'll navigate Europe's cities with confidence from day one.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StoreButtons size="lg" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(52,170,86,0.1)',
        padding: 'clamp(28px, 4vh, 40px) clamp(20px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#080d08',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="ParkSafe" style={{ width: '20px', height: '20px', borderRadius: '4px', opacity: 0.8 }} />
            <span style={{ color: 'rgba(232,237,232,0.7)', fontSize: '0.85rem', fontWeight: 500 }}>© 2026 ParkSafe</span>
          </div>
          <span style={{ color: 'rgba(232,237,232,0.3)', fontSize: '0.78rem' }}>Made for cyclists, by cyclists.</span>
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#34aa56')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,232,0.4)')}
          >
            Privacy Policy
          </a>
          <a href="mailto:hello@getparksafe.com" style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#34aa56')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,232,0.4)')}
          >
            hello@getparksafe.com
          </a>
        </div>
      </footer>
    </>
  );
}
