import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';
import styles from '../style';

const ImageCarousel = ({ images, width, onImageChange }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const getImageIndex = useCallback((contentOffset) => {
        if (!contentOffset || !width) return 0;
        return Math.round(contentOffset.x / width);
    }, [width]);

    const handleScrollEnd = useCallback((event) => {
        if (!event?.nativeEvent?.contentOffset) return;

        const newIndex = getImageIndex(event.nativeEvent.contentOffset);

        if (newIndex >= 0 && newIndex < images.length && newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            onImageChange?.(newIndex);
        }

        setIsScrolling(false);
    }, [currentIndex, images.length, getImageIndex, onImageChange]);

    const scrollToIndex = useCallback((index) => {
        if (flatListRef.current && index >= 0 && index < images.length && !isScrolling) {
            setIsScrolling(true);
            flatListRef.current.scrollToOffset({
                offset: index * width,
                animated: true,
            });
            setCurrentIndex(index);
            onImageChange?.(index);
        }
    }, [images.length, width, isScrolling, onImageChange]);

    useEffect(() => {
        if (onImageChange) {
            onImageChange.scrollToIndex = scrollToIndex;
        }
    }, [scrollToIndex, onImageChange]);

    const getItemLayout = useCallback((_, index) => ({
        length: width,
        offset: width * index,
        index,
    }), [width]);

    const renderItem = useCallback(({ item, index }) => (
        <View style={{ width }}>
            <Image
                source={item}
                style={[styles.mainImage, { width }]}
                resizeMode="cover"
                fadeDuration={200}
            />
        </View>
    ), [width]);

    return (
        <View style={styles.imageCarouselContainer}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
                onScrollBeginDrag={() => setIsScrolling(true)}
                getItemLayout={getItemLayout}
                keyExtractor={(_, index) => `carousel-image-${index}`}
                // Optimisations pour les performances
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews={false}
                decelerationRate="fast"
                snapToAlignment="start"
                snapToInterval={width}
                // Désactiver le scroll vers l'infini
                bounces={false}
                overScrollMode="never"
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default ImageCarousel;