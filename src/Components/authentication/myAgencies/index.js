// src/Components/authentication/myAgencies/index.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT

import styles from './style';
import { sellingPointsData } from '../../../dummyData';
import AppHeader from '../../../reusableComponents/header';
import notificationService from '../../../service/notificationService'; // << NOUVEL IMPORT

const MyAgencies = ({ navigation, searchQuery = '' }) => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const [sellingPoints, setSellingPoints] = useState([]);

  useEffect(() => {
    // Dans une future étape, on remplacera `sellingPointsData` par un appel API
    // ex: const data = await organizationApiService.getAgenciesByOrganization(orgId);
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
    contactInfo: { phone: '', whatsapp: '' }
  });

  const handleAddPoint = () => {
    if (!newPoint.city || !newPoint.address || !newPoint.location) {
      // Remplacer Alert.alert par notificationService
      notificationService.showError(t('myAgencies.fillRequiredFields'));
      return;
    }
    // Logique pour ajouter un point (devra appeler l'API plus tard)
    const newId = `SP${sellingPoints.length + 1}`;
    setSellingPoints([...sellingPoints, { ...newPoint, id: newId }]);
    setNewPoint({ city: '', address: '', location: '', coordinates: { lat: '', lng: '' }, contactInfo: { phone: '', whatsapp: '' } });
    notificationService.showSuccess(t('myAgencies.addNewTitle') + ' ' + t('myAgencies.addSuccess')); // clé 'addSuccess' à ajouter
  };

  const handleDeletePoint = (id) => {
    // Utiliser Alert pour une action destructive est une bonne pratique
    Alert.alert(
      t('myAgencies.deleteTitle'),
      t('myAgencies.deleteConfirmation'),
      [
        { text: t('myAgencies.cancelButton'), style: 'cancel' },
        {
          text: t('myAgencies.deleteButton'),
          style: 'destructive',
          onPress: () => {
            // Logique pour supprimer un point (devra appeler l'API plus tard)
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
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePoint(point.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.optionDetails}>
        <Text style={styles.detailText}>{t('myAgencies.addressLabel')}: {point.address}</Text>
        <Text style={styles.detailText}>{t('myAgencies.gpsLabel')}: {point.coordinates.lat}, {point.coordinates.lng}</Text>
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
    <SafeAreaView style={styles.container}>
      <AppHeader title={t('myAgencies.title')} onGoBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <View style={styles.addPointSection}>
          <Text style={styles.sectionTitle}>{t('myAgencies.addNewTitle')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('myAgencies.cityPlaceholder')}
            value={newPoint.city}
            onChangeText={(text) => setNewPoint({ ...newPoint, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={t('myAgencies.addressPlaceholder')}
            value={newPoint.address}
            onChangeText={(text) => setNewPoint({ ...newPoint, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={t('myAgencies.locationPlaceholder')}
            value={newPoint.location}
            onChangeText={(text) => setNewPoint({ ...newPoint, location: text })}
          />
          <View style={styles.gpsContainer}>
            <TextInput
              style={[styles.input, styles.gpsInput]}
              placeholder={t('myAgencies.latitudePlaceholder')}
              value={newPoint.coordinates.lat}
              onChangeText={(text) => setNewPoint({ ...newPoint, coordinates: { ...newPoint.coordinates, lat: text } })}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.gpsInput]}
              placeholder={t('myAgencies.longitudePlaceholder')}
              value={newPoint.coordinates.lng}
              onChangeText={(text) => setNewPoint({ ...newPoint, coordinates: { ...newPoint.coordinates, lng: text } })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.gpsInput]}
              placeholder={t('myAgencies.phonePlaceholder')}
              value={newPoint.contactInfo.phone}
              onChangeText={(text) => setNewPoint({ ...newPoint, contactInfo: { ...newPoint.contactInfo, phone: text } })}
            />
            <TextInput
              style={[styles.input, styles.gpsInput]}
              placeholder={t('myAgencies.whatsappPlaceholder')}
              value={newPoint.contactInfo.whatsapp}
              onChangeText={(text) => setNewPoint({ ...newPoint, contactInfo: { ...newPoint.contactInfo, whatsapp: text } })}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPoint}>
            <Ionicons name="add-circle-outline" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>{t('myAgencies.addButton')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.existingPointsSection}>
          <Text style={styles.sectionTitle}>
            {t('myAgencies.existingTitle', { count: filteredPoints.length })}
          </Text>
          {filteredPoints.map(renderPoint)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAgencies;