import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { parseDisplayFormat, toDisplayFormat } from '../utils/formatters';

export const usePosts = (dummyData1, dummyData2) => {
  const [currentUsername, setCurrentUsername] = useState(dummyData1[0]?.username || 'User');
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  
  // Utilisons useMemo pour ne recalculer que lorsque dummyData1 ou dummyData2 change
  const initialPosts = useMemo(() => {
    const getCombinedPosts = () => {
      // Filter posted products from dummyData2
      const postedProducts = dummyData2.filter(product => product.isPosted).map(product => ({
        id: `posted-${product.id}`,
        username: product.username || 'Store Owner',
        userImage: product.userImage || require('../../../../assets/default.png'),
        video: product.option1 || require('../../../../assets/default.png'),
        likes: '0',
        comments: '0',
        description: product.description,
        serviceType: product.type === 'tangible' ? 'Product' : 'Service',
        price: product.price,
        rating: product.rating,
        trips: product.trips,
        isLiked: false,
        rawLikes: 0
      }));

      // Combine with dummyData1
      return [...dummyData1, ...postedProducts];
    };

    const combinedPosts = getCombinedPosts();
    return combinedPosts.map(post => ({
      ...post,
      isLiked: false,
      rawLikes: parseDisplayFormat(post.likes),
      likes: toDisplayFormat(parseDisplayFormat(post.likes))
    }));
  }, [dummyData1, dummyData2]);

  // Utilisons useState avec une fonction pour initialiser une seule fois
  const [posts, setPosts] = useState(initialPosts);

  // Mettons à jour les posts uniquement si dummyData2 change
  // (cela indique que des produits ont été postés/dépostés)
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // Mémorisons cette fonction pour éviter les rendus inutiles
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const currentPost = viewableItems[0].item;
      if (currentPost && currentPost.username) {
        setCurrentUsername(currentPost.username);
      }
    }
  }, []);

  // Mémorisons cette configuration
  const viewabilityConfig = useMemo(() => ({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100
  }), []);

  return {
    posts,
    setPosts,
    currentUsername,
    scrollY,
    flatListRef,
    onViewableItemsChanged,
    viewabilityConfig
  };
};