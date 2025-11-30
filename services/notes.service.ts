// src/services/notes.service.ts
import { axiosClient } from './api/axiosClient';
import { NoteDTO, NoteSummaryDTO, DashboardStatsDTO, ReceptionStatus } from '@/types/notes';

export const notesService = {
  // Récupérer les statistiques du dashboard destinataire
  async getRecipientDashboard(): Promise<DashboardStatsDTO> {
    const response = await axiosClient.get('/api/recipient/dashboard');
    return response.data;
  },

  // Lister les notes reçues avec filtres
  async getReceivedNotes(params?: {
    status?: ReceptionStatus;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    notes: NoteSummaryDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await axiosClient.get('/api/recipient/notes', { params });
    return response.data;
  },

  // Récupérer une note spécifique
  async getNoteById(noteId: string): Promise<NoteDTO> {
    const response = await axiosClient.get(`/api/recipient/notes/${noteId}`);
    return response.data;
  },

  // Marquer une note comme lue
  async markAsRead(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/read`);
  },

  // Marquer une note comme archivée
  async archiveNote(noteId: string): Promise<void> {
    await axiosClient.patch(`/api/recipient/notes/${noteId}/archive`);
  },

  // Ajouter au calendrier Google
  async addToCalendar(noteId: string): Promise<{ success: boolean; calendarUrl?: string }> {
    const response = await axiosClient.post(`/api/recipient/notes/${noteId}/add-to-calendar`);
    return response.data;
  }
};