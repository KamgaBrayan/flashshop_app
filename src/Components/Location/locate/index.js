import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const LocationEntryScreen = () => {

  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('Avenue Kennedy');

  const handleBack = () => {
    // Implement back navigation
    console.log('Back pressed');
    navigation.goBack();
  };

  const handleClearSearch = () => {
    useEffect(() => {
      setSearchText('');
    }, [searchText]);
  };

  const handleUseCurrentLocation = () => {
    // Implement current location logic
    console.log('Use current location pressed');
    navigation.navigate('Home')
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Enter your Location" onGoBack={handleBack} />
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search location"
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Feather name="x" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.currentLocationButton} onPress={handleUseCurrentLocation}>
        <MaterialIcons name="my-location" size={24} color="#6f4f38" />
        <Text style={styles.currentLocationText}>Use my current location</Text>
      </TouchableOpacity>
      <View style={styles.searchResultContainer}>
        <Text style={styles.searchResultTitle}>SEARCH RESULT</Text>
        <TouchableOpacity style={styles.searchResultItem}>
          <MaterialIcons name="location-on" size={24} color="#6f4f38" />
          <View>
            <Text style={styles.searchResultName}>Avenue Kennedy</Text>
            <Text style={styles.searchResultAddress}>Poste Centrale, Yaoundé</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationEntryScreen;