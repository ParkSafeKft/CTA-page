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
