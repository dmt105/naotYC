import { UserRole } from './user'

export interface SystemStats {
  totalUsers: number;
  totalNotes: number;
  pendingValidations: number;
  scheduledNotes: number;
  archivedNotes: number;
  averageValidationTime: number;
  readRate: number;
  monthlyGrowth: number;
  activeUsers: number;
  notesByStatus: {
    draft: number;
    pending: number;
    approved: number;
    scheduled: number;
    sent: number;
    archived: number;
  };
  notesByType: Record<string, number>;
  departmentStats: DepartmentStat[];
}

export interface DepartmentStat {
  department: string;
  userCount: number;
  noteCount: number;
  averageValidationTime: number;
}


export interface AdminStats {
  totalUsers: number;
  totalNotes: number;
  pendingValidations: number;
  scheduledNotes: number;
  archivedNotes: number;
  averageValidationTime: number;
  readRate: number;
  monthlyGrowth: number;
}


export interface UserManagement {
  id: string
  name: string
  email: string
  role: UserRole
  roles: string[] // Pour la compatibilité avec l'ancien code
  department?: string
  notesCount: number
  lastActivity: string
  isActive: boolean
  avatar?: string // Ajouter cette propriété
  createdAt: string
  lastLogin?: string
  status: 'active' | 'inactive'
}


export interface SystemLog {
  id: string
  type: 'INFO' | 'WARNING' | 'ERROR'
  message: string
  timestamp: string
  user?: string
  ipAddress?: string
}

export interface Template {
  id: string
  name: string
  type: string
  content: string
  department: string
  createdBy: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface SystemSettings {
  siteName: string
  siteDescription: string
  maintenanceMode: boolean
  maxFileSize: number
  allowedFileTypes: string[]
  emailNotifications: boolean
  autoArchiveDays: number
  sessionTimeout: number
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  lastLogin: string;
  status: 'active' | 'inactive';
  department?: string;
  createdAt: string; // AJOUTER CETTE PROPRIÉTÉ
  notesCount: number;
  avatar?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  userId?: string;
  action: string;
  details?: any;
}

export interface NoteAnalytics {
  id: string;
  title: string;
  author: string;
  status: string;
  createdAt: string;
  validationTime?: number;
  readCount: number;
  totalRecipients: number;
  readRate: number;
}

export { UserRole }
