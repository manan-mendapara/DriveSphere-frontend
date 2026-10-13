import React, { createContext, useContext, useMemo, useState } from 'react';
import { sampleCars } from '../data/cars.js';
import { withLocalCarImages } from '../utils/carImages.js';

const CarContext = createContext(null);
const catalogue = sampleCars.map(withLocalCarImages).map((car) => ({ ...car, id: String(car.id) }));

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCars must be used within a CarProvider');
  return context;
};

export const CarProvider = ({ children }) => {
  const [cars] = useState(catalogue);
  const value = useMemo(() => ({
    cars,
    loading: false,
    error: null,
    getCarById: (id) => cars.find((car) => String(car.id) === String(id)) || null,
    getCarsByBrand: (brand) => cars.filter((car) => car.brand.toLowerCase() === String(brand).toLowerCase()),
    getCarsByBodyType: (bodyType) => cars.filter((car) => car.bodyType.toLowerCase() === String(bodyType).toLowerCase()),
  }), [cars]);
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};
