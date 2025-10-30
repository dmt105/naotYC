import { useState, useEffect } from 'react'
import { NoteDTO, NoteStatus } from '@/types/notes'
import { notesService } from '@/services/notes.service'

export const useNotes = (statuses: NoteStatus[]) => {
  const [notes, setNotes] = useState<NoteDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const data = await notesService.getNotesByStatus(statuses)
        setNotes(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notes')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [statuses.join(',')])

  const refetch = () => {
    setLoading(true)
    notesService.getNotesByStatus(statuses)
      .then(setNotes)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  return { notes, loading, error, refetch }
}