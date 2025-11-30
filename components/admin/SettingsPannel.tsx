import React, { useState } from 'react';

interface SettingsPanelProps {
  settings: Record<string, any>;
  onUpdate: (settings: Record<string, any>) => Promise<void>;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(formData);
    } catch (error) {
      // Error handled in parent
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Paramètres système</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Paramètres de notification */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Rappels de validation
                </label>
                <p className="text-sm text-gray-500">
                  Envoyer des rappels pour les notes en attente de validation
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications?.validationReminders || false}
                onChange={(e) => handleChange('notifications.validationReminders', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notifications par email
                </label>
                <p className="text-sm text-gray-500">
                  Envoyer des notifications par email pour les nouvelles notes
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications?.emailEnabled || false}
                onChange={(e) => handleChange('notifications.emailEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Paramètres d'archivage */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Archivage automatique</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jours avant archivage automatique
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={formData.autoArchiveDays || 30}
                onChange={(e) => handleChange('autoArchiveDays', parseInt(e.target.value))}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Paramètres de sécurité */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Sécurité</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Durée de session (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="1440"
                value={formData.sessionTimeout || 60}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Connexion Google OAuth obligatoire
                </label>
                <p className="text-sm text-gray-500">
                  Forcer l'utilisation de Google OAuth pour la connexion
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.forceGoogleOAuth || false}
                onChange={(e) => handleChange('forceGoogleOAuth', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
          </button>
        </div>
      </form>
    </div>
  );
};