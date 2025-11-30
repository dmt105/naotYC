// src/services/recipient.service.ts
import { axiosClient } from './api/axiosClient';
import {
  RecipientDashboard,
  RecipientNoteDetail,
  RecipientNoteSummary,
  RecipientPreferences,
  RecipientFilters,
  BulkActionRequest,
  CalendarIntegration
} from '@/types/destinataire';

export const recipientService = {
  // Dashboard et statistiques
  async getDashboard(): Promise<RecipientDashboard> {
    const response = await axiosClient.get('/api/recipient/dashboard');
    return response.data;
  },

  // Notes avec pagination et filtres
  async getNotes(params?: {
    filters?: RecipientFilters;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    notes: RecipientNoteSummary[];
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
  }> {
    const response = await axiosClient.get('/api/recipient/notes', { params });
    return response.data;
  },

  // Détails d'une note spécifique
  async getNoteDetail(noteId: string): Promise<RecipientNoteDetail> {
    const response = await axiosClient.get(`/api/recipient/notes/${noteId}`);
    return response.data;
  },

  // Actions sur les notes
  async markAsRead(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/read`);
  },

  async markAsUnread(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/unread`);
  },

  async archiveNote(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/archive`);
  },

  async unarchiveNote(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/unarchive`);
  },

  // Actions groupées
  async bulkActions(request: BulkActionRequest): Promise<{ success: number; failed: number }> {
    const response = await axiosClient.post('/api/recipient/notes/bulk-actions', request);
    return response.data;
  },

  // Intégration calendrier
  async addToCalendar(noteId: string): Promise<{ success: boolean; eventUrl?: string; eventId?: string }> {
    const response = await axiosClient.post(`/api/recipient/notes/${noteId}/add-to-calendar`);
    return response.data;
  },

  async removeFromCalendar(noteId: string): Promise<void> {
    await axiosClient.delete(`/api/recipient/notes/${noteId}/calendar-event`);
  },

  async getCalendarIntegration(): Promise<CalendarIntegration> {
    const response = await axiosClient.get('/api/recipient/calendar/integration');
    return response.data;
  },

  async connectCalendar(): Promise<{ authUrl: string }> {
    const response = await axiosClient.post('/api/recipient/calendar/connect');
    return response.data;
  },

  async disconnectCalendar(): Promise<void> {
    await axiosClient.delete('/api/recipient/calendar/disconnect');
  },

  // Préférences
  async getPreferences(): Promise<RecipientPreferences> {
    const response = await axiosClient.get('/api/recipient/preferences');
    return response.data;
  },

  async updatePreferences(preferences: Partial<RecipientPreferences>): Promise<RecipientPreferences> {
    const response = await axiosClient.put('/api/recipient/preferences', preferences);
    return response.data;
  },

  // Recherche avancée
  async searchNotes(query: string, filters?: RecipientFilters): Promise<RecipientNoteSummary[]> {
    const response = await axiosClient.get('/api/recipient/notes/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  },

  // Téléchargement de pièces jointes
  async downloadAttachment(noteId: string, attachmentId: string): Promise<Blob> {
    const response = await axiosClient.get(
      `/api/recipient/notes/${noteId}/attachments/${attachmentId}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  },

  // Export des notes
  async exportNotes(filters?: RecipientFilters, format: 'PDF' | 'CSV' = 'PDF'): Promise<Blob> {
    const response = await axiosClient.get('/api/recipient/notes/export', {
      params: { format, ...filters },
      responseType: 'blob'
    });
    return response.data;
  }
};