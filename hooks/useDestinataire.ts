import { useState, useCallback } from 'react';
import { notesService } from '@/services/notes.service';
import { NoteDTO, NoteSummaryDTO, DashboardStatsDTO, ReceptionStatus } from '@/types/notes';

export const useRecipientNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDashboardStats = useCallback(async (): Promise<DashboardStatsDTO> => {
    setLoading(true);
    setError(null);
    try {
      const stats = await notesService.getRecipientDashboard();
      return stats;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReceivedNotes = useCallback(async (params?: {
    status?: ReceptionStatus;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notesService.getReceivedNotes(params);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des notes';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const markNoteAsRead = useCallback(async (noteId: string): Promise<void> => {
    setError(null);
    try {
      await notesService.markAsRead(noteId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du marquage comme lu';
      setError(message);
      throw err;
    }
  }, []);

  const archiveNote = useCallback(async (noteId: string): Promise<void> => {
    setError(null);
    try {
      await notesService.archiveNote(noteId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'archivage';
      setError(message);
      throw err;
    }
  }, []);

  const addToCalendar = useCallback(async (noteId: string): Promise<{ success: boolean; calendarUrl?: string }> => {
    setError(null);
    try {
      const result = await notesService.addToCalendar(noteId);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'ajout au calendrier';
      setError(message);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    getDashboardStats,
    getReceivedNotes,
    markNoteAsRead,
    archiveNote,
    addToCalendar,
    clearError: () => setError(null)
  };
};