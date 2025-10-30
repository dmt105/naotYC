'use client'
import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  linkText: string
  linkHref: string
  linkDescription: string
}

export function AuthLayout({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
  linkDescription
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-900 to-secondary">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="flex justify-center">
                <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {subtitle}{' '}
                <a
                  href={linkHref}
                  className="font-medium text-primary transition-color hover:text-sky-600 hover:underline"
                >
                  {linkText}
                </a>
              </p>
            </div>
            {children}
          </div>
          
          {/* Demo Credentials - Only for login */}
          {linkHref === '/auth/register' && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Comptes de démonstration :
              </h3>
              <div className="space-y-1 text-xs text-blue-700">
                <div><strong>Rédacteur :</strong> redacteur@youthcomputing.org / demo123</div>
                <div><strong>Chef de Département :</strong> chef@youthcomputing.org / demo123</div>
                <div><strong>Directeur :</strong> directeur@youthcomputing.org / demo123</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}