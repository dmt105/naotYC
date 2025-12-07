/**
 * Login form component with email/password and Google OAuth
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { GoogleOAuthButton } from './GoogleOAuthButton';
import { DemoAccountSelector } from './DemoAccountSelector';
import { DEMO_ACCOUNTS, getDemoUser } from '@/constants/demo-accounts';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const handleDemoAccountSelect = (account: typeof DEMO_ACCOUNTS[0]) => {
    // Auto-fill form with demo account using react-hook-form setValue
    setValue('email', account.email);
    setValue('password', account.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Check if it's a demo account
      const demoAccount = DEMO_ACCOUNTS.find(
        (acc) => acc.email === data.email && acc.password === data.password
      );

      if (demoAccount) {
        // Handle demo account login (mock authentication)
        const demoUser = getDemoUser(demoAccount.role);
        const mockToken = `demo-token-${demoAccount.role}-${Date.now()}`;

        // Store tokens
        if (data.rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', `demo-refresh-${demoAccount.role}`);
        }

        // Update auth store
        login(demoUser, mockToken);

        toast.success(`Connexion réussie avec le compte ${demoAccount.label} !`);
        router.push('/dashboard');
      } else {
        // Regular login with API
        const response = await authService.login({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        // Store tokens
        if (data.rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        // Update auth store
        login(response.user, response.accessToken);

        toast.success('Connexion réussie !');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <img src="/logo.png" alt="NaotY" className="mx-auto h-30 w-30 mb-4" />
        <h1 className="text-3xl font-bold text-[#010b40]">Connexion</h1>
        <p className="mt-2 text-sm text-gray-600">
          Accédez à votre espace NaotY
        </p>
        <a
          href="/login/demo"
          className="mt-2 inline-block text-sm text-[#f13544] hover:underline"
        >
          Ou accéder aux comptes démo →
        </a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="votre.email@youthcomputing.org"
              className="pl-10"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="rounded border-gray-300 text-[#010b40] focus:ring-[#010b40]"
            />
            <span className="text-sm text-gray-600">Se souvenir de moi</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-[#f13544] hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full bg-[#010b40] hover:bg-[#010b40]/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      {/* Demo Account Selector */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou</span>
        </div>
      </div>

      <DemoAccountSelector onSelectAccount={handleDemoAccountSelect} />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou</span>
        </div>
      </div>

      {/* Google OAuth button */}
      <GoogleOAuthButton />

      {/* Register link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-[#f13544] hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

