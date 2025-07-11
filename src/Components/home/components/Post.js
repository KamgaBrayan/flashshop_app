import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import DescriptionComponent from '../../../reusableComponents/descriptionSection/descriptionSection';
import ProductDetailsButton from './productDetails';
import ActionButtons from './ActionButtons';
import styles from '../style';
import { getImageSource } from '../utils/formatters';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const Post = ({
                  item,
                  onDoubleTap,
                  onLike,
                  onCommentPress,
                  onProfilePress,
                  onProductDetails,
                  onAddToCart,
                  scaleValue,
                  responsiveStyles,
                  onCommentAdded,
                  isVisible,
                  onVideoRef,
                  isVideoPlaying,
                  onVideoPlaybackStatusUpdate
              }) => {
    const videoRef = useRef(null);
    const lastTap = useRef(null);
    const spinValue = useRef(new Animated.Value(0)).current;

    // États pour la gestion vidéo
    const [videoStatus, setVideoStatus] = useState({});
    const [isBuffering, setIsBuffering] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showHeartAnimation, setShowHeartAnimation] = useState(false);

    // Animation du spinner de loading
    const startSpinAnimation = useCallback(() => {
        spinValue.setValue(0);
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const stopSpinAnimation = useCallback(() => {
        spinValue.stopAnimation();
    }, [spinValue]);

    // Enregistrer la référence vidéo auprès du parent
    useEffect(() => {
        if (videoRef.current && onVideoRef) {
            onVideoRef(item.id, videoRef);
        }
    }, [item.id, onVideoRef]);

    // Fonction pour déterminer si c'est une vidéo
    const isVideo = useCallback((mediaSource) => {
        if (!mediaSource) return false;

        if (typeof mediaSource === 'string') {
            const lowerSource = mediaSource.toLowerCase();
            return lowerSource.includes('.mp4') ||
                lowerSource.includes('.mov') ||
                lowerSource.includes('.avi') ||
                lowerSource.includes('.mkv') ||
                lowerSource.includes('.webm') ||
                lowerSource.includes('.m4v') ||
                lowerSource.includes('video');
        }

        if (typeof mediaSource === 'object' && mediaSource.type) {
            return mediaSource.type === 'video';
        }

        return false;
    }, []);

    // Gérer le statut de lecture de la vidéo
    const handlePlaybackStatusUpdate = useCallback((status) => {
        setVideoStatus(status);

        if (status.isLoaded) {
            const wasBuffering = isBuffering;
            setIsBuffering(status.isBuffering);

            // Gérer les animations de chargement
            if (status.isBuffering && !wasBuffering) {
                startSpinAnimation();
            } else if (!status.isBuffering && wasBuffering) {
                stopSpinAnimation();
            }
        }

        // Notifier le parent du changement de statut
        if (onVideoPlaybackStatusUpdate) {
            onVideoPlaybackStatusUpdate(item.id, status);
        }
    }, [isBuffering, item.id, onVideoPlaybackStatusUpdate, startSpinAnimation, stopSpinAnimation]);

    // Basculer le son
    const toggleMute = useCallback(async () => {
        if (videoRef.current && videoStatus.isLoaded) {
            try {
                const newMutedState = !isMuted;
                await videoRef.current.setIsMutedAsync(newMutedState);
                setIsMuted(newMutedState);
            } catch (error) {
                console.log('Erreur lors du contrôle du son:', error);
            }
        }
    }, [isMuted, videoStatus]);

    // Gérer le double tap pour like
    const handleDoubleTap = useCallback(() => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
            lastTap.current = null;

            // Déclencher le like
            onLike(item.id);

            // Animation du coeur
            setShowHeartAnimation(true);

            // Masquer l'animation après 600ms
            setTimeout(() => {
                setShowHeartAnimation(false);
            }, 600);
        } else {
            lastTap.current = now;
        }
    }, [onLike, item.id]);

    // Animation du coeur
    const heartScale = useRef(new Animated.Value(0)).current;
    const heartOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showHeartAnimation) {
            // Reset
            heartScale.setValue(0);
            heartOpacity.setValue(1);

            // Animation
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(heartScale, {
                        toValue: 1.2,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heartScale, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.delay(150),
                    Animated.timing(heartOpacity, {
                        toValue: 0,
                        duration: 350,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        }
    }, [showHeartAnimation, heartScale, heartOpacity]);

    // Rotation pour le spinner
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Gérer les commentaires avec mise à jour du compteur
    const handleCommentPress = useCallback(() => {
        onCommentPress(item, (postId, newCommentCount) => {
            if (onCommentAdded) {
                onCommentAdded(postId, newCommentCount);
            }
        });
    }, [onCommentPress, item, onCommentAdded]);

    // Fonction pour rendre le média (image ou vidéo)
    const renderMedia = () => {
        const mediaSource = item.video || item.option1;

        if (isVideo(mediaSource)) {
            return (
                <View style={styles.videoContainer}>
                    <Video
                        ref={videoRef}
                        source={getImageSource(mediaSource)}
                        style={styles.postVideo}
                        useNativeControls={false}
                        resizeMode="cover"
                        shouldPlay={isVisible && isVideoPlaying}
                        isLooping={true}
                        isMuted={!isVisible || isMuted}
                        volume={isVisible && !isMuted ? 1.0 : 0.0}
                        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                        onError={(error) => {
                            console.log('Erreur vidéo:', error);
                        }}
                    />

                    {/* Overlay pour double tap uniquement */}
                    <TouchableOpacity
                        style={styles.videoOverlay}
                        onPress={handleDoubleTap}
                        activeOpacity={1}
                    />

                    {/* Animation du coeur pour le like */}
                    {showHeartAnimation && (
                        <Animated.View
                            style={[
                                styles.heartAnimation,
                                {
                                    transform: [{ scale: heartScale }],
                                    opacity: heartOpacity,
                                }
                            ]}
                        >
                            <Ionicons
                                name="heart"
                                size={60}
                                color="#FF2D55"
                                style={styles.heartIcon}
                            />
                        </Animated.View>
                    )}

                    {/* Pas de chargement visible sur TikTok dans le feed */}

                    {/* Pas d'indicateurs visuels sur TikTok dans le feed */}
                </View>
            );
        } else {
            // Rendu d'image
            return (
                <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
                    <Image
                        source={getImageSource(mediaSource)}
                        style={styles.postVideo}
                        resizeMode="cover"
                    />

                    {/* Animation du coeur pour les images aussi */}
                    {showHeartAnimation && (
                        <Animated.View
                            style={[
                                styles.heartAnimation,
                                {
                                    transform: [{ scale: heartScale }],
                                    opacity: heartOpacity,
                                }
                            ]}
                        >
                            <Ionicons
                                name="heart"
                                size={60}
                                color="#FF2D55"
                                style={styles.heartIcon}
                            />
                        </Animated.View>
                    )}
                </TouchableOpacity>
            );
        }
    };

    if (!item) {
        return null;
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.imageContainer}>
                {renderMedia()}
            </View>

            {/* Overlay Gradient */}
            <View style={styles.overlay} />

            {/* Right side buttons */}
            <ActionButtons
                item={item}
                onProfilePress={onProfilePress}
                onLikePress={onLike}
                onCommentPress={handleCommentPress}
                onAddToCart={onAddToCart}
                scaleValue={scaleValue}
            />

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>@{item.username || 'User'}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.rating}>{item.rating || '4.5'}</Text>
                        <Text style={styles.trips}>• {item.trips || 'Service'}</Text>

                        <ProductDetailsButton
                            onPress={() => onProductDetails(item)}
                        />
                    </View>

                    <DescriptionComponent
                        description={item.description || ''}
                        username={item.username || 'User'}
                    />
                </View>

                <View style={styles.serviceInfo}>
                    <View style={styles.serviceType}>
                        <Text style={styles.serviceTypeText}>{item.serviceType || item.type || 'Service'}</Text>
                    </View>
                    <Text style={styles.price}>{item.price || '0'} FCFA</Text>
                </View>
            </View>
        </View>
    );
};

export default Post;