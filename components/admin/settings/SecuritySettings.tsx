'use client'
import { useState } from 'react'
import { SecuritySettings } from '@/types/settings'
import { SettingsService, SettingsValidations } from '@/lib/settings'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SecuritySettingsProps {
  settings: SecuritySettings
  onSettingsChange: (settings: SecuritySettings) => void
}

export function SecuritySettings({ settings, onSettingsChange }: SecuritySettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [newIp, setNewIp] = useState('')

  const handleSave = async () => {
    const timeoutError = SettingsValidations.validateSessionTimeout(settings.sessionTimeout)
    if (timeoutError) return

    setIsLoading(true)
    try {
      await SettingsService.saveSecuritySettings(settings)
    } catch (error) {
      console.error('Error saving security settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = <K extends keyof SecuritySettings>(key: K, value: SecuritySettings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const addIp = () => {
    if (newIp && !settings.ipWhitelist.includes(newIp)) {
      updateSetting('ipWhitelist', [...settings.ipWhitelist, newIp])
      setNewIp('')
    }
  }

  const removeIp = (ipToRemove: string) => {
    updateSetting('ipWhitelist', settings.ipWhitelist.filter(ip => ip !== ipToRemove))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
        <p className="mt-1 text-sm text-gray-600">
          Configurez les paramètres de sécurité de votre organisation
        </p>
      </div>

      <div className="space-y-6">
        {/* 2FA */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
            <p className="text-sm text-gray-500">
              Exiger la 2FA pour tous les utilisateurs
            </p>
          </div>
          <Switch
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
          />
        </div>

        {/* Session Timeout */}
        <div className="py-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Délai d'expiration de session (minutes)
          </label>
          <Input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value) || 0)}
            className="max-w-xs"
            min="5"
            max="480"
          />
        </div>

        {/* Password Policy */}
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Politique de mot de passe</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Longueur minimale (8 caractères)</span>
              <span className="text-sm font-medium">{settings.passwordPolicy.minLength} caractères</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Exiger des majuscules et minuscules</span>
              <Switch
                checked={settings.passwordPolicy.requireUppercase}
                onCheckedChange={(checked) => updateSetting('passwordPolicy', {
                  ...settings.passwordPolicy,
                  requireUppercase: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Exiger des chiffres</span>
              <Switch
                checked={settings.passwordPolicy.requireNumbers}
                onCheckedChange={(checked) => updateSetting('passwordPolicy', {
                  ...settings.passwordPolicy,
                  requireNumbers: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Exiger des caractères spéciaux</span>
              <Switch
                checked={settings.passwordPolicy.requireSpecialChars}
                onCheckedChange={(checked) => updateSetting('passwordPolicy', {
                  ...settings.passwordPolicy,
                  requireSpecialChars: checked
                })}
              />
            </div>
          </div>
        </div>

        {/* IP Whitelist */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Liste blanche IP</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="192.168.1.1"
                className="flex-1"
              />
              <Button onClick={addIp} variant="outline">
                Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {settings.ipWhitelist.map(ip => (
                <div key={ip} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm font-mono">{ip}</span>
                  <button
                    onClick={() => removeIp(ip)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
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