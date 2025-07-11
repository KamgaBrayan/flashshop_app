import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#8B4513',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    newChatButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 16,
      padding: 12,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    conversationItem: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#FFFFFF',
      marginBottom: 1,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 1,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#4CAF50',
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    conversationInfo: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    nameTimeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: '#8B4513',
    },
    time: {
      fontSize: 12,
      color: '#666666',
    },
    messageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      flex: 1,
      fontSize: 14,
      color: '#666666',
      marginRight: 8,
    },
    unreadBadge: {
      backgroundColor: '#8B4513',
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    unreadCount: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    centered: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    
    loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
    emptyStateContainer: { paddingHorizontal: 20 },
    emptyStateText: { marginTop: 20, fontSize: 17, color: '#777', textAlign: 'center' },
    emptyStateButton: { marginTop: 20, backgroundColor: '#8B4513', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
    emptyStateButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }

  });