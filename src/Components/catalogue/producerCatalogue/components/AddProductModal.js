import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Image
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';
import PricingOptions from './PricingOptions';

const AddProductModal = ({
                             visible,
                             onClose,
                             currentProduct,
                             setCurrentProduct,
                             currentFeature,
                             setCurrentFeature,
                             takeMedia,
                             pickMedia,
                             availableSellingPoints,
                             availableDeliveryOptions,
                             onSave
                         }) => {
    const renderMedia = () => {
        if (!currentProduct.media) return null;

        if (currentProduct.media.type === 'video') {
            return (
                <Video
                    source={
                        typeof currentProduct.media.uri === 'string' && currentProduct.media.uri.startsWith('http')
                            ? { uri: currentProduct.media.uri }
                            : typeof currentProduct.media.uri === 'number'
                                ? currentProduct.media.uri
                                : { uri: currentProduct.media.uri }
                    }
                    style={styles.selectedMedia}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay={false}
                    isLooping={false}
                    onError={(error) => {
                        console.log('Video error:', error);
                    }}
                />
            );
        } else {
            return (
                <Image
                    source={
                        typeof currentProduct.media.uri === 'string' && currentProduct.media.uri.startsWith('http')
                            ? { uri: currentProduct.media.uri }
                            : typeof currentProduct.media.uri === 'number'
                                ? currentProduct.media.uri
                                : { uri: currentProduct.media.uri }
                    }
                    style={styles.selectedMedia}
                    onError={(error) => {
                        console.log('Image error:', error);
                    }}
                />
            );
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Add New Product/Service</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Ionicons name="close" size={24} color="#8B4513" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalContent}>

                                {/* Media Selection */}
                                <View style={styles.mediaSelectionContainer}>
                                    <TouchableOpacity
                                        style={styles.mediaButton}
                                        onPress={takeMedia}
                                    >
                                        <Ionicons name="camera" size={24} color="#8B4513" />
                                        <Text>Take Media</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mediaButton}
                                        onPress={pickMedia}
                                    >
                                        <Ionicons name="image" size={24} color="#8B4513" />
                                        <Text>Select Media</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Affichage du média sélectionné */}
                                {currentProduct.media && (
                                    <View style={styles.mediaPreviewContainer}>
                                        {renderMedia()}
                                        <View style={styles.mediaTypeIndicator}>
                                            <Ionicons
                                                name={currentProduct.media.type === 'video' ? 'videocam' : 'image'}
                                                size={16}
                                                color="white"
                                            />
                                            <Text style={styles.mediaTypeText}>
                                                {currentProduct.media.type === 'video' ? 'Vidéo' : 'Image'}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                <View style={styles.categoryContainer}>
                                    {['Products', 'Services', 'Other'].map(category => (
                                        <TouchableOpacity
                                            key={category}
                                            style={[
                                                styles.categoryButtonM,
                                                currentProduct.category === category.toLowerCase() && styles.selectedCategoryM
                                            ]}
                                            onPress={() => setCurrentProduct(prev => ({...prev, category: category.toLowerCase()}))}
                                        >
                                            <Text>{category}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Product/Service Name"
                                    value={currentProduct.name}
                                    onChangeText={(text) => setCurrentProduct(prev => ({...prev, name: text}))}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={currentProduct.description}
                                    onChangeText={(text) => setCurrentProduct(prev => ({...prev, description: text}))}
                                    multiline
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={currentProduct.price}
                                    onChangeText={(text) => setCurrentProduct(prev => ({...prev, price: text}))}
                                    keyboardType="numeric"
                                />

                                {currentProduct.category === 'products' ? (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Stock"
                                        value={currentProduct.stock}
                                        onChangeText={(text) => setCurrentProduct(prev => ({...prev, stock: text}))}
                                        keyboardType="numeric"
                                    />
                                ) : currentProduct.category === 'services' && (
                                    <View style={styles.availabilityContainer}>
                                        <Text style={styles.label}>Availability</Text>
                                        <View style={styles.radioGroup}>
                                            <TouchableOpacity
                                                style={styles.radioOption}
                                                onPress={() => setCurrentProduct(prev => ({
                                                    ...prev,
                                                    availability: "Available"
                                                }))}
                                            >
                                                <View style={styles.radio}>
                                                    {currentProduct.availability === "Available" && <View style={styles.radioSelected} />}
                                                </View>
                                                <Text style={styles.radioLabel}>Available</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.radioOption}
                                                onPress={() => setCurrentProduct(prev => ({
                                                    ...prev,
                                                    availability: "Not Available"
                                                }))}
                                            >
                                                <View style={styles.radio}>
                                                    {currentProduct.availability === "Not Available" && <View style={styles.radioSelected} />}
                                                </View>
                                                <Text style={styles.radioLabel}>Not Available</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}

                                <PricingOptions
                                    currentProduct={currentProduct}
                                    setCurrentProduct={setCurrentProduct}
                                    currentFeature={currentFeature}
                                    setCurrentFeature={setCurrentFeature}
                                />

                                <Text style={styles.sectionTitle}>Selling Points</Text>
                                <ScrollView horizontal style={styles.sellingPointsContainer}>
                                    {availableSellingPoints.map(point => (
                                        <TouchableOpacity
                                            key={point.id}
                                            style={[
                                                styles.sellingPointItem,
                                                currentProduct.sellingPoints.includes(point.id) && styles.selectedItem
                                            ]}
                                            onPress={() => {
                                                setCurrentProduct(prev => ({
                                                    ...prev,
                                                    sellingPoints: prev.sellingPoints.includes(point.id)
                                                        ? prev.sellingPoints.filter(id => id !== point.id)
                                                        : [...prev.sellingPoints, point.id]
                                                }));
                                            }}
                                        >
                                            <Text style={styles.itemName}>{point.city}</Text>
                                            <Text style={styles.itemAddress}>{point.address}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <Text style={styles.sectionTitle}>Delivery Options</Text>
                                <ScrollView horizontal style={styles.deliveryOptionsContainer}>
                                    {availableDeliveryOptions.map(option => (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={[
                                                styles.deliveryOptionItem,
                                                currentProduct.deliveryOptions.includes(option.id) && styles.selectedItem
                                            ]}
                                            onPress={() => {
                                                setCurrentProduct(prev => ({
                                                    ...prev,
                                                    deliveryOptions: prev.deliveryOptions.includes(option.id)
                                                        ? prev.deliveryOptions.filter(id => id !== option.id)
                                                        : [...prev.deliveryOptions, option.id]
                                                }));
                                            }}
                                        >
                                            <Text style={styles.itemName}>{option.name}</Text>
                                            <Text style={styles.itemPrice}>
                                                {option.price ? `${option.price} FCFA` : 'Price on request'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={onSave}
                                    >
                                        <Text style={styles.saveButtonText}>Save Product</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={onClose}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddProductModal;