'use client'
import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Fonctionnalités', href: '/#features' },
    { name: 'Workflow', href: '/#workflow' },
    { name: 'Témoignages', href: '/#testimonials' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="ml-2 text-xl font-heading font-bold text-primary">Naot<b className='text-[#f13544]'>YC</b></span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/auth/register"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary mr-6"
          >
            Créer un compte
          </Link>
          <Link
            href="/auth/login"
            className="bg-primary bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </nav>
    </header>
  )
}