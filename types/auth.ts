import { UserRole } from '@/types/enum'
import { User } from '@/types/user'
// Mock session pour le développement
let mockSession: { user: User; token: string; expiresAt: number } | null = null

// Fonction pour initialiser une session mock pour le développement
export const initializeMockSession = (role: UserRole = UserRole.REDACTEUR) => {
  const mockUsers = {
    [UserRole.ADMIN]: {
      id: '1',
      email: 'admin@youthcomputing.org',
      name: 'Admin System',
      role: UserRole.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      notificationsCount: 12,
    },
    [UserRole.DIRECTEUR_EXECUTIF]: {
      id: '2',
      email: 'directeur@youthcomputing.org',
      name: 'Pierre Directeur',
      role: UserRole.DIRECTEUR_EXECUTIF,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      notificationsCount: 8,
    },
    [UserRole.CHEF_DEPARTEMENT]: {
      id: '3',
      email: 'chef.technique@youthcomputing.org',
      name: 'Marie Chef Technique',
      role: UserRole.CHEF_DEPARTEMENT,
      department: 'technique',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      notificationsCount: 5,
    },
    [UserRole.REDACTEUR]: {
      id: '4',
      email: 'redacteur@youthcomputing.org',
      name: 'Jean Rédacteur',
      role: UserRole.REDACTEUR,
      department: 'communication',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      notificationsCount: 3,
    },
    [UserRole.DESTINATAIRE]: {
      id: '5',
      email: 'membre@youthcomputing.org',
      name: 'Luc Membre',
      role: UserRole.DESTINATAIRE,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      notificationsCount: 7,
    },
  }

  mockSession = {
    user: mockUsers[role],
    token: 'mock_jwt_token_' + role,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 heures
  }

  // Stocker aussi dans localStorage pour la persistance
  if (typeof window !== 'undefined') {
    localStorage.setItem('naoty_auth_token', mockSession.token)
    localStorage.setItem('naoty_user_data', JSON.stringify(mockSession.user))
    localStorage.setItem('naoty_token_expiry', mockSession.expiresAt.toString())
  }

  return mockSession
}

// Classe de service d'authentification - Version développement
class AuthService {
  private readonly TOKEN_KEY = 'naoty_auth_token'
  private readonly USER_KEY = 'naoty_user_data'
  private readonly TOKEN_EXPIRY_KEY = 'naoty_token_expiry'

  getToken(): string | null {
    if (typeof window === 'undefined') return 'mock_jwt_token'
    
    // Pour le développement, retourner toujours un token valide
    const token = localStorage.getItem(this.TOKEN_KEY)
    return token || 'mock_jwt_token_redacteur'
  }

