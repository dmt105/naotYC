/**
 * Notifications page - All notifications
 */

'use client';

import { useEffect, useState } from 'react';
import { CheckCheck, Trash2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotificationsStore } from '@/store/notifications.store';
import { notificationsService } from '@/services/notifications.service';
import { Notification, NotificationType } from '@/types/notification.types';
import { formatRelativeTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
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
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Use notifications hook for auto-refresh
  useNotifications(true, 60000); // Refresh every minute on this page

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await notificationsService.getNotifications();
      // setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      markAllAsRead();
      toast.success('Toutes les notifications ont été marquées comme lues');
    } catch (error) {
      markAllAsRead();
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await notificationsService.markAsRead(notification.id);
        markAsRead(notification.id);
      } catch (error) {
        markAsRead(notification.id);
      }
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      removeNotification(notificationId);
      toast.success('Notification supprimée');
    } catch (error) {
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

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#010b40] dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount > 0
              ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
              : 'Toutes vos notifications'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
          >
            {filter === 'all' ? 'Non lues' : 'Toutes'}
          </Button>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline">
              <CheckCheck className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      {isLoading ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
        </Card>
      ) : filteredNotifications.length === 0 ? (
        <Card className="p-12 text-center">
          <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous serez notifié lorsque de nouvelles activités se produiront
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
                !notification.isRead
                  ? 'border-l-4 border-l-[#f13544] bg-gray-50 dark:bg-gray-800/50'
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`text-base font-medium ${
                          notification.isRead
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white font-semibold'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="h-2 w-2 bg-[#f13544] rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification.id);
                  }}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

