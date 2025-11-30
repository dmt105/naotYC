// Types pour l'application NaotY
export type UserRole = 'REDACTOR' | 'DEPARTMENT_HEAD' | 'EXECUTIVE_DIRECTOR' | 'RECIPIENT' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  department?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export type NoteStatus = 
  | 'DRAFT' 
  | 'PENDING_VALIDATION' 
  | 'RETURNED' 
  | 'APPROVED' 
  | 'SCHEDULED' 
  | 'SENT' 
  | 'ARCHIVED';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;      
  status: NoteStatus;
  author: User;          
  recipients: User[];     
  attachments: Attachment[];
  scheduledDate?: string;
  sentDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  history: NoteHistory[];
  templateId?: string;
}


export interface NoteType {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  noteId: string;
  mentions?: User[];
}

export interface NoteHistory {
  id: string;
  action: string;
  fromStatus?: NoteStatus;
  toStatus: NoteStatus;
  performedBy: User;
  performedAt: string;
  comment?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export interface DashboardStats {
  drafts: number;
  pendingValidation: number;
  approved: number;
  scheduled: number;
  sent: number;
  archived: number;
}

export interface ValidationMetrics {
  averageValidationTime: number;
  validationRate: number;
  returnRate: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface NotesFilter {
  status?: NoteStatus;
  type?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface ValidationAction {
  type: 'SUBMIT' | 'APPROVE' | 'RETURN' | 'REJECT' | 'SCHEDULE' | 'SEND' | 'ARCHIVE';
  comment?: string;
  validatedBy: User; 
  validatedAt: string;
  nextValidator?: string; // User ID
}

// Types pour les filtres et recherche
export interface UserFilter {
  role?: UserRole;
  department?: string;
  search?: string;
  isActive?: boolean;
}

export interface TemplateFilter {
  isActive?: boolean;
  search?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  department?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}


export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;      
  status: NoteStatus;
  author: User;          
  recipients: User[];     
  attachments: Attachment[];
  scheduledDate?: string;
  sentDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  history: NoteHistory[];
  templateId?: string;
}

export interface NoteType {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  noteId: string;
  mentions?: User[];
}

export interface NoteHistory {
  id: string;
  action: string;
  fromStatus?: NoteStatus;
  toStatus: NoteStatus;
  performedBy: User;
  performedAt: string;
  comment?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export interface DashboardStats {
  drafts: number;
  pendingValidation: number;
  approved: number;
  scheduled: number;
  sent: number;
  archived: number;
}

export interface ValidationMetrics {
  averageValidationTime: number;
  validationRate: number;
  returnRate: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface NotesFilter {
  status?: NoteStatus;
  type?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface ValidationAction {
  type: 'SUBMIT' | 'APPROVE' | 'RETURN' | 'REJECT' | 'SCHEDULE' | 'SEND' | 'ARCHIVE';
  comment?: string;
  validatedBy: User; 
  validatedAt: string;
  nextValidator?: string; // User ID
}

// Types pour la création et mise à jour d'utilisateur
export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  department?: string;
  password: string;
  isActive?: boolean;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: UserRole[];
  department?: string;
  isActive?: boolean;
  avatar?: string;
}

// Types pour la création et mise à jour de template
export interface CreateTemplateData {
  name: string;
  description: string;
  content: string;
  variables: string[];
  isActive?: boolean;
}

export interface UpdateTemplateData {
  name?: string;
  description?: string;
  content?: string;
  variables?: string[];
  isActive?: boolean;
}

// Types pour les notes (création et mise à jour)
export interface CreateNoteData {
  title: string;
  content: string;
  type: string; // NoteType ID
  recipients: string[]; // User IDs
  attachments?: File[];
  templateId?: string;
  scheduledDate?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  type?: string; // NoteType ID
  recipients?: string[]; // User IDs
  scheduledDate?: string;
}

// Types pour les destinataires
export interface ReceivedNote {
  id: string;
  note: Note;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  receivedAt: string;
  readAt?: string;
  archivedAt?: string;
}

export interface Notification {
  id: string;
  type: 'NEW_NOTE' | 'NOTE_RETURNED' | 'VALIDATION_REQUIRED' | 'NOTE_SCHEDULED' | 'NOTE_SENT';
  title: string;
  message: string;
  noteId?: string;
  isRead: boolean;
  createdAt: string;
}

// Types pour les réponses d'API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Types pour les formulaires et validation
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  department?: string;
}

// Types pour les filtres et recherche
export interface UserFilter {
  role?: UserRole;
  department?: string;
  search?: string;
  isActive?: boolean;
}

export interface TemplateFilter {
  isActive?: boolean;
  search?: string;
}