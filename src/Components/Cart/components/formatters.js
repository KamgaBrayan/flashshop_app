/**
 * Formats a price value to a readable string
 * 
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null) return '0';
  return price.toLocaleString();
};