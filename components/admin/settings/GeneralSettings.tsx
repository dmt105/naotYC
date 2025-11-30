'use client'
import { useState } from 'react'
import type { GeneralSettings as GeneralSettingsType } from '@/types/settings' // Correction: import type-only
import { SettingsService, SettingsValidations } from '@/lib/settings'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

interface GeneralSettingsProps {
  settings: GeneralSettingsType // Utilisation du type renommé
  onSettingsChange: (settings: GeneralSettingsType) => void
}

const timezones = [
  { value: 'indian/antananarivo', label: 'Antananarivo (UTC+3)' },
  { value: 'europe/paris', label: 'Paris (UTC+1)' },
  { value: 'america/new_york', label: 'New York (UTC-5)' },
]

const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'mg', label: 'Malagasy' },
]

const dateFormats = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]

export function GeneralSettings({ settings, onSettingsChange }: GeneralSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<GeneralSettingsType>>({}) // Utilisation du type renommé

  const handleSave = async () => {
    const nameError = SettingsValidations.validateOrganizationName(settings.organizationName)
    const retentionError = SettingsValidations.validateRetentionPeriod(settings.retentionPeriod)

    if (nameError || retentionError) {
      setErrors({
        organizationName: nameError || undefined,
        retentionPeriod: retentionError || undefined,
      })
      return
    }

    setIsLoading(true)
    try {
      await SettingsService.saveGeneralSettings(settings)
      setErrors({})
    } catch (error) {
      console.error('Error saving general settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = <K extends keyof GeneralSettingsType>(key: K, value: GeneralSettingsType[K]) => {
    onSettingsChange({ ...settings, [key]: value })
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Paramètres Généraux</h2>
        <p className="mt-1 text-sm text-gray-600">
          Configurez les paramètres de base de votre organisation
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de l'organisation
          </label>
          <Input
            value={settings.organizationName}
            onChange={(e) => updateSetting('organizationName', e.target.value)}
            error={errors.organizationName}
            placeholder="Youth Computing"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuseau horaire
            </label>
            <Select
              value={settings.timezone}
              onValueChange={(value) => updateSetting('timezone', value)}
              options={timezones}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Langue
            </label>
            <Select
              value={settings.language}
              onValueChange={(value) => updateSetting('language', value)}
              options={languages}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Format de date
            </label>
            <Select
              value={settings.dateFormat}
              onValueChange={(value) => updateSetting('dateFormat', value)}
              options={dateFormats}
              className="mt-1"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Archivage automatique</h3>
              <p className="text-sm text-gray-500">
                Archiver automatiquement les notes après une période définie
              </p>
            </div>
            <Switch
              checked={settings.autoArchive}
              onCheckedChange={(checked) => updateSetting('autoArchive', checked)}
            />
          </div>

          {settings.autoArchive && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Période de rétention (jours)
              </label>
              <Input
                type="number"
                value={settings.retentionPeriod}
                onChange={(e) => updateSetting('retentionPeriod', parseInt(e.target.value) || 0)}
                error={errors.retentionPeriod}
                className="mt-1 max-w-xs"
                min="30"
                max="3650"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
          </Button>
        </div>
      </div>
    </div>
  )
}