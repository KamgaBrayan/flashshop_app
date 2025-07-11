import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style';

const NavigationMenu = ({ navigationOptions, selectedTab, handleTabChange }) => {
  return (
    <View style={styles.navigationMenu}>
      <FlatList
        data={navigationOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.navigationListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.navigationOption,
              selectedTab === item.label && styles.selectedNavigationOption,
            ]}
            onPress={() => handleTabChange(item.label)}
          >
            <Ionicons
              name={item.icon}
              size={18}
              color={selectedTab === item.label ? COLORS.primary : COLORS.text.medium}
              style={styles.navigationIcon}
            />
            <Text style={[
              styles.navigationOptionText,
              selectedTab === item.label && styles.selectedNavigationOptionText,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavigationMenu;