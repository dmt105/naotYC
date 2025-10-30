import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/enum'

// Routes protégées par rôle
const roleBasedRoutes: Record<string, UserRole[]> = {
  '/dashboard/redacteur': [UserRole.REDACTEUR, UserRole.ADMIN],
  '/dashboard/validateur': [UserRole.CHEF_DEPARTEMENT, UserRole.DIRECTEUR_EXECUTIF, UserRole.ADMIN],
  '/dashboard/destinataire': [UserRole.DESTINATAIRE, UserRole.ADMIN],
  '/dashboard/admin': [UserRole.ADMIN],
  '/notes/new': [UserRole.REDACTEUR, UserRole.ADMIN],
  '/admin': [UserRole.ADMIN],
}

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) {
    return NextResponse.next()
  }

  // Vérifier si la route est publique
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  // Récupérer le token depuis les cookies
  const token = request.cookies.get('auth_token')?.value
  const userData = request.cookies.get('user_data')?.value
  // Si pas de token, rediriger vers le login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  let user: { role: UserRole } | null = null
  try {
    user = userData ? JSON.parse(userData) : null
  } catch {
    user = null
  }

  // Vérifier les permissions par rôle
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (pathname.startsWith(route) && user && !allowedRoles.includes(user.role)) {
      // Rediriger vers le dashboard approprié ou accès refusé
      const dashboardUrl = new URL('/dashboard/access-denied', request.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/notes/:path*', 
    '/admin/:path*',
    '/auth/:path*',
  ],
}