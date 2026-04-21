# `/wheel` Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/wheel` route in the existing Next.js 16 ParkSafe site — an 8-slice SVG wheel of fortune for an event where registered users can spin for physical prizes (phone holder, Dom 50% coupon), XP rewards, or nothing, with a small gear-triggered admin panel for managing stock.

**Architecture:** Single client-component page (`app/wheel/page.tsx`) composed of three sub-components (`Wheel`, `ResultModal`, `AdminPanel`) plus one custom hook (`useWheelStock`) backed by `localStorage`. The wheel renders as an SVG with 8 fixed-position slices; slice labels and colors swap dynamically when stock hits zero (physical slice becomes "ELKELT +50 XP"). Spin animation is pure CSS transform + transition; landing detection happens in `onTransitionEnd` using the current rotation state.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, TypeScript. No test framework, no new dependencies. Follows existing project conventions: `'use client'` directive, inline `style={}` objects + globals.css utility classes (`.hx`, `.mono`, `.grid-bg`, `.btn`, `.sec-num`, `.card-lg`), CSS custom properties from `app/globals.css`, inline `<style>` blocks for media queries (see `app/components/Hero.tsx:366-380` for the pattern).

**Verification strategy:** No automated tests — this is a one-shot event tool where adding Jest/Vitest is not worth the setup time. Each task ends with **manual verification** in a browser (`npm run dev`), including specific scenarios to exercise. A final manual QA checklist lives in Task 11.

**Spec:** [`docs/superpowers/specs/2026-04-22-wheel-page-design.md`](../specs/2026-04-22-wheel-page-design.md)

---

## File Map

**New files:**

- `app/wheel/page.tsx` — top-level page client component, composes everything
- `app/wheel/components/Wheel.tsx` — SVG wheel + spin animation + landing detection
- `app/wheel/components/ResultModal.tsx` — result overlay, "KIOSZTVA ✓" / "OK" / "BEZÁR"
- `app/wheel/components/AdminPanel.tsx` — fixed bottom-right gear + stock controls
- `app/wheel/hooks/useWheelStock.ts` — localStorage-backed stock state
- `app/wheel/types.ts` — shared types (`WheelState`, `SliceType`, `SpinResult`)
- `app/wheel/slices.ts` — static slice config (angles, labels, colors)

**Modified files:** none — the new route is self-contained.

---

## Task 1: Scaffold `/wheel` route with placeholder page

**Files:**
- Create: `app/wheel/page.tsx`

- [ ] **Step 1: Create the route with a minimal client page**

Create `app/wheel/page.tsx`:

```tsx
'use client';

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
      <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
        [wheel goes here]
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Start dev server and verify the route renders**

Run: `npm run dev`
Open: `http://localhost:3000/wheel`
Expected: page loads with grid background, sec-num label, big "PÖRGESS ÉS NYERJ!" headline in Archivo Black, green "NYERJ" word, and "[wheel goes here]" placeholder. No console errors.

Leave the dev server running throughout the rest of the plan.

- [ ] **Step 3: Commit**

```bash
git add app/wheel/page.tsx
git commit -m "feat(wheel): scaffold /wheel route with title"
```

---

## Task 2: Define shared types and static slice config

**Files:**
- Create: `app/wheel/types.ts`
- Create: `app/wheel/slices.ts`

- [ ] **Step 1: Create the types file**

Create `app/wheel/types.ts`:

```ts
export type WheelState = {
  phoneHolderStock: number;
  domStock: number;
};

export type SliceType =
  | 'phoneHolder'
  | 'dom'
  | 'xp50'
  | 'xp100'
  | 'nothing';

export type SliceConfig = {
  index: number;
  angleDeg: number;
  label: string;
  bg: string;
  fg: string;
  type: SliceType;
};

export type SpinResult = {
  sliceIndex: number;
  type: SliceType;
  label: string;
};

export const DEFAULT_STOCK: WheelState = {
  phoneHolderStock: 4,
  domStock: 4,
};

export const MAX_STOCK = 4;
export const STORAGE_KEY = 'parksafe-wheel-v1';
```

- [ ] **Step 2: Create the slice config**

Create `app/wheel/slices.ts`:

