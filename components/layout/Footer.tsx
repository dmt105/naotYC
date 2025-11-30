// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center">
            <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-12 w-auto max-w-full object-contain"
                />
            <span className="ml-2 text-lg font-heading font-bold">NaotYC</span>
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