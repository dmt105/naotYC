'use client'

import { SettingsTab } from '@/types/settings'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
}

const navigation = [
  { id: 'general' as SettingsTab, name: 'Général', icon: '⚙️' },
  { id: 'security' as SettingsTab, name: 'Sécurité', icon: '🔒' },
  { id: 'notifications' as SettingsTab, name: 'Notifications', icon: '🔔' },
  { id: 'workflow' as SettingsTab, name: 'Workflow', icon: '📋' },
  { id: 'users' as SettingsTab, name: 'Utilisateurs', icon: '👥' },
  { id: 'integrations' as SettingsTab, name: 'Intégrations', icon: '🔗' },
]

export function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  return (
    <nav className="space-y-1">
      {navigation.map(item => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            activeTab === item.id
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <span className="text-lg">{item.icon}</span>
          {item.name}
        </button>
      ))}
    </nav>
  )
}
