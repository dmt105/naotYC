'use client'
import { useState } from 'react'
import { UserRole } from '@/types/enum'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { getUserByRole } from '@/lib/mock-user'

export default function TestRolesPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.REDACTEUR)
  const currentUser = getUserByRole(selectedRole)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test des Interfaces par Rôle</h1>
        
        {/* Role Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sélectionnez un rôle à tester :</h2>
          <div className="flex flex-wrap gap-3">
            {Object.values(UserRole).map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Aperçu Dashboard - {selectedRole}
            </h2>
            <p className="text-gray-600 text-sm">
              Utilisateur: {currentUser.name} • Département: {currentUser.department || 'N/A'}
            </p>
          </div>
          
          <div className="flex h-96">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200">
              <DashboardSidebar userRole={selectedRole} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <DashboardHeader userRole={selectedRole} currentUser={currentUser} />
              <div className="flex-1 p-6 bg-gray-50">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Dashboard {selectedRole}
                  </h3>
                  <p className="text-gray-600">
                    Interface spécifique pour le rôle {selectedRole.toLowerCase()}
                  </p>
                  <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Interface fonctionnelle et cliquable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}