
export interface GeneralSettings {
  organizationName: string
  timezone: string
  language: string
  dateFormat: string
  autoArchive: boolean
  retentionPeriod: number
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
  }
  ipWhitelist: string[]
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  approvalReminders: boolean
  deadlineAlerts: boolean
  weeklyReports: boolean
}

export interface WorkflowSettings {
  approvalLevels: number
  autoEscalation: boolean
  escalationTime: number
  allowComments: boolean
  requireAttachments: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  department: string
  status: 'active' | 'inactive'
  lastLogin: Date
}

export interface IntegrationSettings {
  googleWorkspace: boolean
  microsoft365: boolean
  slack: boolean
  apiEnabled: boolean
  webhookUrl: string
}

export type SettingsTab = 'general' | 'security' | 'notifications' | 'workflow' | 'users' | 'integrations'