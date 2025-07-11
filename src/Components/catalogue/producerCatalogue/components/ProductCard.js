import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const ProductCard = ({ item, onEditPress, onTogglePosted }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const renderMedia = () => {
        // Déterminer si c'est une vidéo ou une image
        const isVideo = item.mediaType === 'video' ||
            (typeof item.option1 === 'string' &&
                (item.option1.includes('.mp4') || item.option1.includes('.mov') || item.option1.includes('.avi')));

        if (isVideo) {
            return (
                <View style={styles.videoContainer}>
                    <Video
                        source={
                            typeof item.option1 === 'number'
                                ? item.option1
                                : { uri: item.option1 }
                        }
                        style={styles.productImage}
                        useNativeControls={false}
                        resizeMode="cover"
                        shouldPlay={false} // Pas de lecture automatique dans le catalogue
                        isLooping
                        isMuted={true} // Toujours muet dans le catalogue
                    />

                    {/* Indicateur vidéo TikTok-style : petit triangle en bas à droite */}
                    <View style={styles.videoIndicatorCatalog}>
                        <Ionicons name="play" size={12} color="white" />
                    </View>
                </View>
            );
        } else {
            return (
                <Image
                    source={
                        typeof item.option1 === 'number'
                            ? item.option1
                            : { uri: item.option1 }
                    }
                    style={styles.productImage}
                />
            );
        }
    };

    return (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => onEditPress(item)}
        >
            {renderMedia()}

            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price} FCFA</Text>

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{item.rating}</Text>
                    {item.type === 'tangible' ? (
                        <Text style={styles.stock}>• {item.stock || '0'} in stock</Text>
                    ) : (
                        <Text style={[
                            styles.availability,
                            { color: item.availability === 'Available' ? '#4CAF50' : '#FF6B6B' }
                        ]}>
                            • {item.availability || 'Not Available'}
                        </Text>
                    )}
                </View>

                <Text numberOfLines={2} style={styles.productDescription}>
                    {item.description}
                </Text>

                {/* Post Button */}
                <TouchableOpacity
                    style={[
                        styles.postButton,
                        {
                            backgroundColor: item.isPosted ? '#4CAF50' : '#8B4513',
                        }
                    ]}
                    onPress={() => onTogglePosted(item.id)}
                >
                    <Text style={styles.postButtonText}>
                        {item.isPosted ? 'Posted' : 'Post'}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;