```ts
import type { SliceConfig, WheelState } from './types';

export const SLICE_COUNT = 8;
export const SLICE_ANGLE = 360 / SLICE_COUNT;

export const BASE_SLICES: SliceConfig[] = [
  { index: 0, angleDeg: 0,   label: 'TELEFONTARTÓ', bg: 'var(--green)',   fg: 'var(--ink)',   type: 'phoneHolder' },
  { index: 1, angleDeg: 45,  label: '+50 XP',       bg: 'var(--cream)',   fg: 'var(--ink)',   type: 'xp50' },
  { index: 2, angleDeg: 90,  label: 'SAJNOS NEM',   bg: 'var(--ink)',     fg: 'var(--paper)', type: 'nothing' },
  { index: 3, angleDeg: 135, label: '+100 XP',      bg: 'var(--paper-2)', fg: 'var(--ink)',   type: 'xp100' },
  { index: 4, angleDeg: 180, label: 'DOM 50%',      bg: 'var(--pink)',    fg: 'var(--ink)',   type: 'dom' },
  { index: 5, angleDeg: 225, label: '+50 XP',       bg: 'var(--cream)',   fg: 'var(--ink)',   type: 'xp50' },
  { index: 6, angleDeg: 270, label: 'SAJNOS NEM',   bg: 'var(--ink)',     fg: 'var(--paper)', type: 'nothing' },
  { index: 7, angleDeg: 315, label: '+100 XP',      bg: 'var(--paper-2)', fg: 'var(--ink)',   type: 'xp100' },
];

export function resolveSlices(stock: WheelState): SliceConfig[] {
  return BASE_SLICES.map((slice) => {
    if (slice.type === 'phoneHolder' && stock.phoneHolderStock === 0) {
      return {
        ...slice,
        label: 'ELKELT — +50 XP',
        bg: 'var(--paper-2)',
        fg: 'var(--ink-soft)',
        type: 'xp50',
      };
    }
    if (slice.type === 'dom' && stock.domStock === 0) {
      return {
        ...slice,
        label: 'ELKELT — +50 XP',
        bg: 'var(--paper-2)',
        fg: 'var(--ink-soft)',
        type: 'xp50',
      };
    }
    return slice;
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/wheel/types.ts app/wheel/slices.ts
git commit -m "feat(wheel): add types and static slice config"
```

---

## Task 3: Create `useWheelStock` hook (localStorage-backed)

**Files:**
- Create: `app/wheel/hooks/useWheelStock.ts`

- [ ] **Step 1: Write the hook**

Create `app/wheel/hooks/useWheelStock.ts`:

```ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_STOCK, MAX_STOCK, STORAGE_KEY, type WheelState } from '../types';

function readStorage(): WheelState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WheelState>;
    const phoneHolderStock = clamp(parsed.phoneHolderStock ?? DEFAULT_STOCK.phoneHolderStock);
    const domStock = clamp(parsed.domStock ?? DEFAULT_STOCK.domStock);
    return { phoneHolderStock, domStock };
  } catch {
    return null;
  }
}

function writeStorage(state: WheelState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn('[wheel] localStorage unavailable; state is in-memory only');
  }
}

function clamp(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(MAX_STOCK, Math.floor(value)));
}

export function useWheelStock() {
  const [stock, setStock] = useState<WheelState>(DEFAULT_STOCK);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStorage();
    if (stored) setStock(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(stock);
  }, [stock, hydrated]);

  const setPhoneHolder = useCallback((n: number) => {
    setStock((s) => ({ ...s, phoneHolderStock: clamp(n) }));
  }, []);

  const setDom = useCallback((n: number) => {
    setStock((s) => ({ ...s, domStock: clamp(n) }));
  }, []);

  const decrementPhoneHolder = useCallback(() => {
    setStock((s) => ({ ...s, phoneHolderStock: clamp(s.phoneHolderStock - 1) }));
  }, []);

  const decrementDom = useCallback(() => {
    setStock((s) => ({ ...s, domStock: clamp(s.domStock - 1) }));
  }, []);

  const reset = useCallback(() => {
    setStock(DEFAULT_STOCK);
  }, []);

  return {
    stock,
    hydrated,
    setPhoneHolder,
    setDom,
    decrementPhoneHolder,
    decrementDom,
    reset,
  };
}
```

- [ ] **Step 2: Manually verify the hook with a quick throwaway test in the page**

Temporarily modify `app/wheel/page.tsx` to import and use the hook:

```tsx
'use client';

import { useWheelStock } from './hooks/useWheelStock';

export default function WheelPage() {
  const { stock, decrementPhoneHolder, reset, hydrated } = useWheelStock();
  return (
    <main style={{ padding: 24 }}>
      <pre>{JSON.stringify({ stock, hydrated }, null, 2)}</pre>
      <button onClick={decrementPhoneHolder}>− phone</button>
      <button onClick={reset}>reset</button>
    </main>
  );
}
```

Open `http://localhost:3000/wheel`:
- First load: shows `phoneHolderStock: 4, domStock: 4, hydrated: true`.
- Click "− phone" three times → phoneHolderStock drops to 1.
- Reload the page → state persists (still 1).
- Click "reset" → back to 4/4.
- Open DevTools → Application → Local Storage → you should see key `parksafe-wheel-v1` with the JSON value.

