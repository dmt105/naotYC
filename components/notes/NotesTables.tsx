'use client'
import Link from 'next/link'
import { Note } from '@/types'
import { StatusBadge } from '@/components/ui/StatusBadge'
import ActionMenu from '@/components/notes/ActionMenu'

interface NotesTableProps {
  notes: Note[]
}

export function NotesTables({ notes }: NotesTableProps) {
  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 text-lg">Aucune note trouvée</p>
        <p className="text-gray-400 mt-2">
          Créez votre première note pour commencer
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* En-têtes pour desktop */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="md:col-span-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Titre
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Statut
          </span>
        </div>
        <div className="md:col-span-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Dernière modification
          </span>
        </div>
        <div className="md:col-span-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </span>
        </div>
      </div>

      {/* Liste des notes */}
      <div className="divide-y divide-gray-200">
        {notes.map((note) => (
          <NotesCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

interface NotesCardProps {
  note: Note
}

function NotesCard({ note }: NotesCardProps) {
  const getTypeLabel = (type: Note['type']) => {
    const labels = {
      ANNOUNCEMENT: 'Annonce',
      MEETING: 'Réunion',
      REPORT: 'Rapport',
      OTHER: 'Autre'
    }
    return labels[type]
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
      {/* Version mobile */}
      <div className="md:hidden space-y-3">
        <div className="flex justify-between items-start">
          <Link 
            href={`/notes/${note.id}`}
            className="text-sm font-medium text-primary hover:text-primary/80 flex-1"
          >
            {note.title}
          </Link>
          <ActionMenu note={note} />
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {note.content.substring(0, 100)}...
        </p>
        
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {getTypeLabel(note.type)}
          </span>
          <StatusBadge status={note.status} />
        </div>
        
        <div className="text-xs text-gray-500">
          Modifié le {formatDate(note.updatedAt)}
        </div>
      </div>

      {/* Version desktop */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4">
          <Link 
            href={`/notes/${note.id}`}
            className="block text-sm font-medium text-primary hover:text-primary/80 mb-1"
          >
            {note.title}
          </Link>
          <p className="text-sm text-gray-500 truncate">
            {note.content.substring(0, 60)}...
          </p>
        </div>
        
        <div className="md:col-span-2">
          <span className="text-sm text-gray-900">
            {getTypeLabel(note.type)}
          </span>
        </div>
        
        <div className="md:col-span-2">
          <StatusBadge status={note.status} />
        </div>
        
        <div className="md:col-span-3">
          <span className="text-sm text-gray-500">
            {formatDate(note.updatedAt)}
          </span>
        </div>
        
        <div className="md:col-span-1 flex justify-end">
          <ActionMenu note={note} />
        </div>
      </div>
    </div>
  )
}
