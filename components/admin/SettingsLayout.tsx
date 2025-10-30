'use client'
import { ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { SettingsTab } from '@/types/settings'

interface SettingsLayoutProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
  children: ReactNode
}

export function SettingsLayout({ activeTab, onTabChange, children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Paramètres Administrateur</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gérez les paramètres de votre organisation NaotY
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <SidebarNav activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}