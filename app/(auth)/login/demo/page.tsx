/**
 * Demo login page - Quick access to all demo accounts
 */

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DEMO_ACCOUNTS, getDemoUser } from '@/constants/demo-accounts';
import { ROLE_LABELS } from '@/constants/roles';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DemoLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleDemoLogin = (role: UserRole) => {
    const demoAccount = DEMO_ACCOUNTS.find((acc) => acc.role === role);
    if (!demoAccount) return;

    const demoUser = getDemoUser(role);
    const mockToken = `demo-token-${role}-${Date.now()}`;

    // Store token
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', mockToken);
      localStorage.setItem('refreshToken', `demo-refresh-${role}`);
    }

    // Update auth store
    login(demoUser, mockToken);

    toast.success(`Connexion réussie avec le compte ${demoAccount.label} !`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#010b40] via-[#010b40] to-[#1a1f5c] p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Comptes Démo NaotY</h1>
          <p className="text-gray-300">
            Sélectionnez un compte pour tester l'application avec différents rôles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_ACCOUNTS.map((account) => (
            <Card key={account.email} className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#010b40] mb-1">
                    {ROLE_LABELS[account.role]}
                  </h3>
                  <p className="text-sm text-gray-600">{account.description}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-600 font-mono text-xs">{account.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Mot de passe:</span>
                    <p className="text-gray-600 font-mono text-xs">{account.password}</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleDemoLogin(account.role)}
                  className="w-full bg-[#010b40] hover:bg-[#010b40]/90"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => router.push('/login')}
            className="border-white text-white hover:bg-white/10"
          >
            Retour à la connexion normale
          </Button>
        </div>
      </div>
    </div>
  );
}

