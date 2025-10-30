'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthValidations } from '@/lib/validation'

interface ForgotPasswordFormData {
  email: string
}

export function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  })
  const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ForgotPasswordFormData> = {}

    const emailValidation = AuthValidations.validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would call your password reset API here
      console.log('Password reset requested for:', formData.email)
      
      // Show success message
      setIsSubmitted(true)
    } catch (error) {
      console.error('Password reset error:', error)
      setErrors({ email: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="mt-8 space-y-6 text-center">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Email envoyé avec succès !
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Un lien de réinitialisation a été envoyé à <strong>{formData.email}</strong>.
                  Vérifiez votre boîte de réception.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Vous n'avez pas reçu l'email ?</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="font-medium text-primary hover:text-sky-700 hover:cursor-pointer hover:underline transition-colors mt-2"
          >
            Renvoyer l'email
          </button>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <a
            href="/auth/login"
            className="text-sm font-medium text-primary transition-colors"
          >
            ← Retour à la connexion
          </a>
        </div>
      </div>
    )
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email professionnel
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="votre@email.youthcomputing.org"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            Seules les adresses @youthcomputing.org sont autorisées
          </p>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full relative bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          Envoyer le lien de réinitialisation
        </Button>
      </div>

      <div className="text-center">
        <a
          href="/auth/login"
          className="text-sm font-medium text-primary hover:text-sky-700 hover:cursor-pointer hover:underline transition-colors"
        >
          ← Retour à la connexion
        </a>
      </div>
    </form>
  )
}
