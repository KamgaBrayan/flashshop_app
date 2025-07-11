import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppHeader from '../../../reusableComponents/header';
import { styles } from './style';
import { useAuth } from '../../../context/authContext/authContext';
import snappyApiService from '../../../service/snappyApiService/snappyApiService';
import notificationService from '../../../service/notificationService';

const ConversationsScreen = () => {
  const navigation = useNavigation();
  const { user, snappyUser, isSnappyAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConversations = useCallback(async () => {
    // Check if user is authenticated and has required data
    if (!isSnappyAuthenticated || !snappyUser?.id) {
      console.warn("ConversationsScreen: Snappy user not authenticated or ID missing. Cannot fetch conversations.");
      setConversations([]);
      setFilteredConversations([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching conversations for user:', user.id);
      const fetchedConversations = await snappyApiService.getConversations(user.id);
      
      // Ensure we always have an array
      const conversationsArray = Array.isArray(fetchedConversations) ? fetchedConversations : [];
      
      setConversations(conversationsArray);
      setFilteredConversations(conversationsArray);
      
      if (conversationsArray.length === 0) {
        notificationService.showInfo("You don't have any conversations yet. Start a new chat!");
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError("Failed to load conversations.");
      setConversations([]);
      setFilteredConversations([]);
      
      // Show user-friendly error message
      if (err.message?.includes('Network Error')) {
        notificationService.showError("Network connection issue. Please check your internet connection and try again.");
      } else {
        notificationService.showError("Failed to load conversations. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isSnappyAuthenticated, snappyUser]);

  // Use useFocusEffect to reload data when screen becomes visible
  useFocusEffect(
    useCallback(() => {
      console.log("ConversationsScreen focused, fetching conversations...");
      fetchConversations();
      return () => {
        console.log("ConversationsScreen unfocused");
      };
    }, [fetchConversations])
  );

  const handleChat = (item) => {
    if (!snappyUser?.id) {
        notificationService.showError("Your user ID is missing. Cannot open chat.");
        return;
    }
    
    if (!item?.id) {
        notificationService.showError("Invalid conversation data. Cannot open chat.");
        return;
    }
    
    navigation.navigate('Chat', { 
        interlocutorId: item.id, 
        interlocutorName: item.name || 'Unknown User',
        interlocutorAvatar: item.avatar?.uri,
        currentSnappyUserId: snappyUser.id 
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
        navigation.goBack();
    } else {
        notificationService.showInfo("This is the main conversations screen.");
    }
  };

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv => 
        conv.name && conv.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [conversations]);
/*
  const handleNewChat = () => {
    notificationService.showInfo("New chat functionality coming soon!");
    // Example: navigation.navigate('NewChatScreen');
  };
*/

  const handleNewChat = () => {
    navigation.navigate('NewConversation');
  };

  const renderItem = ({ item }) => {
    // Ensure item has required properties
    if (!item || !item.id) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => handleChat(item)}
      >
        <View style={styles.avatarContainer}>
          <Image 
            source={item.avatar || { uri: 'https://via.placeholder.com/50' }} 
            style={styles.avatar} 
          />
          {item.online && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.conversationInfo}>
          <View style={styles.nameTimeRow}>
            <Text style={styles.name}>{item.name || 'Unknown User'}</Text>
            <Text style={styles.time}>{item.time || ''}</Text>
          </View>
          <View style={styles.messageRow}>
            <Text 
              style={styles.lastMessage} 
              numberOfLines={1}
            >
              {item.lastMessage || 'No messages yet'}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Show loading state only on first load
  if (isLoading && conversations.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>Loading conversations...</Text>
      </SafeAreaView>
    );
  }

  // Show error state if there's an error and no conversations
  if (error && conversations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8B4513" />
        <AppHeader 
          title="Messages" 
          onGoBack={handleGoBack}
          rightComponent={
            <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
              <Icon name="edit-2" size={22} color="#8B4513" />
            </TouchableOpacity>
          } 
        />
        <View style={[styles.centered, styles.emptyStateContainer]}>
          <Icon name="wifi-off" size={60} color="#BDBDBD" />
          <Text style={styles.emptyStateText}>
            Failed to load conversations
          </Text>
          <Text style={styles.emptyStateSubText}>
            Please check your connection and try again
          </Text>
          <TouchableOpacity style={styles.emptyStateButton} onPress={fetchConversations}>
            <Text style={styles.emptyStateButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B4513" />
      <AppHeader 
        title="Messages" 
        onGoBack={handleGoBack}
        rightComponent={
          <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
            <Icon name="edit-2" size={22} color="#8B4513" />
          </TouchableOpacity>
        } 
      />
    
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#888"
        />
      </View>

      {filteredConversations.length === 0 && !isLoading ? (
        <View style={[styles.centered, styles.emptyStateContainer]}>
          <Icon name="message-square" size={60} color="#BDBDBD" />
          <Text style={styles.emptyStateText}>
            {searchQuery.trim() ? "No conversations match your search." : "You have no conversations yet."}
          </Text>
          {!searchQuery.trim() && (
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleNewChat}>
              <Text style={styles.emptyStateButtonText}>Start a New Chat</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchConversations}
          refreshing={isLoading}
        />
      )}
    </SafeAreaView>
  );
};

export default ConversationsScreen;