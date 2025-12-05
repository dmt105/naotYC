/**
 * Login page
 */

import { LoginForm } from '@/components/auth/LoginForm';
import { BRAND_COLORS } from '@/constants/colors';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#010b40] via-[#010b40] to-[#1a1f5c] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <LoginForm />
      </div>
    </div>
  );
}





