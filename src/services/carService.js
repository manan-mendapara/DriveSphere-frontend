import { sampleCars } from '../data/cars.js';
import { withLocalCarImages } from '../utils/carImages.js';

const catalogue = sampleCars.map(withLocalCarImages);
const matches = (car, params = {}) => {
  const q = String(params.search ?? params.q ?? '').trim().toLowerCase();
  const brand = String(params.brand ?? '').trim().toLowerCase();
  const bodyType = String(params.bodyType ?? params['body-type'] ?? '').trim().toLowerCase();
  const fuelType = String(params.fuelType ?? '').trim().toLowerCase();
  const minPrice = Number(params.minPrice ?? 0);
  const maxPrice = Number(params.maxPrice ?? Infinity);
  return (!q || `${car.brand} ${car.model} ${car.variant ?? ''}`.toLowerCase().includes(q))
    && (!brand || car.brand.toLowerCase() === brand)
    && (!bodyType || String(car.bodyType).toLowerCase() === bodyType)
    && (!fuelType || String(car.fuelType).toLowerCase() === fuelType)
    && (Number(car.price) || 0) >= minPrice
    && (Number(car.price) || 0) <= maxPrice;
};

const carService = {
  getAllCars: async (params = {}) => catalogue.filter((car) => matches(car, params)),
  getCarById: async (id) => catalogue.find((car) => String(car.id) === String(id)) ?? null,
  searchCars: async (query) => catalogue.filter((car) => matches(car, { search: query })),
  getCarsByBrand: async (brand) => catalogue.filter((car) => car.brand.toLowerCase() === String(brand).toLowerCase()),
  getCarsByBodyType: async (type) => catalogue.filter((car) => String(car.bodyType).toLowerCase() === String(type).toLowerCase()),
};
export default carService;
