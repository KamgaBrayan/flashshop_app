import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles, { COLORS } from '../../style';
import { getContactIcon, getLocationIcon } from '../../utils/icons';

const LocationCard = ({ 
  location, 
  isSelected, 
  onSelect, 
  selectedTown, 
  setSelectedTown,
  onContactPress
}) => {
  const renderCost = () => {
    if (location.type === 'custom') return null;
    return (
      <View style={styles.costContainer}>
        <Text style={styles.costLabel}>Cost:</Text>
        <Text style={styles.costValue}>
          {location.cost === 0 ? 'Free' : `${location.cost} ${location.currency}`}
        </Text>
        {location.negotiable && (
          <View style={styles.negotiableTag}>
            <Text style={styles.negotiableText}>Negotiable</Text>
          </View>
        )}
      </View>
    );
  };

  const renderDetails = () => {
    switch (location.type) {
      case 'pickup':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color={COLORS.text.medium} />
              <Text style={styles.detailText}>{location.available_hours}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color={COLORS.text.medium} />
              <Text style={styles.detailText}>{location.address}</Text>
            </View>
          </View>
        );
      case 'in_town':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color={COLORS.text.medium} />
              <Text style={styles.detailText}>Estimated delivery: {location.estimated_time}</Text>
            </View>
            <View style={styles.townSelector}>
              <Text style={styles.townLabel}>Select Town:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {location.available_towns.map((town, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.townChip,
                      selectedTown === town && styles.selectedTownChip
                    ]}
                    onPress={() => setSelectedTown(town)}
                  >
                    <Text style={[
                      styles.townChipText,
                      selectedTown === town && styles.selectedTownChipText
                    ]}>{town}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        );
      case 'out_of_town':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color={COLORS.text.medium} />
              <Text style={styles.detailText}>Estimated delivery: {location.estimated_time}</Text>
            </View>
          </View>
        );
      case 'custom':
        return (
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Contact Merchant:</Text>
            <View style={styles.contactOptions}>
              {Object.entries(location.contact_info).map(([method, value]) => (
                <TouchableOpacity
                  key={method}
                  style={styles.contactButton}
                  onPress={() => onContactPress(method, value)}
                >
                  <Ionicons
                    name={getContactIcon(method)}
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.contactMethodText}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <View
      style={[styles.locationCard, isSelected && styles.selectedLocationCard]}
    >
      <TouchableOpacity
        style={styles.locationCardContent}
        onPress={() => onSelect(location)}
      >
        <View style={styles.locationHeader}>
          <View style={styles.locationTitleContainer}>
            <Ionicons
              name={getLocationIcon(location.type)}
              size={24}
              color={isSelected ? COLORS.primary : COLORS.text.medium}
            />
            <Text style={[
              styles.locationTitle,
              isSelected && styles.selectedLocationTitle
            ]}>{location.name}</Text>
          </View>
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            </View>
          )}
        </View>

        {renderCost()}
        {isSelected && renderDetails()}

        {location.notes && (
          <View style={styles.notesContainer}>
            <Ionicons name="information-circle-outline" size={18} color={COLORS.text.medium} />
            <Text style={styles.notesText}>{location.notes}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const DeliveryOptionsTab = ({ 
  productDetails, 
  deliveryOptionsHook,
  setShowNotification
}) => {
  const {
    selectedDeliveryOption,
    selectedTown,
    setSelectedDeliveryOption,
    setSelectedTown,
    handleContactPress,
    handleDeliveryOptionAddToCart
  } = deliveryOptionsHook;
  
  const deliveryOptions = productDetails?.delivery_options || {};
  const locations = deliveryOptions.locations || [];
  
  return (
    <View style={styles.deliveryContainer}>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            isSelected={selectedDeliveryOption?.name === item.name}
            onSelect={setSelectedDeliveryOption}
            selectedTown={selectedTown}
            setSelectedTown={setSelectedTown}
            onContactPress={handleContactPress}
          />
        )}
        keyExtractor={item => item.type}
        contentContainerStyle={styles.locationListContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.deliveryHeader}>
            {locations.length > 0 ? (
              <View>
                <Text style={styles.deliveryTitle}>Delivery Options</Text>
                <Text style={styles.deliverySubtitle}>
                  Choose your preferred delivery method
                </Text>
              </View>
            ) : <Text style={styles.deliveryTitle}>This is a service</Text>}
          </View>
        )}
        ListFooterComponent={() => (
          deliveryOptions.general_notes ? (
            <View style={styles.generalNotesContainer}>
              <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.primary} />
              <Text style={styles.generalNotesText}>
                {deliveryOptions.general_notes}
              </Text>
            </View>
          ) : null
        )}
      />
      {locations.length > 0 && (
        <View style={styles.addToCartContainer}>
          <TouchableOpacity 
            style={styles.addToCartButton} 
            onPress={() => handleDeliveryOptionAddToCart(setShowNotification)}
          >
            <Feather name="shopping-bag" size={20} color="#FFF" />
            <Text style={styles.addToCartText}>Add Delivery Option to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DeliveryOptionsTab;