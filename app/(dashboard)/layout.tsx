//'use client'
import { ReactNode } from 'react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { getCurrentUserRole } from '@/types/auth'
import { getUserByRole } from '@/lib/mock-user'
import { initializeDevelopmentEnvironment } from '@/lib/init-dev'
import { UserRole } from '@/types/user'
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ValidationQueue } from '@/components/dashboard/validation-queue';
import { NotesList } from '@/components/dashboard/notes-list';

interface DashboardLayoutProps {
  children: ReactNode
}

if (typeof window !== 'undefined') {
  initializeDevelopmentEnvironment()
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // In a real app, this would come from the auth service
  let userRole;
  try {
    userRole = await getCurrentUserRole()
  } catch (error) {
    // En cas d'erreur, utiliser un rôle par défaut
    userRole = UserRole.REDACTEUR
  }
  const currentUser = getUserByRole(userRole)
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userRole={userRole} currentUser={currentUser} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}