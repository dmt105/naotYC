/**
 * Notification bell component with dropdown
 */

'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, X, CheckCheck } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNotificationsStore } from '@/store/notifications.store';
import { notificationsService } from '@/services/notifications.service';
import { Notification, NotificationType } from '@/types/notification.types';
import { formatRelativeTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import toast from 'react-hot-toast';

// Mock data - replace with API call
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: NotificationType.NOTE_VALIDATED,
    title: 'Note validée',
    message: 'Votre note "Convention annuelle 2025" a été validée par Jean Dupont',
    relatedNoteId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/notes/1',
  },
  {
    id: '2',
    userId: '1',
    type: NotificationType.COMMENT_ADDED,
    title: 'Nouveau commentaire',
    message: 'Marie Martin a ajouté un commentaire sur votre note',
    relatedNoteId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/notes/2',
  },
  {
    id: '3',
    userId: '1',
    type: NotificationType.REMINDER,
    title: 'Rappel de validation',
    message: 'Vous avez 3 notes en attente de validation',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/validation',
  },
];

export function NotificationBell() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    setNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotificationsStore();
  const [isLoading, setIsLoading] = useState(false);

  // Use notifications hook for auto-refresh
  useNotifications(true, 30000); // Refresh every 30 seconds

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await notificationsService.getNotifications();
      // setNotifications(data);
      
      // Using mock data for now
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.isRead) {
      try {
        await notificationsService.markAsRead(notification.id);
        markAsRead(notification.id);
      } catch (error) {
        // Fallback: mark as read locally
        markAsRead(notification.id);
      }
    }

    // Navigate to action URL if available
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      markAllAsRead();
      toast.success('Toutes les notifications ont été marquées comme lues');
    } catch (error) {
      // Fallback: mark all as read locally
      markAllAsRead();
    }
  };

  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await notificationsService.deleteNotification(notificationId);
      removeNotification(notificationId);
      toast.success('Notification supprimée');
    } catch (error) {
      // Fallback: remove locally
      removeNotification(notificationId);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.NOTE_VALIDATED:
      case NotificationType.NOTE_APPROVED:
        return '✅';
      case NotificationType.NOTE_RETURNED:
        return '❌';
      case NotificationType.COMMENT_ADDED:
        return '💬';
      case NotificationType.REMINDER:
        return '⏰';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: NotificationType, isRead: boolean) => {
    if (isRead) return 'bg-gray-50 dark:bg-gray-800/50';
    
    switch (type) {
      case NotificationType.NOTE_VALIDATED:
      case NotificationType.NOTE_APPROVED:
        return 'bg-green-50 dark:bg-green-900/20';
      case NotificationType.NOTE_RETURNED:
        return 'bg-red-50 dark:bg-red-900/20';
      case NotificationType.COMMENT_ADDED:
        return 'bg-blue-50 dark:bg-blue-900/20';
      case NotificationType.REMINDER:
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800/50';
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-5 w-5 bg-[#f13544] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[380px] max-w-[420px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-50 max-h-[500px] overflow-y-auto"
          sideOffset={5}
          align="end"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs text-[#010b40] dark:text-[#f13544] hover:underline"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Tout marquer comme lu
              </Button>
            )}
          </div>

          {/* Notifications list */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Chargement...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aucune notification
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${getNotificationColor(
                    notification.type,
                    notification.isRead
                  )}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-lg flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              notification.isRead
                                ? 'text-gray-600 dark:text-gray-400'
                                : 'text-gray-900 dark:text-white font-semibold'
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.isRead && (
                        <div className="h-2 w-2 bg-[#f13544] rounded-full" />
                      )}
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        aria-label="Supprimer"
                      >
                        <X className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => router.push('/notifications')}
              >
                Voir toutes les notifications
              </Button>
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

