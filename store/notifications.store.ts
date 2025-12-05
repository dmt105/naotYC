/**
 * Notifications store (Zustand)
 */

import { create } from 'zustand';
import { Notification } from '@/types/notification.types';

interface NotificationsStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
  updateUnreadCount: () => void;
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  setNotifications: (notifications) => {
    set({ notifications });
    get().updateUnreadCount();
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
    get().updateUnreadCount();
  },

  markAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId
          ? { ...notif, isRead: true, readAt: new Date().toISOString() }
          : notif
      ),
    }));
    get().updateUnreadCount();
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({
        ...notif,
        isRead: true,
        readAt: notif.readAt || new Date().toISOString(),
      })),
    }));
    get().updateUnreadCount();
  },

  removeNotification: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== notificationId),
    }));
    get().updateUnreadCount();
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },

  updateUnreadCount: () => {
    const unreadCount = get().notifications.filter((notif) => !notif.isRead).length;
    set({ unreadCount });
  },
}));





