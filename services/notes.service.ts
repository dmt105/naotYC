/**
 * Notes service
 */

import { apiClient } from '@/lib/axios';
import {
  Note,
  CreateNoteDto,
  UpdateNoteDto,
  NoteFilters,
} from '@/types/note.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

export const notesService = {
  /**
   * Get all notes with filters
   */
  async getNotes(filters?: NoteFilters): Promise<PaginatedResponse<Note>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Note>>>(
      '/notes',
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Get a note by ID
   */
  async getNoteById(id: string): Promise<Note> {
    const response = await apiClient.get<ApiResponse<Note>>(`/notes/${id}`);
    return response.data.data;
  },

  /**
   * Create a new note
   */
  async createNote(data: CreateNoteDto): Promise<Note> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('type', data.type);
    data.recipientIds.forEach((id) => formData.append('recipientIds', id));
    
    if (data.templateId) {
      formData.append('templateId', data.templateId);
    }
    
    if (data.scheduledAt) {
      formData.append('scheduledAt', data.scheduledAt);
    }
    
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await apiClient.post<ApiResponse<Note>>('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Update a note
   */
  async updateNote(data: UpdateNoteDto): Promise<Note> {
    const { id, ...updateData } = data;
    const response = await apiClient.put<ApiResponse<Note>>(
      `/notes/${id}`,
      updateData
    );
    return response.data.data;
  },

  /**
   * Delete a note
   */
  async deleteNote(id: string): Promise<void> {
    await apiClient.delete(`/notes/${id}`);
  },

  /**
   * Submit a note for validation
   */
  async submitNote(id: string): Promise<Note> {
    const response = await apiClient.post<ApiResponse<Note>>(
      `/notes/${id}/submit`
    );
    return response.data.data;
  },
};

