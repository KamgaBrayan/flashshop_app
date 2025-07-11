/**
 * Get the appropriate icon for a delivery location type
 * 
 * @param {string} type - Location type
 * @returns {string} Ionicons icon name
 */
export const getLocationIcon = (type) => {
  switch (type) {
    case 'pickup': return 'storefront-outline';
    case 'in_town': return 'bicycle-outline';
    case 'out_of_town': return 'car-outline';
    case 'custom': return 'options-outline';
    default: return 'location-outline';
  }
};

/**
 * Get the appropriate icon for a contact method
 * 
 * @param {string} method - Contact method
 * @returns {string} Ionicons icon name
 */
export const getContactIcon = (method) => {
  switch (method) {
    case 'phone': return 'call-outline';
    case 'whatsapp': return 'logo-whatsapp';
    case 'email': return 'mail-outline';
    default: return 'chatbubble-outline';
  }
};