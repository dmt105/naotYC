'use client'
import { useState } from 'react'
import { NoteType } from '@/types/notes'

export interface Template {
  id: string
  name: string
  title: string
  content: string
  type: NoteType
  description: string
}

interface TemplateSelectorProps {
  onTemplateSelect: (template: Template) => void
}

// Modèles prédéfinis selon le cahier des charges
const PREDEFINED_TEMPLATES: Template[] = [
  {
    id: 'convocation',
    name: 'Convocation de Réunion',
    type: 'MEETING',
    title: 'Convocation - Réunion {department}',
    content: `Objet : Convocation à la réunion du {date}
    
Cher(e)s membres,

Je vous convie à la réunion du département {department} qui se tiendra :

📅 Date : {date}
⏰ Heure : {time}  
📍 Lieu : {location}

Ordre du jour :
1. Point sur les activités en cours
2. Bilan du mois précédent
3. Planification des prochaines actions
4. Divers

Votre présence est importante.

Cordialement,
{author}`,
    description: 'Modèle standard pour les convocations de réunions'
  },
  {
    id: 'annonce',
    name: 'Annonce Officielle',
    type: 'ANNOUNCEMENT',
    title: 'Annonce - {sujet}',
    content: `Annonce Officielle

Chers membres,

Nous avons le plaisir de vous annoncer que {contenu}.

Cette décision/action prendra effet à partir du {date}.

Pour toute information complémentaire, n'hésitez pas à nous contacter.

Bien cordialement,
L'équipe de direction`,
    description: 'Modèle pour les annonces et communications officielles'
  },
  {
    id: 'rapport',
    name: 'Rapport d\'Activités',
    type: 'REPORT',
    title: 'Rapport d\'Activités - {periode}',
    content: `RAPPORT D'ACTIVITÉS - {periode}

1. ACTIVITÉS RÉALISÉES
• 
• 

2. RÉSULTATS OBTENUS
• 
• 

3. DIFFICULTÉS RENCONTRÉES
• 
• 

4. PERSPECTIVES
• 
• 

Conclusion :
{conclusion}`,
    description: 'Modèle structuré pour les rapports d\'activités'
  }
]

export default function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    onTemplateSelect(template)
    setIsOpen(false)
  }

  const handleClearTemplate = () => {
    setSelectedTemplate(null)
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Modèle de note
        </label>
        {selectedTemplate && (
          <button
            type="button"
            onClick={handleClearTemplate}
            className="text-sm text-secondary hover:text-primary"
          >
            Supprimer le modèle
          </button>
        )}
      </div>

      {selectedTemplate ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-blue-900">
                {selectedTemplate.name}
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                {selectedTemplate.description}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Modèle appliqué
            </span>
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          >
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Choisir un modèle prédéfini
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Gagnez du temps avec nos modèles conformes à la charte
            </p>
          </button>

          {/* Modal de sélection de modèle */}
          {isOpen && (
            <TemplateModal
              templates={PREDEFINED_TEMPLATES}
              onSelect={handleTemplateSelect}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}

// Modal de sélection de modèle (composant séparé pour respecter SOLID)
interface TemplateModalProps {
  templates: Template[]
  onSelect: (template: Template) => void
  onClose: () => void
}

function TemplateModal({ templates, onSelect, onClose }: TemplateModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* En-tête */}
        <div className="border-b p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-primary">
              Choisir un modèle
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Sélectionnez un modèle pour pré-remplir votre note
          </p>
        </div>

        {/* Liste des modèles */}
        <div className="overflow-y-auto max-h-96 p-6">
          <div className="grid gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>

        {/* Pied de page */}
        <div className="border-t p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

interface TemplateCardProps {
  template: Template
  onSelect: (template: Template) => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const getTypeColor = (type: NoteType) => {
    const colors = {
      ANNOUNCEMENT: 'bg-blue-100 text-blue-800',
      MEETING: 'bg-green-100 text-green-800',
      REPORT: 'bg-purple-100 text-purple-800',
      OTHER: 'bg-gray-100 text-gray-800'
    }
    return colors[type]
  }

  const getTypeLabel = (type: NoteType) => {
    const labels = {
      ANNOUNCEMENT: 'Annonce',
      MEETING: 'Réunion',
      REPORT: 'Rapport',
      OTHER: 'Autre'
    }
    return labels[type]
  }

  return (
    <div
      onClick={() => onSelect(template)}
      className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{template.name}</h4>
        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(template.type)}`}>
          {getTypeLabel(template.type)}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
        <div className="font-medium mb-1">Aperçu :</div>
        <div className="truncate">{template.title}</div>
      </div>
    </div>
  )
}