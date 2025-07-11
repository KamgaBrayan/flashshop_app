// src/Components/catalogue/deliveryOptions/index.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT

import styles from './style';
import { deliveryOptionsData } from '../../../dummyData';
import notificationService from '../../../service/notificationService'; // << NOUVEL IMPORT

const DeliveryOptions = ({ searchQuery = '' }) => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    // Remplacer par un appel API plus tard
    setDeliveryOptions(deliveryOptionsData);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return deliveryOptions;
    const query = searchQuery.toLowerCase();
    return deliveryOptions.filter(option => 
      option.name?.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query) ||
      option.price?.toString().includes(query) ||
      option.type?.toLowerCase().includes(query)
    );
  }, [deliveryOptions, searchQuery]);

  const [newOption, setNewOption] = useState({
    type: 'pickup', name: '', price: '', isNegotiable: false, description: '',
    contactMethods: { phone: '', whatsapp: '' }
  });

  // Définir les types de livraison à l'intérieur pour utiliser `t()`
  const deliveryTypes = [
    { id: 'pickup', label: 'deliveryOptions.type_pickup' },
    { id: 'local', label: 'deliveryOptions.type_local' },
    { id: 'outoftown', label: 'deliveryOptions.type_outoftown' }
  ];

  const handleAddOption = () => {
    if (!newOption.name || !newOption.description) {
      notificationService.showError(t('deliveryOptions.fillRequiredFields'));
      return;
    }
    const newId = `DO${deliveryOptions.length + 1}`;
    setDeliveryOptions([...deliveryOptions, { ...newOption, id: newId }]);
    setNewOption({ type: 'pickup', name: '', price: '', isNegotiable: false, description: '', contactMethods: { phone: '', whatsapp: '' } });
  };

  const handleDeleteOption = (id) => {
    Alert.alert(
      t('deliveryOptions.deleteTitle'),
      t('deliveryOptions.deleteConfirmation'),
      [
        { text: t('deliveryOptions.cancelButton'), style: 'cancel' },
        { text: t('deliveryOptions.deleteButton'), style: 'destructive', onPress: () => {
            setDeliveryOptions(deliveryOptions.filter(option => option.id !== id));
          }
        }
      ]
    );
  };

  const renderDeliveryOption = (option) => (
    <View key={option.id} style={styles.optionCard}>
      <View style={styles.optionHeader}>
        <View style={styles.optionType}>
          <Ionicons name={option.type === 'pickup' ? 'location' : option.type === 'local' ? 'car' : 'airplane'} size={24} color="#8B4513" />
          <View style={styles.optionInfo}><Text style={styles.optionName}>{option.name}</Text></View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteOption(option.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.optionDetails}>
        <Text style={styles.detailText}>{t('deliveryOptions.typeLabel')}: {option.type}</Text>
        <Text style={styles.detailText}>{t('deliveryOptions.priceLabel')}: {option.price ? `${option.price} FCFA` : t('deliveryOptions.contactForPrice')}</Text>
        <Text style={styles.detailText}>{t('deliveryOptions.negotiableLabel')}: {option.isNegotiable ? t('deliveryOptions.yes') : t('deliveryOptions.no')}</Text>
        <Text style={styles.detailText}>{t('deliveryOptions.descriptionLabel')}: {option.description}</Text>
        <View style={styles.contactContainer}>
          {option.contactMethods?.phone && (
            <TouchableOpacity style={styles.contactButton}><Ionicons name="call" size={20} color="#8B4513" /><Text style={styles.contactText}>{option.contactMethods.phone}</Text></TouchableOpacity>
          )}
          {option.contactMethods?.whatsapp && (
            <TouchableOpacity style={styles.contactButton}><Ionicons name="logo-whatsapp" size={20} color="#8B4513" /><Text style={styles.contactText}>{option.contactMethods.whatsapp}</Text></TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addOptionSection}>
        <Text style={styles.sectionTitle}>{t('deliveryOptions.addNewTitle')}</Text>
        <View style={styles.typeSelector}>
          {deliveryTypes.map((type) => (
            <TouchableOpacity key={type.id} style={[styles.typeButton, newOption.type === type.id && styles.typeButtonActive]} onPress={() => setNewOption({ ...newOption, type: type.id })}>
              <Ionicons name={type.id === 'pickup' ? 'location' : type.id === 'local' ? 'car' : 'airplane'} size={20} color={newOption.type === type.id ? '#FFF' : '#8B4513'} />
              <Text style={[styles.typeButtonText, newOption.type === type.id && styles.typeButtonTextActive]}>{t(type.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput style={styles.input} placeholder={t('deliveryOptions.optionNamePlaceholder')} value={newOption.name} onChangeText={(text) => setNewOption({ ...newOption, name: text })} />
        <TextInput style={styles.input} placeholder={t('deliveryOptions.pricePlaceholder')} value={newOption.price} onChangeText={(text) => setNewOption({ ...newOption, price: text })} keyboardType="numeric" />
        <View style={styles.negotiableContainer}>
          <Text style={styles.negotiableText}>{t('deliveryOptions.priceIsNegotiable')}</Text>
          <Switch value={newOption.isNegotiable} onValueChange={(value) => setNewOption({ ...newOption, isNegotiable: value })} trackColor={{ false: '#DDD', true: '#FFE4C4' }} thumbColor={newOption.isNegotiable ? '#8B4513' : '#FFF'} />
        </View>
        <TextInput style={[styles.input, styles.textArea]} placeholder={t('deliveryOptions.descriptionPlaceholder')} value={newOption.description} onChangeText={(text) => setNewOption({ ...newOption, description: text })} multiline numberOfLines={4} />
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>{t('deliveryOptions.contactInfoTitle')}</Text>
          <TextInput style={styles.input} placeholder={t('deliveryOptions.phonePlaceholder')} value={newOption.contactMethods.phone} onChangeText={(text) => setNewOption({ ...newOption, contactMethods: { ...newOption.contactMethods, phone: text } })} />
          <TextInput style={styles.input} placeholder={t('deliveryOptions.whatsappPlaceholder')} value={newOption.contactMethods.whatsapp} onChangeText={(text) => setNewOption({ ...newOption, contactMethods: { ...newOption.contactMethods, whatsapp: text } })} />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
          <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>{t('deliveryOptions.addButton')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.existingOptionsSection}>
        <Text style={styles.sectionTitle}>{t('deliveryOptions.existingTitle', { count: filteredOptions.length })}</Text>
        {filteredOptions.map(renderDeliveryOption)}
      </View>
    </ScrollView>
  );
};

export default DeliveryOptions;