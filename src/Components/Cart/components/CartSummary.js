// src/screens/Cart/components/CartSummary.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style';

const CartSummary = ({ 
  summaryData,
  subtotalLabel,
  deliveryFeeLabel,
  discountLabel,
  totalCostLabel
}) => {
  const { subtotal, deliveryFee, discount, total } = summaryData;

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{subtotalLabel}</Text>
        <Text style={styles.summaryValue}>{subtotal.toFixed(2)} FCFA</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{deliveryFeeLabel}</Text>
        <Text style={styles.summaryValue}>{deliveryFee.toFixed(2)} FCFA</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{discountLabel}</Text>
        <Text style={[styles.summaryValue, styles.discountText]}>-{discount.toFixed(2)} FCFA</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>{totalCostLabel}</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} FCFA</Text>
      </View>
    </View>
  );
};

export default CartSummary;