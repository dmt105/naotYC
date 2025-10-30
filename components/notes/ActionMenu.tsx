'use client'
import { JSX, useState } from 'react'
import Link from 'next/link'
import { Note } from '@/types'
import { Eye, Edit, Send, RefreshCw, Trash2 } from 'lucide-react'

interface ActionMenuProps {
  note: Note
}

// Définir le type pour les actions
interface ActionItem {
  label: string
  href?: string
  action?: () => void
  icon: JSX.Element
}

export default function ActionMenu({ note }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getAvailableActions = (note: Note): ActionItem[] => {
    const baseActions: ActionItem[] = [
  { label: 'Voir', href: `/notes/${note.id}`, icon: <Eye className="w-4 h-4" /> },
  { label: 'Modifier', href: `/notes/${note.id}/edit`, icon: <Edit className="w-4 h-4" /> }
]

// Actions conditionnelles selon le statut
if (note.status === 'DRAFT') {
  baseActions.push(
    { label: 'Soumettre', action: () => handleSubmit(note.id), icon: <Send className="w-4 h-4" /> }
  )
}

if (note.status === 'RETURNED') {
  baseActions.push(
    { label: 'Corriger', href: `/notes/${note.id}/edit`, icon: <RefreshCw className="w-4 h-4" /> }
  )
}

if (['DRAFT', 'RETURNED'].includes(note.status)) {
  baseActions.push(
    { label: 'Supprimer', action: () => handleDelete(note.id), icon: <Trash2 className="w-4 h-4" /> }
  )
}

return baseActions
  }

  const handleSubmit = (noteId: string) => {
    // Implémentation de la soumission
    console.log('Soumission de la note:', noteId)
    setIsOpen(false)
  }

  const handleDelete = (noteId: string) => {
    // Implémentation de la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      console.log('Suppression de la note:', noteId)
    }
    setIsOpen(false)
  }

  const actions = getAvailableActions(note)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        ⋮
      </button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu déroulant */}
          <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg border">
            <div className="py-1">
              {actions.map((action, index) => (
                <ActionMenuItem
                  key={index}
                  action={action}
                  onAction={() => setIsOpen(false)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface ActionMenuItemProps {
  action: ActionItem
  onAction: () => void
}

function ActionMenuItem({ action, onAction }: ActionMenuItemProps) {
  const handleClick = () => {
    if (action.action) {
      action.action()
    }
    onAction()
  }

  const content = (
    <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            {action.icon}
      <span>{action.label}</span>
    </div>
  )

  if (action.href) {
    return (
      <Link href={action.href} onClick={onAction}>
        {content}
      </Link>
    )
  }

  return (
    <div onClick={handleClick}>
      {content}
    </div>
  )
}