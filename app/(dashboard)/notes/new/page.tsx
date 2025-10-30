'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NoteEditor } from '@/components/notes/NoteEditor'
import { NoteCreateDTO } from '@/types/notes'
import { notesService } from '@/services/notes.service'

export default function NewNotePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveDraft = async (noteData: NoteCreateDTO) => {
    try {
      setIsSubmitting(true)
      await notesService.createNote(noteData)
      router.push('/dashboard/redacteur')
    } catch (error) {
      console.error('Failed to save draft:', error)
      alert('Erreur lors de la sauvegarde du brouillon')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (noteData: NoteCreateDTO) => {
    try {
      setIsSubmitting(true)
      const note = await notesService.createNote(noteData)
      await notesService.submitForValidation(note.id)
      router.push('/dashboard/redacteur')
    } catch (error) {
      console.error('Failed to submit note:', error)
      alert('Erreur lors de la soumission de la note')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau document</h1>
          <p className="text-gray-600 mt-1">Rédigez et structurez votre document interne</p>
        </div>
      </div>

      {/* Éditeur de note */}
      <NoteEditor
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}