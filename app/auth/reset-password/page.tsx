import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

interface ResetPasswordPageProps {
  searchParams: {
    token?: string
    email?: string
  }
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-900 to-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900">
              Nouveau mot de passe
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Créez un nouveau mot de passe sécurisé pour votre compte
            </p>
            {searchParams.email && (
              <p className="mt-2 text-sm text-gray-500">
                Pour : {searchParams.email}
              </p>
            )}
          </div>
          <ResetPasswordForm 
            token={searchParams.token} 
            email={searchParams.email} 
          />
        </div>
      </div>
    </div>
  )
}