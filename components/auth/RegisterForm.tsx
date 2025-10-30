'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OAuthButton } from './OAuthButton'
import { PasswordStrength } from '@/components/ui/password-strength'
import { AuthValidations } from '@/lib/validation'
// Interface - terms doit être de type boolean
interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  department: string
  password: string
  confirmPassword: string
  terms: boolean
}

// Interface pour les erreurs - terms doit être de type string
interface RegisterFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  department?: string
  password?: string
  confirmPassword?: string
  terms?: string
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof RegisterFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {}

    const firstNameValidation = AuthValidations.validateName(formData.firstName)
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.message
    }

    const lastNameValidation = AuthValidations.validateName(formData.lastName)
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.message
    }

    const emailValidation = AuthValidations.validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message
    }

    if (!formData.department) {
      newErrors.department = 'Le département est requis'
    }

    const passwordValidation = AuthValidations.validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    if (!formData.terms) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would call your registration API here
      console.log('Registration data:', formData)
      
      // Redirect to login page
      window.location.href = '/auth/login'
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    // Implement Google OAuth logic
    console.log('Google OAuth registration')
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={errors.firstName}
              placeholder="Votre prénom"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={errors.lastName}
              placeholder="Votre nom"
              className="mt-1"
            />
          </div>
        </div>

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

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Département
          </label>
          <select
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Sélectionnez votre département</option>
            <option value="technique">Département Technique</option>
            <option value="communication">Département Communication</option>
            <option value="evenementiel">Département Événementiel</option>
            <option value="formation">Département Formation</option>
            <option value="administration">Administration</option>
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-500">{errors.department}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="relative mt-1">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="Créez un mot de passe sécurisé"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <PasswordStrength password={formData.password} className="mt-2" />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              placeholder="Confirmez votre mot de passe"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          checked={formData.terms}
          onChange={(e) => handleInputChange('terms', e.target.checked)}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          J'accepte les{' '}
          <a href="#" className="text-primary hover:text-secondary transition-colors">
            conditions d'utilisation
          </a>{' '}
          et la{' '}
          <a href="#" className="text-primary hover:text-secondary transition-colors">
            politique de confidentialité
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-xs text-red-500">{errors.terms}</p>
      )}

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
          Créer mon compte
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
          </div>
        </div>

        <div className="mt-6 hover:cursor-pointer">
          <OAuthButton provider="google" onClick={handleGoogleRegister} />
        </div>
      </div>
    </form>
  )
}