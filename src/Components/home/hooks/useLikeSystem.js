import { useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { toDisplayFormat } from '../utils/formatters';

export const useLikeSystem = (user, setPosts) => {
    const [userLikes, setUserLikes] = useState(new Set());
    const scaleValue = useMemo(() => new Animated.Value(1), []);

    // Mémoriser l'ID utilisateur pour éviter les re-calculs
    const userId = useMemo(() => user?.id || user?.username, [user?.id, user?.username]);

    // Générer une clé unique pour chaque like
    const generateLikeKey = useCallback((userId, postId) => {
        return `${userId}_${postId}`;
    }, []);

    // Vérifier si l'utilisateur a déjà liké ce post
    const hasUserLiked = useCallback((postId) => {
        if (!userId) return false;
        const likeKey = generateLikeKey(userId, postId);
        return userLikes.has(likeKey);
    }, [userId, userLikes, generateLikeKey]);

    // Animation du like
    const animateLike = useCallback(() => {
        Animated.sequence([
            Animated.spring(scaleValue, {
                toValue: 1.5,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            })
        ]).start();
    }, [scaleValue]);

    // Gérer le like/unlike - VERSION CORRIGÉE
    const handleLike = useCallback((postId) => {
        if (!userId) {
            return { success: false, reason: 'not_authenticated' };
        }

        const likeKey = generateLikeKey(userId, postId);
        const isCurrentlyLiked = userLikes.has(likeKey);

        // Animation du like
        animateLike();

        // Mise à jour immédiate de l'état des likes utilisateur
        if (isCurrentlyLiked) {
            // Unlike - retirer le like
            setUserLikes(prev => {
                const newSet = new Set(prev);
                newSet.delete(likeKey);
                return newSet;
            });
        } else {
            // Like - ajouter le like
            setUserLikes(prev => new Set([...prev, likeKey]));
        }

        // Mise à jour des posts avec le nouvel état
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                if (isCurrentlyLiked) {
                    // Unlike
                    const newRawLikes = Math.max(0, (post.rawLikes || 0) - 1);
                    return {
                        ...post,
                        rawLikes: newRawLikes,
                        likes: toDisplayFormat(newRawLikes),
                        isLiked: false
                    };
                } else {
                    // Like
                    const newRawLikes = (post.rawLikes || 0) + 1;
                    return {
                        ...post,
                        rawLikes: newRawLikes,
                        likes: toDisplayFormat(newRawLikes),
                        isLiked: true
                    };
                }
            }
            return post;
        }));

        return { 
            success: true, 
            action: isCurrentlyLiked ? 'unliked' : 'liked',
            newLikeState: !isCurrentlyLiked
        };
    }, [userId, userLikes, generateLikeKey, animateLike, setPosts]);

    // Initialiser les likes de l'utilisateur pour tous les posts (optimisé)
    const initializeUserLikes = useCallback((posts) => {
        if (!userId || !posts?.length) return;

        const userLikeKeys = new Set();
        posts.forEach(post => {
            if (post.isLiked) {
                const likeKey = generateLikeKey(userId, post.id);
                userLikeKeys.add(likeKey);
            }
        });

        // Seulement mettre à jour si c'est différent
        setUserLikes(prev => {
            if (prev.size !== userLikeKeys.size) return userLikeKeys;
            for (const key of userLikeKeys) {
                if (!prev.has(key)) return userLikeKeys;
            }
            return prev;
        });
    }, [userId, generateLikeKey]);

    // Mettre à jour l'état des posts avec les likes de l'utilisateur (optimisé)
    const updatePostsWithUserLikes = useCallback((posts) => {
        if (!posts?.length) return posts;

        return posts.map(post => ({
            ...post,
            isLiked: hasUserLiked(post.id)
        }));
    }, [hasUserLiked]);

    return {
        userLikes,
        hasUserLiked,
        handleLike,
        animateLike,
        scaleValue,
        initializeUserLikes,
        updatePostsWithUserLikes
    };
};