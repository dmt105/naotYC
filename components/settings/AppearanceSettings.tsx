/**
 * Appearance settings component - Brand colors and theme
 */

'use client';

import { useState } from 'react';
import { Save, Palette, Image, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

export function AppearanceSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    primaryColor: '#010b40',
    secondaryColor: '#f13544',
    accentColor: '#999999',
    logoUrl: '',
    faviconUrl: '',
    primaryFont: 'Ubuntu',
    secondaryFont: 'Century Gothic',
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Paramètres d\'apparence sauvegardés');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand Colors */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Couleurs de la marque
          </CardTitle>
          <CardDescription>
            Personnalisez les couleurs de l'application selon la charte graphique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur principale (Bleu)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  placeholder="#010b40"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur secondaire (Fuchsia)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  placeholder="#f13544"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Couleur d'accent (Gris)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="accentColor"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  placeholder="#999999"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Aperçu :</p>
            <div className="flex gap-2">
              <div
                className="h-12 flex-1 rounded"
                style={{ backgroundColor: settings.primaryColor }}
              />
              <div
                className="h-12 flex-1 rounded"
                style={{ backgroundColor: settings.secondaryColor }}
              />
              <div
                className="h-12 flex-1 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: settings.accentColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo and Images */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Image className="h-5 w-5" />
            Logo et images
          </CardTitle>
          <CardDescription>
            Téléchargez le logo et le favicon de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL du logo
            </label>
            <Input
              id="logoUrl"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              placeholder="/logo.png"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Ou téléchargez un fichier
            </p>
          </div>

          <div>
            <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL du favicon
            </label>
            <Input
              id="faviconUrl"
              value={settings.faviconUrl}
              onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
              placeholder="/favicon.ico"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fonts */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Type className="h-5 w-5" />
            Polices de caractères
          </CardTitle>
          <CardDescription>
            Configurez les polices utilisées dans l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="primaryFont" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Police principale
            </label>
            <select
              id="primaryFont"
              value={settings.primaryFont}
              onChange={(e) => setSettings({ ...settings, primaryFont: e.target.value })}
              className="flex h-10 w-full rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              <option value="Ubuntu">Ubuntu</option>
              <option value="Roboto">Roboto</option>
              <option value="Inter">Inter</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>

          <div>
            <label htmlFor="secondaryFont" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Police secondaire
            </label>
            <select
              id="secondaryFont"
              value={settings.secondaryFont}
              onChange={(e) => setSettings({ ...settings, secondaryFont: e.target.value })}
              className="flex h-10 w-full rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              <option value="Century Gothic">Century Gothic</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Lato">Lato</option>
            </select>
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

