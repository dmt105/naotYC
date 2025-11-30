'use client'
import { RecipientNoteDetail } from '@/types/destinataire'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { UrgencyBadge } from '../ui/UrgencyBadge'
import { useState } from 'react'
import { recipientService } from '@/services/destinataire.service' // Correction ici

interface NoteCardProps {
  note: RecipientNoteDetail
  onStatusChange?: () => void
  onAddToCalendar?: (noteId: string) => void
}

export function DestinataireNoteCard({ note, onStatusChange, onAddToCalendar }: NoteCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleMarkAsRead = async () => {
    if (note.status === 'READ') return
    
    try {
      setIsLoading(true)
      await recipientService.markAsRead(note.id) // Correction ici
      onStatusChange?.()
    } catch (error) {
      console.error('Failed to mark note as read:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchive = async () => {
    try {
      setIsLoading(true)
      if (note.status === 'ARCHIVED') {
        await recipientService.unarchiveNote(note.id) // Correction ici
      } else {
        await recipientService.archiveNote(note.id) // Correction ici
      }
      onStatusChange?.()
    } catch (error) {
      console.error('Failed to archive note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCalendar = async () => {
    try {
      setIsLoading(true)
      const result = await recipientService.addToCalendar(note.id) // Correction ici
      if (result.success) {
        onAddToCalendar?.(note.id)
      }
    } catch (error) {
      console.error('Failed to add to calendar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className={`bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        note.status === 'UNREAD' ? 'border-l-4 border-l-blue-500' : 'border-gray-200'
      }`}
      onClick={handleMarkAsRead}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{note.title}</h3>
            <UrgencyBadge urgency={note.priority} />
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{note.content}</p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <StatusBadge status={note.status} />
          <span className="text-xs text-gray-500">{note.type}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-4">
          <span>De: {note.author.name}</span>
          <span>•</span>
          <span>{formatDate(note.sentAt || note.createdAt)}</span>
        </div>
        {note.attachments.length > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            {note.attachments.length}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleArchive()
          }}
          disabled={isLoading}
          className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          {note.status === 'ARCHIVED' ? 'Désarchiver' : 'Archiver'}
        </button>
        
        {note.canAddToCalendar && note.scheduledAt && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCalendar()
            }}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 ml-auto"
          >
            Ajouter au calendrier
          </button>
        )}
      </div>
    </div>
  )
}