- [ ] **Step 3: Restore page to the Task 1 state**

Revert `app/wheel/page.tsx` to its Task 1 contents (placeholder title + `[wheel goes here]`). The hook file stays.

- [ ] **Step 4: Commit**

```bash
git add app/wheel/hooks/useWheelStock.ts
git commit -m "feat(wheel): add localStorage-backed stock hook"
```

---

## Task 4: Static `Wheel` component (SVG render, no spin yet)

**Files:**
- Create: `app/wheel/components/Wheel.tsx`

- [ ] **Step 1: Create the wheel component with static SVG**

Create `app/wheel/components/Wheel.tsx`:

```tsx
'use client';

import type { SliceConfig } from '../types';
import { SLICE_ANGLE, SLICE_COUNT } from '../slices';

const VIEWBOX = 400;
const RADIUS = 190;
const CENTER = VIEWBOX / 2;

function slicePath(startAngleDeg: number, endAngleDeg: number): string {
  // SVG arcs: 0° is at 3 o'clock; we want 0° at 12 o'clock, so subtract 90
  const a1 = ((startAngleDeg - 90) * Math.PI) / 180;
  const a2 = ((endAngleDeg - 90) * Math.PI) / 180;
  const x1 = CENTER + RADIUS * Math.cos(a1);
  const y1 = CENTER + RADIUS * Math.sin(a1);
  const x2 = CENTER + RADIUS * Math.cos(a2);
  const y2 = CENTER + RADIUS * Math.sin(a2);
  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function labelPosition(angleDeg: number): { x: number; y: number; rotate: number } {
  // Text sits along the slice's midline, at 65% of radius
  const mid = angleDeg + SLICE_ANGLE / 2;
  const a = ((mid - 90) * Math.PI) / 180;
  const r = RADIUS * 0.62;
  return {
    x: CENTER + r * Math.cos(a),
    y: CENTER + r * Math.sin(a),
    rotate: mid, // label rotated to follow the slice direction
  };
}

type Props = {
  slices: SliceConfig[];
};

export default function Wheel({ slices }: Props) {
  return (
    <div
      className="wheel-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        filter: 'drop-shadow(8px 8px 0 var(--ink))',
      }}
    >
      {/* Pointer: black triangle at 12 o'clock */}
      <svg
        viewBox="0 0 40 30"
        style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 30,
          zIndex: 3,
        }}
      >
        <polygon
          points="20,28 4,2 36,2"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wheel SVG */}
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* outer ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="var(--cream)"
          stroke="var(--ink)"
          strokeWidth="4"
        />
        {slices.map((slice) => {
          const end = slice.angleDeg + SLICE_ANGLE;
          const pos = labelPosition(slice.angleDeg);
          return (
            <g key={slice.index}>
              <path
                d={slicePath(slice.angleDeg, end)}
                fill={slice.bg}
                stroke="var(--ink)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <text
                x={pos.x}
                y={pos.y}
                transform={`rotate(${pos.rotate}, ${pos.x}, ${pos.y})`}
                fill={slice.fg}
                fontFamily="var(--font-archivo-black), 'Archivo Black', sans-serif"
                fontSize={slice.label.length > 12 ? 14 : 18}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ letterSpacing: '-0.02em', userSelect: 'none' }}
              >
                {slice.label}
              </text>
            </g>
          );
        })}
        {/* center hub (non-interactive in this task) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={50}
          fill="var(--green)"
          stroke="var(--ink)"
          strokeWidth="3.5"
        />
        <text
          x={CENTER}
          y={CENTER}
          fill="#fff"
          fontFamily="var(--font-archivo-black), 'Archivo Black', sans-serif"
          fontSize={18}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ letterSpacing: '-0.02em', userSelect: 'none' }}
        >
          PÖRGESS!
        </text>
      </svg>
    </div>
  );
}

// safety: SLICE_COUNT is referenced to lock our assumption in case slices.ts is edited
if (SLICE_COUNT !== 8) {
  throw new Error('Wheel.tsx assumes 8 slices');
}
```

- [ ] **Step 2: Wire it into the page**

Update `app/wheel/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Manually verify**

Reload `http://localhost:3000/wheel`.
Expected:
- 8 colored slices visible (green / cream / ink / paper-2 / pink / cream / ink / paper-2 clockwise from top).
- Labels readable: TELEFONTARTÓ at top, DOM 50% at bottom, alternating XP/SAJNOS NEM.
- Black triangle pointer at 12 o'clock.
- Green center hub with "PÖRGESS!" white text.
- Hard black drop-shadow visible (8px 8px offset).
- Resize the browser: wheel scales smoothly, stays circular.

- [ ] **Step 4: Commit**

```bash
git add app/wheel/components/Wheel.tsx app/wheel/page.tsx
git commit -m "feat(wheel): render static 8-slice SVG wheel"
```

