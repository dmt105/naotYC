/**
 * Forgot password form
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const forgotSchema = z.object({
  email: z.string().email('Email invalide'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(data.email);
      toast.success(res.message || 'Si cet email existe, vous recevrez un lien de réinitialisation.');
      // Optionally redirect back to login
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la demande de récupération');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <img src="/logo.png" alt="NaotY" className="mx-auto h-30 w-30 mb-4" />
        <h1 className="text-3xl font-bold text-[#010b40]">Mot de passe oublié</h1>
        <p className="mt-2 text-sm text-gray-600">
          Entrez votre email pour recevoir les instructions de réinitialisation
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <Button type="submit" className="w-full bg-[#010b40] hover:bg-[#010b40]/90 text-white" disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Retour à la connexion ?{' '}
          <Link href="/login" className="text-[#f13544] hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
