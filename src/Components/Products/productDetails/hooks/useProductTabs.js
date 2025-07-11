import { useState } from 'react';

export const useProductTabs = () => {
  const [selectedTab, setSelectedTab] = useState('Standard');
  
  const navigationOptions = [
    { id: 'standard', label: 'Standard', icon: 'information-circle' },
    { id: 'price', label: 'Selling Price', icon: 'pricetag' },
    { id: 'delivery', label: 'Delivery Options', icon: 'location' },
    { id: 'selling', label: 'Selling Points', icon: 'star' },
    { id: 'paiement', label: 'Payment Methods', icon: 'card' },
  ];
  
  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };
  
  return {
    selectedTab,
    navigationOptions,
    handleTabChange
  };
};