import { useEffect, useRef, useState, useCallback } from 'react';
import { ParkingSquare, Navigation, Map, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Mobile hook ────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

/* ─── Keyframes & global styles ─────────────────────────────────────────── */
const STYLES = `
  @keyframes gridPan {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-14px) rotate(1deg); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.8; }
  }
  @keyframes scrollX {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%       { transform: scale(1.3); opacity: 1; }
  }

  * { box-sizing: border-box; }

  .hero-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.2rem, 7vw, 5.2rem);
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: #f0f4f0;
  }
  .section-headline { font-family: 'DM Serif Display', serif; }

  .grain-overlay {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.045;
    mix-blend-mode: overlay;
  }

  .float-phone { animation: float 6s ease-in-out infinite; }
  .glow-pulse  { animation: glowPulse 3s ease-in-out infinite; }
  .scroll-track { animation: scrollX 22s linear infinite; }
  .scroll-track:hover { animation-play-state: paused; }
  .dot-active { animation: dotPulse 1.5s ease-in-out infinite; }

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
    display: inline-block;
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
    background: rgba(10,15,10,0.88) !important;
    border-bottom: 1px solid rgba(52,170,86,0.15);
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }

  .hero-number {
    font-family: 'DM Serif Display', serif;
    background: linear-gradient(135deg, #34aa56 0%, #5ddc82 50%, #34aa56 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .nav-store-btns { display: none !important; }

    .hero-inner {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center;
      gap: 48px !important;
    }
    .hero-copy {
      min-width: unset !important;
      max-width: 100% !important;
    }
    .hero-copy .badge-row { justify-content: center; }
    .hero-store-btns { justify-content: center !important; }
    .trust-row {
      justify-content: center !important;
      gap: 10px !important;
    }
    .trust-divider { display: none !important; }
    .trust-item span { font-size: 0.75rem !important; }

    .stats-row {
      flex-direction: column !important;
      gap: 28px !important;
      align-items: center;
    }
    .stats-divider { display: none !important; }
    .stat-item { padding: 0 !important; }

    .footer-inner {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center;
      gap: 20px !important;
    }
    .footer-links { gap: 20px !important; }

    .features-header { margin-bottom: 40px !important; }
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
function PhoneMockup({ currentSlide, onPrev, onNext, isMobile }: {
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  isMobile: boolean;
}) {
  const slides = ['/demo2.png', '/demo1.png', '/demo3.png', '/demo4.png', '/demo5.png'];
  const W = isMobile ? 200 : 260;
  const H = isMobile ? 400 : 520;
  const BR = isMobile ? 36 : 44;

  return (
    <div className="float-phone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: `${W}px`, height: `${H}px`,
        borderRadius: `${BR}px`,
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
          position: 'absolute', top: '14px', left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '64px' : '80px',
          height: isMobile ? '20px' : '24px',
          background: '#0a0f0a',
          borderRadius: '12px',
          zIndex: 10,
          border: '1px solid rgba(52,170,86,0.2)',
        }} />
        {/* Screen */}
        <div style={{
          position: 'absolute', inset: '6px',
          borderRadius: `${BR - 5}px`,
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
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30px',
          background: 'linear-gradient(to top, rgba(52,170,86,0.15), transparent)',
          pointerEvents: 'none', zIndex: 5,
        }} />
      </div>

      {/* Carousel controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button onClick={onPrev} style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'rgba(52,170,86,0.12)',
          border: '1px solid rgba(52,170,86,0.3)',
          color: '#34aa56',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.12)')}
        >
          <ChevronLeft size={15} />
        </button>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === currentSlide ? '18px' : '6px',
              height: '6px', borderRadius: '3px',
              background: i === currentSlide ? '#34aa56' : 'rgba(52,170,86,0.3)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        <button onClick={onNext} style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'rgba(52,170,86,0.12)',
          border: '1px solid rgba(52,170,86,0.3)',
          color: '#34aa56',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(52,170,86,0.12)')}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ─── Store Buttons ──────────────────────────────────────────────────────── */
function StoreButtons({ size = 'md', centered = false }: { size?: 'sm' | 'md' | 'lg'; centered?: boolean }) {
  const h = size === 'lg' ? '54px' : size === 'sm' ? '38px' : '46px';
  return (
    <div className="hero-store-btns" style={{
      display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
      justifyContent: centered ? 'center' : 'flex-start',
    }}>
      <div className="store-btn">
        <img src="/appstore.png" alt="Download on the App Store"
          style={{ height: h, borderRadius: '10px', display: 'block' }} />
      </div>
      <div className="store-btn">
        <img src="/googleplay.png" alt="Get it on Google Play"
          style={{ height: h, borderRadius: '10px', display: 'block' }} />
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
    : `${count}`;
  return (
    <div className="stat-item" style={{ textAlign: 'center', padding: '0 32px' }}>
      <div style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 'clamp(2rem, 5vw, 3.8rem)',
        fontWeight: 400,
        background: 'linear-gradient(135deg, #34aa56, #7be09a)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        lineHeight: 1.1,
      }}>
        {display}{suffix}
      </div>
      <div style={{
        color: 'rgba(232,237,232,0.5)', fontSize: '0.8rem',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px', fontWeight: 500,
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
    <div className="card-glass" style={{
      borderRadius: '20px', padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px)',
      flex: '1', minWidth: '240px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '14px',
        background: 'rgba(52,170,86,0.12)', border: '1px solid rgba(52,170,86,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '22px', color: '#34aa56',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem',
        fontWeight: 400, color: '#f0f4f0', marginBottom: '10px', lineHeight: 1.2,
      }}>
        {title}
      </h3>
      <p style={{ color: 'rgba(232,237,232,0.55)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 400 }}>
        {description}
      </p>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  const isMobile = useIsMobile();
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 5;

  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const prevSlide = useCallback(() => setCurrentSlide(s => (s - 1 + TOTAL_SLIDES) % TOTAL_SLIDES), []);
  const nextSlide = useCallback(() => setCurrentSlide(s => (s + 1) % TOTAL_SLIDES), []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Swipe support (whole-page touch on mobile)
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
    }, { threshold: 0.1 });
    if (cardsRef.current) obs.observe(cardsRef.current);
    if (statsRef.current) obs.observe(statsRef.current);
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  const cities = ['Amsterdam', 'Berlin', 'Vienna', 'Budapest', 'Prague', 'Warsaw', 'Paris', 'Zürich', 'Copenhagen', 'Rotterdam'];

  return (
    <>
      <style>{STYLES}</style>

      {/* ── NAVBAR ───────────────────────────────────────────────────── */}
      <nav
        className={navScrolled ? 'nav-scrolled' : ''}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(16px, 5vw, 60px)',
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="ParkSafe" style={{ width: '34px', height: '34px', borderRadius: '8px' }} />
          <span style={{
            fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem',
            color: '#f0f4f0', letterSpacing: '-0.01em',
          }}>ParkSafe</span>
        </div>
        {/* Hidden on mobile via CSS */}
        <div className="nav-store-btns">
          <StoreButtons size="sm" />
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex', alignItems: 'center',
        padding: isMobile
          ? '96px 20px 60px'
          : 'clamp(100px, 12vh, 140px) clamp(20px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0f0a 0%, #0d1a0d 60%, #0a0f0a 100%)',
      }}>
        <CityGrid />
        <div className="grain-overlay" />
        <div className="glow-pulse" style={{
          position: 'absolute', top: '50%', left: isMobile ? '50%' : '35%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '340px' : '700px',
          height: isMobile ? '340px' : '700px',
          background: 'radial-gradient(circle, rgba(52,170,86,0.1) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        <div
          className="hero-inner"
          style={{
            position: 'relative', zIndex: 2,
            maxWidth: '1200px', margin: '0 auto', width: '100%',
            display: 'flex', alignItems: 'center',
            gap: isMobile ? '48px' : 'clamp(40px, 6vw, 100px)',
            flexWrap: 'wrap',
          }}
        >
          {/* Copy */}
          <div className="hero-copy" style={{ flex: '1', minWidth: isMobile ? '100%' : '300px', maxWidth: '580px' }}>
            {/* Badge */}
            <div className="badge-row" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(52,170,86,0.08)', border: '1px solid rgba(52,170,86,0.25)',
              borderRadius: '100px', padding: '6px 14px', marginBottom: '28px',
              opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.1s',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34aa56' }} className="dot-active" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(52,170,86,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Launching Sunday
              </span>
            </div>

            <h1 className="hero-headline" style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}>
              <span className="hero-number">2.000.000+</span>
              {' '}bike parking spots across Europe.{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(240,244,240,0.7)' }}>Finally mapped.</em>
            </h1>

            <p style={{
              color: 'rgba(232,237,232,0.55)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              lineHeight: 1.75, marginTop: '20px',
              maxWidth: isMobile ? '100%' : '480px',
              fontWeight: 400,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
            }}>
              Plan safer routes. Find parking instantly.<br />
              Own the city on two wheels.
            </p>

            <div style={{
              marginTop: '36px',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
            }}>
              <StoreButtons size="lg" centered={isMobile} />
            </div>

            {/* Trust badges */}
            <div className="trust-row" style={{
              marginTop: '32px',
              display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.65s',
            }}>
              {[
                'Free to download',
                null,
                'iOS & Android',
                null,
                '100+ European cities',
              ].map((item, i) =>
                item === null
                  ? <div key={i} className="trust-divider" style={{ width: '1px', height: '16px', background: 'rgba(232,237,232,0.12)' }} />
                  : (
                    <div key={i} className="trust-item" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(52,170,86,0.15)', border: '1px solid rgba(52,170,86,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34aa56" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(232,237,232,0.45)', fontWeight: 400 }}>{item}</span>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Phone */}
          <div
            style={{
              flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: isMobile ? '100%' : 'auto',
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
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Scroll hint — desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            opacity: heroVisible ? 0.4 : 0, transition: 'opacity 1s ease 1s', zIndex: 2,
          }}>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,237,232,0.6)' }}>Scroll</span>
            <svg width="1" height="28" viewBox="0 0 1 28">
              <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="rgba(52,170,86,0.5)" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        )}
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(64px, 10vh, 130px) clamp(16px, 6vw, 80px)',
        background: '#0a0f0a', position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="features-header" style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ color: 'rgba(52,170,86,0.8)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '14px' }}>
              Everything you need
            </p>
            <h2 className="section-headline" style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 400, color: '#f0f4f0', lineHeight: 1.15,
            }}>
              Built for the urban cyclist.
            </h2>
          </div>
          <div ref={cardsRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'stretch' }}>
            <FeatureCard icon={<ParkingSquare size={22} />} title="Bike Parking"
              description="2M+ verified spots mapped across Europe. Never circle the block again — find secure parking in seconds."
              delay={0} visible={cardsVisible} />
            <FeatureCard icon={<Navigation size={22} />} title="Safe Navigation"
              description="Routes scored by bike lanes, road quality & traffic. Not just the fastest path — the safest one for you."
              delay={120} visible={cardsVisible} />
            <FeatureCard icon={<Map size={22} />} title="Bike Infrastructure"
              description="Repair shops, water stations, elevation profiles. Everything a cyclist needs, in one place."
              delay={240} visible={cardsVisible} />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(64px, 10vh, 120px) clamp(16px, 6vw, 80px)',
        background: 'linear-gradient(180deg, #0a0f0a 0%, #0c160c 50%, #0a0f0a 100%)',
        borderTop: '1px solid rgba(52,170,86,0.08)',
        borderBottom: '1px solid rgba(52,170,86,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="glow-pulse" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(52,170,86,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div ref={statsRef} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 className="section-headline" style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', fontWeight: 400, color: '#f0f4f0', marginBottom: '8px',
            }}>
              Works in Amsterdam, Berlin, Vienna & 100+ cities
            </h2>
            <p style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.88rem' }}>And growing every week.</p>
          </div>

          <div className="stats-row" style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'nowrap',
            margin: '48px 0',
          }}>
            <StatCounter value={2000000} label="Parking Spots" suffix="+" triggered={statsVisible} />
            <div className="stats-divider" style={{ width: '1px', background: 'rgba(52,170,86,0.15)', margin: '0 4px' }} />
            <StatCounter value={100} label="Cities" suffix="+" triggered={statsVisible} />
            <div className="stats-divider" style={{ width: '1px', background: 'rgba(52,170,86,0.15)', margin: '0 4px' }} />
            <StatCounter value={3} label="Countries" triggered={statsVisible} />
          </div>

          {/* Scrolling city pills */}
          <div style={{ overflow: 'hidden' }}>
            <div className="scroll-track" style={{ display: 'flex', width: 'max-content' }}>
              {[...cities, ...cities].map((city, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '7px 18px', margin: '0 5px',
                  borderRadius: '100px',
                  background: 'rgba(52,170,86,0.06)', border: '1px solid rgba(52,170,86,0.18)',
                  whiteSpace: 'nowrap', fontSize: '0.82rem',
                  color: 'rgba(232,237,232,0.6)', fontWeight: 500, letterSpacing: '0.02em',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34aa56', marginRight: '8px', opacity: 0.7 }} />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px, 14vh, 160px) clamp(16px, 6vw, 80px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        background: '#0a0f0a',
      }}>
        <div className="glow-pulse" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(52,170,86,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="grain-overlay" />
        <div ref={ctaRef} style={{
          maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 2,
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(52,170,86,0.08)', border: '1px solid rgba(52,170,86,0.25)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '24px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34aa56' }} className="dot-active" />
            <span style={{ fontSize: '0.75rem', color: 'rgba(52,170,86,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Almost here
            </span>
          </div>
          <h2 className="section-headline" style={{
            fontSize: 'clamp(2.4rem, 8vw, 5.5rem)', fontWeight: 400,
            lineHeight: 1.05, letterSpacing: '-0.02em', color: '#f0f4f0', marginBottom: '18px',
          }}>
            Ride smarter.<br />
            <em style={{ color: '#34aa56', fontStyle: 'italic' }}>Starting Sunday.</em>
          </h2>
          <p style={{ color: 'rgba(232,237,232,0.45)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7, marginBottom: '40px' }}>
            Join thousands of cyclists who'll navigate Europe's cities with confidence from day one.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StoreButtons size="lg" centered />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(52,170,86,0.1)',
        padding: 'clamp(24px, 4vh, 40px) clamp(16px, 6vw, 80px)',
        background: '#080d08',
      }}>
        <div className="footer-inner" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/logo.png" alt="ParkSafe" style={{ width: '20px', height: '20px', borderRadius: '4px', opacity: 0.8 }} />
              <span style={{ color: 'rgba(232,237,232,0.7)', fontSize: '0.85rem', fontWeight: 500 }}>© 2026 ParkSafe</span>
            </div>
            <span style={{ color: 'rgba(232,237,232,0.3)', fontSize: '0.75rem' }}>Made for cyclists, by cyclists.</span>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#34aa56')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,232,0.4)')}>
              Privacy Policy
            </a>
            <a href="mailto:hello@getparksafe.com" style={{ color: 'rgba(232,237,232,0.4)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#34aa56')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,232,0.4)')}>
              hello@getparksafe.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
