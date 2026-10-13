import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sampleCars } from '../data/cars.js';
import { withLocalCarImages } from '../utils/carImages.js';
export const WishlistContext = createContext(null);
export const useWishlist = () => {
  const value = useContext(WishlistContext);
  if (!value) throw new Error('useWishlist must be used within a WishlistProvider');
  return value;
};
const loadWishlist = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('drivesphere-wishlist') || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.map((item) => withLocalCarImages(typeof item === 'object' ? item : sampleCars.find((car) => String(car.id) === String(item)))).filter(Boolean);
  } catch { return []; }
};
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(loadWishlist);
  useEffect(() => { localStorage.setItem('drivesphere-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  const addToWishlist = (carOrId) => {
    const car = withLocalCarImages(typeof carOrId === 'object' ? carOrId : sampleCars.find((item) => String(item.id) === String(carOrId)));
    if (!car) return false;
    setWishlist((current) => current.some((item) => String(item.id) === String(car.id)) ? current : [...current, car]);
    return true;
  };
  const removeFromWishlist = (id) => setWishlist((current) => current.filter((car) => String(car.id) !== String(id)));
  const isInWishlist = (id) => wishlist.some((car) => String(car.id) === String(id));
  const clearWishlist = () => setWishlist([]);
  const value = useMemo(() => ({ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, wishlistCount: wishlist.length }), [wishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
