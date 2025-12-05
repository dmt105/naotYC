/**
 * Roles and permissions constants
 */

import { UserRole } from '@/types/auth.types';

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.REDACTEUR]: 'Rédacteur',
  [UserRole.CHEF_DEPARTEMENT]: 'Chef de Département',
  [UserRole.DIRECTEUR_EXECUTIF]: 'Directeur Exécutif',
  [UserRole.DESTINATAIRE]: 'Destinataire',
  [UserRole.ADMIN]: 'Administrateur',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.REDACTEUR]: [
    'notes:create',
    'notes:read:own',
    'notes:update:own',
    'notes:delete:own',
    'notes:submit',
  ],
  [UserRole.CHEF_DEPARTEMENT]: [
    'notes:read:all',
    'notes:validate:first',
    'notes:comment',
    'notes:return',
  ],
  [UserRole.DIRECTEUR_EXECUTIF]: [
    'notes:read:all',
    'notes:validate:final',
    'notes:approve',
    'notes:archive',
    'notes:schedule',
  ],
  [UserRole.DESTINATAIRE]: [
    'notes:read:received',
    'notes:acknowledge',
    'notes:add-to-calendar',
  ],
  [UserRole.ADMIN]: [
    'users:manage',
    'roles:manage',
    'templates:manage',
    'settings:manage',
    'notes:read:all',
    'notes:delete:all',
  ],
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.DESTINATAIRE]: 1,
  [UserRole.REDACTEUR]: 2,
  [UserRole.CHEF_DEPARTEMENT]: 3,
  [UserRole.DIRECTEUR_EXECUTIF]: 4,
  [UserRole.ADMIN]: 5,
};





