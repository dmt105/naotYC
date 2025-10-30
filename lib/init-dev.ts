import { initializeMockSession } from '@/types/auth'

// Initialiser l'environnement de développement
export const initializeDevelopmentEnvironment = () => {
  if (typeof window === 'undefined') return
  
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (isDevelopment) {
    // Vérifier si une session existe déjà
    const existingToken = localStorage.getItem('naoty_auth_token')
    
    if (!existingToken) {
      // Initialiser une session mock
      initializeMockSession()
      console.log('Environnement de développement initialisé')
      console.log('Email: redacteur@youthcomputing.org')
      console.log('Mot de passe: demo123')
      console.log('Rôle: Rédacteur')
    }
  }
}

// Exécuter l'initialisation au chargement
if (typeof window !== 'undefined') {
  initializeDevelopmentEnvironment()
}