import { UserRole } from '@/types/enum'

export interface User {
  id: string
  email: string
  name: string
  roles: UserRole[]
  department?: string
  avatar?: string
  lastLogin?: string
  notificationsCount: number
}

export interface NavigationItem {
  name: string
  href: string
  icon: string
  description: string
  badge?: boolean
  badgeCount?: number
  roles: UserRole[] // Roles autorisés à voir cet item
  permissions?: string[] // Permissions spécifiques requises
}

export interface UserStats {
  unreadCount: number
  totalCount: number
  pendingCount: number
  urgentCount: number
}

export { UserRole }
