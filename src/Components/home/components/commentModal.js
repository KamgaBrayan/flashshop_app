import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import { formatNumber, parseNumber } from '../utils/formatters';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const CommentModal = ({ visible, onClose, postId, username, onCommentAdded }) => {
  const navigation = useNavigation()
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState(new Set());
  const slideAnim = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const flatListRef = useRef(null);
  const {isAuthenticated} = useAuth() || {};

  // Garder en mémoire les commentaires de chaque post
  const commentsRef = useRef({});

  // Les commentaires par défaut pour un nouveau post
  const defaultComments = [
    {
      id: '1',
      username: 'sarah_j',
      comment: 'This is exactly what I was looking for! The service looks amazing 😍',
      time: '2m ago',
      likesCount: 24,
      isLiked: false,
      avatar: require('../../../../assets/utilities/avatar.png'),
      replies: [
        {
          id: '1.1',
          username: 'mike_design',
          comment: 'Yes, their service is top notch! 👌',
          time: '1m ago',
          likesCount: 5,
          isLiked: false,
          avatar: require('../../../../assets/services/simple_driver/driver.jpg'),
          replyingTo: 'sarah_j'
        }
      ]
    },
    {
      id: '2',
      username: 'mike_design',
      comment: 'Great attention to detail. I would definitely book this!',
      time: '15m ago',
      likesCount: 18,
      isLiked: false,
      avatar: require('../../../../assets/services/simple_driver/driver.jpg'),
      replies: []
    },
  ];

  // État local des commentaires
  const [comments, setComments] = useState(defaultComments);

  // Charger les commentaires depuis AsyncStorage au démarrage
  useEffect(() => {
    loadStoredComments();
  }, []);

  // Sauvegarder les commentaires dans AsyncStorage quand ils changent
  useEffect(() => {
    if (postId) {
      saveComments();
      // Notifier le parent du nouveau nombre de commentaires
      const totalComments = comments.reduce((total, comment) => {
        return total + 1 + comment.replies.length;
      }, 0);
      if (onCommentAdded) {
        onCommentAdded(postId, totalComments);
      }
    }
  }, [comments, postId]);

  const loadStoredComments = async () => {
    try {
      const storedComments = await AsyncStorage.getItem('comments');
      if (storedComments) {
        commentsRef.current = JSON.parse(storedComments);
        if (postId && commentsRef.current[postId]) {
          setComments(commentsRef.current[postId]);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

  const saveComments = async () => {
    try {
      commentsRef.current[postId] = comments;
      await AsyncStorage.setItem('comments', JSON.stringify(commentsRef.current));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commentaires:', error);
    }
  };

  // Charger les commentaires spécifiques au post quand il change
  useEffect(() => {
    if (postId) {
      if (commentsRef.current[postId]) {
        setComments(commentsRef.current[postId]);
      } else {
        commentsRef.current[postId] = defaultComments;
        setComments(defaultComments);
      }
    }
  }, [postId]);

  useEffect(() => {
    if (visible) {
      // Reset position avant l'animation
      slideAnim.setValue(WINDOW_HEIGHT);
      fadeAnim.setValue(0);

      // Animer l'apparition
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 0.8,
          stiffness: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: WINDOW_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      setReplyTo(null);
    }
  }, [visible]);

  const handleCommentLike = (commentId, isReply = false, parentId = null) => {
    if (!isAuthenticated) {
      onClose();
      navigation.navigate('SignIn');
      return;
    }

    setComments(prevComments => {
      return prevComments.map(comment => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                const newIsLiked = !reply.isLiked;
                const currentLikes = parseNumber(reply.likesCount);
                const newLikes = currentLikes + (newIsLiked ? 1 : -1);
                return {
                  ...reply,
                  isLiked: newIsLiked,
                  likesCount: Math.max(0, newLikes)
                };
              }
              return reply;
            })
          };
        }
        if (!isReply && comment.id === commentId) {
          const newIsLiked = !comment.isLiked;
          const currentLikes = parseNumber(comment.likesCount);
          const newLikes = currentLikes + (newIsLiked ? 1 : -1);
          return {
            ...comment,
            isLiked: newIsLiked,
            likesCount: Math.max(0, newLikes)
          };
        }
        return comment;
      });
    });
  };

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      onClose();
      navigation.navigate('SignIn');
      return;
    }

    if (comment.trim()) {
      if (replyTo) {
        // Remove the @username from the start of the comment
        const actualComment = comment.replace(`@${replyTo.username} `, '').trim();
        if (!actualComment) return;

        // Add reply to the comment
        setComments(prevComments => {
          return prevComments.map(c => {
            // Si on répond à une réponse, on doit trouver le commentaire parent
            if (replyTo.parentId) {
              if (c.id === replyTo.parentId) {
                return {
                  ...c,
                  replies: [
                    {
                      id: `${c.id}.${c.replies.length + 1}`,
                      username: username,
                      comment: actualComment,
                      time: 'Just now',
                      likesCount: 0,
                      isLiked: false,
                      avatar: require('../../../../assets/utilities/avatar.png'),
                      replyingTo: replyTo.username
                    },
                    ...c.replies
                  ]
                };
              }
            } else if (c.id === replyTo.id) {
              // Réponse directe à un commentaire principal
              return {
                ...c,
                replies: [
                  {
                    id: `${c.id}.${c.replies.length + 1}`,
                    username: username,
                    comment: actualComment,
                    time: 'Just now',
                    likesCount: 0,
                    isLiked: false,
                    avatar: require('../../../../assets/utilities/avatar.png'),
                    replyingTo: replyTo.username
                  },
                  ...c.replies
                ]
              };
            }
            return c;
          });
        });
        setReplyTo(null);
      } else {
        // Add new main comment
        const newComment = {
          id: (comments.length + 1).toString(),
          username: username,
          comment: comment.trim(),
          time: 'Just now',
          likesCount: 0,
          isLiked: false,
          avatar: require('../../../../assets/utilities/avatar.png'),
          replies: []
        };
        setComments(prev => [newComment, ...prev]);
      }
      setComment('');
      Keyboard.dismiss();
    }
  };

  const handleReply = (comment, parentId = null) => {
    if (!isAuthenticated) {
      onClose();
      navigation.navigate('SignIn');
      return;
    }

    setReplyTo({
      ...comment,
      parentId: parentId
    });
    setComment(`@${comment.username} `);
    inputRef.current?.focus();
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const toggleReplies = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const renderReply = ({ item, parentId, parentUsername }) => (
      <View style={styles.replyItem}>
        <View style={styles.replyMainContent}>
          <Image source={item.avatar} style={styles.replyAvatar} />
          <View style={styles.replyContent}>
            <View style={styles.replyHeader}>
              <Text style={styles.replyUsername}>@{item.username}</Text>
              <Text style={styles.replyTime}>{item.time}</Text>
            </View>
            <View style={styles.replyTextContainer}>
              <Text style={styles.replyingTo}>@{item.replyingTo || parentUsername} </Text>
              <Text style={styles.replyText}>{item.comment}</Text>
            </View>
            <TouchableOpacity
                style={styles.replyButton}
                onPress={() => handleReply(item, parentId)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.likeContainer}>
          <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleCommentLike(item.id, true, parentId)}
          >
            <Ionicons
                name={item.isLiked ? "heart" : "heart-outline"}
                size={16}
                color={item.isLiked ? "#FF2D55" : "#8B4513"}
            />
            <Text style={styles.replyLikeCount}>{formatNumber(item.likesCount)}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

  const renderComment = ({ item }) => (
      <View style={styles.commentItem}>
        <View style={styles.commentMainContent}>
          <Image source={item.avatar} style={styles.commentAvatar} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUsername}>@{item.username}</Text>
              <Text style={styles.commentTime}>{item.time}</Text>
            </View>
            <Text style={styles.commentText}>{item.comment}</Text>
            <TouchableOpacity
                style={styles.replyButton}
                onPress={() => handleReply(item)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.likeContainer}>
          <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleCommentLike(item.id)}
          >
            <Ionicons
                name={item.isLiked ? "heart" : "heart-outline"}
                size={18}
                color={item.isLiked ? "#FF2D55" : "#8B4513"}
            />
            <Text style={styles.likeCount}>{formatNumber(item.likesCount)}</Text>
          </TouchableOpacity>
        </View>
        {item.replies.length > 0 && (
            <View style={styles.repliesSection}>
              <TouchableOpacity
                  style={styles.viewRepliesButton}
                  onPress={() => toggleReplies(item.id)}
              >
                <Text style={styles.viewRepliesText}>
                  {expandedComments.has(item.id)
                      ? "Masquer les réponses"
                      : `Voir les ${item.replies.length} réponse${item.replies.length > 1 ? 's' : ''}`
                  }
                </Text>
                <Ionicons
                    name={expandedComments.has(item.id) ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#8B4513"
                />
              </TouchableOpacity>
              {expandedComments.has(item.id) && (
                  <View style={styles.repliesContainer}>
                    {item.replies.map(reply => (
                        <View key={reply.id} style={styles.repliesContainer}>
                          {renderReply({ item: reply, parentId: item.id, parentUsername: item.username })}
                        </View>
                    ))}
                  </View>
              )}
            </View>
        )}
      </View>
  );

  // Calculer le nombre total de commentaires (commentaires + réponses)
  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
      <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
              display: visible ? 'flex' : 'none',
            },
          ]}
      >
        <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
        />

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
        >
          <Animated.View
              style={[
                styles.modal,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
          >
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Comments</Text>
                <Text style={styles.commentCount}>{formatNumber(totalComments)}</Text>
              </View>
              <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={comments}
                renderItem={renderComment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.commentsList}
                showsVerticalScrollIndicator={false}
                inverted
            />

            <View style={styles.inputContainer}>
              {replyTo && (
                  <View style={styles.replyingToContainer}>
                    <Text style={styles.replyingToText}>
                      Replying to <Text style={styles.replyingToUsername}>@{replyTo.username}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => setReplyTo(null)}>
                      <Ionicons name="close-circle" size={20} color="#8B4513" />
                    </TouchableOpacity>
                  </View>
              )}

              {isAuthenticated ? (
                  <View style={styles.inputWrapper}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder={replyTo ? `Reply to @${replyTo.username}...` : "Add a comment..."}
                        placeholderTextColor="rgba(139, 69, 19, 0.5)"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                        maxLength={500}
                    />
                    <TouchableOpacity
                        style={[
                          styles.sendButton,
                          { opacity: comment.trim() ? 1 : 0.5 },
                        ]}
                        onPress={handleSubmitComment}
                        disabled={!comment.trim()}
                    >
                      <Ionicons name="send" size={18} color="#8B4513" />
                    </TouchableOpacity>
                  </View>
              ) : (
                  <TouchableOpacity
                      style={styles.loginPromptContainer}
                      onPress={() => {
                        onClose();
                        navigation.navigate('SignIn');
                      }}
                  >
                    <Text style={styles.loginPromptText}>
                      Log in to add a comment
                    </Text>
                    <Ionicons name="log-in-outline" size={18} color="#8B4513" />
                  </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
  );
};

// Styles identiques à l'original
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: WINDOW_HEIGHT * 0.75,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 69, 19, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginRight: 8,
  },
  commentCount: {
    fontSize: 16,
    color: 'rgba(139, 69, 19, 0.6)',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
  },
  commentsList: {
    padding: 16,
  },
  commentItem: {
    marginBottom: 20,
    width: '100%',
  },
  commentMainContent: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 40,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  likeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    alignItems: 'center',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B4513',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: 'rgba(139, 69, 19, 0.5)',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  likeButton: {
    alignItems: 'center',
  },
  likeCount: {
    marginTop: 4,
    fontSize: 13,
    color: '#8B4513',
    textAlign: 'center',
  },
  replyButton: {
    marginTop: 4,
  },
  replyButtonText: {
    fontSize: 13,
    color: 'rgba(139, 69, 19, 0.6)',
  },
  repliesSection: {
    marginLeft: 52,
    marginTop: 8,
  },
  viewRepliesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewRepliesText: {
    color: '#8B4513',
    fontSize: 13,
    marginRight: 4,
  },
  repliesContainer: {
    marginTop: 8,
    width: '100%',
  },
  replyItem: {
    marginBottom: 12,
    width: '100%',
  },
  replyMainContent: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 40,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  replyUsername: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B4513',
    marginRight: 8,
  },
  replyTime: {
    fontSize: 11,
    color: 'rgba(139, 69, 19, 0.5)',
  },
  replyTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  replyingTo: {
    fontSize: 13,
    color: '#8B4513',
    fontWeight: '600',
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#333',
    flex: 1,
  },
  replyLikeCount: {
    marginTop: 4,
    fontSize: 12,
    color: '#8B4513',
    textAlign: 'center',
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 69, 19, 0.1)',
    backgroundColor: '#FFF',
  },
  replyingToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  replyingToText: {
    fontSize: 13,
    color: 'rgba(139, 69, 19, 0.6)',
  },
  replyingToUsername: {
    color: '#8B4513',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#8B4513',
    paddingRight: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    borderRadius: 20,
  },
  loginPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loginPromptText: {
    fontSize: 15,
    color: '#8B4513',
    fontWeight: '500',
    marginRight: 8,
  }
});

export default CommentModal;