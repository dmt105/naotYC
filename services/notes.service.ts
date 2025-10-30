import { NoteDTO, NoteCreateDTO, NoteUpdateDTO, NoteStatus } from '@/types/notes'

class NotesService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL

  async getNotesByStatus(status: NoteStatus[]): Promise<NoteDTO[]> {
    const response = await fetch(`${this.baseURL}/notes?status=${status.join(',')}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (!response.ok) throw new Error('Failed to fetch notes')
    return response.json()
  }

  async getDrafts(): Promise<NoteDTO[]> {
    return this.getNotesByStatus([NoteStatus.DRAFT])
  }

  async getPendingValidation(): Promise<NoteDTO[]> {
    return this.getNotesByStatus([NoteStatus.PENDING_VALIDATION])
  }

  async getReturned(): Promise<NoteDTO[]> {
    return this.getNotesByStatus([NoteStatus.RETURNED])
  }

  async getScheduled(): Promise<NoteDTO[]> {
    return this.getNotesByStatus([NoteStatus.SCHEDULED])
  }

  async createNote(noteData: NoteCreateDTO): Promise<NoteDTO> {
    const formData = new FormData()
    Object.entries(noteData).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob)
    })

    const response = await fetch(`${this.baseURL}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })

    if (!response.ok) throw new Error('Failed to create note')
    return response.json()
  }

  async submitForValidation(noteId: string): Promise<NoteDTO> {
    const response = await fetch(`${this.baseURL}/notes/${noteId}/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) throw new Error('Failed to submit note')
    return response.json()
  }

  async updateNote(noteId: string, noteData: NoteUpdateDTO): Promise<NoteDTO> {
    const formData = new FormData()
    Object.entries(noteData).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob)
    })

    const response = await fetch(`${this.baseURL}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })

    if (!response.ok) throw new Error('Failed to update note')
    return response.json()
  }

  async deleteNote(noteId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) throw new Error('Failed to delete note')
  }
}

export const notesService = new NotesService()