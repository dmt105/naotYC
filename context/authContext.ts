// src/contexts/AuthContext.tsx
// 'use client'

// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { User } from '@/types'

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   loginWithGoogle: () => Promise<void>
//   logout: () => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Vérifier le token au chargement
//     const token = localStorage.getItem('naoty_token')
//     if (token) {
//       fetchUserProfile()
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const fetchUserProfile = async () => {
//     try {
//       // Implémentation réelle avec appel API
//       setIsLoading(false)
//     } catch (error) {
//       localStorage.removeItem('naoty_token')
//       setIsLoading(false)
//     }
//   }

//   const login = async (email: string, password: string) => {
//     setIsLoading(true)
//     try {
//       // Implémentation réelle
//       const mockUser: User = {
//         id: '1',
//         email,
//         name: 'Jean Dupont',
//         roles: ['REDACTOR'],
//         department: 'Communication'
//       }
//       setUser(mockUser)
//       localStorage.setItem('naoty_token', 'mock-jwt-token')
//     } catch (error) {
//       throw new Error('Échec de la connexion')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const loginWithGoogle = async () => {
//     // Redirection vers OAuth Google
//     window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem('naoty_token')
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }