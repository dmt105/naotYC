'use client'
import Link from 'next/link'
import { UserRole } from '@/types'

interface QuickActionsProps {
  userRole?: UserRole
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const getActionsByRole = (role?: UserRole) => {
    const baseActions = [
      {
        label: 'Nouvelle Note',
        description: 'Créer une nouvelle note interne',
        href: '/notes/new',
        icon: '📝',
        color: 'bg-blue-500'
      },
      {
        label: 'Mes Brouillons', 
        description: 'Voir mes brouillons en cours',
        href: '/notes?status=DRAFT',
        icon: '📋',
        color: 'bg-yellow-500'
      }
    ]

    if (role === 'DEPARTMENT_HEAD' || role === 'EXECUTIVE_DIRECTOR') {
      baseActions.push({
        label: 'Notes à Valider',
        description: 'Valider les notes en attente',
        href: '/notes?status=PENDING_VALIDATION',
        icon: '✅',
        color: 'bg-green-500'
      })
    }

    if (role === 'ADMIN') {
      baseActions.push({
        label: 'Gestion Utilisateurs',
        description: 'Gérer les rôles et permissions',
        href: '/admin/users',
        icon: '👥',
        color: 'bg-purple-500'
      })
    }

    return baseActions
  }

  const actions = getActionsByRole(userRole)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Actions Rapides
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <QuickActionCard key={index} action={action} />
        ))}
      </div>
    </div>
  )
}

interface QuickActionCardProps {
  action: {
    label: string
    description: string
    href: string
    icon: string
    color: string
  }
}

function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <Link
      href={action.href}
      className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-white text-xl`}>
          {action.icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 group-hover:text-primary">
            {action.label}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {action.description}
          </p>
        </div>
      </div>
    </Link>
  )
}