/**
 * Compare two cars and return differences and similarities
 * @param {Object} car1 - First car object
 * @param {Object} car2 - Second car object
 * @returns {Object} Comparison results
 */
const compareCars = (car1, car2) => {
  if (!car1 || !car2) {
    return {
      differences: [],
      similarities: [],
      error: 'Invalid car objects provided'
    };
  }

  // Define comparison fields
  const comparisonFields = [
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'variant', label: 'Variant' },
    { key: 'year', label: 'Year' },
    { key: 'price', label: 'Price', format: (val) => val },
    { key: 'bodyType', label: 'Body Type' },
    { key: 'seatingCapacity', label: 'Seating Capacity' },
    { key: 'fuelType', label: 'Fuel Type' },
    { key: 'transmission', label: 'Transmission' },
    { key: 'engine.cc', label: 'Displacement (cc)' },
    { key: 'engine.horsepower', label: 'Horsepower' },
    { key: 'engine.torque', label: 'Torque (Nm)' },
    { key: 'engine.mileage', label: 'Mileage/Efficiency' },
    { key: 'engine.topSpeed', label: 'Top Speed (km/h)' },
    { key: 'dimensions.length', label: 'Length (mm)' },
    { key: 'dimensions.width', label: 'Width (mm)' },
    { key: 'dimensions.height', label: 'Height (mm)' },
    { key: 'dimensions.wheelbase', label: 'Wheelbase (mm)' },
    { key: 'dimensions.groundClearance', label: 'Ground Clearance (mm)' },
    { key: 'dimensions.bootSpace', label: 'Boot Space (L)' },
    { key: 'safety.airbags', label: 'Airbags' },
    { key: 'safety.abs', label: 'ABS' },
    { key: 'safety.esp', label: 'ESP' },
    { key: 'safety.hillAssist', label: 'Hill Assist' },
    { key: 'safety.tractionControl', label: 'Traction Control' },
    { key: 'safety.ncapRating', label: 'NCAP Rating' },
    { key: 'features.sunroof', label: 'Sunroof' },
    { key: 'features.touchscreen', label: 'Touchscreen' },
    { key: 'features.adas', label: 'ADAS' },
    { key: 'features.cruiseControl', label: 'Cruise Control' },
    { key: 'features.wirelessCharging', label: 'Wireless Charging' },
    { key: 'features.ventilatedSeats', label: 'Ventilated Seats' }
  ];

  const differences = [];
  const similarities = [];

  comparisonFields.forEach(field => {
    const value1 = getNestedValue(car1, field.key);
    const value2 = getNestedValue(car2, field.key);
    const label = field.label;
    const formatFn = field.format || ((val) => val);

    // Handle special cases for undefined/null values
    const isValue1Empty = value1 === null || value1 === undefined;
    const isValue2Empty = value2 === null || value2 === undefined;

    // Both values are empty - treat as similar
    if (isValue1Empty && isValue2Empty) {
      similarities.push({
        label,
        value1: 'Not available',
        value2: 'Not available',
        isSimilar: true
      });
      return;
    }

    // One value is empty - treat as different
    if (isValue1Empty || isValue2Empty) {
      differences.push({
        label,
        value1: isValue1Empty ? 'Not available' : formatFn(value1),
        value2: isValue2Empty ? 'Not available' : formatFn(value2),
        isSimilar: false
      });
      return;
    }

    // Both values exist - compare them
    const isSimilar = value1 === value2;

    if (isSimilar) {
      similarities.push({
        label,
        value1: formatFn(value1),
        value2: formatFn(value2),
        isSimilar: true
      });
    } else {
      differences.push({
        label,
        value1: formatFn(value1),
        value2: formatFn(value2),
        isSimilar: false
      });
    }
  });

  return {
    differences,
    similarities
  };
};

/**
 * Helper function to get nested property value
 * @param {Object} obj - The object to extract value from
 * @param {string} path - Dot-separated path (e.g., 'engine.cc')
 * @returns {*} The value at the specified path or null if not found
 */
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : null), obj);
};

export default compareCars;