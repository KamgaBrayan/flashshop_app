// src/service/socketService.js
import { io } from 'socket.io-client';

const WEBSOCKET_URL = 'http://88.198.150.195:8614';
let socket;

export const connectSocket = (projectId, userExternalId) => {
  if (socket && socket.connected) {
    console.log('Socket already connected.');
    return socket;
  }
  
  socket = io(WEBSOCKET_URL, {
    query: { projectId, user: userExternalId },
    transports: ['websocket'], // Forcer WebSocket, évite les problèmes de polling
  });

  socket.on('connect', () => {
    console.log('Socket connected successfully! Socket ID:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
  });

  // D'autres listeners peuvent être ajoutés ici ou dans le hook qui l'utilise
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected.');
  }
};

export const getSocket = () => socket;