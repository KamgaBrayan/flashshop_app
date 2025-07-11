import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import styles from '../../style';

const LocationCard = ({ item, onLocationPress, onCallPress }) => (
  <Animatable.View
    animation="fadeInUp"
    duration={800}
    delay={200}
    style={styles.locationCard}
  >
    <View style={styles.locationHeader}>
      <Text style={styles.locationName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => onCallPress(item.contact)}
      >
        <Ionicons name="call" size={20} color="#8B4513" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={styles.addressContainer}
      onPress={() => onLocationPress(item.coordinates)}
    >
      <Ionicons name="location" size={20} color="#8B4513" />
      <Text style={styles.addressText}>{item.address}</Text>
    </TouchableOpacity>

    <View style={styles.hoursContainer}>
      <Ionicons name="time" size={20} color="#8B4513" />
      <Text style={styles.hoursText}>{item.openHours}</Text>
    </View>

    <View style={styles.featuresContainer}>
      {item.features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  </Animatable.View>
);

const SellingPointsTab = ({ 
  sellingPoints, 
  handleLocationPress, 
  handleCallPress 
}) => {
  const { locations, generalInfo } = sellingPoints || { 
    locations: [], 
    generalInfo: { 
      title: 'Our Locations', 
      subtitle: 'Find us near you', 
      description: 'We have multiple locations to serve you better.', 
      note: 'Call us for more information'
    } 
  };
  
  return (
    <View style={styles.sellingPointsContainer}>
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.headerContainer}
      >
        <Text style={styles.mainTitle}>{generalInfo.title}</Text>
        <Text style={styles.subtitle}>{generalInfo.subtitle}</Text>
        <Text style={styles.description}>{generalInfo.description}</Text>
      </Animatable.View>

      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <LocationCard 
            item={item} 
            onLocationPress={handleLocationPress} 
            onCallPress={handleCallPress}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.locationsList}
      />

      <Animatable.View
        animation="fadeInUp"
        duration={800}
        style={styles.noteContainer}
      >
        <Ionicons name="information-circle" size={24} color="#8B4513" />
        <Text style={styles.noteText}>{generalInfo.note}</Text>
      </Animatable.View>
    </View>
  );
};

export default SellingPointsTab;