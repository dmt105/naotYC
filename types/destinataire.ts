// src/types/recipient.ts
import { NoteStatus, ReceptionStatus } from './enum';

export interface RecipientNoteStats {
  unreadCount: number;
  readCount: number;
  archivedCount: number;
  totalReceived: number;
  monthlyTrend: {
    currentMonth: number;
    previousMonth: number;
    trend: number; // pourcentage
  };
}

export interface RecipientPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  reminderDays: number[]; // [3, 1, 0] pour 3 jours avant, veille, jour J
  autoArchive: boolean;
  archiveAfterDays: number;
}

export interface CalendarIntegration {
  isConnected: boolean;
  lastSync?: string;
  syncEnabled: boolean;
}

export interface RecipientDashboard {
  stats: RecipientNoteStats;
  recentNotes: RecipientNoteSummary[];
  pendingActions: number;
  upcomingEvents: CalendarEvent[];
  preferences: RecipientPreferences;
  calendar: CalendarIntegration;
}

export interface RecipientNoteSummary {
  id: string;
  title: string;
  type: NoteType;
  status: NoteStatus;
  receptionStatus: ReceptionStatus;
  author: {
    id: string;
    name: string;
    email: string;
    department?: string;
  };
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  readAt?: string;
  archivedAt?: string;
  hasAttachments: boolean;
  commentCount: number;
  requiresAction: boolean;
}

export interface RecipientNoteDetail extends RecipientNoteSummary {
  content: string;
  attachments: Attachment[];
  recipients: Recipient[];
  workflowHistory: WorkflowEvent[];
  comments: Comment[];
  canAddToCalendar: boolean;
  calendarEventId?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface Recipient {
  id: string;
  name: string;
  email: string;
  department?: string;
  receptionStatus: ReceptionStatus;
  readAt?: string;
  archivedAt?: string;
}

export interface WorkflowEvent {
  id: string;
  action: 'CREATED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'SCHEDULED' | 'SENT';
  actor: {
    id: string;
    name: string;
    role: string;
  };
  timestamp: string;
  comment?: string;
  previousStatus?: NoteStatus;
  newStatus: NoteStatus;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  content: string;
  timestamp: string;
  mentions: string[];
  isInternal: boolean;
}

export interface CalendarEvent {
  id: string;
  noteId: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location?: string;
  calendarId: string;
  eventUrl: string;
  isAllDay: boolean;
}

export interface NoteType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  requiresValidation: boolean;
  templateId?: string;
}

export interface RecipientFilters {
  status?: ReceptionStatus;
  type?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  hasAttachments?: boolean;
  requiresAction?: boolean;
}

export interface BulkActionRequest {
  noteIds: string[];
  action: 'MARK_AS_READ' | 'ARCHIVE' | 'ADD_TO_CALENDAR';
}