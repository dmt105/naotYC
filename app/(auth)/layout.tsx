/**
 * Layout for authentication pages
 * Adds header and footer for easy navigation back to landing
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header - similar to landing for navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#010b40]">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="text-2xl font-bold text-[#010b40] dark:text-white">NaotY</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/#features"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#010b40] dark:hover:text-white transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/#workflow"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#010b40] dark:hover:text-white transition-colors"
            >
              Workflow
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#010b40] dark:hover:text-white transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#010b40] dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => router.push('/')}>
              Retour au site
            </Button>
            <Button
              onClick={() => router.push('/login')}
              className="bg-[#f13544] hover:bg-[#f13544]/90 text-white"
            >
              Connexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main auth content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
        {children}
      </main>

      {/* Footer - contact info similar to landing */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#010b40]">
                  <span className="text-lg font-bold text-white">N</span>
                </div>
                <span className="text-xl font-bold text-[#010b40] dark:text-white">NaotY</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gestion des documents internes pour Youth Computing.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Navigation</h3>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/#features" className="hover:text-[#010b40] dark:hover:text-white">Fonctionnalités</Link>
                <Link href="/#workflow" className="hover:text-[#010b40] dark:hover:text-white">Workflow</Link>
                <Link href="/#about" className="hover:text-[#010b40] dark:hover:text-white">À propos</Link>
                <Link href="/#contact" className="hover:text-[#010b40] dark:hover:text-white">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Email :</strong> contact@youthcomputing.org</p>
                <p><strong>Téléphone :</strong> +261 XX XX XXX XX</p>
                <p><strong>Adresse :</strong> Youth Computing, Madagascar</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Youth Computing. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="/#contact" className="hover:text-[#010b40] dark:hover:text-white">Contact</a>
              <a href="#" className="hover:text-[#010b40] dark:hover:text-white">Confidentialité</a>
              <a href="#" className="hover:text-[#010b40] dark:hover:text-white">Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}