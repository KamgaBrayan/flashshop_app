import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const LocationAccessScreen = () => {

  const navigation = useNavigation();
  const handleAllowLocation = () => {
    // Implement location access logic here
    navigation.navigate('Home')
    console.log('Allow location access');
  };

  const handleManualEntry = () => {
    // Implement manual location entry logic here
    navigation.navigate('LocationEntry')
    console.log('Enter location manually');
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name="map-pin" size={100} color="#8B4513" />
        </View>
        <Text style={styles.title}>What is Your Location?</Text>
        <Text style={styles.subtitle}>
          We need to know your location in order to suggest nearby services.
        </Text>
        <TouchableOpacity
          style={styles.allowButton}
          onPress={handleAllowLocation}
        >
          <Text style={styles.allowButtonText}>Allow Location Access</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.manualButton}
          onPress={handleManualEntry}
        >
          <Text style={styles.manualButtonText}>Enter Location Manually</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

export default LocationAccessScreen;