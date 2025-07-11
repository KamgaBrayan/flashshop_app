import { useMemo } from 'react';

export const useCartCalculations = (cartItems) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item) return total;
      
      let itemPrice = 0;
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
          if (item.quantity) {
            itemPrice *= item.quantity;
          }
      }
      return total + itemPrice;
    }, 0);
  };

  const summaryData = useMemo(() => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 25.00;
    const discount = 35.00;
    const total = subtotal + deliveryFee - discount;

    return {
      subtotal,
      deliveryFee,
      discount,
      total
    };
  }, [cartItems]);

  return summaryData;
};