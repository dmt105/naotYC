'use client'
import { useState, useEffect } from 'react'
import { authService } from '@/types/auth'
import { UserRole } from '@/types/enum'

export function useAuth() {
  const [session, setSession] = useState(() => authService.getSession())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentSession = authService.getSession()
    setSession(currentSession)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const newSession = await authService.login(email, password)
      setSession(newSession)
      return newSession
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setSession(null)
  }

  //Utilisation du type UserRole
  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    return authService.hasPermission(requiredRole)
  }

  return {
    session,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!session, // Vérifier si session existe
  }
}

// import { useEffect } from 'react';
// import { useAuthStore } from '@/store/auth-store';

// export const useAuth = () => {
//   const { user, isAuthenticated, login, logout, hasRole } = useAuthStore();

//   useEffect(() => {
//     // Check for stored authentication on mount
//     const storedUser = localStorage.getItem('naoty_user');
//     if (storedUser) {
//       login(JSON.parse(storedUser));
//     }
//   }, [login]);

//   const handleLogin = (userData: any) => {
//     login(userData);
//     localStorage.setItem('naoty_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem('naoty_user');
//     localStorage.removeItem('naoty_token');
//   };

//   return {
//     user,
//     isAuthenticated,
//     login: handleLogin,
//     logout: handleLogout,
//     hasRole
//   };
// };