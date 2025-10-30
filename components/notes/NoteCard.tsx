import { NoteDTO } from '@/types/notes'
import {StatusBadge} from '@/components/ui/StatusBadge'
import Link from 'next/link'

interface NoteCardProps {
  note: NoteDTO
  showActions?: boolean
  onEdit?: (note: NoteDTO) => void
  onDelete?: (noteId: string) => void
  onSubmit?: (noteId: string) => void
}

export function NoteCard({ note, showActions = false, onEdit, onDelete, onSubmit }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {note.content}
          </p>
        </div>
        <StatusBadge status={note.status} /> 
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>{formatDate(note.updatedAt)}</span>
        <span>{note.recipients.length} destinataire(s)</span>
      </div>

      {showActions && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/notes/${note.id}`}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Voir
          </Link>
          
          {note.status === 'DRAFT' && (
            <>
              <button
                onClick={() => onEdit?.(note)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Modifier
              </button>
              <button
                onClick={() => onSubmit?.(note.id)}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Soumettre
              </button>
            </>
          )}
          
          {note.status === 'RETURNED' && (
            <button
              onClick={() => onEdit?.(note)}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              Corriger
            </button>
          )}
          
          {(note.status === 'DRAFT' || note.status === 'RETURNED') && (
            <button
              onClick={() => onDelete?.(note.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium ml-auto"
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  )
}