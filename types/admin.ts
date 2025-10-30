import { User, UserRole } from './user'

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalNotes: number
  notesThisMonth: number
  pendingValidations: number
  storageUsed: number
  storageLimit: number
}

export interface UserManagement extends User {
  lastActivity: string
  isActive: boolean
  notesCount: number
  department: string
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

export { UserRole }
