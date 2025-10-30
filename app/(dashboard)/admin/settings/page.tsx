'use client'
import { useState } from 'react'
import { SettingsTab, GeneralSettings, SecuritySettings, NotificationSettings, WorkflowSettings, User, IntegrationSettings } from '@/types/settings'
import { SettingsLayout } from '@/components/admin/SettingsLayout'
import { GeneralSettings as GeneralSettingsComponent } from '@/components/admin/settings/GeneralSettings'
import { SecuritySettings as SecuritySettingsComponent } from '@/components/admin/settings/SecuritySettings'
import { UserManagement } from '@/components/admin/settings/UserManagement'

// Données mockées pour la démonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jean Aimé Raheriniaina',
    email: 'jean.raheriniaina@youthcomputing.org',
    role: 'admin',
    department: 'technique',
    status: 'active',
    lastLogin: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sarah Andriamanjato',
    email: 'sarah.andriamanjato@youthcomputing.org',
    role: 'manager',
    department: 'communication',
    status: 'active',
    lastLogin: new Date('2024-01-14'),
  },
  {
    id: '3',
    name: 'Marc Ravalison',
    email: 'marc.ravalison@youthcomputing.org',
    role: 'user',
    department: 'technique',
    status: 'active',
    lastLogin: new Date('2024-01-13'),
  },
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    organizationName: 'Youth Computing',
    timezone: 'indian/antananarivo',
    language: 'fr',
    dateFormat: 'DD/MM/YYYY',
    autoArchive: true,
    retentionPeriod: 365,
  })
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    ipWhitelist: ['192.168.1.0/24'],
  })
  const [users, setUsers] = useState<User[]>(mockUsers)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettingsComponent
            settings={generalSettings}
            onSettingsChange={setGeneralSettings}
          />
        )
      case 'security':
        return (
          <SecuritySettingsComponent
            settings={securitySettings}
            onSettingsChange={setSecuritySettings}
          />
        )
      case 'users':
        return (
          <UserManagement
            users={users}
            onUsersChange={setUsers}
          />
        )
      case 'notifications':
        return <div className="p-6 text-center text-gray-500">Paramètres de notifications à implémenter</div>
      case 'workflow':
        return <div className="p-6 text-center text-gray-500">Paramètres de workflow à implémenter</div>
      case 'integrations':
        return <div className="p-6 text-center text-gray-500">Paramètres d'intégrations à implémenter</div>
      default:
        return null
    }
  }

  return (
    <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveTab()}
    </SettingsLayout>
  )
}