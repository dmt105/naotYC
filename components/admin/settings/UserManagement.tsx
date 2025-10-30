'use client'
import { useState } from 'react'
import { User } from '@/types/settings'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface UserManagementProps {
  users: User[]
  onUsersChange: (users: User[]) => void
}

const roles = [
  { value: 'user', label: 'Utilisateur' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Administrateur' },
]

const departments = [
  { value: 'technique', label: 'Technique' },
  { value: 'communication', label: 'Communication' },
  { value: 'evenementiel', label: 'Événementiel' },
  { value: 'formation', label: 'Formation' },
  { value: 'administration', label: 'Administration' },
]

export function UserManagement({ users, onUsersChange }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const updateUser = (userId: string, updates: Partial<User>) => {
    onUsersChange(users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ))
  }

  const getStatusVariant = (status: User['status']) => {
    return status === 'active' ? 'success' : 'error'
  }

  const getRoleVariant = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'error'
      case 'manager': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Gestion des Utilisateurs</h2>
        <p className="mt-1 text-sm text-gray-600">
          Gérez les utilisateurs et leurs permissions
        </p>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un utilisateur
          </Button>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dernière connexion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      value={user.role}
                      onValueChange={(value) => updateUser(user.id, { role: value as User['role'] })}
                      options={roles}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      value={user.department}
                      onValueChange={(value) => updateUser(user.id, { department: value })}
                      options={departments}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(user.status)}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin.toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => updateUser(user.id, { 
                        status: user.status === 'active' ? 'inactive' : 'active' 
                      })}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      {user.status === 'active' ? 'Désactiver' : 'Activer'}
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}