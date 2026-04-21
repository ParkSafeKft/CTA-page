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
