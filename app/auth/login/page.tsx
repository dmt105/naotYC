import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Connectez-vous à NaotY"
      subtitle="Nouveau sur NaotY ?"
      linkText="Créez un compte"
      linkHref="/auth/register"
      linkDescription=""
    >
      <LoginForm />
    </AuthLayout>
  )
}