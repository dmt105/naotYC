import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-900 to-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900">
              Mot de passe oublié
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Entrez votre email professionnel pour recevoir un lien de réinitialisation
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}