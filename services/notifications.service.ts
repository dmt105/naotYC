/**
 * Notifications service
 */

import { apiClient } from '@/lib/axios';
import { Notification, NotificationPreferences } from '@/types/notification.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

export const notificationsService = {
  /**
   * Get all notifications for current user
   */
  async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get<ApiResponse<Notification[]>>('/notifications');
    return response.data.data;
  },

  /**
   * Get unread notifications count
   */
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      '/notifications/unread-count'
    );
    return response.data.data.count;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    await apiClient.patch(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    await apiClient.patch('/notifications/read-all');
  },

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/${notificationId}`);
  },

  /**
   * Get notification preferences
   */
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences'
    );
    return response.data.data;
  },

  /**
   * Update notification preferences
   */
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    await apiClient.put('/notifications/preferences', preferences);
  },
};

