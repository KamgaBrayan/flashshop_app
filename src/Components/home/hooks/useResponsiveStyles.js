import { useState, useEffect } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';

export const useResponsiveStyles = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [orientation, setOrientation] = useState('portrait');

  // Handle dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  // Adjust styles based on orientation and platform
  const getResponsiveStyles = () => {
    const { width, height } = dimensions;
    const isIOS = Platform.OS === 'ios';
    const isIPhoneX = isIOS && (height >= 812 || width >= 812);

    return {
      container: {
        paddingTop: isIPhoneX ? 44 : isIOS ? 20 : StatusBar.currentHeight,
      },
      postContainer: {
        height: orientation === 'portrait' 
          ? height - (isIPhoneX ? 90 : 60)
          : height,
      },
    };
  };

  return {
    dimensions,
    orientation,
    getResponsiveStyles
  };
};