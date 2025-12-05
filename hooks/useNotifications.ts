/**
 * Custom hook for notifications management
 */

import { useEffect, useCallback } from 'react';
import { useNotificationsStore } from '@/store/notifications.store';
import { notificationsService } from '@/services/notifications.service';

export function useNotifications(autoRefresh = true, refreshInterval = 30000) {
  const {
    notifications,
    unreadCount,
    setNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotificationsStore();

  const loadNotifications = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      // const data = await notificationsService.getNotifications();
      // setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, [setNotifications]);

  useEffect(() => {
    // Load notifications on mount
    loadNotifications();

    // Auto-refresh notifications
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadNotifications();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, loadNotifications]);

  const markNotificationAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await notificationsService.markAsRead(notificationId);
        markAsRead(notificationId);
      } catch (error) {
        // Fallback: mark as read locally
        markAsRead(notificationId);
      }
    },
    [markAsRead]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      await notificationsService.markAllAsRead();
      markAllAsRead();
    } catch (error) {
      markAllAsRead();
    }
  }, [markAllAsRead]);

  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await notificationsService.deleteNotification(notificationId);
        removeNotification(notificationId);
      } catch (error) {
        removeNotification(notificationId);
      }
    },
    [removeNotification]
  );

  return {
    notifications,
    unreadCount,
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  };
}





