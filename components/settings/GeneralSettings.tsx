/**
 * General settings component
 */

'use client';

import { useState } from 'react';
import { Save, Building, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

export function GeneralSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'NaotY',
    organizationName: 'Youth Computing',
    organizationEmail: 'contact@youthcomputing.org',
    organizationAddress: '',
    organizationPhone: '',
    defaultLanguage: 'fr',
    timezone: 'Indian/Antananarivo',
    maintenanceMode: false,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Paramètres généraux sauvegardés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Application Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white">Paramètres de l'application</CardTitle>
          <CardDescription>
            Configurez les informations générales de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de l'application
            </label>
            <Input
              id="appName"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              placeholder="NaotY"
            />
          </div>

          <div>
            <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Langue par défaut
            </label>
            <select
              id="defaultLanguage"
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
              className="flex h-10 w-full rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuseau horaire
            </label>
            <Input
              id="timezone"
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              placeholder="Indian/Antananarivo"
            />
          </div>
        </CardContent>
      </Card>

      {/* Organization Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Building className="h-5 w-5" />
            Informations de l'organisation
          </CardTitle>
          <CardDescription>
            Informations sur Youth Computing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de l'organisation
            </label>
            <Input
              id="organizationName"
              value={settings.organizationName}
              onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
              placeholder="Youth Computing"
            />
          </div>

          <div>
            <label htmlFor="organizationEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email de contact
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="organizationEmail"
                type="email"
                value={settings.organizationEmail}
                onChange={(e) => setSettings({ ...settings, organizationEmail: e.target.value })}
                className="pl-10"
                placeholder="contact@youthcomputing.org"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organizationPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Téléphone
            </label>
            <Input
              id="organizationPhone"
              value={settings.organizationPhone}
              onChange={(e) => setSettings({ ...settings, organizationPhone: e.target.value })}
              placeholder="+261 XX XX XXX XX"
            />
          </div>

          <div>
            <label htmlFor="organizationAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Adresse
            </label>
            <Textarea
              id="organizationAddress"
              value={settings.organizationAddress}
              onChange={(e) => setSettings({ ...settings, organizationAddress: e.target.value })}
              placeholder="Adresse complète..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white">Mode maintenance</CardTitle>
          <CardDescription>
            Activez le mode maintenance pour restreindre l'accès à l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Mode maintenance
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Seuls les administrateurs pourront accéder à l'application
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#010b40] dark:peer-focus:ring-[#f13544] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#f13544]"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#010b40] hover:bg-[#010b40]/90 dark:bg-[#f13544] dark:hover:bg-[#f13544]/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </div>
  );
}

