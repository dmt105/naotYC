import { AuthLayout } from '@/components/auth/AuthLayout'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Créez votre compte"
      subtitle="Déjà un compte ?"
      linkText="Connectez-vous"
      linkHref="/auth/login"
      linkDescription=""
    >
      <RegisterForm />
    </AuthLayout>
  )
}