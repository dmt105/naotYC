'use client'
import { useState } from 'react'
import { StatsOverview } from '@/components/admin/StatsOverview'
import { UserManagementTable } from '@/components/admin/UserManagementTable'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { useSystemStats } from '@/hooks/useAdmin'
import { useUsersManagement } from '@/hooks/useAdmin'
import { UserManagement } from '@/types/admin'
import { TemplateManagement } from '@/components/admin/TemplateManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'templates' | 'logs' | 'settings'>('overview')
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const { stats, loading: statsLoading } = useSystemStats()
  const { 
    users, 
    loading: usersLoading, 
    deleteUser, 
    resetPassword,
    refetch: refetchUsers 
  } = useUsersManagement()

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId)
    setConfirmModal({
      isOpen: true,
      title: 'Supprimer l\'utilisateur',
      message: `Êtes-vous sûr de vouloir supprimer l'utilisateur "${user?.name}" ? Cette action est irréversible.`,
      onConfirm: () => {
        deleteUser(userId)
        refetchUsers()
      }
    })
  }

  const handleResetPassword = async (userId: string) => {
    try {
      const result = await resetPassword(userId)
      setConfirmModal({
        isOpen: true,
        title: 'Mot de passe réinitialisé',
        message: `Le mot de passe a été réinitialisé. Le mot de passe temporaire est : ${result.temporaryPassword}`,
        onConfirm: () => {}
      })
    } catch (error) {
      console.error('Failed to reset password:', error)
    }
  }

  const handleEditUser = (user: UserManagement) => {
    // Implémentation de l'édition d'utilisateur
    console.log('Edit user:', user)
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: '📊' },
    { id: 'users', name: 'Utilisateurs', icon: '👥', count: users.length },
    { id: 'templates', name: 'Modèles', icon: '📋', count: 12 },
    { id: 'logs', name: 'Journaux', icon: '📝', count: 156 },
    { id: 'settings', name: 'Paramètres', icon: '⚙️' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 lg:space-y-6">
            <StatsOverview stats={stats!} loading={statsLoading} />
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Actions rapides</h3>
                <div className="space-y-2 lg:space-y-3">
                  <button className="w-full text-left p-2 lg:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <span className="text-base lg:text-lg">👤</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm lg:text-base truncate">Ajouter un utilisateur</div>
                        <div className="text-xs lg:text-sm text-gray-500 truncate">Créer un nouveau compte</div>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-2 lg:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <span className="text-base lg:text-lg">📋</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm lg:text-base truncate">Créer un modèle</div>
                        <div className="text-xs lg:text-sm text-gray-500 truncate">Nouveau modèle de document</div>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-2 lg:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <span className="text-base lg:text-lg">📊</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm lg:text-base truncate">Générer un rapport</div>
                        <div className="text-xs lg:text-sm text-gray-500 truncate">Rapport d'activité du système</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Activité récente</h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">Nouvel utilisateur inscrit</div>
                      <div className="text-xs lg:text-sm text-gray-500">Il y a 5 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">Document généré</div>
                      <div className="text-xs lg:text-sm text-gray-500">Il y a 12 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">Modèle mis à jour</div>
                      <div className="text-xs lg:text-sm text-gray-500">Il y a 1 heure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">État du système</h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Serveur API</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex-shrink-0">En ligne</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Base de données</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex-shrink-0">Opérationnelle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Stockage</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex-shrink-0">78% utilisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Gestion des utilisateurs</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm lg:text-base">
                + Ajouter un utilisateur
              </button>
            </div>
            <div className="overflow-hidden">
              <UserManagementTable
                users={users}
                loading={usersLoading}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onResetPassword={handleResetPassword}
              />
            </div>
          </div>
        )

      case 'templates':
        return (
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Gestion des modèles</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm lg:text-base">
                + Nouveau modèle
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <p className="text-gray-500 text-sm lg:text-base">Interface de gestion des modèles à implémenter...</p>
              
            </div>
          </div>
        )

      case 'logs':
        return (
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Journaux système</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base order-2 sm:order-1">
                  Exporter les logs
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base order-1 sm:order-2">
                  Filtrer
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <p className="text-gray-500 text-sm lg:text-base">Interface des journaux système à implémenter...</p>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Paramètres système</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <p className="text-gray-500 text-sm lg:text-base">Interface des paramètres système à implémenter...</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Tableau de bord administrateur</h1>
          <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">Gérez votre plateforme et surveillez les activités</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 lg:mb-6 overflow-x-auto">
          <div className="border-b border-gray-200 min-w-max sm:min-w-0">
            <nav className="flex px-4 sm:px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center py-3 lg:py-4 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-1 sm:mr-2 text-base sm:text-lg">{tab.icon}</span>
                  <span className="hidden xs:inline">{tab.name}</span>
                  {tab.count !== undefined && (
                    <span className={`
                      ml-1 sm:ml-2 py-0.5 px-1.5 sm:px-2 text-xs rounded-full flex-shrink-0
                      ${activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={() => {
          confirmModal.onConfirm()
          setConfirmModal(prev => ({ ...prev, isOpen: false }))
        }}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}