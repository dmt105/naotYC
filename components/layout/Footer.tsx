// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="ml-2 text-lg font-heading font-bold">NaotY</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-400">
              &copy; 2025 Youth Computing. Solution de gestion des notes internes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}