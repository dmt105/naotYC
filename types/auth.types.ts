/**
 * Authentication types and interfaces
 */

export enum UserRole {
  REDACTEUR = 'REDACTEUR',
  CHEF_DEPARTEMENT = 'CHEF_DEPARTEMENT',
  DIRECTEUR_EXECUTIF = 'DIRECTEUR_EXECUTIF',
  DESTINATAIRE = 'DESTINATAIRE',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roles: UserRole[];
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

