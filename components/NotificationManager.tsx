'use client';

import { useEffect, useState } from 'react';
import { useSocket } from './providers/SocketProvider';

export default function NotificationManager() {
  const { socket } = useSocket();
  const [user, setUser] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Vérifier si les notifications sont supportées
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setIsSupported(false);
      return;
    }
    
    fetchUser();
    registerServiceWorker();
    requestPermission();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré');
      return registration;
    } catch (error) {
      console.error('Service Worker erreur:', error);
    }
  };

  const requestPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        subscribeToPush();
      }
    } else if (Notification.permission === 'granted') {
      subscribeToPush();
    }
  };

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    });

    // Envoyer la subscription au serveur
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription })
    });
    
    console.log('Push subscription envoyée');
  };

  // Écouter les nouveaux messages pour envoyer des notifications
  useEffect(() => {
    if (!socket || !user) return;
    
    const handleNewMessage = async (message: any) => {
      // Ne pas notifier ses propres messages
      if (message.senderId?._id === user._id) return;
      
      // Envoyer une notification push
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          title: `💬 ${message.senderId?.name || 'Nouveau message'}`,
          body: message.content,
          url: window.location.pathname
        })
      });
    };
    
    socket.on('message-received', handleNewMessage);
    
    return () => {
      socket.off('message-received', handleNewMessage);
    };
  }, [socket, user]);

  if (!isSupported) {
    return null;
  }

  return null;
}