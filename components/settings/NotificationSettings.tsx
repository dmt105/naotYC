/**
 * Notification settings component
 */

'use client';

import { useState } from 'react';
import { Save, Bell, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    reminderEnabled: true,
    reminderDays: [3, 1, 0], // 3 jours avant, 1 jour avant, jour J
    validationReminders: true,
    commentNotifications: true,
    systemNotifications: true,
    notificationEmail: '',
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Paramètres de notifications sauvegardés');
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
      {/* Notification Preferences */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Préférences de notifications
          </CardTitle>
          <CardDescription>
            Configurez les types de notifications à envoyer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          <ToggleSwitch
            label="Notifications par email"
            description="Recevoir les notifications par email"
            checked={settings.emailNotifications}
            onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
          />
          <ToggleSwitch
            label="Notifications push"
            description="Notifications en temps réel dans l'application"
            checked={settings.pushNotifications}
            onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
          />
          <ToggleSwitch
            label="Rappels de validation"
            description="Rappels automatiques pour les notes en attente"
            checked={settings.validationReminders}
            onChange={(checked) => setSettings({ ...settings, validationReminders: checked })}
          />
          <ToggleSwitch
            label="Notifications de commentaires"
            description="Être notifié lors de nouveaux commentaires"
            checked={settings.commentNotifications}
            onChange={(checked) => setSettings({ ...settings, commentNotifications: checked })}
          />
          <ToggleSwitch
            label="Notifications système"
            description="Notifications importantes du système"
            checked={settings.systemNotifications}
            onChange={(checked) => setSettings({ ...settings, systemNotifications: checked })}
          />
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Paramètres de rappels
          </CardTitle>
          <CardDescription>
            Configurez les rappels automatiques pour les validations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleSwitch
            label="Activer les rappels"
            description="Envoyer des rappels automatiques aux validateurs"
            checked={settings.reminderEnabled}
            onChange={(checked) => setSettings({ ...settings, reminderEnabled: checked })}
          />

          {settings.reminderEnabled && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Jours de rappel avant la date limite :
              </p>
              <div className="space-y-2">
                {[3, 1, 0].map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.reminderDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSettings({
                            ...settings,
                            reminderDays: [...settings.reminderDays, day],
                          });
                        } else {
                          setSettings({
                            ...settings,
                            reminderDays: settings.reminderDays.filter((d) => d !== day),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-[#010b40] focus:ring-[#010b40]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {day === 0
                        ? 'Le jour J'
                        : day === 1
                        ? 'La veille'
                        : `${day} jours avant`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#010b40] dark:text-white flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configuration email
          </CardTitle>
          <CardDescription>
            Email pour l'envoi des notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <label htmlFor="notificationEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email d'envoi
            </label>
            <Input
              id="notificationEmail"
              type="email"
              value={settings.notificationEmail}
              onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
              placeholder="notifications@youthcomputing.org"
            />
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

