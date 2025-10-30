'use client'
import { useState, useRef, useEffect } from 'react'
import { NoteCreateDTO } from '@/types/notes'

interface NoteEditorProps {
  onSaveDraft: (noteData: NoteCreateDTO) => void
  onSubmit: (noteData: NoteCreateDTO) => void
  isSubmitting?: boolean
  initialData?: Partial<NoteCreateDTO>
}

//a corriger ceci en commentaire

/*useEffect(() => {
  // Vérifier si un template est stocké
  const templateData = sessionStorage.getItem('templateData')
  if (templateData) {
    const parsed = JSON.parse(templateData)
   // new FormData((prev: any) => ({ ...prev, ...parsed }))
    sessionStorage.removeItem('templateData')
  }
}, [])*/

export function NoteEditor({ onSaveDraft, onSubmit, isSubmitting = false, initialData }: NoteEditorProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    type: initialData?.type || 'annonce',
    department: initialData?.department || '',
    recipients: initialData?.recipients || [],
    attachments: initialData?.attachments || [],
    scheduledDate: initialData?.scheduledDate || '',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddRecipient = (email: string) => {
    if (email && !formData.recipients.includes(email)) {
      setFormData(prev => ({
        ...prev,
        recipients: [...prev.recipients, email]
      }))
    }
  }

  const handleRemoveRecipient = (email: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }))
  }

  const handleFileUpload = (files: FileList) => {
    const newAttachments = Array.from(files)
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }))
  }

  const handleRemoveAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSaveDraft = () => {
    onSaveDraft(formData)
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="space-y-6">
        {/* Titre */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titre de la note *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Donnez un titre clair à votre note"
            required
          />
        </div>

        {/* Type et Département */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type de note *
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="annonce">Annonce</option>
              <option value="convocation">Convocation</option>
              <option value="rapport">Rapport</option>
              <option value="compte-rendu">Compte-rendu</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Département *
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Sélectionnez un département</option>
              <option value="technique">DID</option>
              <option value="communication">Communication</option>
              <option value="evenementiel">DAF</option>
              <option value="formation">DIS</option>
              <option value="formation">AG</option>
            </select>
          </div>
        </div>

        {/* Contenu */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Contenu de la note *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Rédigez le contenu de votre note..."
            required
          />
        </div>

        {/* Destinataires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destinataires *
          </label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.recipients.map(recipient => (
                <span
                  key={recipient}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                >
                  {recipient}
                  <button
                    type="button"
                    onClick={() => handleRemoveRecipient(recipient)}
                    className="ml-2 text-primary hover:text-primary/80"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="email"
              placeholder="Ajouter un email @youthcomputing.org"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddRecipient((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Pièces jointes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pièces jointes
          </label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.attachments.map((file, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                >
                  {file.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Ajouter des fichiers
            </button>
          </div>
        </div>

        {/* Planification */}
        <div>
          <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">
            Planifier l'envoi (optionnel)
          </label>
          <input
            type="datetime-local"
            id="scheduledDate"
            value={formData.scheduledDate}
            onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Actions - Section responsive améliorée */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-6 border-t border-gray-200 gap-4">
          {/* Bouton Sauvegarder le brouillon */}
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="order-2 sm:order-1 px-4 py-3 sm:px-6 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Sauvegarder le brouillon
          </button>

          {/* Groupe Annuler + Soumettre */}
          <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-3 sm:px-6 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title || !formData.content}
              className="px-4 py-3 sm:px-6 sm:py-2 text-white rounded-lg bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto text-center flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Soumission...
                </>
              ) : (
                'Soumettre à validation'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}