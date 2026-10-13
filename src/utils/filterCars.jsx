/**
 * Filter cars based on various criteria
 * @param {Array} cars - Array of car objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered array of car objects
 */
const filterCars = (cars, filters = {}) => {
  if (!Array.isArray(cars)) {
    return [];
  }

  return cars.filter(car => {
    // Price filter
    if (filters.minPrice !== undefined && filters.minPrice !== null && car.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null && car.price > filters.maxPrice) {
      return false;
    }

    // Brand filter
    if (filters.brand &&
        filters.brand !== '' &&
        car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }

    // Body Type filter
    if (filters.bodyType &&
        filters.bodyType !== '' &&
        car.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) {
      return false;
    }

    // Fuel Type filter
    if (filters.fuelType &&
        filters.fuelType !== '' &&
        car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
      return false;
    }

    // Transmission filter
    if (filters.transmission &&
        filters.transmission !== '' &&
        car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
      return false;
    }

    // Year filter
    if (filters.minYear !== undefined && filters.minYear !== null && car.year < filters.minYear) {
      return false;
    }
    if (filters.maxYear !== undefined && filters.maxYear !== null && car.year > filters.maxYear) {
      return false;
    }

    // Seating Capacity filter
    if (filters.seatingCapacity !== undefined && filters.seatingCapacity !== null && car.seatingCapacity < filters.seatingCapacity) {
      return false;
    }

    // Search filter (handled separately in Cars page)
    // This utility focuses on structured filters

    return true;
  });
};

export default filterCars;