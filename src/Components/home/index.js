import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    FlatList,
    Dimensions,
    Animated,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Local imports
import CommentModal from './components/commentModal';
import NotificationBar from '../Products/productDetails/NotificationBar';
import styles from './style';
import { useCart } from '../../context/cartContext';
import { useSharedPosts } from '../../context/postContext/sharedPostsContext';
import { useAuth } from '../../context/authContext/authContext';

// Components
import Header from './components/Header';
import BottomTabs from './components/BottomTabs';
import Post from './components/Post';

// Hooks
import { useResponsiveStyles } from './hooks/useResponsiveStyles';
import { usePostInteractions } from './hooks/usePostInteractions';
import { useVideoPlayback } from './hooks/useVideoPlayback';
import { useLikeSystem } from './hooks/useLikeSystem';

// Utils
import { formatNumber, parseNumber, toDisplayFormat, parseDisplayFormat } from './utils/formatters';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const { cartItems, addToCart, showNotification, notificationMessage } = useCart();
    const { user, organization, isProducer } = useAuth() || {};

    // Contexte des posts partagés
    const sharedPostsContext = useSharedPosts();
    const feedPosts = sharedPostsContext?.feedPosts || [];

    // États locaux
    const [posts, setPosts] = useState([]);
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

    // Système de likes TikTok-like
    const {
        userLikes,
        hasUserLiked,
        handleLike,
        scaleValue: likeScaleValue,
        initializeUserLikes,
        setUserLikes,
        updatePostsWithUserLikes
    } = useLikeSystem(user, setPosts);

    // Nom d'utilisateur depuis l'authentification
    const currentUsername = user?.username || user?.first_name || 'FlashShop';

    // Références pour FlatList et animations
    const flatListRef = React.useRef(null);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    // Hooks personnalisés
    const { getResponsiveStyles } = useResponsiveStyles();
    const {
        selectedPost,
        showComments,
        setShowComments,
        handleDoubleTap,
        handleCommentsPress
    } = usePostInteractions(setPosts);

    const {
        currentVideoIndex,
        setCurrentVideoIndex,
        playingVideos,
        registerVideoRef,
        handleVideoVisibilityChange,
        isVideoFile,
        getVisibleVideoIndex,
        cleanupAllVideos
    } = useVideoPlayback();

    // Arrêter toutes les vidéos quand on quitte le composant Home ou qu'on perd le focus
    useEffect(() => {
        return () => {
            if (cleanupAllVideos) {
                cleanupAllVideos();
            }
        };
    }, [cleanupAllVideos]);

    // Arrêter les vidéos quand on perd le focus de l'écran (navigation)
    useFocusEffect(
        useCallback(() => {
            return () => {
                // Cette fonction est appelée quand on quitte l'écran
                if (cleanupAllVideos) {
                    cleanupAllVideos();
                }
            };
        }, [cleanupAllVideos])
    );

    // Mettre à jour les posts locaux avec formatage correct et likes (optimisé)
    useEffect(() => {
        if (feedPosts && Array.isArray(feedPosts) && feedPosts.length > 0) {
            const formattedPosts = feedPosts.map(post => ({
                ...post,
                likes: formatNumber(post.rawLikes || parseDisplayFormat(post.likes) || 0),
                comments: formatNumber(post.rawComments || parseDisplayFormat(post.comments) || 0),
                rawLikes: post.rawLikes || parseDisplayFormat(post.likes) || 0,
                rawComments: post.rawComments || parseDisplayFormat(post.comments) || 0
            }));

            setPosts(formattedPosts);
        }
    }, [feedPosts]);

    // Initialiser les likes séparément pour éviter les boucles
    useEffect(() => {
        if (posts.length > 0 && user) {
            initializeUserLikes(posts);
        }
    }, [posts.length, user?.id, user?.username]); // Dépendances spécifiques

    // Gérer les changements de visibilité des éléments
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            const currentItem = viewableItems[0];
            const newIndex = currentItem.index || 0;
            const postId = currentItem.item?.id;

            if (newIndex !== currentVisibleIndex) {
                setCurrentVisibleIndex(newIndex);
                setCurrentVideoIndex(newIndex);

                // Gérer la lecture automatique des vidéos
                if (postId) {
                    handleVideoVisibilityChange(postId, posts);
                }
            }
        }
    }, [currentVisibleIndex, setCurrentVideoIndex, handleVideoVisibilityChange, posts]);

    // Configuration pour FlatList
    const viewabilityConfig = useMemo(() => ({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 300,
        waitForInteraction: false
    }), []);

    // Gérer le scroll pour la gestion des vidéos
    const handleScroll = useCallback((event) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const newIndex = getVisibleVideoIndex(scrollOffset, posts);

        if (newIndex !== currentVideoIndex) {
            setCurrentVideoIndex(newIndex);
            const visiblePost = posts[newIndex];
            if (visiblePost) {
                handleVideoVisibilityChange(visiblePost.id, posts);
            }
        }
    }, [getVisibleVideoIndex, posts, currentVideoIndex, setCurrentVideoIndex, handleVideoVisibilityChange]);

    // Navigation handlers
    const handleProductDetails = (item) => {
        navigation.navigate('ProductDetails', {
            productId: item.id,
            product: item
        });
    };

    const handleSearch = () => navigation.navigate('Search');
    const handleCart = () => navigation.navigate('Cart');
    const handleProfile = () => navigation.navigate('profile');
    const handleChat = () => navigation.navigate('Conversation');
    
    const handlePC = () => { // "PC" signifie "Producer Catalogue"
        console.log('Producer button pressed. Is producer:', isProducer);
        if (isProducer && organization) {
          // Si l'utilisateur est déjà un producteur, on l'envoie à son catalogue
          navigation.navigate('PC');
        } else {
          // Sinon, on l'envoie vers l'écran de création d'organisation
          // Nous nommerons cette nouvelle route 'CreateOrganization'
          navigation.navigate('CreateOrganization');
        }
    };
    
    const handleCPC = (item) => navigation.navigate('CPC', { username: item.username });

    // Fonction pour mettre à jour le compteur de commentaires
    const handleCommentAdded = (postId, newCommentCount) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        rawComments: newCommentCount,
                        comments: formatNumber(newCommentCount)
                    }
                    : post
            )
        );
    };

    // Fonction de like avec formatage
    const handleLikeWithContext = (itemId) => {
        if (!user) {
            navigation.navigate('SignIn');
            return;
        }
    
        // Le hook gère tout : animation, état local, mise à jour des posts
       handleLike(itemId);
    };

    // Fonction pour gérer les commentaires
    const handleCommentsWithFormatting = (post, commentCallback) => {
        if (!post) return;

        const formattedPost = {
            ...post,
            comments: formatNumber(post.rawComments || parseDisplayFormat(post.comments) || 0),
            rawComments: post.rawComments || parseDisplayFormat(post.comments) || 0
        };

        handleCommentsPress(formattedPost);
    };

    // FlatList animée
    const AnimatedFlatList = useMemo(() => {
        return Animated.createAnimatedComponent(FlatList);
    }, []);

    // Configuration de la barre de statut
    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
    }, []);

    // Fonction pour générer une clé unique
    const getItemKey = (item, index) => `post-${item.id}-${index}`;

    return (
        <SafeAreaView style={[styles.container, getResponsiveStyles().container]}>
            <StatusBar barStyle="light-content" />

            <NotificationBar
                message={notificationMessage}
                visible={showNotification}
            />

            <Header
                currentUsername={currentUsername}
                onSearchPress={handleSearch}
                navigation={navigation}
            />

            {/* Main Content - Posts avec gestion vidéo automatique */}
            <AnimatedFlatList
                ref={flatListRef}
                data={posts}
                renderItem={({ item, index }) => (
                    <Post
                        key={getItemKey(item, index)}
                        item={item}
                        onDoubleTap={handleDoubleTap}
                        onLike={handleLikeWithContext}
                        onCommentPress={handleCommentsWithFormatting}
                        onProfilePress={handleCPC}
                        onProductDetails={handleProductDetails}
                        onAddToCart={addToCart}
                        onCommentAdded={handleCommentAdded}
                        scaleValue={likeScaleValue}
                        responsiveStyles={getResponsiveStyles()}
                        isVisible={index === currentVisibleIndex}
                        onVideoRef={registerVideoRef}
                        isVideoPlaying={playingVideos.has(item.id)}
                    />
                )}
                keyExtractor={(item, index) => getItemKey(item, index)}
                pagingEnabled
                snapToInterval={SCREEN_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: false,
                        listener: handleScroll
                    }
                )}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                windowSize={5}
                initialNumToRender={2}
                getItemLayout={(data, index) => ({
                    length: SCREEN_HEIGHT,
                    offset: SCREEN_HEIGHT * index,
                    index,
                })}
            />

            <BottomTabs
                cartItems={cartItems}
                onCartPress={handleCart}
                onAddPress={handlePC}
                onChatPress={handleChat}
                onProfilePress={handleProfile}
            />

            <CommentModal
                visible={showComments}
                onClose={() => setShowComments(false)}
                postId={selectedPost?.id}
                username={currentUsername}
                onCommentAdded={handleCommentAdded}
            />
        </SafeAreaView>
    );
};

export default Home;