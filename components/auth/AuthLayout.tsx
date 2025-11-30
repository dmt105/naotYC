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
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-30 w-auto max-w-full object-contain"
                />
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
          {/* {linkHref === '/auth/register' && (
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
          )} */}
        </div>
      </div>
      <Footer />
    </div>
  )
}