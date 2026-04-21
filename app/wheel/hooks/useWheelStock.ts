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
