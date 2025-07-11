import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StatusBar, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import SellingPoints from '../sellingPoints';
import DeliveryOptions from '../deliveryOptions';
import { useCameraService, CameraModal } from '../../../service/CameraService';
import AppHeader from '../../../reusableComponents/header';
import { useSharedPosts } from '../../../context/postContext/sharedPostsContext';

// Import components and hooks
import ProductCard from './components/ProductCard';
import CategorySelector from './components/CategorySelector';
import MenuModal from './components/MenuModal';
import AddProductModal from './components/AddProductModal';
import { useProductState } from './hooks/useProductState';
import { useProductActions } from './hooks/useProductActions';

const ProductCatalogue = ({ navigation }) => {
    const {
        catalogPosts,
        markAsPosted,
        removeFromFeed,
        addToCatalog,
        updatePost
    } = useSharedPosts();

    // Initialize state using custom hook
    const {
        selectedTab,
        setSelectedTab,
        searchQuery,
        setSearchQuery,
        isAddProductModalVisible,
        setIsAddProductModalVisible,
        isEditMode,
        setIsEditMode,
        currentProduct,
        setCurrentProduct,
        currentFeature,
        setCurrentFeature,
        availableSellingPoints,
        availableDeliveryOptions,
        isMenuVisible,
        setIsMenuVisible,
        emptyProduct,
        getSearchPlaceholder,
        filterResults
    } = useProductState(catalogPosts);

    // Initialize actions using custom hook with shared context functions
    const {
        editProduct,
        saveProduct,
        resetProductModal,
        handleCloseModal
    } = useProductActions(
        catalogPosts,
        () => {}, // Pas besoin de setProductsList car on utilise le contexte
        currentProduct,
        setCurrentProduct,
        setIsAddProductModalVisible,
        setIsEditMode,
        emptyProduct,
        addToCatalog,
        updatePost
    );

    // Fonction pour basculer le statut "posted" d'un produit
    const toggleProductPosted = (productId) => {
        const product = catalogPosts.find(p => p.id === productId);
        if (product) {
            if (product.isPosted) {
                removeFromFeed(productId);
            } else {
                markAsPosted(productId);
            }
        }
    };

    // Handle media selection from camera (supports both photo and video)
    const handleMediaSelect = (media) => {
        setCurrentProduct(prev => ({
            ...prev,
            media: media
        }));
    };

    // Enhanced camera service with video support
    const {
        facing,
        showCamera,
        setShowCamera,
        cameraRef,
        permission,
        requestPermission,
        takeMedia, // Renommé de takePicture
        handleCapture,
        toggleCameraFacing,
        pickMedia, // Renommé de pickImage
        isRecording,
        recordingTimer,
        mediaMode,
        setMediaMode,
        formatTime
    } = useCameraService(handleMediaSelect);

    // Handle capture and update
    const handleCaptureAndUpdate = async () => {
        const media = await handleCapture();
        if (media) {
            setShowCamera(false);
            setIsAddProductModalVisible(true);
        }
    };

    // Request camera permission on component mount
    useEffect(() => {
        requestPermission();
    }, []);

    // Handle back button press to close modals
    useEffect(() => {
        const backAction = () => {
            if (isAddProductModalVisible) {
                setIsAddProductModalVisible(false);
                return true; // Prevents default back action
            }
            return false; // Allows default back action
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup on unmount
    }, [isAddProductModalVisible]);

    // Menu options
    const menuOptions = [
        {
            label: 'Profile',
            icon: 'person',
            onPress: () => navigation.navigate('profile')
        },
        {
            label: 'Settings',
            icon: 'settings',
            onPress: () => navigation.navigate('Settings')
        }
    ];

    // Render content based on selected tab
    const renderContent = () => {
        switch (selectedTab) {
            case 'products':
                return (
                    <FlatList
                        data={filterResults(catalogPosts.filter(item => item.type === 'tangible'))}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onEditPress={editProduct}
                                onTogglePosted={toggleProductPosted}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                    />
                );
            case 'services':
                return (
                    <FlatList
                        data={filterResults(catalogPosts.filter(item => item.type === 'intangible'))}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onEditPress={editProduct}
                                onTogglePosted={toggleProductPosted}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                    />
                );
            case 'selling_points':
                return <SellingPoints searchQuery={searchQuery} />;
            case 'delivery':
                return <DeliveryOptions searchQuery={searchQuery} />;
            default:
                return (
                    <FlatList
                        data={filterResults(catalogPosts)}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onEditPress={editProduct}
                                onTogglePosted={toggleProductPosted}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <AppHeader
                title="My Catalogue"
                onGoBack={() => navigation.goBack()}
                rightComponent={
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setIsMenuVisible(true)}
                    >
                        <Ionicons name="ellipsis-vertical" size={24} color="#8B4513" />
                    </TouchableOpacity>
                }
            />

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={getSearchPlaceholder()}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Categories */}
            <CategorySelector
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
            />

            {/* Content */}
            {renderContent()}

            {/* Add Product Modal with enhanced media support */}
            <AddProductModal
                visible={isAddProductModalVisible}
                onClose={handleCloseModal}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                currentFeature={currentFeature}
                setCurrentFeature={setCurrentFeature}
                takeMedia={takeMedia} // Changé de takePicture
                pickMedia={pickMedia} // Changé de pickImage
                availableSellingPoints={availableSellingPoints}
                availableDeliveryOptions={availableDeliveryOptions}
                onSave={saveProduct}
            />

            {/* Enhanced Camera Modal with TikTok-like interface */}
            <CameraModal
                showCamera={showCamera}
                setShowCamera={setShowCamera}
                facing={facing}
                cameraRef={cameraRef}
                permission={permission}
                requestPermission={requestPermission}
                handleCapture={handleCaptureAndUpdate}
                toggleCameraFacing={toggleCameraFacing}
                isRecording={isRecording}
                recordingTimer={recordingTimer}
                mediaMode={mediaMode}
                setMediaMode={setMediaMode}
                formatTime={formatTime}
            />

            {/* Add Product FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsAddProductModalVisible(true)}
            >
                <Ionicons name="add" size={50} color="#FFF" />
            </TouchableOpacity>

            {/* Menu Options Modal */}
            <MenuModal
                isVisible={isMenuVisible}
                onClose={() => setIsMenuVisible(false)}
                menuOptions={menuOptions}
            />
        </View>
    );
};

export default ProductCatalogue;