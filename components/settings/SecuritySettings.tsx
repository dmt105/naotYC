/**
 * Security settings component
 */

'use client';

import { useState } from 'react';
import { Save, Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
    enable2FA: false,
    jwtExpiration: 24, // hours
    refreshTokenExpiration: 7, // days
    enableAuditLog: true,
    allowedDomains: ['@youthcomputing.org'],
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Paramètres de sécurité sauvegardés');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
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
      {/* Authentication Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Paramètres d'authentification
          </CardTitle>
          <CardDescription>
            Configurez les règles d'authentification et de sécurité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Délai d'expiration de session (minutes)
            </label>
            <Input
              id="sessionTimeout"
              type="number"
              min="5"
              max="480"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre maximum de tentatives de connexion
            </label>
            <Input
              id="maxLoginAttempts"
              type="number"
              min="3"
              max="10"
              value={settings.maxLoginAttempts}
              onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Longueur minimale du mot de passe
            </label>
            <Input
              id="passwordMinLength"
              type="number"
              min="6"
              max="20"
              value={settings.passwordMinLength}
              onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
            />
          </div>

          <ToggleSwitch
            label="Mots de passe forts requis"
            description="Exiger des majuscules, minuscules, chiffres et caractères spéciaux"
            checked={settings.requireStrongPassword}
            onChange={(checked) => setSettings({ ...settings, requireStrongPassword: checked })}
          />

          <ToggleSwitch
            label="Authentification à deux facteurs (2FA)"
            description="Activer l'authentification à deux facteurs pour tous les utilisateurs"
            checked={settings.enable2FA}
            onChange={(checked) => setSettings({ ...settings, enable2FA: checked })}
          />
        </CardContent>
      </Card>

      {/* JWT Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Key className="h-5 w-5" />
            Paramètres JWT
          </CardTitle>
          <CardDescription>
            Configuration des tokens d'authentification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="jwtExpiration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiration du token d'accès (heures)
            </label>
            <Input
              id="jwtExpiration"
              type="number"
              min="1"
              max="168"
              value={settings.jwtExpiration}
              onChange={(e) => setSettings({ ...settings, jwtExpiration: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label htmlFor="refreshTokenExpiration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiration du refresh token (jours)
            </label>
            <Input
              id="refreshTokenExpiration"
              type="number"
              min="1"
              max="30"
              value={settings.refreshTokenExpiration}
              onChange={(e) => setSettings({ ...settings, refreshTokenExpiration: parseInt(e.target.value) })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Domain Restrictions */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Restrictions de domaine
          </CardTitle>
          <CardDescription>
            Domaines email autorisés pour l'inscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <label htmlFor="allowedDomains" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Domaines autorisés (séparés par des virgules)
            </label>
            <Input
              id="allowedDomains"
              value={settings.allowedDomains.join(', ')}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowedDomains: e.target.value.split(',').map((d) => d.trim()),
                })
              }
              placeholder="@youthcomputing.org, @example.com"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Seuls les emails de ces domaines pourront s'inscrire
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Journal d'audit
          </CardTitle>
          <CardDescription>
            Enregistrer toutes les actions importantes pour la traçabilité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleSwitch
            label="Activer le journal d'audit"
            description="Enregistrer toutes les actions critiques (connexions, modifications, suppressions)"
            checked={settings.enableAuditLog}
            onChange={(checked) => setSettings({ ...settings, enableAuditLog: checked })}
          />
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

