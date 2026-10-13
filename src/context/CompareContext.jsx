import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sampleCars } from '../data/cars.js';
import { withLocalCarImages } from '../utils/carImages.js';
export const CompareContext = createContext(null);
export const useCompare = () => {
  const value = useContext(CompareContext);
  if (!value) throw new Error('useCompare must be used within a CompareProvider');
  return value;
};
const loadComparison = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('drivesphere-comparison') || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.map((item) => typeof item === 'object' ? item : sampleCars.find((car) => String(car.id) === String(item))).filter(Boolean).slice(0, 2);
  } catch { return []; }
};
export const CompareProvider = ({ children }) => {
  const [comparison, setComparison] = useState(loadComparison);
  useEffect(() => { localStorage.setItem('drivesphere-comparison', JSON.stringify(comparison)); }, [comparison]);
  const addToCompare = (carOrId) => {
    const car = withLocalCarImages(typeof carOrId === 'object' ? carOrId : sampleCars.find((item) => String(item.id) === String(carOrId)));
    if (!car) return { ok: false, reason: 'not-found' };
    if (comparison.some((item) => String(item.id) === String(car.id))) return { ok: false, reason: 'duplicate' };
    if (comparison.length >= 2) return { ok: false, reason: 'limit' };
    setComparison((current) => current.some((item) => String(item.id) === String(car.id)) || current.length >= 2 ? current : [...current, car]);
    return { ok: true };
  };
  const removeFromCompare = (id) => setComparison((current) => current.filter((car) => String(car.id) !== String(id)));
  const isInCompare = (id) => comparison.some((car) => String(car.id) === String(id));
  const clearComparison = () => setComparison([]);
  const replaceInCompare = (index, id) => {
    const car = withLocalCarImages(typeof id === 'object' ? id : sampleCars.find((item) => String(item.id) === String(id)));
    if (!car || index < 0 || index > 1) return;
    setComparison((current) => { const next = [...current]; next[index] = car; return next.filter(Boolean).filter((item, i, all) => all.findIndex((other) => String(other.id) === String(item.id)) === i).slice(0, 2); });
  };
  const value = useMemo(() => ({ comparison, addToCompare, removeFromCompare, isInCompare, clearComparison, replaceInCompare, compareCount: comparison.length, comparisonCount: comparison.length }), [comparison]);
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};
