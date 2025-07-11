import React, { useRef, useEffect, useCallback } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../style';

const ImageThumbnails = ({ images, currentImageIndex, onImageSelect }) => {
    const thumbnailFlatListRef = useRef(null);

    const scrollToThumbnail = useCallback((index) => {
        if (thumbnailFlatListRef.current && index >= 0 && index < images.length) {
            // Utiliser un timeout pour s'assurer que le composant est monté
            setTimeout(() => {
                try {
                    thumbnailFlatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.5, // Centre la vignette
                    });
                } catch (error) {
                    // Fallback: utiliser scrollToOffset si scrollToIndex échoue
                    console.warn('ScrollToIndex failed, using scrollToOffset:', error);
                    const thumbnailWidth = 80; // Largeur approximative d'une vignette
                    const offset = index * thumbnailWidth;
                    thumbnailFlatListRef.current?.scrollToOffset({
                        offset,
                        animated: true,
                    });
                }
            }, 100);
        }
    }, [images.length]);

    useEffect(() => {
        if (currentImageIndex >= 0 && currentImageIndex < images.length) {
            scrollToThumbnail(currentImageIndex);
        }
    }, [currentImageIndex, scrollToThumbnail]);

    const handleThumbnailPress = useCallback((index) => {
        if (index >= 0 && index < images.length && index !== currentImageIndex) {
            onImageSelect?.(index);
        }
    }, [currentImageIndex, images.length, onImageSelect]);

    const renderThumbnail = useCallback(({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleThumbnailPress(index)}
            style={[
                styles.thumbnailImageWrapper,
                index === currentImageIndex && styles.selectedThumbnail
            ]}
            activeOpacity={0.7}
        >
            <Image
                source={item}
                style={styles.thumbnailImage}
                resizeMode="cover"
            />
        </TouchableOpacity>
    ), [currentImageIndex, handleThumbnailPress]);

    const getItemLayout = useCallback((_, index) => ({
        length: 80, // Largeur fixe de la vignette
        offset: 80 * index,
        index,
    }), []);

    const handleScrollToIndexFailed = useCallback((info) => {
        console.warn('Could not scroll to thumbnail index', info.index);
        // Essayer avec un délai plus long
        setTimeout(() => {
            const targetIndex = Math.min(info.index, images.length - 1);
            if (thumbnailFlatListRef.current && targetIndex >= 0) {
                thumbnailFlatListRef.current.scrollToOffset({
                    offset: targetIndex * 80,
                    animated: true,
                });
            }
        }, 200);
    }, [images.length]);

    if (!images || images.length <= 1) {
        return null;
    }

    return (
        <View style={styles.thumbnailContainer}>
            <FlatList
                ref={thumbnailFlatListRef}
                data={images}
                renderItem={renderThumbnail}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => `thumbnail-${index}`}
                contentContainerStyle={styles.thumbnailListContainer}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={handleScrollToIndexFailed}
                // Optimisations
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={10}
                removeClippedSubviews={true}
                bounces={true}
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default ImageThumbnails;