---

## Task 5: Add spin interactivity and landing detection

**Files:**
- Modify: `app/wheel/components/Wheel.tsx`

- [ ] **Step 1: Make the center hub clickable and add spin state**

Replace the content of `app/wheel/components/Wheel.tsx` with this version (adds rotation state, onClick, onTransitionEnd):

```tsx
'use client';

import { useState } from 'react';
import type { SliceConfig, SpinResult } from '../types';
import { SLICE_ANGLE, SLICE_COUNT } from '../slices';

const VIEWBOX = 400;
const RADIUS = 190;
const CENTER = VIEWBOX / 2;
const SPIN_DURATION_MS = 4500;
const MIN_FULL_TURNS = 5;
const MAX_FULL_TURNS = 8;

function slicePath(startAngleDeg: number, endAngleDeg: number): string {
  const a1 = ((startAngleDeg - 90) * Math.PI) / 180;
  const a2 = ((endAngleDeg - 90) * Math.PI) / 180;
  const x1 = CENTER + RADIUS * Math.cos(a1);
  const y1 = CENTER + RADIUS * Math.sin(a1);
  const x2 = CENTER + RADIUS * Math.cos(a2);
  const y2 = CENTER + RADIUS * Math.sin(a2);
  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function labelPosition(angleDeg: number) {
  const mid = angleDeg + SLICE_ANGLE / 2;
  const a = ((mid - 90) * Math.PI) / 180;
  const r = RADIUS * 0.62;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a), rotate: mid };
}

function pickTargetAngle(currentAngle: number): number {
  const turns = MIN_FULL_TURNS + Math.floor(Math.random() * (MAX_FULL_TURNS - MIN_FULL_TURNS + 1));
  const offset = Math.random() * 360;
  return currentAngle + turns * 360 + offset;
}

function sliceIndexUnderPointer(rotationDeg: number, slices: SliceConfig[]): number {
  // The pointer sits at 12 o'clock (angleDeg = 0 in our coord system).
  // When the wheel has rotated `rotationDeg` clockwise, the slice that was
  // originally at angle `A` is now at angle `A + rotationDeg`.
  // We want the slice whose current position straddles 0°.
  // Equivalently: the original slice at angle `-rotationDeg` (mod 360) is under the pointer.
  const effective = ((-rotationDeg % 360) + 360) % 360;
  for (const slice of slices) {
    const start = slice.angleDeg;
    const end = slice.angleDeg + SLICE_ANGLE;
    if (effective >= start && effective < end) {
      return slice.index;
    }
  }
  return 0;
}

type Props = {
  slices: SliceConfig[];
  onLanded: (result: SpinResult) => void;
  disabled: boolean;
};

export default function Wheel({ slices, onLanded, disabled }: Props) {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);

  function handleSpin() {
    if (spinning || disabled) return;
    setSpinning(true);
    setRotationDeg((current) => pickTargetAngle(current));
  }

  function handleTransitionEnd() {
    if (!spinning) return;
    setSpinning(false);
    const idx = sliceIndexUnderPointer(rotationDeg, slices);
    const slice = slices[idx];
    onLanded({ sliceIndex: idx, type: slice.type, label: slice.label });
  }

  return (
    <div
      className="wheel-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        filter: 'drop-shadow(8px 8px 0 var(--ink))',
      }}
    >
      {/* Pointer */}
      <svg
        viewBox="0 0 40 30"
        style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 30,
          zIndex: 3,
        }}
      >
        <polygon
          points="20,28 4,2 36,2"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Rotating wheel */}
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          transform: `rotate(${rotationDeg}deg)`,
          transition: spinning
            ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.24, 1)`
            : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="var(--cream)" stroke="var(--ink)" strokeWidth="4" />
        {slices.map((slice) => {
          const end = slice.angleDeg + SLICE_ANGLE;
          const pos = labelPosition(slice.angleDeg);
          return (
            <g key={slice.index}>
              <path
                d={slicePath(slice.angleDeg, end)}
                fill={slice.bg}
                stroke="var(--ink)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <text
                x={pos.x}
                y={pos.y}
                transform={`rotate(${pos.rotate}, ${pos.x}, ${pos.y})`}
                fill={slice.fg}
                fontFamily="var(--font-archivo-black), 'Archivo Black', sans-serif"
                fontSize={slice.label.length > 12 ? 14 : 18}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ letterSpacing: '-0.02em', userSelect: 'none' }}
              >
                {slice.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center hub — not rotated, so it stays a fixed button */}
      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning || disabled}
        aria-label="Pörgess"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '22%',
          height: '22%',
          minWidth: 72,
          minHeight: 72,
          borderRadius: '50%',
          border: '3.5px solid var(--ink)',
          background: spinning || disabled ? 'var(--paper-2)' : 'var(--green)',
          color: spinning || disabled ? 'var(--ink-soft)' : '#fff',
          fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif',
          fontSize: 'clamp(14px, 2.2vw, 18px)',
          letterSpacing: '-0.02em',
          cursor: spinning || disabled ? 'not-allowed' : 'pointer',
          boxShadow: spinning || disabled ? '2px 2px 0 0 var(--ink)' : '4px 4px 0 0 var(--ink)',
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          zIndex: 4,
        }}
      >
        PÖRGESS!
      </button>
    </div>
  );
}

if (SLICE_COUNT !== 8) {
  throw new Error('Wheel.tsx assumes 8 slices');
}
```

- [ ] **Step 2: Update the page to handle the landing callback**

Replace `app/wheel/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Wheel from './components/Wheel';
import { BASE_SLICES } from './slices';
import type { SpinResult } from './types';

export default function WheelPage() {
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);

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
      <Wheel
        slices={BASE_SLICES}
        disabled={false}
        onLanded={setLastResult}
      />
      {lastResult && (
        <pre style={{ marginTop: 24, fontSize: 14 }}>
          {JSON.stringify(lastResult, null, 2)}
        </pre>
      )}
    </main>
  );
}
```

- [ ] **Step 3: Manually verify spin behavior**

Reload `http://localhost:3000/wheel`:
- Click the green "PÖRGESS!" center button.
- Wheel spins ~4.5s with decelerating animation.
- Pointer stays fixed at 12 o'clock; slices rotate under it.
- When it stops, a JSON blob appears below the wheel showing `sliceIndex`, `type`, and `label`.
- Verify: the reported `label` matches the slice actually stopped under the pointer (look at it visually 3-4 times).
- Click again during the spin: nothing happens (button is disabled).
- Spin ~10 times to confirm randomness: you should see varied slice indices, not the same one every time.

- [ ] **Step 4: Commit**

```bash
git add app/wheel/components/Wheel.tsx app/wheel/page.tsx
git commit -m "feat(wheel): add spin animation and slice landing detection"
```

---

## Task 6: `ResultModal` component with prize-type-specific content

**Files:**
- Create: `app/wheel/components/ResultModal.tsx`

- [ ] **Step 1: Create the modal component**

Create `app/wheel/components/ResultModal.tsx`:

```tsx
'use client';

import type { SpinResult } from '../types';

type Props = {
  result: SpinResult;
  onClose: () => void;
  onConfirmPhysical: () => void;
};

export default function ResultModal({ result, onClose, onConfirmPhysical }: Props) {
  const isPhysical = result.type === 'phoneHolder' || result.type === 'dom';

  const { emoji, headline, body, buttonLabel } = copyFor(result);

  function handlePrimary() {
    if (isPhysical) onConfirmPhysical();
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Nyeremény"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 31, 18, 0.55)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 100,
      }}
      onClick={(e) => {
        // click outside the card closes if not physical (keep intentional claim flow)
        if (!isPhysical && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-lg"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: '32px 28px',
          background: 'var(--cream)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 12 }}>{emoji}</div>
        <h2
          className="hx"
          style={{
            fontSize: 32,
            margin: '0 0 12px',
            letterSpacing: '-0.03em',
          }}
        >
          {headline}
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 24, lineHeight: 1.4 }}>
          {body}
        </p>
        <button
          className="btn big"
          style={isPhysical ? {} : { background: 'var(--ink)', color: '#fff' }}
          onClick={handlePrimary}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

function copyFor(result: SpinResult): {
  emoji: string;
  headline: string;
  body: string;
  buttonLabel: string;
} {
  switch (result.type) {
    case 'phoneHolder':
      return {
        emoji: '📱',
        headline: 'NYERTÉL EGY TELEFONTARTÓT!',
        body: 'Vedd át az ajándékot a ParkSafe asztalnál.',
        buttonLabel: 'KIOSZTVA ✓',
      };
    case 'dom':
      return {
        emoji: '🎟️',
        headline: '50% KEDVEZMÉNY A DOMBA!',
        body: 'Kapsz egy kupont — vedd át az asztalnál.',
        buttonLabel: 'KIOSZTVA ✓',
      };
    case 'xp50':
      return {
        emoji: '✨',
        headline: '+50 XP AZ APPBAN!',
        body: 'Szólj nekünk a felhasználóneveddel, és felvezetjük.',
        buttonLabel: 'OK',
      };
    case 'xp100':
      return {
        emoji: '🌟',
        headline: '+100 XP AZ APPBAN!',
        body: 'Szólj nekünk a felhasználóneveddel, és felvezetjük.',
        buttonLabel: 'OK',
      };
    case 'nothing':
    default:
      return {
        emoji: '🙈',
        headline: 'SAJNOS NEM NYERTÉL',
        body: 'Legközelebb több szerencsét! Ne felejtsd: az app XP-ket adna neked minden pörgetésért.',
        buttonLabel: 'BEZÁR',
      };
  }
}
```

- [ ] **Step 2: Wire the modal into the page**

Replace `app/wheel/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Wheel from './components/Wheel';
import ResultModal from './components/ResultModal';
import { useWheelStock } from './hooks/useWheelStock';
import { resolveSlices } from './slices';
import type { SpinResult } from './types';

export default function WheelPage() {
  const { stock, decrementPhoneHolder, decrementDom } = useWheelStock();
  const [result, setResult] = useState<SpinResult | null>(null);

  const slices = resolveSlices(stock);

  function handleConfirmPhysical() {
    if (result?.type === 'phoneHolder') decrementPhoneHolder();
    if (result?.type === 'dom') decrementDom();
  }

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
      <Wheel
        slices={slices}
        disabled={result !== null}
        onLanded={setResult}
      />
      {result && (
        <ResultModal
          result={result}
          onClose={() => setResult(null)}
          onConfirmPhysical={handleConfirmPhysical}
        />
      )}
    </main>
  );
}
```

- [ ] **Step 3: Manually verify full flow**

Reload `http://localhost:3000/wheel`:
- Spin multiple times until each prize type appears at least once.
- **Physical win (telefontartó or dom):** modal shows matching emoji + headline + "Vedd át..." body + green "KIOSZTVA ✓" button. Click it → modal closes, and in DevTools localStorage the `phoneHolderStock` or `domStock` decrements by 1.
- **XP win (+50 / +100):** modal shows ✨ / 🌟 + matching XP headline + "Szólj a felhasználóneveddel..." + black "OK" button. Click or click-outside → closes, no stock change.
- **Nothing:** modal shows 🙈 + "SAJNOS NEM NYERTÉL" + black "BEZÁR" button. Click or click-outside → closes.
- During modal open, the wheel center button is disabled.
- Refresh: stock persists.

- [ ] **Step 4: Commit**

```bash
git add app/wheel/components/ResultModal.tsx app/wheel/page.tsx
git commit -m "feat(wheel): add result modal with prize-type-specific content"
```

---

## Task 7: Verify stock-depletion (dynamic slice relabeling)

**Files:** none (verification only — the logic already exists in `slices.ts` `resolveSlices()` and Task 6 wired it up)

- [ ] **Step 1: Manually verify slice relabel on zero stock**

Open the browser DevTools → Application → Local Storage → `parksafe-wheel-v1`. Set its value to:

```json
{"phoneHolderStock":0,"domStock":4}
```

Reload `http://localhost:3000/wheel`.
Expected:
- Slice at 12 o'clock (originally TELEFONTARTÓ / green) now renders with label **"ELKELT — +50 XP"** on a light `--paper-2` background with dimmed text.
- DOM slice still pink with "DOM 50%".
- Spin until it lands on that top slice → modal shows "+50 XP AZ APPBAN!" (not the telefontartó modal).
- Repeat with `domStock:0` instead: the bottom pink slice becomes the ELKELT one.
- Restore to `{"phoneHolderStock":4,"domStock":4}` and reload → colors come back.

- [ ] **Step 2: Verify wheel text length fits**

Look at the ELKELT slice: the label "ELKELT — +50 XP" should fit without overflow. If it's visibly cramped, bump the threshold in `Wheel.tsx` slice text — change `slice.label.length > 12` to `slice.label.length > 10` so longer strings automatically shrink to 14px. Commit that change if made.

- [ ] **Step 3: Commit verification notes (if any) — otherwise skip**

If no code change was needed, proceed to Task 8 without a commit. If you adjusted the font-size threshold:

```bash
git add app/wheel/components/Wheel.tsx
git commit -m "fix(wheel): shrink long slice labels at length > 10"
```

---

## Task 8: `AdminPanel` component (gear icon + stock controls)

**Files:**
- Create: `app/wheel/components/AdminPanel.tsx`
- Modify: `app/wheel/page.tsx`

- [ ] **Step 1: Create the admin panel**

Create `app/wheel/components/AdminPanel.tsx`:

