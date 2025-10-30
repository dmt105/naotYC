'use client'
import { useState } from 'react'
import Link from 'next/link'
import { KpiCard } from '@/components/ui/kpiCard'
import { NoteList } from '@/components/notes/NoteList'
import { useNotes } from '@/hooks/useNotes'
import { NoteStatus } from '@/types/enum'
import { NoteDTO } from '@/types/notes'
import { notesService } from '@/services/notes.service'

export default function RedacteurDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'drafts' | 'pending' | 'returned' | 'scheduled'>('overview')
  
  // Fetch data for different statuses
  const { notes: drafts, loading: draftsLoading, refetch: refetchDrafts } = useNotes([NoteStatus.DRAFT])
  const { notes: pending, loading: pendingLoading, refetch: refetchPending } = useNotes([NoteStatus.PENDING_VALIDATION])
  const { notes: returned, loading: returnedLoading, refetch: refetchReturned } = useNotes([NoteStatus.RETURNED])
  const { notes: scheduled, loading: scheduledLoading, refetch: refetchScheduled } = useNotes([NoteStatus.SCHEDULED, NoteStatus.APPROVED])

  const handleSubmitNote = async (noteId: string) => {
    try {
      await notesService.submitForValidation(noteId)
      refetchDrafts()
      refetchPending()
    } catch (error) {
      console.error('Failed to submit note:', error)
      alert('Erreur lors de la soumission de la note')
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      try {
        await notesService.deleteNote(noteId)
        refetchDrafts()
        refetchReturned()
      } catch (error) {
        console.error('Failed to delete note:', error)
        alert('Erreur lors de la suppression de la note')
      }
    }
  }

  const handleEditNote = (note: NoteDTO) => {
    // Naviguer vers l'éditeur de note
    window.location.href = `/notes/${note.id}/edit`
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', count: null },
    { id: 'drafts', name: 'Brouillons', count: drafts.length },
    { id: 'pending', name: 'En validation', count: pending.length },
    { id: 'returned', name: 'Retournées', count: returned.length },
    { id: 'scheduled', name: 'Planifiées', count: scheduled.length },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard
                title="Brouillons"
                value={drafts.length}
                subtitle="Notes en cours de rédaction"
                icon={
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              />
              <KpiCard
                title="En validation"
                value={pending.length}
                subtitle="En attente de validation"
                icon={
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <KpiCard
                title="Retournées"
                value={returned.length}
                subtitle="À corriger"
                icon={
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              />
              <KpiCard
                title="Planifiées"
                value={scheduled.length}
                subtitle="Notes programmées"
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/notes/new"
                  className="inline-flex items-center px-4 py-2 text-white rounded-lg bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouvelle note
                </Link>
                <Link
                  href="/notes"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Toutes les notes
                </Link>
              </div>
            </div>

            {/* Recent Notes Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NoteList
                notes={drafts.slice(0, 3)}
                title="Brouillons récents"
                emptyMessage="Aucun brouillon en cours"
                showActions={true}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onSubmit={handleSubmitNote}
                loading={draftsLoading}
              />
              <NoteList
                notes={returned.slice(0, 3)}
                title="Notes à corriger"
                emptyMessage="Aucune note à corriger"
                showActions={true}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onSubmit={handleSubmitNote}
                loading={returnedLoading}
              />
            </div>
          </div>
        )

      case 'drafts':
        return (
          <NoteList
            notes={drafts}
            title="Mes brouillons"
            emptyMessage="Aucun brouillon. Créez votre première note !"
            showActions={true}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onSubmit={handleSubmitNote}
            loading={draftsLoading}
          />
        )

      case 'pending':
        return (
          <NoteList
            notes={pending}
            title="Notes en validation"
            emptyMessage="Aucune note en cours de validation"
            loading={pendingLoading}
          />
        )

      case 'returned':
        return (
          <NoteList
            notes={returned}
            title="Notes retournées"
            emptyMessage="Aucune note retournée pour correction"
            showActions={true}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onSubmit={handleSubmitNote}
            loading={returnedLoading}
          />
        )

      case 'scheduled':
        return (
          <NoteList
            notes={scheduled}
            title="Notes planifiées"
            emptyMessage="Aucune note planifiée"
            loading={scheduledLoading}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Rédacteur</h1>
          <p className="text-gray-600 mt-1">Gérez vos notes et suivez leur progression</p>
        </div>
        <Link
          href="/notes/new"
          className="inline-flex items-center px-4 py-2 text-white rounded-lg bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer transition-colors mt-4 sm:mt-0"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle note
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count !== null && (
                <span className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}