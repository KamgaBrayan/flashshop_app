import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { sellingPointsData } from '../../../dummyData';

const SellingPoints = ({ searchQuery = '' }) => {
  const [sellingPoints, setSellingPoints] = useState([]);

  useEffect(() => {
    setSellingPoints(sellingPointsData);
  }, []);

  const filteredPoints = useMemo(() => {
    if (!searchQuery) return sellingPoints;
    
    const query = searchQuery.toLowerCase();
    return sellingPoints.filter(point => 
      point.city?.toLowerCase().includes(query) ||
      point.address?.toLowerCase().includes(query) ||
      point.location?.toLowerCase().includes(query)
    );
  }, [sellingPoints, searchQuery]);

  const [newPoint, setNewPoint] = useState({
    city: '',
    address: '',
    location: '',
    coordinates: { lat: '', lng: '' },
    contactInfo: {
      phone: '',
      whatsapp: ''
    }
  });

  const handleAddPoint = () => {
    if (!newPoint.city || !newPoint.address || !newPoint.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newId = `SP${sellingPoints.length + 1}`;
    setSellingPoints([...sellingPoints, { ...newPoint, id: newId }]);
    setNewPoint({
      city: '',
      address: '',
      location: '',
      coordinates: { lat: '', lng: '' },
      contactInfo: {
        phone: '',
        whatsapp: ''
      }
    });
  };

  const handleDeletePoint = (id) => {
    Alert.alert(
      'Delete Point',
      'Are you sure you want to delete this selling point?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSellingPoints(sellingPoints.filter(point => point.id !== id));
          }
        }
      ]
    );
  };

  const renderPoint = (point) => (
    <View key={point.id} style={styles.optionCard}>
      <View style={styles.optionHeader}>
        <View style={styles.optionType}>
          <Ionicons name="location" size={24} color="#8B4513" />
          <View style={styles.optionInfo}>
            <Text style={styles.optionName}>{point.city}</Text>
            <Text style={styles.optionLocation}>{point.location}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeletePoint(point.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionDetails}>
        <Text style={styles.detailText}>Address: {point.address}</Text>
        <Text style={styles.detailText}>
          GPS: {point.coordinates.lat}, {point.coordinates.lng}
        </Text>

        <View style={styles.contactContainer}>
          {point.contactInfo?.phone && (
            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`tel:${point.contactInfo.phone}`)}>
              <Ionicons name="call" size={20} color="#8B4513" />
              <Text style={styles.contactText}>{point.contactInfo.phone}</Text>
            </TouchableOpacity>
          )}
          {point.contactInfo?.whatsapp && (
            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`https://wa.me/${point.contactInfo.whatsapp}`)}>
              <Ionicons name="logo-whatsapp" size={20} color="#8B4513" />
              <Text style={styles.contactText}>{point.contactInfo.whatsapp}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addPointSection}>
        <Text style={styles.sectionTitle}>Add New Selling Point</Text>
        
        <TextInput
          style={styles.input}
          placeholder="City"
          value={newPoint.city}
          onChangeText={(text) => setNewPoint({ ...newPoint, city: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={newPoint.address}
          onChangeText={(text) => setNewPoint({ ...newPoint, address: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Location (e.g., Marché Central)"
          value={newPoint.location}
          onChangeText={(text) => setNewPoint({ ...newPoint, location: text })}
        />
        
        <View style={styles.gpsContainer}>
          <TextInput
            style={[styles.input, styles.gpsInput]}
            placeholder="Latitude"
            value={newPoint.coordinates.lat}
            onChangeText={(text) => setNewPoint({
              ...newPoint,
              coordinates: { ...newPoint.coordinates, lat: text }
            })}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.gpsInput]}
            placeholder="Longitude"
            value={newPoint.coordinates.lng}
            onChangeText={(text) => setNewPoint({
              ...newPoint,
              coordinates: { ...newPoint.coordinates, lng: text }
            })}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.gpsInput]}
            placeholder="Phone"
            value={newPoint.contactInfo.phone}
            onChangeText={(text) => setNewPoint({
              ...newPoint,
              contactInfo: { ...newPoint.contactInfo, phone: text }
            })}
          />
          <TextInput
            style={[styles.input, styles.gpsInput]}
            placeholder="WhatsApp"
            value={newPoint.contactInfo.whatsapp}
            onChangeText={(text) => setNewPoint({
              ...newPoint,
              contactInfo: { ...newPoint.contactInfo, whatsapp: text }
            })}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddPoint}>
          <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add Point</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.existingPointsSection}>
        <Text style={styles.sectionTitle}>All Selling Points ({filteredPoints.length})</Text>
        {filteredPoints.map(renderPoint)}
      </View>
    </ScrollView>
  );
};

export default SellingPoints;