```tsx
'use client';

import { useState } from 'react';
import type { WheelState } from '../types';
import { MAX_STOCK } from '../types';

type Props = {
  stock: WheelState;
  setPhoneHolder: (n: number) => void;
  setDom: (n: number) => void;
  reset: () => void;
};

export default function AdminPanel({ stock, setPhoneHolder, setDom, reset }: Props) {
  const [open, setOpen] = useState(false);

  return (
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
      {open && (
        <div
          className="card-lg"
          style={{
            width: 260,
            padding: '18px 18px 16px',
            background: 'var(--cream)',
          }}
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
            value={stock.phoneHolderStock}
            onChange={setPhoneHolder}
          />
          <div style={{ height: 12 }} />
          <StockRow label="Dom 50%" value={stock.domStock} onChange={setDom} />

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 18,
              width: '100%',
              padding: '10px 12px',
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
            RESET 4 / 4
          </button>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Panel bezárása' : 'Admin panel'}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 44,
          height: 44,
          border: '2.5px solid var(--ink)',
          background: open ? 'var(--cream)' : 'var(--paper-2)',
          boxShadow: '2px 2px 0 0 var(--ink)',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {open ? (
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
        <span
          className="hx"
          style={{ fontSize: 18, letterSpacing: '-0.02em' }}
        >
          {value} / {MAX_STOCK}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <StepButton ariaLabel={`${label} csökkentés`} onClick={() => onChange(value - 1)} disabled={value <= 0}>
          −
        </StepButton>
        <StepButton ariaLabel={`${label} növelés`} onClick={() => onChange(value + 1)} disabled={value >= MAX_STOCK}>
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
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
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
```

Also export `MAX_STOCK` from `types.ts` if not already (it already is — verify).

- [ ] **Step 2: Wire the admin panel into the page**

Replace `app/wheel/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import ResultModal from './components/ResultModal';
import Wheel from './components/Wheel';
import { useWheelStock } from './hooks/useWheelStock';
import { resolveSlices } from './slices';
import type { SpinResult } from './types';

export default function WheelPage() {
  const {
    stock,
    setPhoneHolder,
    setDom,
    decrementPhoneHolder,
    decrementDom,
    reset,
  } = useWheelStock();
  const [result, setResult] = useState<SpinResult | null>(null);

  const slices = resolveSlices(stock);

  function handleConfirmPhysical() {
    if (result?.type === 'phoneHolder') decrementPhoneHolder();
    if (result?.type === 'dom') decrementDom();
  }

  return (
    <main
      className="grid-bg"
      style={{
        minHeight: '100vh',
        padding: '48px 24px 120px',
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

      <Wheel slices={slices} disabled={result !== null} onLanded={setResult} />

      {result && (
        <ResultModal
          result={result}
          onClose={() => setResult(null)}
          onConfirmPhysical={handleConfirmPhysical}
        />
      )}

      <AdminPanel
        stock={stock}
        setPhoneHolder={setPhoneHolder}
        setDom={setDom}
        reset={reset}
      />
    </main>
  );
}
```

- [ ] **Step 3: Manually verify admin panel**

Reload `http://localhost:3000/wheel`:
- A small fogaskerék icon sits bottom-right, subtle paper-2 background.
- Click it → panel opens above the icon, icon becomes an X.
- Panel shows "§ STOCK", "Telefontartó: 4 / 4", "Dom 50%: 4 / 4", two sets of +/− buttons, "RESET 4 / 4" button.
- Click − under Telefontartó until it's 0 → button disables at 0 (can't go negative). Value in panel shows "0 / 4".
- Look at the wheel: the top slice has changed to "ELKELT — +50 XP" and paper-2 background.
- Click + → returns to 1, and the wheel slice returns to TELEFONTARTÓ green.
- Click RESET → both values go to 4.
- Click X on the gear → panel collapses, only icon shows.
- Page reload: panel is closed by default (this is fine; `open` is local state).

- [ ] **Step 4: Commit**

```bash
git add app/wheel/components/AdminPanel.tsx app/wheel/page.tsx
git commit -m "feat(wheel): add admin panel with stock controls and reset"
```

---

## Task 9: Responsive refinements

**Files:**
- Modify: `app/wheel/page.tsx`

The `className="wheel-container"` is already on the wheel's outer `<div>` from Task 5. We add a matching class to `<main>` plus a `<style>` block at the bottom for breakpoints.

- [ ] **Step 1: Add `wheel-page-wrap` class to `<main>` and append the style block**

In `app/wheel/page.tsx`, change the `<main>` opening tag from:

```tsx
<main
  className="grid-bg"
  style={{
```

to:

```tsx
<main
  className="grid-bg wheel-page-wrap"
  style={{
```

Then, at the very end of the `<main>` element (just before the closing `</main>`), insert this style block:

```tsx
<style>{`
  @media (max-width: 900px) {
    .wheel-page-wrap { padding: 36px 16px 120px !important; }
    .wheel-container { max-width: 380px !important; }
  }
  @media (max-width: 640px) {
    .wheel-page-wrap { padding: 28px 12px 110px !important; }
    .wheel-container { max-width: 300px !important; }
  }
`}</style>
```

This matches the spec's 480 / 380 / 300 px breakpoints.

