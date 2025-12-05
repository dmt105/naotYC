/**
 * Permission utilities
 */

import { UserRole } from '@/types/auth.types';
import { ROLE_PERMISSIONS } from '@/constants/roles';

/**
 * Check if user has a specific permission
 */
export function hasPermission(userRoles: UserRole[], permission: string): boolean {
  return userRoles.some((role) => ROLE_PERMISSIONS[role]?.includes(permission));
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(userRoles: UserRole[], permissions: string[]): boolean {
  return permissions.some((permission) => hasPermission(userRoles, permission));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(userRoles: UserRole[], permissions: string[]): boolean {
  return permissions.every((permission) => hasPermission(userRoles, permission));
}

/**
 * Check if user is admin
 */
export function isAdmin(userRoles: UserRole[]): boolean {
  return userRoles.includes(UserRole.ADMIN);
}

/**
 * Check if user can validate notes
 */
export function canValidate(userRoles: UserRole[]): boolean {
  return hasAnyPermission(userRoles, [
    'notes:validate:first',
    'notes:validate:final',
  ]);
}

/**
 * Check if user can manage users (Admin only)
 */
export function canManageUsers(userRoles: UserRole[]): boolean {
  return hasPermission(userRoles, 'users:manage');
}

/**
 * Check if user can manage templates (Admin only)
 */
export function canManageTemplates(userRoles: UserRole[]): boolean {
  return hasPermission(userRoles, 'templates:manage');
}





