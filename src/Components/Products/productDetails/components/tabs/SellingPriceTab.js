import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles, { COLORS } from '../../style';
import { formatPrice, calculateTotal } from '../../utils/formatters';

const PriceCard = ({ 
  option, 
  index, 
  isService, 
  isSelected, 
  onSelect,
  currentQuantity,
  onDecrement,
  onIncrement,
  onQuantityChange
}) => {
  const minOrder = parseInt(option.minimum_order);
  const maxOrder = parseInt(option.maximum_order);
  
  return (
    <View
      style={[styles.priceCard, isSelected && styles.selectedPriceCard]}
    >
      <TouchableOpacity
        style={styles.priceCardContent}
        onPress={() => onSelect(option)}
      >
        {/* Header */}
        <View style={styles.priceCardHeader}>
          <View style={styles.priceTypeContainer}>
            <Ionicons
              name={isService ? "time-outline" : "cube-outline"}
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.priceType}>
              {option.type.charAt(0).toUpperCase() + option.type.slice(1).replace('_', ' ')}
            </Text>
          </View>
          
          {/* Price Display */}
          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>FCFA</Text>
            <Text style={styles.priceValue}>
              {isService 
                ? formatPrice(option.price)
                : formatPrice(option.price_per_unit)
              }
            </Text>
            <Text style={styles.priceUnit}>
              {isService ? `/${option.duration}` : `/${option.unit}`}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          {/* Quantity/Duration Info */}
          <View style={styles.detailRow}>
            <Ionicons
              name={isService ? "time" : "scale-outline"}
              size={20}
              color={COLORS.text.medium}
            />
            <Text style={styles.detailText}> 
              {isService 
                ? `Duration: ${option.duration}`
                : `Quantity Range: ${option.quantity_range} ${option.unit}`
              }
            </Text>
          </View>

          {/* Features */}
          {option.features && option.features.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.success}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}

          {/* Quantity Selection */}
          {!isService ? (
            <View style={styles.quantitySection}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  onPress={() => onDecrement(option)}
                  style={[
                    styles.quantityButton,
                    currentQuantity <= minOrder && styles.buttonDisabled
                  ]}
                  disabled={currentQuantity <= minOrder}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                
                <TextInput
                  style={styles.quantityInput}
                  value={currentQuantity.toString()}
                  onChangeText={(value) => onQuantityChange(value, option)}
                  keyboardType="numeric"
                  textAlign="center"
                />
                
                <TouchableOpacity 
                  onPress={() => onIncrement(option)}
                  style={[
                    styles.quantityButton,
                    currentQuantity >= maxOrder && styles.buttonDisabled
                  ]}
                  disabled={currentQuantity >= maxOrder}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  FCFA {formatPrice(calculateTotal(option, currentQuantity))}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Savings/Discount */}
          {(option.savings || option.discount) && (
            <View style={styles.savingsContainer}>
              <Ionicons
                name="trending-down"
                size={20}
                color={COLORS.success}
              />
              <Text style={styles.savingsText}>
                Save {option.savings || `${option.discount}%`}
              </Text>
            </View>
          )}
        </View>

        {/* Selection Indicator */}
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ThresholdFooter = ({ 
  thresholdInfo, 
  isFooterExpanded, 
  setIsFooterExpanded, 
  onContactPress 
}) => {
  if (!thresholdInfo) return null;
  
  const renderContactButton = (method, value) => (
    <TouchableOpacity
      key={method}
      style={styles.contactButton}
      onPress={() => onContactPress(method, value)}
    >
      <Ionicons
        name={method === 'phone' ? 'call-outline' : method === 'whatsapp' ? 'logo-whatsapp' : 'mail-outline'}
        size={24}
        color={COLORS.primary}
      />
      <Text style={styles.contactMethodText}>
        {method.charAt(0).toUpperCase() + method.slice(1)}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <TouchableOpacity
      onPress={() => setIsFooterExpanded(!isFooterExpanded)}
      style={styles.thresholdContainer}
    >
      <View style={styles.thresholdIconContainer}>
        <Ionicons
          name="alert-circle"
          size={24}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.thresholdContent}>
        <Text style={styles.thresholdTitle}>Bulk Orders</Text>
        <Text style={styles.thresholdMessage}>
          {thresholdInfo.message}
        </Text>
        
        {isFooterExpanded && (
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Contact Producer:</Text>
            <View style={styles.contactOptions}>
              {renderContactButton('phone', '+1234567890')}
              {renderContactButton('whatsapp', '+1234567890')}
              {renderContactButton('email', 'producer@example.com')}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SellingPriceTab = ({ 
  productDetails, 
  sellingPriceHook,
  setShowNotification
}) => {
  const {
    selectedSellingPrice,
    isFooterExpanded,
    quantities,
    setSelectedSellingPrice,
    setIsFooterExpanded,
    handleDecrement,
    handleIncrement,
    handleQuantityChange,
    handleContactPress,
    handleSellingPriceAddToCart
  } = sellingPriceHook;
  
  const isService = productDetails?.type === 'intangible';
  const priceOptions = productDetails?.selling_price?.options || [];
  const thresholdInfo = productDetails?.selling_price?.threshold;
  
  const renderHeader = () => (
    <View style={styles.pricingHeader}>
      <Text style={styles.pricingTitle}>
        {isService ? 'Service Packages' : 'Pricing Options'}
      </Text>
      <Text style={styles.pricingSubtitle}>
        Choose the option that best suits your needs
      </Text>
    </View>
  );
  
  return (
    <View style={styles.pricingContainer}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <ThresholdFooter
            thresholdInfo={thresholdInfo}
            isFooterExpanded={isFooterExpanded}
            setIsFooterExpanded={setIsFooterExpanded}
            onContactPress={handleContactPress}
          />
        }
        data={priceOptions}
        renderItem={({ item, index }) => (
          <PriceCard
            option={item}
            index={index}
            isService={isService}
            isSelected={selectedSellingPrice?.type === item.type}
            onSelect={setSelectedSellingPrice}
            currentQuantity={quantities[item.type] || parseInt(item.minimum_order) || 1}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            onQuantityChange={handleQuantityChange}
          />
        )}
        keyExtractor={item => item.type}
        contentContainerStyle={styles.priceListContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.addToCartContainer}>
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={() => handleSellingPriceAddToCart(setShowNotification)}
        >
          <Feather name="shopping-bag" size={20} color="#FFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellingPriceTab;