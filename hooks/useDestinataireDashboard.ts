import { useState, useCallback, useEffect } from 'react';
import { recipientService } from '@/services/destinataire.service';
import { RecipientDashboard, RecipientPreferences } from '@/types/destinataire';

export const useRecipientDashboard = () => {
  const [dashboard, setDashboard] = useState<RecipientDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await recipientService.getDashboard();
      setDashboard(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement du dashboard';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshDashboard = useCallback(async () => {
    if (!loading) {
      return loadDashboard();
    }
  }, [loading, loadDashboard]);

  const updatePreferences = useCallback(async (preferences: Partial<RecipientPreferences>) => {
    try {
      const updated = await recipientService.updatePreferences(preferences);
      setDashboard(prev => prev ? { ...prev, preferences: updated } : null);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour des préférences';
      setError(message);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard,
    updatePreferences,
    clearError: () => setError(null)
  };
};