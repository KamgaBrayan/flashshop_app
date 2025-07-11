/**
 * Format price with commas for thousands
 * 
 * @param {number|string} price - Price to format
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Calculate total price from quantity and price per unit
 * 
 * @param {Object} option - Price option object
 * @param {number} quantity - Selected quantity
 * @returns {number} Total price
 */
export const calculateTotal = (option, quantity) => {
  const qty = quantity || parseInt(option.minimum_order) || 1;
  const pricePerUnit = parseInt(option.price_per_unit) || 0;
  return qty * pricePerUnit;
};