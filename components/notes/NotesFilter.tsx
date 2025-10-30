// src/components/notes/NotesFilter.tsx
'use client'
import { useState } from 'react'
import { NoteStatus, NoteType } from '@/types'

interface NotesFilterProps {
  onFilterChange: (filter: {
    status?: NoteStatus
    type?: NoteType
    search: string
  }) => void
}

export default function NotesFilter({ onFilterChange }: NotesFilterProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<NoteStatus | ''>('')
  const [type, setType] = useState<NoteType | ''>('')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({
      status: status as NoteStatus,
      type: type as NoteType,
      search: value
    })
  }

  const handleStatusChange = (value: NoteStatus | '') => {
    setStatus(value)
    onFilterChange({
      status: value as NoteStatus,
      type: type as NoteType,
      search
    })
  }

  const handleTypeChange = (value: NoteType | '') => {
    setType(value)
    onFilterChange({
      status: status as NoteStatus,
      type: value as NoteType,
      search
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Recherche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Titre, contenu..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as NoteStatus | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Tous les statuts</option>
            <option value="DRAFT">Brouillon</option>
            <option value="PENDING_VALIDATION">En validation</option>
            <option value="RETURNED">Retourné</option>
            <option value="APPROVED">Approuvé</option>
            <option value="SCHEDULED">Planifié</option>
            <option value="SENT">Envoyé</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>

        {/* Filtre par type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value as NoteType | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Tous les types</option>
            <option value="ANNOUNCEMENT">Annonce</option>
            <option value="MEETING">Réunion</option>
            <option value="REPORT">Rapport</option>
            <option value="OTHER">Autre</option>
          </select>
        </div>

        {/* Bouton reset */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearch('')
              setStatus('')
              setType('')
              onFilterChange({ search: '' })
            }}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}