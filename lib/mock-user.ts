import { User, UserStats } from '@/types/user'
import { UserRole } from '@/types/enum'

export const mockUsers: Record<string, User> = {
  admin: {
    id: '1',
    email: 'admin@youthcomputing.org',
    name: 'Admin System',
    roles: UserRole.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15T14:30:00Z',
    notificationsCount: 12,
  },
  directeur: {
    id: '2',
    email: 'directeur@youthcomputing.org',
    name: 'Pierre Directeur',
    roles: UserRole.DIRECTEUR_EXECUTIF,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15T13:45:00Z',
    notificationsCount: 8,
  },
  chef: {
    id: '3',
    email: 'chef.technique@youthcomputing.org',
    name: 'Marie Chef Technique',
    roles: UserRole.CHEF_DEPARTEMENT,
    department: 'technique',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15T12:15:00Z',
    notificationsCount: 5,
  },
  redacteur: {
    id: '4',
    email: 'redacteur@youthcomputing.org',
    name: 'Jean Rédacteur',
    roles: UserRole.REDACTEUR,
    department: 'communication',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15T11:20:00Z',
    notificationsCount: 3,
  },
  destinataire: {
    id: '5',
    email: 'membre@youthcomputing.org',
    name: 'Luc Membre',
    roles: UserRole.DESTINATAIRE,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    lastLogin: '2024-01-15T10:05:00Z',
    notificationsCount: 7,
  },
}

export const mockUserStats: Record<UserRole, UserStats> = {
  [UserRole.ADMIN]: {
    unreadCount: 12,
    totalCount: 156,
    pendingCount: 23,
    urgentCount: 5,
  },
  [UserRole.DIRECTEUR_EXECUTIF]: {
    unreadCount: 8,
    totalCount: 89,
    pendingCount: 15,
    urgentCount: 3,
  },
  [UserRole.CHEF_DEPARTEMENT]: {
    unreadCount: 5,
    totalCount: 67,
    pendingCount: 8,
    urgentCount: 2,
  },
  [UserRole.REDACTEUR]: {
    unreadCount: 3,
    totalCount: 45,
    pendingCount: 12,
    urgentCount: 1,
  },
  [UserRole.DESTINATAIRE]: {
    unreadCount: 7,
    totalCount: 34,
    pendingCount: 0,
    urgentCount: 2,
  },
}

// Helper to get user by role for testing
export const getUserByRole = (role: UserRole): User => {
  const user = Object.values(mockUsers).find(u => u.roles === role)
  return user || mockUsers.destinataire
}