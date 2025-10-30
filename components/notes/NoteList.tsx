import { NoteDTO } from '@/types/notes'
import { NoteCard } from './NoteCard'

interface NoteListProps {
  notes: NoteDTO[]
  title: string
  emptyMessage: string
  showActions?: boolean
  onEdit?: (note: NoteDTO) => void
  onDelete?: (noteId: string) => void
  onSubmit?: (noteId: string) => void
  loading?: boolean
}

export function NoteList({ 
  notes, 
  title, 
  emptyMessage, 
  showActions = false, 
  onEdit, 
  onDelete, 
  onSubmit,
  loading = false 
}: NoteListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {notes.length}
        </span>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              showActions={showActions}
              onEdit={onEdit}
              onDelete={onDelete}
              onSubmit={onSubmit}
            />
          ))}
        </div>
      )}
    </div>
  )
}