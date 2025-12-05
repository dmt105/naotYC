/**
 * User types and interfaces
 */

import { UserRole } from './auth.types';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roles: UserRole[];
  department?: string;
  phone?: string;
  position?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  position?: string;
  department?: string;
  avatar?: File;
}

export interface AssignRoleDto {
  userId: string;
  roles: UserRole[];
}



