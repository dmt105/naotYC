/**
 * Note types and interfaces
 */

export enum NoteStatus {
  DRAFT = 'DRAFT',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  RETURNED = 'RETURNED',
  APPROVED = 'APPROVED',
  SCHEDULED = 'SCHEDULED',
  SENT = 'SENT',
  ARCHIVED = 'ARCHIVED',
}

export enum NoteType {
  CONVOCATION = 'CONVOCATION',
  RAPPORT = 'RAPPORT',
  ANNONCE = 'ANNONCE',
  COMPTE_RENDU = 'COMPTE_RENDU',
  AUTRE = 'AUTRE',
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  status: NoteStatus;
  authorId: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  recipients: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    readAt?: string;
  }>;
  attachments: Attachment[];
  scheduledAt?: string;
  sentAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  templateId?: string;
}

export interface NoteComment {
  id: string;
  noteId: string;
  authorId: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  content: string;
  mentions?: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
}

export interface NoteValidation {
  id: string;
  noteId: string;
  validatorId: string;
  validator: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  action: 'APPROVED' | 'RETURNED' | 'ARCHIVED';
  comment?: string;
  previousStatus: NoteStatus;
  newStatus: NoteStatus;
  createdAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  type: NoteType;
  recipientIds: string[];
  templateId?: string;
  scheduledAt?: string;
  attachments?: File[];
}

export interface UpdateNoteDto extends Partial<CreateNoteDto> {
  id: string;
}

export interface NoteFilters {
  status?: NoteStatus[];
  type?: NoteType[];
  authorId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}





