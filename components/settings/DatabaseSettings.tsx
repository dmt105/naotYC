/**
 * Database settings component
 */

"use client";

import React, { useState } from 'react';
import { Save, Database, Download, Upload, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';

export function DatabaseSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily', // daily, weekly, monthly
    backupRetention: 30, // days
    lastBackup: '2025-01-15T10:00:00Z',
  });

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Sauvegarde créée avec succès');
      setBackupSettings({
        ...backupSettings,
        lastBackup: new Date().toISOString(),
      });
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!confirm('Êtes-vous sûr de vouloir restaurer la base de données ? Cette action est irréversible.')) {
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Base de données restaurée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la restauration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCache = async () => {
    if (!confirm('Voulez-vous vraiment vider le cache ?')) {
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Cache vidé avec succès');
    } catch (error) {
      toast.error('Erreur lors du vidage du cache');
    } finally {
      setIsLoading(false);
    }
  };

  const ToggleSwitch = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#010b40] dark:peer-focus:ring-[#f13544] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#f13544]"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Backup Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5" />
            Sauvegarde automatique
          </CardTitle>
          <CardDescription>
            Configurez les sauvegardes automatiques de la base de données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleSwitch
            label="Sauvegarde automatique"
            description="Créer automatiquement des sauvegardes de la base de données"
            checked={backupSettings.autoBackup}
            onChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
          />

          {backupSettings.autoBackup && (
            <>
              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fréquence de sauvegarde
                </label>
                <select
                  id="backupFrequency"
                  value={backupSettings.backupFrequency}
                  onChange={(e) =>
                    setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              <div>
                <label htmlFor="backupRetention" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conservation des sauvegardes (jours)
                </label>
                <Input
                  id="backupRetention"
                  type="number"
                  min="1"
                  max="365"
                  value={backupSettings.backupRetention}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBackupSettings({
                      ...backupSettings,
                      backupRetention: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Dernière sauvegarde :</strong>{' '}
                  {new Date(backupSettings.lastBackup).toLocaleString('fr-FR')}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Manual Backup */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white">Actions manuelles</CardTitle>
          <CardDescription>
            Effectuez des actions manuelles sur la base de données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleBackup}
            disabled={isLoading}
            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Créer une sauvegarde maintenant
          </Button>

          <Button
            onClick={handleRestore}
            disabled={isLoading}
            variant="outline"
            className="w-full justify-start"
          >
            <Upload className="h-4 w-4 mr-2" />
            Restaurer depuis une sauvegarde
          </Button>

          <Button
            onClick={handleClearCache}
            disabled={isLoading}
            variant="outline"
            className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Vider le cache
          </Button>
        </CardContent>
      </Card>

      {/* Database Info */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white">Informations de la base de données</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Type :</span>
              <span className="text-gray-900 dark:text-white font-medium">PostgreSQL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version :</span>
              <span className="text-gray-900 dark:text-white font-medium">15.x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Taille :</span>
              <span className="text-gray-900 dark:text-white font-medium">~250 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tables :</span>
              <span className="text-gray-900 dark:text-white font-medium">12</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}





