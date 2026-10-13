/**
 * Format a price value as Indian Rupees (INR)
 * @param {number} price - The price value to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return 'Price not available';
  }

  // Format as Indian Rupees with proper grouping
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  return formatted;
};

// export default formatPrice; // Removed to avoid export conflicts