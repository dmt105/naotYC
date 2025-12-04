/**
 * Validation service
 */

import { apiClient } from '@/lib/axios';
import { ValidationAction, ValidationHistory } from '@/types/validation.types';
import { ApiResponse } from '@/types/api.types';

export const validationService = {
  /**
   * Validate a note (approve, return, or archive)
   */
  async validateNote(action: ValidationAction): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      `/notes/${action.noteId}/validate`,
      {
        action: action.action,
        comment: action.comment,
      }
    );
  },

  /**
   * Get validation history for a note
   */
  async getValidationHistory(noteId: string): Promise<ValidationHistory[]> {
    const response = await apiClient.get<ApiResponse<ValidationHistory[]>>(
      `/notes/${noteId}/validation-history`
    );
    return response.data.data;
  },

  /**
   * Get pending validations for current user
   */
  async getPendingValidations(): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(
      '/validation/pending'
    );
    return response.data.data;
  },
};

