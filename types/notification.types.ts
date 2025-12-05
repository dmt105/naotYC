/**
 * Notification types and interfaces
 */

export enum NotificationType {
  NOTE_CREATED = 'NOTE_CREATED',
  NOTE_VALIDATED = 'NOTE_VALIDATED',
  NOTE_RETURNED = 'NOTE_RETURNED',
  NOTE_APPROVED = 'NOTE_APPROVED',
  NOTE_SCHEDULED = 'NOTE_SCHEDULED',
  NOTE_SENT = 'NOTE_SENT',
  COMMENT_ADDED = 'COMMENT_ADDED',
  REMINDER = 'REMINDER',
  SYSTEM = 'SYSTEM',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedNoteId?: string;
  relatedUserId?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  reminderNotifications: boolean;
  validationReminders: boolean;
}





