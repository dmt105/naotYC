'use client'
import { useState, useMemo } from 'react'
import { User, UserRole } from '@/types/user'

interface RecipientsSelectorProps {
  recipients: string[]
  onChange: (recipients: string[]) => void
}

// Données mockées des utilisateurs
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@youthcomputing.org',
    roles: ['REDACTOR'],
    department: 'Communication'
  },
  {
    id: '2', 
    name: 'Marie Martin',
    email: 'marie@youthcomputing.org',
    roles: ['DEPARTMENT_HEAD'],
    department: 'Communication'
  },
  {
    id: '3',
    name: 'Pierre Lambert',
    email: 'pierre@youthcomputing.org', 
    roles: ['EXECUTIVE_DIRECTOR'],
    department: 'Direction'
  },
  {
    id: '4',
    name: 'Sophie Moreau',
    email: 'sophie@youthcomputing.org',
    roles: ['RECIPIENT'],
    department: 'Développement'
  }
]

export function RecipientsSelector({ recipients, onChange }: RecipientsSelectorProps) {
  const [search, setSearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department?.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const selectedUsers = useMemo(() => {
    return MOCK_USERS.filter(user => recipients.includes(user.id))
  }, [recipients])

  const addRecipient = (userId: string) => {
    if (!recipients.includes(userId)) {
      onChange([...recipients, userId])
    }
    setSearch('')
    setIsDropdownOpen(false)
  }

  const removeRecipient = (userId: string) => {
    onChange(recipients.filter(id => id !== userId))
  }

  const addAllDepartment = (department: string) => {
    const departmentUsers = MOCK_USERS.filter(user => 
      user.department === department && !recipients.includes(user.id)
    )
    const newRecipients = [...recipients, ...departmentUsers.map(user => user.id)]
    onChange(newRecipients)
  }

  const getDepartments = () => {
    return Array.from(new Set(MOCK_USERS.map(user => user.department).filter(Boolean))) as string[]
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Destinataires
      </label>

      {/* Destinataires sélectionnés */}
      {selectedUsers.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map(user => (
              <SelectedRecipient
                key={user.id}
                user={user}
                onRemove={removeRecipient}
              />
            ))}
          </div>
        </div>
      )}

      {/* Barre de recherche et sélection */}
      <div className="relative">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setIsDropdownOpen(true)
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Rechercher un membre..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            📋
          </button>
        </div>

        {/* Actions rapides par département */}
        <div className="flex flex-wrap gap-2 mb-3">
          {getDepartments().map(dept => (
            <button
              key={dept}
              type="button"
              onClick={() => addAllDepartment(dept)}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
            >
              + {dept}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const allUserIds = MOCK_USERS.map(user => user.id)
              onChange(allUserIds)
            }}
            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors"
          >
            + Tous les membres
          </button>
        </div>

        {/* Dropdown des résultats */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Aucun membre trouvé
              </div>
            ) : (
              filteredUsers.map(user => (
                <RecipientOption
                  key={user.id}
                  user={user}
                  isSelected={recipients.includes(user.id)}
                  onSelect={addRecipient}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Overlay pour fermer le dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  )
}

// Composant pour un destinataire sélectionné
interface SelectedRecipientProps {
  user: User
  onRemove: (userId: string) => void
}

function SelectedRecipient({ user, onRemove }: SelectedRecipientProps) {
  const getRoleLabel = (roles: UserRole[]) => {
    const roleLabels = {
      REDACTOR: 'Rédacteur',
      DEPARTMENT_HEAD: 'Chef de Dept',
      EXECUTIVE_DIRECTOR: 'Directeur',
      RECIPIENT: 'Destinataire',
      ADMIN: 'Admin'
    }
    return roles.map(role => roleLabels[role]).join(', ')
  }

  return (
    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
      <span className="font-medium">{user.name}</span>
      <span className="text-xs opacity-75">({user.department})</span>
      <button
        type="button"
        onClick={() => onRemove(user.id)}
        className="text-primary hover:text-primary/70 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

// Composant pour une option dans le dropdown
interface RecipientOptionProps {
  user: User
  isSelected: boolean
  onSelect: (userId: string) => void
}

function RecipientOption({ user, isSelected, onSelect }: RecipientOptionProps) {
  const getRoleBadge = (roles: UserRole[]) => {
    const mainRole = roles[0] // Prend le premier rôle pour l'affichage
    const roleConfig = {
      REDACTOR: { label: 'Rédacteur', color: 'bg-blue-100 text-blue-800' },
      DEPARTMENT_HEAD: { label: 'Chef', color: 'bg-green-100 text-green-800' },
      EXECUTIVE_DIRECTOR: { label: 'Directeur', color: 'bg-purple-100 text-purple-800' },
      RECIPIENT: { label: 'Destinataire', color: 'bg-gray-100 text-gray-800' },
      ADMIN: { label: 'Admin', color: 'bg-red-100 text-red-800' }
    }
    const config = roleConfig[mainRole]
    return (
      <span className={`text-xs px-2 py-1 rounded ${config.color}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div
      onClick={() => !isSelected && onSelect(user.id)}
      className={`flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-green-50 text-green-700' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-sm">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{user.department}</span>
        {getRoleBadge(user.roles)}
        {isSelected && (
          <span className="text-green-600 text-lg">✓</span>
        )}
      </div>
    </div>
  )
}