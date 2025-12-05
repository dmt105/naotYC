/**
 * Demo accounts for testing - all roles
 */

import { UserRole } from '@/types/auth.types';
import { User } from '@/types/auth.types';

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  label: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'redacteur@demo.naoty.org',
    password: 'demo123',
    role: UserRole.REDACTEUR,
    label: 'Rédacteur',
    description: 'Crée et soumet des notes',
  },
  {
    email: 'chef@demo.naoty.org',
    password: 'demo123',
    role: UserRole.CHEF_DEPARTEMENT,
    label: 'Chef de Département',
    description: 'Valide en premier niveau',
  },
  {
    email: 'directeur@demo.naoty.org',
    password: 'demo123',
    role: UserRole.DIRECTEUR_EXECUTIF,
    label: 'Directeur Exécutif',
    description: 'Validation finale',
  },
  {
    email: 'destinataire@demo.naoty.org',
    password: 'demo123',
    role: UserRole.DESTINATAIRE,
    label: 'Destinataire',
    description: 'Reçoit et lit les notes',
  },
  {
    email: 'admin@demo.naoty.org',
    password: 'demo123',
    role: UserRole.ADMIN,
    label: 'Administrateur',
    description: 'Gestion complète',
  },
];

/**
 * Generate demo user data based on role
 */
export function getDemoUser(role: UserRole): User {
  const account = DEMO_ACCOUNTS.find((acc) => acc.role === role);
  
  const baseUser: User = {
    id: `demo-${role.toLowerCase()}`,
    email: account?.email || `${role.toLowerCase()}@demo.naoty.org`,
    firstName: getFirstNameByRole(role),
    lastName: getLastNameByRole(role),
    avatar: undefined,
    roles: [role],
    department: getDepartmentByRole(role),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return baseUser;
}

function getFirstNameByRole(role: UserRole): string {
  const names: Record<UserRole, string> = {
    [UserRole.REDACTEUR]: 'Marie',
    [UserRole.CHEF_DEPARTEMENT]: 'Jean',
    [UserRole.DIRECTEUR_EXECUTIF]: 'Sophie',
    [UserRole.DESTINATAIRE]: 'Pierre',
    [UserRole.ADMIN]: 'Admin',
  };
  return names[role] || 'Utilisateur';
}

function getLastNameByRole(role: UserRole): string {
  const names: Record<UserRole, string> = {
    [UserRole.REDACTEUR]: 'Martin',
    [UserRole.CHEF_DEPARTEMENT]: 'Dupont',
    [UserRole.DIRECTEUR_EXECUTIF]: 'Rakoto',
    [UserRole.DESTINATAIRE]: 'Durand',
    [UserRole.ADMIN]: 'NaotY',
  };
  return names[role] || 'Demo';
}

function getDepartmentByRole(role: UserRole): string {
  const departments: Record<UserRole, string> = {
    [UserRole.REDACTEUR]: 'Communication',
    [UserRole.CHEF_DEPARTEMENT]: 'Technique',
    [UserRole.DIRECTEUR_EXECUTIF]: 'Direction',
    [UserRole.DESTINATAIRE]: 'Membres',
    [UserRole.ADMIN]: 'Administration',
  };
  return departments[role] || 'Général';
}





