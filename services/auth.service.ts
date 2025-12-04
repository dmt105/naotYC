/**
 * Authentication service
 */

import { apiClient } from '@/lib/axios';
import { LoginCredentials, AuthResponse, User } from '@/types/auth.types';
import { ApiResponse } from '@/types/api.types';

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department?: string;
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Check if it's a demo account (should be handled in LoginForm, but keep for safety)
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data.data;
  },

  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      credentials
    );
    return response.data.data;
  },

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/google',
      { token }
    );
    return response.data.data;
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data.data;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};

