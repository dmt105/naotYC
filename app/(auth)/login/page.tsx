/**
 * Login page
 */

import { LoginForm } from '@/components/auth/LoginForm';
import { BRAND_COLORS } from '@/constants/colors';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-700 max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <LoginForm />
      </div>
    </div>
  );
}