- [ ] **Step 2: Manually verify on narrow viewports**

In DevTools responsive mode:
- **1200 px wide:** wheel ~480 px, centered, plenty of breathing room.
- **768 px wide:** wheel shrinks smoothly, still circular.
- **375 px wide (iPhone SE):** wheel ~320 px or less, title smaller via `clamp()`, admin panel in bottom-right corner not overlapping the wheel, modal fits with padding.
- Spin works on mobile touch (confirm on Chrome device emulator or actual phone).

- [ ] **Step 3: Commit**

```bash
git add app/wheel/page.tsx
git commit -m "style(wheel): responsive breakpoints for tablet and mobile"
```

---

## Task 10: Final polish — SEO/metadata and small visual touches

**Files:**
- Create: `app/wheel/layout.tsx`

- [ ] **Step 1: Add a route-local metadata override**

Create `app/wheel/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ParkSafe — Pörgess és Nyerj!',
  description: 'Esemény-szerencsekerék — regisztrált ParkSafe felhasználóknak.',
  robots: { index: false, follow: false },
};

export default function WheelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

This overrides the root title for the `/wheel` route and flags it as `noindex` (it's an event tool, not marketing content).

- [ ] **Step 2: Verify**

Reload `http://localhost:3000/wheel`:
- Browser tab title reads "ParkSafe — Pörgess és Nyerj!".
- View page source: `<meta name="robots" content="noindex, nofollow">` is present.

- [ ] **Step 3: Commit**

```bash
git add app/wheel/layout.tsx
git commit -m "feat(wheel): add route metadata and noindex flag"
```

---

## Task 11: Final manual QA checklist

**Files:** none (QA only)

Run through every item before calling this done. If any fail, open an issue and iterate.

- [ ] **Fresh load:** visit `/wheel` in a clean browser (or incognito). Page renders with wheel, title, admin gear. No console errors.

- [ ] **Happy path — phone holder win:** Use admin to set `phoneHolderStock: 1, domStock: 0`. Spin until it lands on TELEFONTARTÓ. Modal shows 📱 + "NYERTÉL EGY TELEFONTARTÓT!". Click KIOSZTVA ✓. Stock → 0. The slice becomes "ELKELT — +50 XP" with paper-2 background.

- [ ] **Happy path — Dom win:** Use admin to set both to 4. Spin until DOM 50%. Modal shows 🎟️ + "50% KEDVEZMÉNY A DOMBA!". Click KIOSZTVA ✓. `domStock: 3`.

- [ ] **XP:** Spin until +50 or +100. Modal shows ✨ / 🌟 + correct XP amount. OK button closes modal. Stock unchanged.

- [ ] **Nothing:** Spin until SAJNOS NEM. Modal shows 🙈. BEZÁR closes. Stock unchanged.

- [ ] **Edge — both physical stocks 0:** Set both to 0 via admin. Both physical slices show ELKELT. Spin a few times: never shows a physical prize modal — only XP or nothing.

- [ ] **Edge — reload persistence:** Decrement stock, reload page. Stock is restored from localStorage. The ELKELT slice state persists too.

- [ ] **Edge — RESET:** Click RESET in admin. Both → 4. Slices visually return to green (TELEFONTARTÓ) and pink (DOM 50%).

- [ ] **Edge — rapid double click:** Click PÖRGESS! twice in quick succession. Second click ignored (button disabled during spin).

- [ ] **Edge — localStorage disabled:** Open Safari private mode (or disable localStorage in DevTools). Load `/wheel`. Stock starts at 4/4. Admin and spin still work (in-memory). No uncaught errors in console.

- [ ] **Mobile:** Open on a real phone or use Chrome DevTools device mode (iPhone 12, Galaxy S20). Wheel fits, spin works on tap, modal readable, admin panel tap-target ≥ 44 px.

- [ ] **Build:** Run `npm run build` from the repo root. Expected: no TypeScript errors, no ESLint errors, `.next/` produced. (If Turbopack/Next 16 produces warnings about a new API — read `node_modules/next/dist/docs/01-app/01-getting-started/18-upgrading.md` and address them.)

- [ ] **Production-mode spot-check:** Run `npm start` after `npm run build`. Visit `/wheel`. Everything works as in dev.

- [ ] **Final commit: none needed if checklist passes clean.** Any bugs found → dedicated fix commits with descriptive messages.

---

## Rollback / disable plan

If something breaks on event day and you need to pull the wheel without touching code:

- The route is self-contained under `app/wheel/` — deleting that directory removes the feature cleanly, with no changes to the rest of the site.
- To gate it temporarily, add `export const dynamic = 'force-static';` and a redirect in `app/wheel/layout.tsx`, or simply link to a flat "be back soon" page.

---
