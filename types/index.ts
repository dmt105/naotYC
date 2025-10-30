export type UserRole = 'REDACTOR' | 'DEPARTMENT_HEAD' | 'EXECUTIVE_DIRECTOR' | 'RECIPIENT' | 'ADMIN';

export type NoteStatus = 
  | 'DRAFT'
  | 'PENDING_VALIDATION'
  | 'RETURNED'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'SENT'
  | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'CONVOCATION' | 'REPORT' | 'ANNOUNCEMENT' | 'OTHER';
  status: NoteStatus;
  author: User;
  recipients: User[];
  attachments: string[];
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  history: NoteHistory[];
  template?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  mentions?: User[];
}

export interface NoteHistory {
  id: string;
  action: string;
  actor: User;
  timestamp: string;
  comment?: string;
  previousStatus?: NoteStatus;
  newStatus: NoteStatus;
}

export interface ValidationAction {
  type: 'APPROVE' | 'RETURN' | 'ARCHIVE';
  comment?: string;
}