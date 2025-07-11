import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { toDisplayFormat } from '../utils/formatters';

export const usePostInteractions = (setPosts) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const lastTap = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // Handle double tap for liking
  const handleDoubleTap = (id) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // Max time between taps to detect double tap
    
    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      lastTap.current = null; // Reset after detection
      handleLike(id); // Like the post
    } else {
      lastTap.current = now;
    }
  };

  // Handle like action with animation
  const handleLike = (postId) => {
    // Start like animation
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

    // Update posts state
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          const newRawLikes = post.rawLikes + (newIsLiked ? 1 : -1);
          
          return {
            ...post,
            isLiked: newIsLiked,
            rawLikes: newRawLikes,
            likes: toDisplayFormat(newRawLikes)
          };
        }
        return post;
      });
    });
  };

  // Handle comments modal
  const handleCommentsPress = (post) => {
    if (!post) return;
    
    // Ensure we have a valid post object with required properties
    const validPost = {
      id: post.id || Math.random().toString(),
      comments: post.comments || '0',
      username: post.username || 'Unknown',
      description: post.description || '',
      ...post
    };
    
    setSelectedPost(validPost);
    setShowComments(true);
  };

  return {
    scaleValue,
    selectedPost,
    showComments,
    setShowComments,
    handleDoubleTap,
    handleLike,
    handleCommentsPress
  };
};