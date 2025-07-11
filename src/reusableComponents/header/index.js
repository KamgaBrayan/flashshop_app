import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppHeader = ({ 
    title, 
    onGoBack, 
    showBackButton = true,
    rightComponent = null 
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} /> // Placeholder to maintain layout
      )}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {rightComponent ? (
        <View style={styles.rightComponent}>
          {rightComponent}
        </View>
      ) : (
        <View style={styles.backButton} /> // Placeholder to maintain layout
      )}
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 20
  },
  backButton: {
    width: 40, // Ensures consistent layout
    justifyContent: 'center'
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  rightComponent: {
    width: 40, // Matches backButton width
    alignItems: 'flex-end'
  }
};

export default AppHeader;