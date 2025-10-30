'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { UserRole } from '@/types/enum'
import { NavigationItem } from '@/types/user'
import { getNavigationForRole, getDashboardHref } from '@/config/navigation'
import { mockUsers } from '@/lib/mock-user'

interface DashboardSidebarProps {
  userRole: UserRole
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = getNavigationForRole(userRole)
  const user = mockUsers[userRole.toLowerCase() as keyof typeof mockUsers]

  const handleNavigation = (item: NavigationItem) => {
    router.push(item.href)
    setActiveSubmenu(null)
  }

  const handleSubmenuToggle = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName)
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isItemActive = (item: NavigationItem): boolean => {
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  const getRoleColor = (role: UserRole): string => {
    const colors = {
      [UserRole.ADMIN]: 'from-purple-500 to-pink-500',
      [UserRole.DIRECTEUR_EXECUTIF]: 'from-blue-500 to-cyan-500',
      [UserRole.CHEF_DEPARTEMENT]: 'from-green-500 to-emerald-500',
      [UserRole.REDACTEUR]: 'from-orange-500 to-red-500',
      [UserRole.DESTINATAIRE]: 'from-gray-500 to-blue-500',
    }
    return colors[role]
  }

  return (
    <div className={`bg-white border-gray-200 transition-all duration-300 flex flex-col h-full ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <button
            onClick={() => router.push(getDashboardHref(userRole))}
            className="flex items-center group"
          >
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="ml-2 text-xl font-heading font-bold text-primary group-hover:text-primary/80 transition-colors">
              NaotY
            </span>
          </button>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={isCollapsed ? 'Agrandir le menu' : 'Réduire le menu'}
        >
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = isItemActive(item)
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm hover:cursor-pointer'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer'
              }`}
              title={isCollapsed ? item.description : ''}
            >
              <span className="text-lg mr-3 flex-shrink-0">{item.icon}</span>
              
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.badgeCount || '!'}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-gray-300 text-xs mt-1 max-w-xs">{item.description}</div>
                  )}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-gray-200">

        {/* Quick Stats - Only show when not collapsed */}
        {!isCollapsed && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">12</div>
                <div className="text-blue-600">Non lus</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">5</div>
                <div className="text-green-600">En attente</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}