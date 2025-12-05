/**
 * Users service (Admin only)
 */

import { apiClient } from '@/lib/axios';
import { UserProfile, UpdateUserDto, AssignRoleDto } from '@/types/user.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

export const usersService = {
  /**
   * Get all users
   */
  async getUsers(): Promise<PaginatedResponse<UserProfile>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<UserProfile>>>(
      '/users'
    );
    return response.data.data;
  },

  /**
   * Get a user by ID
   */
  async getUserById(id: string): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      `/users/${id}`
    );
    return response.data.data;
  },

  /**
   * Update a user
   */
  async updateUser(data: UpdateUserDto & { id: string }): Promise<UserProfile> {
    const { id, ...updateData } = data;
    const response = await apiClient.put<ApiResponse<UserProfile>>(
      `/users/${id}`,
      updateData
    );
    return response.data.data;
  },

  /**
   * Assign roles to a user
   */
  async assignRoles(data: AssignRoleDto): Promise<UserProfile> {
    const response = await apiClient.post<ApiResponse<UserProfile>>(
      `/users/${data.userId}/roles`,
      { roles: data.roles }
    );
    return response.data.data;
  },

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};





