import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const PricingOptions = ({ 
  currentProduct, 
  setCurrentProduct, 
  currentFeature, 
  setCurrentFeature 
}) => {

  const addFeatureToOption = (optionType) => {
    if (!currentFeature.trim()) return;

    setCurrentProduct(prev => {
      const newOptions = prev.selling_price.options.map(option => {
        if (option.type === optionType) {
          return {
            ...option,
            features: [...option.features, currentFeature.trim()]
          };
        }
        return option;
      });

      return {
        ...prev,
        selling_price: {
          ...prev.selling_price,
          options: newOptions
        }
      };
    });
    setCurrentFeature('');
  };

  const removeFeature = (optionType, featureIndex) => {
    setCurrentProduct(prev => {
      const newOptions = prev.selling_price.options.map(option => {
        if (option.type === optionType) {
          const newFeatures = [...option.features];
          newFeatures.splice(featureIndex, 1);
          return {
            ...option,
            features: newFeatures
          };
        }
        return option;
      });

      return {
        ...prev,
        selling_price: {
          ...prev.selling_price,
          options: newOptions
        }
      };
    });
  };

  return (
    <View style={styles.pricingSection}>
      <Text style={styles.sectionTitle}>Pricing Options</Text>

      {/* Unit selection for products */}
      {currentProduct.category === 'products' && (
        <View style={styles.unitSelection}>
          <Text style={styles.label}>Unit of Measurement:</Text>
          <View style={styles.unitButtons}>
            {['piece', 'kg', 'gram', 'liter'].map(unit => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  currentProduct.unit === unit && styles.selectedUnit
                ]}
                onPress={() => setCurrentProduct(prev => ({ ...prev, unit }))}
              >
                <Text style={[
                  styles.unitButtonText,
                  currentProduct.unit === unit && styles.selectedUnitText
                ]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      {currentProduct.selling_price.options.map((option, index) => (
        <View key={option.type} style={styles.pricingOption}>
          <Text style={styles.optionTitle}>{option.type.toUpperCase()} PACKAGE</Text>
          
          {currentProduct.category === 'products' ? (
            // Product pricing format
            <View style={styles.quantityRangeContainer}>
              <View style={styles.rangeInputs}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder={`Min ${currentProduct.unit}s`}
                  value={option.quantity_range?.min}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const newOptions = [...currentProduct.selling_price.options];
                    newOptions[index] = {
                      ...option,
                      quantity_range: { 
                        ...(option.quantity_range || {}),
                        min: text 
                      }
                    };
                    setCurrentProduct(prev => ({
                      ...prev,
                      selling_price: { ...prev.selling_price, options: newOptions }
                    }));
                  }}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder={`Max ${currentProduct.unit}s`}
                  value={option.quantity_range?.max}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const newOptions = [...currentProduct.selling_price.options];
                    newOptions[index] = {
                      ...option,
                      quantity_range: { 
                        ...(option.quantity_range || {}),
                        max: text 
                      }
                    };
                    setCurrentProduct(prev => ({
                      ...prev,
                      selling_price: { ...prev.selling_price, options: newOptions }
                    }));
                  }}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder={`Price per ${currentProduct.unit} (FCFA)`}
                value={option.quantity_range?.price_per_unit}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const newOptions = [...currentProduct.selling_price.options];
                  newOptions[index] = {
                    ...option,
                    quantity_range: { 
                      ...(option.quantity_range || {}),
                      price_per_unit: text 
                    }
                  };
                  setCurrentProduct(prev => ({
                    ...prev,
                    selling_price: { ...prev.selling_price, options: newOptions }
                  }));
                }}
              />
            </View>
          ) : (
            // Service pricing format
            <>
              <TextInput
                style={styles.input}
                placeholder={`${option.type} Duration (e.g., 1 hour, 1 day)`}
                value={option.duration}
                onChangeText={(text) => {
                  const newOptions = [...currentProduct.selling_price.options];
                  newOptions[index] = { ...option, duration: text };
                  setCurrentProduct(prev => ({
                    ...prev,
                    selling_price: { ...prev.selling_price, options: newOptions }
                  }));
                }}
              />

              <TextInput
                style={styles.input}
                placeholder={`${option.type} Price (FCFA)`}
                value={option.price}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const newOptions = [...currentProduct.selling_price.options];
                  newOptions[index] = { ...option, price: text };
                  setCurrentProduct(prev => ({
                    ...prev,
                    selling_price: { ...prev.selling_price, options: newOptions }
                  }));
                }}
              />
            </>
          )}

          {option.type === 'premium' && (
            <TextInput
              style={styles.input}
              placeholder="Savings (e.g., 20%)"
              value={option.savings}
              onChangeText={(text) => {
                const newOptions = [...currentProduct.selling_price.options];
                newOptions[index] = { ...option, savings: text };
                setCurrentProduct(prev => ({
                  ...prev,
                  selling_price: { ...prev.selling_price, options: newOptions }
                }));
              }}
            />
          )}

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Features:</Text>
            {option.features.map((feature, featureIndex) => (
              <View key={featureIndex} style={styles.featureItem}>
                <Text style={styles.featureText}>• {feature}</Text>
                <TouchableOpacity
                  onPress={() => removeFeature(option.type, featureIndex)}
                  style={styles.removeFeatureButton}
                >
                  <Ionicons name="close-circle" size={20} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addFeatureContainer}>
              <TextInput
                style={styles.featureInput}
                placeholder="Add a feature"
                value={currentFeature}
                onChangeText={setCurrentFeature}
              />
              <TouchableOpacity
                style={styles.addFeatureButton}
                onPress={() => addFeatureToOption(option.type)}
              >
                <Ionicons name="add-circle" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PricingOptions;