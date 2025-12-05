/**
 * Registration page
 */

import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#010b40] via-[#010b40] to-[#1a1f5c] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <RegisterForm />
      </div>
    </div>
  );
}





