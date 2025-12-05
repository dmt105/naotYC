/**
 * Templates service
 */

import { apiClient } from '@/lib/axios';
import {
  Template,
  CreateTemplateDto,
  UpdateTemplateDto,
} from '@/types/template.types';
import { ApiResponse } from '@/types/api.types';

export const templatesService = {
  /**
   * Get all templates
   */
  async getTemplates(): Promise<Template[]> {
    const response = await apiClient.get<ApiResponse<Template[]>>('/templates');
    return response.data.data;
  },

  /**
   * Get a template by ID
   */
  async getTemplateById(id: string): Promise<Template> {
    const response = await apiClient.get<ApiResponse<Template>>(
      `/templates/${id}`
    );
    return response.data.data;
  },

  /**
   * Create a new template
   */
  async createTemplate(data: CreateTemplateDto): Promise<Template> {
    const response = await apiClient.post<ApiResponse<Template>>(
      '/templates',
      data
    );
    return response.data.data;
  },

  /**
   * Update a template
   */
  async updateTemplate(data: UpdateTemplateDto): Promise<Template> {
    const { id, ...updateData } = data;
    const response = await apiClient.put<ApiResponse<Template>>(
      `/templates/${id}`,
      updateData
    );
    return response.data.data;
  },

  /**
   * Delete a template
   */
  async deleteTemplate(id: string): Promise<void> {
    await apiClient.delete(`/templates/${id}`);
  },
};





