'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, UserRole } from '@/types/user'
import { mockUsers, mockUserStats } from '@/lib/mock-user'
import { getDashboardHref } from '@/config/navigation'

interface DashboardHeaderProps {
  userRole: UserRole
  currentUser?: User
}

export function DashboardHeader({ userRole, currentUser }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Use mock user if no current user provided
  const user = currentUser || mockUsers[userRole.toLowerCase() as keyof typeof mockUsers]
  const stats = mockUserStats[userRole]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // In a real app, this would call authService.logout()
    console.log('Logging out...')
    router.push('/auth/login')
  }

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsNotificationsOpen(false)
  }

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsProfileOpen(false)
  }

  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames = {
      [UserRole.ADMIN]: 'Administrateur',
      [UserRole.DIRECTEUR_EXECUTIF]: 'Directeur Exécutif',
      [UserRole.CHEF_DEPARTEMENT]: 'Chef de Département',
      [UserRole.REDACTEUR]: 'Rédacteur',
      [UserRole.DESTINATAIRE]: 'Destinataire',
    }
    return roleNames[role]
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatLastLogin = (lastLogin?: string): string => {
    if (!lastLogin) return 'Jamais'
    
    const lastLoginDate = new Date(lastLogin)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lastLoginDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Aujourd\'hui'
    if (diffDays === 2) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays - 1} jours`
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
    return `Le ${lastLoginDate.toLocaleDateString('fr-FR')}`
  }

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'new_note' as const,
      title: 'Nouvelle note à valider',
      message: 'Une nouvelle note nécessite votre validation',
      time: 'Il y a 5 min',
      unread: true,
    },
    {
      id: 2,
      type: 'reminder' as const,
      title: 'Rappel de réunion',
      message: 'Réunion départementale dans 1 heure',
      time: 'Il y a 30 min',
      unread: true,
    },
    {
      id: 3,
      type: 'system' as const,
      title: 'Mise à jour système',
      message: 'Nouvelle version disponible',
      time: 'Il y a 2 heures',
      unread: false,
    },
  ]

  const unreadCount = mockNotifications.filter(n => n.unread).length

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Breadcrumb and Title */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => router.push(getDashboardHref(userRole))}
            className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-gray-900 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <span>•</span>
            <span className="capitalize">{getRoleDisplayName(userRole)}</span>
            <span>•</span>
            <span>{stats.totalCount} éléments</span>
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={handleNotificationsClick}
              className="p-2 text-gray-600 hover:text-gray-900 relative rounded-lg hover:bg-gray-100 transition-colors"
              title="Notifications"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse text-[10px] sm:text-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Menu */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-xs sm:text-sm text-primary hover:text-primary/80">
                        Tout marquer comme lu
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    mockNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          // Handle notification click
                          setIsNotificationsOpen(false)
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <p className="text-gray-500 text-sm mt-2">Aucune notification</p>
                    </div>
                  )}
                </div>

                {mockNotifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        router.push('/notifications')
                        setIsNotificationsOpen(false)
                      }}
                      className="w-full text-center text-xs sm:text-sm text-primary hover:text-primary/80 py-2"
                    >
                      Voir toutes les notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              {/* Avatar */}
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium shadow-md">
                    {getInitials(user.name)}
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User info - hidden on mobile */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 truncate max-w-[120px]">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 capitalize truncate max-w-[120px]">
                  {getRoleDisplayName(user.role)}
                </p>
              </div>

              {/* Chevron icon */}
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform flex-shrink-0 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 max-w-[85vw] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Dernière connexion: {formatLastLogin(user.lastLogin)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push('/profile')
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="truncate">Mon profil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      router.push('/settings')
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">Paramètres</span>
                  </button>
                </div>

                {/* Logout section */}
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="truncate">Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}