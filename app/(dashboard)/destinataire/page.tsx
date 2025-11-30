'use client'
import { useState } from 'react'
import { KpiCard } from '@/components/ui/kpiCard'
import { DestinataireNoteCard } from '@/components/destinataire/NoteCard'
import { useRecipientNotes } from '@/hooks/useDestinataire' // Correction ici
import { RecipientNoteDetail } from '@/types/destinataire' // Correction du type

export default function DestinataireDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'unread' | 'all' | 'archived'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Utilisation du hook useRecipientNotes pour récupérer les données
  const { 
    loading: notesLoading, 
    error: notesError,
    getDashboardStats,
    getReceivedNotes,
    markNoteAsRead,
    archiveNote,
    addToCalendar 
  } = useRecipientNotes()

  const [stats, setStats] = useState({
    unreadCount: 0,
    totalReceived: 0,
    archivedCount: 0,
    urgentCount: 0
  })
  const [allNotes, setAllNotes] = useState<RecipientNoteDetail[]>([])
  const [statsLoading, setStatsLoading] = useState(false)

  // Charger les statistiques au montage du composant
  useState(() => {
    const loadStats = async () => {
      setStatsLoading(true)
      try {
        const dashboardStats = await getDashboardStats()
        setStats({
          unreadCount: dashboardStats.unreadCount || 0,
          totalReceived: dashboardStats.totalReceived || 0,
          archivedCount: dashboardStats.archivedCount || 0,
          urgentCount: dashboardStats.urgentCount || 0
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    const loadNotes = async () => {
      try {
        const notesData = await getReceivedNotes({
          status: activeTab === 'unread' ? 'UNREAD' : activeTab === 'archived' ? 'ARCHIVED' : undefined,
          search: searchTerm || undefined,
        })
        setAllNotes(notesData.notes || [])
      } catch (error) {
        console.error('Failed to load notes:', error)
      }
    }

    loadStats()
    loadNotes()
  })

  const handleStatusChange = async () => {
    // Recharger les notes après un changement de statut
    try {
      const notesData = await getReceivedNotes({
        status: activeTab === 'unread' ? 'UNREAD' : activeTab === 'archived' ? 'ARCHIVED' : undefined,
        search: searchTerm || undefined,
      })
      setAllNotes(notesData.notes || [])
      
      // Recharger aussi les stats
      const dashboardStats = await getDashboardStats()
      setStats({
        unreadCount: dashboardStats.unreadCount || 0,
        totalReceived: dashboardStats.totalReceived || 0,
        archivedCount: dashboardStats.archivedCount || 0,
        urgentCount: dashboardStats.urgentCount || 0
      })
    } catch (error) {
      console.error('Failed to refresh data:', error)
    }
  }

  const handleAddToCalendar = (noteId: string) => {
    console.log('Note added to calendar:', noteId)
    // Show success notification
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', count: null },
    { id: 'unread', name: 'Non lues', count: stats.unreadCount },
    { id: 'all', name: 'Toutes les notes', count: stats.totalReceived },
    { id: 'archived', name: 'Archivées', count: stats.archivedCount },
  ]

  const typeFilters = [
    { value: 'all', label: 'Tous types' },
    { value: 'annonce', label: 'Annonces' },
    { value: 'convocation', label: 'Convocations' },
    { value: 'rapport', label: 'Rapports' },
    { value: 'compte-rendu', label: 'Comptes-rendus' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <KpiCard
                title="Non lues"
                value={stats.unreadCount}
                subtitle="Notes à lire"
                icon={
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              <KpiCard
                title="Reçues ce mois"
                value={stats.totalReceived}
                subtitle="Notes totales"
                icon={
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
              <KpiCard
                title="Archivées"
                value={stats.archivedCount}
                subtitle="Notes classées"
                icon={
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                }
              />
              <KpiCard
                title="Urgentes"
                value={stats.urgentCount}
                icon={
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                }
              />
            </div>

            {/* Recent Unread Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notes récentes non lues</h2>
                <button
                  onClick={() => setActiveTab('unread')}
                  className="text-sm text-primary hover:text-primary/80 w-fit"
                >
                  Voir toutes
                </button>
              </div>

              {notesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : allNotes.filter(n => n.status === 'UNREAD').length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm sm:text-base">Aucune note non lue</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {allNotes
                    .filter(n => n.status === 'UNREAD')
                    .slice(0, 5)
                    .map(note => (
                      <DestinataireNoteCard
                        key={note.id}
                        note={note}
                        onStatusChange={handleStatusChange}
                        onAddToCalendar={handleAddToCalendar}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        )

      case 'unread':
      case 'all':
      case 'archived':
        return (
          <div className="space-y-4">
            {notesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 sm:h-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : allNotes.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Aucune note trouvée</h3>
                <p className="text-sm sm:text-base text-gray-500 px-4">
                  {activeTab === 'unread' 
                    ? "Vous n'avez aucune note non lue" 
                    : activeTab === 'archived'
                    ? "Vous n'avez aucune note archivée"
                    : "Aucune note reçue"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {allNotes.map(note => (
                  <DestinataireNoteCard
                    key={note.id}
                    note={note}
                    onStatusChange={handleStatusChange}
                    onAddToCalendar={handleAddToCalendar}
                  />
                ))}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tableau de bord Destinataire</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Consultez et gérez les notes que vous recevez</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto pb-1 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count !== null && (
                <span className={`ml-1 sm:ml-2 py-0.5 px-1.5 sm:px-2 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {statsLoading ? '...' : tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters and Search - Only show for list views */}
      {(activeTab === 'unread' || activeTab === 'all' || activeTab === 'archived') && (
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher dans les notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setTypeFilter(filter.value)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    typeFilter === filter.value
                      ? 'bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {renderContent()}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}