  setToken(token: string, expiresIn: number = 24 * 60 * 60 * 1000): void {
    if (typeof window === 'undefined') return
    
    const expiresAt = Date.now() + expiresIn
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiresAt.toString())
  }

  getUser(): User | null {
    if (typeof window === 'undefined') {
      // Retourner un utilisateur mock en mode serveur
      return {
        id: '4',
        email: 'redacteur@youthcomputing.org',
        name: 'Jean Rédacteur',
        role: UserRole.REDACTEUR,
        department: 'communication',
        notificationsCount: 3,
      }
    }
    
    const userData = localStorage.getItem(this.USER_KEY)
    if (userData) {
      try {
        return JSON.parse(userData)
      } catch {
        // En cas d'erreur, retourner un utilisateur mock
      }
    }

    // Retourner un utilisateur mock par défaut pour le développement
    return {
      id: '4',
      email: 'redacteur@youthcomputing.org',
      name: 'Jean Rédacteur',
      roles: UserRole.REDACTEUR,
      department: 'communication',
      notificationsCount: 3,
    }
  }

  setUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return false // Jamais expiré en développement
    
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY)
    if (!expiry) return false // Pas d'expiration en développement

    return Date.now() >= parseInt(expiry)
  }

  isAuthenticated(): boolean {
    // Toujours authentifié en mode développement
    return true
  }

  getCurrentUserRole(): UserRole {
    if (typeof window === 'undefined') return UserRole.REDACTEUR
    
    const user = this.getUser()
    return user?.roles || UserRole.REDACTEUR // Rôle par défaut pour le développement
  }

  //CORRECTION : Ajout de la méthode hasPermission manquante
  hasPermission(requiredRole: UserRole | UserRole[]): boolean {
    const userRole = this.getCurrentUserRole()
    if (!userRole) return false

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole)
    }

    // Hiérarchie des rôles (Admin > Directeur > Chef > Rédacteur > Destinataire)
    const roleHierarchy = {
      [UserRole.ADMIN]: 5,
      [UserRole.DIRECTEUR_EXECUTIF]: 4,
      [UserRole.CHEF_DEPARTEMENT]: 3,
      [UserRole.REDACTEUR]: 2,
      [UserRole.DESTINATAIRE]: 1,
    }

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  }

  //CORRECTION : Ajout de la méthode getSession manquante
  getSession(): { user: User; token: string; expiresAt: number } | null {
    if (typeof window === 'undefined') {
      return {
        user: {
          id: '4',
          email: 'redacteur@youthcomputing.org',
          name: 'Jean Rédacteur',
          roles: UserRole.REDACTEUR,
          department: 'communication',
          notificationsCount: 3,
        },
        token: 'mock_jwt_token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }
    }
    
    const user = this.getUser()
    const token = this.getToken()
    
    if (!user || !token) {
      return null
    }

    return {
      user,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }
  }

  async login(email: string, password: string): Promise<any> {
    // Mock login - toujours réussir en développement
    const mockUser = {
      id: '4',
      email: email,
      name: 'Utilisateur Démo',
      role: UserRole.REDACTEUR,
      department: 'communication',
      notificationsCount: 3,
    }

    this.setToken('mock_jwt_token')
    this.setUser(mockUser)

    return {
      user: mockUser,
      token: 'mock_jwt_token',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }
  }

  logout(): void {
    if (typeof window === 'undefined') return
    
    // En développement, on peut choisir de ne pas vraiment déconnecter
    // ou de rediriger vers login sans supprimer les données
    console.log('Mock logout - Redirection vers login')
    window.location.href = '/auth/login'
  }

  //CORRECTION : Ajout de la méthode refreshToken manquante
  async refreshToken(): Promise<string> {
    // En développement, retourner simplement un nouveau token mock
    const newToken = 'mock_jwt_token_refreshed'
    this.setToken(newToken)
    return newToken
  }
}

// Instance singleton
export const authService = new AuthService()

// Fonction exportée pour le layout - VERSION CORRIGÉE
export async function getCurrentUserRole(): Promise<UserRole> {
  // En mode serveur (Server Components)
  if (typeof window === 'undefined') {
    // Retourner un rôle par défaut pour le développement
    return UserRole.REDACTEUR
  }

  // En mode client - NE JAMAIS REDIRIGER AUTOMATIQUEMENT EN DÉVELOPPEMENT
  const role = authService.getCurrentUserRole()
  
  return role
}

// Hook pour utiliser l'authentification dans les composants client
export function useAuth() {
  const getSession = () => {
    return authService.getSession()
  }

  const login = async (email: string, password: string) => {
    return authService.login(email, password)
  }

  const logout = () => {
    authService.logout()
  }

  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    return authService.hasPermission(requiredRole)
  }

  const refreshToken = async () => {
    return authService.refreshToken()
  }

  return {
    session: getSession(),
    loading: false,
    login,
    logout,
    hasPermission,
    refreshToken,
    isAuthenticated: true, // Toujours authentifié en développement
  }
}

// Initialiser une session mock au chargement en développement
if (typeof window !== 'undefined') {
  // Vérifier si nous sommes en mode développement
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && !localStorage.getItem('naoty_auth_token')) {
    initializeMockSession(UserRole.REDACTEUR)
    console.log('Session mock initialisée pour le développement')
  }
}