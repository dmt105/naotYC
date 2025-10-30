'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {TemplateSe}
import {AttachmentUploader} from '@/components/notes/AttachmentUploader'
import {RecipientsSelector} from '@/components/notes/RecipientsSelector'
import { NoteType } from '@/types/notes'
import TemplateSelector from './TemplateSelector'

interface NoteFormData {
  title: string
  content: string
  type: NoteType
  recipients: string[]
  attachments: File[]
  scheduledAt?: Date
}

export default function NoteForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    type: 'ANNOUNCEMENT',
    recipients: [],
    attachments: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulation d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Note créée:', formData)
      router.push('/notes')
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    // Sauvegarde en brouillon
    console.log('Brouillon sauvegardé:', formData)
  }

  const updateField = <K extends keyof NoteFormData>(
    field: K, 
    value: NoteFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Sélection de modèle */}
        <TemplateSelector onTemplateSelect={(template) => {
          updateField('title', template.title)
          updateField('content', template.content)
          updateField('type', template.type)
        }} />

        {/* Champs de base */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <FormField
            label="Titre"
            value={formData.title}
            onChange={(value) => updateField('title', value)}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de note
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateField('type', e.target.value as NoteType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="ANNOUNCEMENT">Annonce</option>
              <option value="MEETING">Réunion</option>
              <option value="REPORT">Rapport</option>
              <option value="OTHER">Autre</option>
            </select>
          </div>

          <FormField
            label="Contenu"
            value={formData.content}
            onChange={(value) => updateField('content', value)}
            type="textarea"
            required
          />
        </div>

        {/* Destinataires */}
        <RecipientsSelector
          recipients={formData.recipients}
          onChange={(recipients) => updateField('recipients', recipients)}
        />

        {/* Pièces jointes */}
        <AttachmentUploader
          attachments={formData.attachments}
          onChange={(attachments) => updateField('attachments', attachments)} 
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Sauvegarder le brouillon
        </button>

        <div className="space-x-4">
          <button
            type="button"
            onClick={() => router.push('/notes')}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.content}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Création...' : 'Créer la note'}
          </button>
        </div>
      </div>
    </form>
  )
}

// Composant de champ de formulaire réutilisable
interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'textarea'
  required?: boolean
}

function FormField({ label, value, onChange, type = 'text', required }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary resize-vertical"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
      )}
    </div>
  )
}