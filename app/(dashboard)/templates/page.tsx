'use client';
import { useState } from 'react';

interface Template {
  id: string
  name: string
  type: string
  content: string
  department: string
  createdAt: string
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Modèle Convocation Réunion',
    type: 'convocation',
    department: 'tous',
    content: 'Convocation à la réunion du [DATE]\n\nObjet: [SUJET]\n\nCher(e)s collègues,\n\nNous vous convions à la réunion qui se tiendra le [DATE] à [HEURE] dans [LIEU].\n\nOrdre du jour:\n1. \n2. \n3. \n\nCordialement,\n[VOTRE NOM]',
    createdAt: '2024-01-15'
  },
  {
    id: '2', 
    name: 'Modèle Rapport d\'Activité',
    type: 'rapport',
    department: 'tous',
    content: 'RAPPORT D\'ACTIVITÉ - [MOIS/ANNÉE]\n\nDépartement: [DÉPARTEMENT]\n\nI. Activités réalisées\n• \n• \n• \n\nII. Prochaines étapes\n• \n• \n\nIII. Difficultés rencontrées\n• \n\nIV. Recommandations\n• ',
    createdAt: '2024-01-10'
  }
]

export default function TemplatesPage() {
  const [templates] = useState<Template[]>(mockTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleUseTemplate = (template: Template) => {
    // Rediriger vers la création de note avec le template pré-rempli
    const templateData = {
      title: `Nouvelle note basée sur: ${template.name}`,
      content: template.content,
      type: template.type,
      department: template.department
    }
    
    // Stocker dans sessionStorage pour récupération dans l'éditeur
    sessionStorage.setItem('templateData', JSON.stringify(templateData))
    window.location.href = '/notes/new'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modèles de notes</h1>
          <p className="text-gray-600 mt-1">Utilisez des modèles prédéfinis pour gagner du temps</p>
        </div>
      </div>

      {/* Liste des modèles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {template.type}
                  </span>
                  <span className="text-sm text-gray-500">Dépt: {template.department}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {template.content.substring(0, 150)}...
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Créé le {new Date(template.createdAt).toLocaleDateString('fr-FR')}
              </span>
              <button
                onClick={() => handleUseTemplate(template)}
                className="px-4 py-2 bg-yc-fuschia hover:bg-[#f26873] hover:cursor-pointer text-white text-sm rounded-lg transition-colors"
              >
                Utiliser
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun modèle */}
      {templates.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle disponible</h3>
          <p className="text-gray-500">Les modèles seront créés par l'administrateur</p>
        </div>
      )}
    </div>
  )
}