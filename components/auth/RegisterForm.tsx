/**
 * Registration form component
 */

'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Building } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { GoogleOAuthButton } from './GoogleOAuthButton';
import { DemoAccountSelector } from './DemoAccountSelector';
import { DEMO_ACCOUNTS } from '@/constants/demo-accounts';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Validation schema
const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string().min(8, 'La confirmation est requise'),
    department: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Vous devez accepter les conditions d\'utilisation',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
      department: '',
    },
  });

  const handleDemoAccountSelect = (account: typeof DEMO_ACCOUNTS[0]) => {
    // Auto-fill form with demo account
    setValue('email', account.email);
    setValue('password', account.password);
    setValue('confirmPassword', account.password);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Check if it's a demo account
      const demoAccount = DEMO_ACCOUNTS.find(
        (acc) => acc.email === data.email && acc.password === data.password
      );

      if (demoAccount) {
        toast.error('Cet email est réservé pour les comptes démo. Utilisez un autre email.');
        setIsLoading(false);
        return;
      }

      // Register with API
      const response = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        department: data.department,
      });

      // Auto-login after registration
      if (response.user && response.accessToken) {
        login(response.user, response.accessToken);
        toast.success('Inscription réussie ! Bienvenue sur NaotY !');
        router.push('/dashboard');
      } else {
        toast.success('Inscription réussie ! Veuillez vous connecter.');
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || 'Erreur lors de l\'inscription'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <img src="/logo.png" alt="NaotY" className="mx-auto h-30 w-30 mb-4" />
        <h1 className="text-3xl font-bold text-[#010b40]">Créer un compte</h1>
        <p className="mt-2 text-sm text-gray-600">
          Rejoignez l'équipe Youth Computing
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              placeholder="Votre prénom"
              className="pl-10"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="lastName"
              type="text"
              placeholder="Votre nom"
              className="pl-10"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
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

        {/* Department (select) */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Département
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="department" className="pl-10">
                      <SelectValue placeholder="Sélectionnez un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Technique',
                        'Communication',
                        'Direction',
                        'IT',
                        'Ressources Humaines',
                        'Finance',
                        'Général',
                      ].map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
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
          <p className="mt-1 text-xs text-gray-500">
            Minimum 8 caractères
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              className="mt-1 rounded border-gray-300 text-[#010b40] focus:ring-[#010b40]"
            />
            <span className="text-sm text-gray-600">
              J'accepte les{' '}
              <a href="#" className="text-[#f13544] hover:underline">
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a href="#" className="text-[#f13544] hover:underline">
                politique de confidentialité
              </a>
              *
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full bg-[#010b40] hover:bg-[#010b40]/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou</span>
        </div>
      </div>

      {/* Demo Account Selector */}
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

      {/* Login link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-[#f13544] hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}





