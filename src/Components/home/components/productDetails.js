import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';

const ProductDetailsButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.productDetailsButton}
      activeOpacity={0.7}
    >
      <View style={styles.productDetailsButtonContent}>
        <Ionicons 
          name="information-circle-outline" 
          size={20} 
          color="#8B4513" 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  productDetailsButton: {
    position: 'relative',
    maxWidth: '28@s',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '40@msr',
    paddingVertical: '2@vs',
    paddingHorizontal: '4@s',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: '2@vs',
    },
    shadowOpacity: 0.25,
    shadowRadius: '3.84@msr',
    elevation: 5,
  },
  productDetailsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductDetailsButton;