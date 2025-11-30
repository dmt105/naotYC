import { NoteStatus, ReceptionStatus } from './enum'

export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  type: string;
  status: NoteStatus;
  author: {
    id: string;
    name: string;
    email: string;
  };
  recipients: Array<{
    id: string;
    name: string;
    email: string;
    receptionStatus: ReceptionStatus;
    readAt?: string;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
  }>;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}


export interface CommentDTO {
  id: string
  author: string
  content: string
  createdAt: string
  mentions: string[]
}

export interface ValidationStepDTO {
  id: string
  validator: string
  role: string
  action: 'APPROVED' | 'RETURNED' | 'COMMENTED'
  comment?: string
  timestamp: string
}

export interface NoteCreateDTO {
  title: string
  content: string
  type: string
  department: string
  recipients: string[]
  attachments: File[]
  scheduledDate?: string
}

export interface NoteUpdateDTO {
  title?: string
  content?: string
  type?: string
  recipients?: string[]
  attachments?: File[]
  scheduledDate?: string
}

export interface NoteSummaryDTO {
  id: string;
  title: string;
  type: string;
  status: NoteStatus;
  receptionStatus: ReceptionStatus;
  author: {
    name: string;
  };
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

export interface DashboardStatsDTO {
  unreadCount: number;
  readCount: number;
  archivedCount: number;
  totalReceived: number;
  recentNotes: NoteSummaryDTO[];
}

export type NoteType = 'ANNOUNCEMENT' | 'MEETING' | 'REPORT' | 'OTHER'

export { NoteStatus, ReceptionStatus };
