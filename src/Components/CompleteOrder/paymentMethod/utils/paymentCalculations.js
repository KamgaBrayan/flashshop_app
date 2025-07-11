/**
 * Calculate the total amount from cart items
 * 
 * @param {Array} cartItems - Array of items in the cart
 * @returns {number} - Total amount
 */
export const calculateTotal = (cartItems) => {
  if (!cartItems || cartItems.length === 0) return 0;
  
  return cartItems.reduce((sum, item) => {
    if (!item) return sum;
    
    let itemPrice = 0;
    let quantity = item.quantity || 1;
    
    // Handle different item types
    switch (item.type) {
      case 'selling_price':
        if (item.priceOption) {
          itemPrice = item.priceOption.price || 
            (item.priceOption.quantity_range?.price_per_unit * 
              (item.priceOption.quantity_range?.min || 1));
        }
        break;
      case 'delivery':
        if (item.deliveryOption) {
          itemPrice = item.deliveryOption.cost || 0;
        }
        break;
      default:
        itemPrice = item.price || 0;
    }
    
    return sum + (itemPrice * quantity);
  }, 0);
};