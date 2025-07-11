import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const useVideoPlayback = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [playingVideos, setPlayingVideos] = useState(new Set());
    const videoRefs = useRef(new Map());

    // Enregistrer une référence vidéo (optimisé)
    const registerVideoRef = useCallback((postId, ref) => {
        if (ref) {
            videoRefs.current.set(postId, ref);
        } else {
            videoRefs.current.delete(postId);
        }
    }, []);

    // Arrêter toutes les vidéos de manière sécurisée (optimisé)
    const stopAllVideos = useCallback(async () => {
        try {
            const refs = Array.from(videoRefs.current.values());
            const stopPromises = refs.map(async (videoRef) => {
                try {
                    if (videoRef?.current) {
                        await videoRef.current.pauseAsync();
                    }
                } catch (error) {
                    // Ignorer les erreurs individuelles
                }
            });

            await Promise.allSettled(stopPromises);
            setPlayingVideos(new Set());
        } catch (error) {
            console.log('Error stopping videos:', error);
        }
    }, []);

    // Jouer une vidéo spécifique depuis le début (optimisé)
    const playVideo = useCallback(async (postId) => {
        try {
            const videoRef = videoRefs.current.get(postId);
            if (videoRef?.current) {
                await videoRef.current.setPositionAsync(0);
                await videoRef.current.playAsync();
                setPlayingVideos(prev => new Set([...prev, postId]));
            }
        } catch (error) {
            console.log('Error playing video:', error);
        }
    }, []);

    // Arrêter une vidéo spécifique (optimisé)
    const stopVideo = useCallback(async (postId) => {
        try {
            const videoRef = videoRefs.current.get(postId);
            if (videoRef?.current) {
                await videoRef.current.pauseAsync();
                setPlayingVideos(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(postId);
                    return newSet;
                });
            }
        } catch (error) {
            console.log('Error stopping video:', error);
        }
    }, []);

    // Fonction utilitaire pour détecter les vidéos (mémorisée)
    const isVideoFile = useMemo(() => (mediaSource) => {
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

        if (typeof mediaSource === 'object') {
            return mediaSource.type === 'video' ||
                mediaSource.mimeType?.startsWith('video/') ||
                (mediaSource.uri && isVideoFile(mediaSource.uri));
        }

        return false;
    }, []);

    // Gérer le changement de vidéo visible (optimisé avec debounce)
    const handleVideoVisibilityChange = useCallback(async (visiblePostId, allPosts) => {
        try {
            await stopAllVideos();

            if (visiblePostId && allPosts?.length > 0) {
                const visiblePost = allPosts.find(post => post.id === visiblePostId);
                if (visiblePost && isVideoFile(visiblePost.video || visiblePost.option1)) {
                    setTimeout(() => playVideo(visiblePostId), 300);
                }
            }
        } catch (error) {
            console.log('Error changing video visibility:', error);
        }
    }, [stopAllVideos, playVideo, isVideoFile]);

    // Calculer l'index de la vidéo visible basé sur le scroll (mémorisé)
    const getVisibleVideoIndex = useCallback((scrollOffset, posts) => {
        if (!posts?.length) return 0;
        const index = Math.round(scrollOffset / SCREEN_HEIGHT);
        return Math.max(0, Math.min(index, posts.length - 1));
    }, []);

    // Fonction de nettoyage complète (optimisée)
    const cleanupAllVideos = useCallback(() => {
        try {
            stopAllVideos();
            setTimeout(() => {
                videoRefs.current.clear();
            }, 100); // Petit délai pour s'assurer que l'arrêt est terminé
        } catch (error) {
            console.log('Cleanup error:', error);
        }
    }, [stopAllVideos]);

    // Nettoyage lors du démontage (optimisé)
    useEffect(() => {
        return () => {
            cleanupAllVideos();
        };
    }, []); // Pas de dépendances pour éviter les re-créations

    return {
        currentVideoIndex,
        setCurrentVideoIndex,
        playingVideos,
        registerVideoRef,
        handleVideoVisibilityChange,
        stopAllVideos,
        playVideo,
        stopVideo,
        isVideoFile,
        getVisibleVideoIndex,
        cleanupAllVideos,
        videoRefs: videoRefs.current
    };
};