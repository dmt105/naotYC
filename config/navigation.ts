import { NavigationItem } from '@/types/user'
import { UserRole } from '@/types/enum'

export const navigationConfig: NavigationItem[] = [
  // Common navigation for all roles
  {
    name: 'Vue d\'ensemble',
    href: '/dashboard',
    icon: '📊',
    description: 'Tableau de bord principal',
    roles: [UserRole.DESTINATAIRE,UserRole.ADMIN,UserRole.REDACTEUR,UserRole.DIRECTEUR_EXECUTIF,UserRole.DESTINATAIRE],
  },
  // Rédacteur specific
  {
    name: 'Mes Notes',
    href: '/notes',
    icon: '📝',
    description: 'Gérer mes notes',
    roles: [UserRole.REDACTEUR, UserRole.ADMIN],
    badge: true,
  },
  {
    name: 'Nouvelle Note',
    href: '/notes/new',
    icon: '✨',
    description: 'Créer une nouvelle note',
    roles: [UserRole.REDACTEUR, UserRole.ADMIN],
  },
  {
    name: 'Calendrier',
    href: '/calendar',
    icon: '📅',
    description: 'Notes planifiées',
    roles: [UserRole.REDACTEUR, UserRole.ADMIN, UserRole.DESTINATAIRE],
  },
  {
    name: 'Modèles',
    href: '/templates',
    icon: '📋',
    description: 'Modèles de notes',
    roles: [UserRole.REDACTEUR, UserRole.ADMIN],
  },

  // Validateur specific (Chef de Département + Directeur)
  {
    name: 'À Valider',
    href: '/validation',
    icon: '✅',
    description: 'Notes en attente de validation',
    roles: [UserRole.CHEF_DEPARTEMENT, UserRole.DIRECTEUR_EXECUTIF,UserRole.ADMIN],
    badge: true,
    badgeCount: 5,
  },
  {
    name: 'Historique Validation',
    href: '/validation/history',
    icon: '📋',
    description: 'Historique des validations',
    roles: [UserRole.CHEF_DEPARTEMENT, UserRole.DIRECTEUR_EXECUTIF, UserRole.ADMIN],
  },
  {
    name: 'Statistiques',
    href: '/stats',
    icon: '📈',
    description: 'Statistiques de validation',
    roles: [UserRole.CHEF_DEPARTEMENT, UserRole.DIRECTEUR_EXECUTIF, UserRole.ADMIN],
  },

  // Destinataire specific
  {
    name: 'Notes Reçues',
    href: '/destinataire/notes',
    icon: '📨',
    description: 'Toutes les notes reçues',
    roles: [UserRole.DESTINATAIRE, UserRole.ADMIN],
  },
  {
    name: 'Non Lues',
    href: '/destinataire/unread',
    icon: '🔔',
    description: 'Notes non consultées',
    roles: [UserRole.DESTINATAIRE, UserRole.ADMIN],
    badge: true,
    badgeCount: 3,
  },
  {
    name: 'Archivées',
    href: '/destinataire/archived',
    icon: '📁',
    description: 'Notes archivées',
    roles: [UserRole.DESTINATAIRE, UserRole.ADMIN],
  },

  // Admin specific
  {
    name: 'Utilisateurs',
    href: '/admin/users',
    icon: '👥',
    description: 'Gestion des utilisateurs',
    roles: [UserRole.ADMIN],
  },
  {
    name: 'Modèles Admin',
    href: '/admin/templates',
    icon: '🎨',
    description: 'Gestion des modèles',
    roles: [UserRole.ADMIN],
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: '⚙️',
    description: 'Paramètres système',
    roles: [UserRole.ADMIN],
  },
  {
    name: 'Rapports',
    href: '/admin/reports',
    icon: '📊',
    description: 'Rapports système',
    roles: [UserRole.ADMIN],
  },

  // Common bottom navigation
  {
    name: 'Profil',
    href: '/profile',
    icon: '👤',
    description: 'Mon profil utilisateur',
    roles: [UserRole.ADMIN, UserRole.DIRECTEUR_EXECUTIF, UserRole.CHEF_DEPARTEMENT, UserRole.REDACTEUR, UserRole.DESTINATAIRE],
  },
  {
    name: 'Paramètres',
    href: '/settings',
    icon: '⚙️',
    description: 'Paramètres personnels',
    roles: [UserRole.ADMIN, UserRole.DIRECTEUR_EXECUTIF, UserRole.CHEF_DEPARTEMENT, UserRole.REDACTEUR, UserRole.DESTINATAIRE],
  },
]

export const getNavigationForRole = (role: UserRole): NavigationItem[] => {
  return navigationConfig.filter(item => item.roles.includes(role))
}

export const getDashboardHref = (role: UserRole): string => {
  const roleDashboards = {
    [UserRole.ADMIN]: '/admin',
    [UserRole.DIRECTEUR_EXECUTIF]: '/validateur',
    [UserRole.CHEF_DEPARTEMENT]: '/validateur',
    [UserRole.REDACTEUR]: '/redacteur',
    [UserRole.DESTINATAIRE]: '/destinataire',
  }
  return roleDashboards[role] || '/dashboard'
}