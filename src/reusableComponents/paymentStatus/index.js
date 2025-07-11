import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  StatusBar, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NOTIFICATION_COLORS } from '../../service/notificationService';

// Composant de la barre de notification
const PaymentNotificationBar = ({ notification, onDismiss }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (notification) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Configuration du timer pour masquer la notification
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration || 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  // Fonction pour gérer la disparition de la notification
  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };
  
  if (!notification) return null;
  
  // Détermination de l'icône en fonction du type de notification
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'information-circle';
    }
  };
  
  const backgroundColor = notification.color || NOTIFICATION_COLORS.info;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor,
          transform: [{ translateY }],
          opacity 
        }
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={getIcon()} size={24} color="white" style={styles.icon} />
        <Text style={styles.message}>{notification.message}</Text>
      </View>
      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Gestionnaire de notifications pour l'application
export const NotificationProvider = ({ children }) => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [queue, setQueue] = useState([]);
  
  // Ajouter une notification à la file d'attente
  const addNotification = (notification) => {
    if (!currentNotification) {
      setCurrentNotification(notification);
    } else {
      setQueue(prev => [...prev, notification]);
    }
  };
  
  // Gérer la fermeture d'une notification
  const handleDismiss = () => {
    setCurrentNotification(null);
  };
  
  // Traiter la file d'attente des notifications
  useEffect(() => {
    if (!currentNotification && queue.length > 0) {
      setCurrentNotification(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [currentNotification, queue]);
  
  return (
    <>
      {children}
      <PaymentNotificationBar 
        notification={currentNotification}
        onDismiss={handleDismiss}
      />
    </>
  );
};

// Créer un contexte pour accéder au gestionnaire de notification
import { createContext, useContext } from 'react';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (notification) => {
    if (typeof notification === 'string') {
      notification = { message: notification, type: 'info' };
    }
    setNotifications(prev => [...prev, notification]);
  };
  
  return (
    <NotificationContext.Provider value={addNotification}>
      <NotificationProvider 
        notifications={notifications}
        setNotifications={setNotifications}
      >
        {children}
      </NotificationProvider>
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    left: 10,
    right: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  }
});

export default PaymentNotificationBar;