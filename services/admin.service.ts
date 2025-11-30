import { AdminStats, User, Template } from '@/types/admin';
import { axiosClient } from './api/axiosClient';

export const adminService = {
  // Statistiques
  getStats: async (): Promise<AdminStats> => {
    const response = await axiosClient.get('/admin/stats');
    return response.data;
  },

  // Gestion des utilisateurs
  getUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get('/admin/users');
    return response.data;
  },

  updateUserRoles: async (userId: string, roles: string[]): Promise<User> => {
    const response = await axiosClient.put(`/admin/users/${userId}/roles`, { roles });
    return response.data;
  },

  // Gestion des modèles
  getTemplates: async (): Promise<Template[]> => {
    const response = await axiosClient.get('/admin/templates');
    return response.data;
  },

  createTemplate: async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<Template> => {
    const response = await axiosClient.post('/admin/templates', template);
    return response.data;
  },

  updateTemplate: async (id: string, template: Partial<Template>): Promise<Template> => {
    const response = await axiosClient.put(`/admin/templates/${id}`, template);
    return response.data;
  },

  deleteTemplate: async (id: string): Promise<void> => {
    await axiosClient.delete(`/admin/templates/${id}`);
  }
};