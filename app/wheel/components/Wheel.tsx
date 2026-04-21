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
