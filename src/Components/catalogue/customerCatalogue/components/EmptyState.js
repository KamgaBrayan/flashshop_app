// src/Components/catalogue/customProductCatalogue/components/EmptyState.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style';

// On passe `t` en prop
const EmptyState = ({ t }) => {
  return (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>
        {t('catalogue.emptyState')}
      </Text>
    </View>
  );
};

export default EmptyState;