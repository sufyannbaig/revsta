import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'revsta_comparison';
const EVENT_NAME = 'revsta_comparison_update';

function readComparison() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeComparison(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useComparison() {
  const [comparisonIds, setComparisonIds] = useState(readComparison);

  useEffect(() => {
    const handler = () => setComparisonIds(readComparison());
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const addToCompare = useCallback((product) => {
    const current = readComparison();
    if (current.length >= 2) return false;
    if (current.includes(product.id)) return false;
    const next = [...current, product.id];
    writeComparison(next);
    setComparisonIds(next);
    return true;
  }, []);

  const removeFromCompare = useCallback((productId) => {
    const next = readComparison().filter(id => id !== productId);
    writeComparison(next);
    setComparisonIds(next);
  }, []);

  const clearComparison = useCallback(() => {
    writeComparison([]);
    setComparisonIds([]);
  }, []);

  return {
    comparisonIds,
    comparisonCount: comparisonIds.length,
    addToCompare,
    removeFromCompare,
    clearComparison,
  };
}