/**
 * Landing page for NaotY application with animations
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  CheckCircle,
  Calendar,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Try to import framer-motion, fallback to CSS animations if not available
let motion: any;
try {
  motion = require('framer-motion');
} catch {
  // Framer Motion not installed, use CSS animations instead
  motion = null;
}

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: FileText,
      title: 'Gestion des Notes',
      description: 'Créez, éditez et gérez toutes vos notes internes en un seul endroit.',
    },
    {
      icon: CheckCircle,
      title: 'Workflow de Validation',
      description: 'Processus de validation multi-niveaux avec suivi en temps réel.',
    },
    {
      icon: Calendar,
      title: 'Planification Intelligente',
      description: 'Planifiez vos envois et synchronisez avec Google Calendar.',
    },
    {
      icon: Shield,
      title: 'Sécurité & Traçabilité',
      description: 'Authentification sécurisée et historique complet de chaque action.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Notes gérées' },
    { value: '50+', label: 'Utilisateurs actifs' },
    { value: '99%', label: 'Taux de satisfaction' },
    { value: '24/7', label: 'Disponibilité' },
  ];

  // Use motion components if available, otherwise use regular divs
  const MotionDiv = motion?.motion?.div || 'div';
  const MotionSpan = motion?.motion?.span || 'span';
  const MotionH1 = motion?.motion?.h1 || 'h1';
  const MotionP = motion?.motion?.p || 'p';

  // Animation variants (only used if framer-motion is available)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#010b40]">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="text-2xl font-bold text-[#010b40]">NaotY</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-[#010b40] transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-600 hover:text-[#010b40] transition-colors"
            >
              À propos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => router.push('/login')}>
              Se connecter
            </Button>
            <Button
              onClick={() => router.push('/register')}
              className="bg-[#f13544] hover:bg-[#f13544]/90 text-white"
            >
              S'inscrire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#010b40]/5 via-white to-[#f13544]/5" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(241,53,68,0.12)_0%,transparent_100%)]" />

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f13544]/10 px-4 py-1.5 text-sm font-medium text-[#f13544]">
                <Zap className="h-4 w-4" />
                Nouveau: Intégration Google Calendar
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#010b40] sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up delay-100">
              Gérez vos notes internes avec{' '}
              <span className="text-[#f13544]">simplicité</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl animate-slide-up delay-200">
              NaotY centralise la création, validation et diffusion de vos notes internes. Un
              workflow puissant pour Youth Computing.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up delay-300">
              <Button
                size="lg"
                onClick={() => router.push('/login')}
                className="bg-[#f13544] hover:bg-[#f13544]/90 text-white h-12 px-8"
              >
                Accéder à l'application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-12 px-8 border-[#010b40] text-[#010b40] hover:bg-[#010b40] hover:text-white"
              >
                Découvrir les fonctionnalités
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in delay-500">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#010b40] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-[#010b40] md:text-4xl">
              Fonctionnalités <span className="text-[#f13544]">puissantes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer efficacement vos notes internes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-[#f13544]/30 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#f13544]/10 p-3 text-[#f13544] group-hover:bg-[#f13544] group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#010b40]">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-[#010b40] md:text-4xl">
              Un workflow <span className="text-[#f13544]">optimisé</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              De la création à l'archivage, chaque étape est tracée et validée
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Workflow steps */}
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: '1', title: 'Création', desc: 'Rédigez votre note', icon: FileText },
                {
                  step: '2',
                  title: 'Validation',
                  desc: 'Approbation hiérarchique',
                  icon: CheckCircle,
                },
                { step: '3', title: 'Planification', desc: 'Choisissez la date', icon: Clock },
                { step: '4', title: 'Diffusion', desc: 'Envoi automatique', icon: Users },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative text-center animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#010b40] text-white shadow-lg">
                    <item.icon className="h-7 w-7" />
                  </div>
                  {index < 3 && (
                    <div
                      className="absolute top-8 left-1/2 hidden h-px w-full bg-gray-200 md:block"
                      style={{ transform: 'translateX(50%)' }}
                    />
                  )}
                  <h4 className="font-semibold text-[#010b40]">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#010b40] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold md:text-4xl">À propos de Youth Computing</h2>
            <p className="mt-6 text-lg text-white/80">
              Youth Computing est une association dédiée à la promotion de la culture numérique à
              Madagascar. NaotY est notre solution interne pour moderniser la gestion de nos
              communications officielles et garantir une traçabilité complète de nos notes internes.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => router.push('/login')}
                className="bg-[#f13544] hover:bg-[#f13544]/90 text-white"
              >
                Rejoignez l'équipe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#010b40]">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold text-[#010b40]">NaotY</span>
            </div>

            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Youth Computing. Tous droits réservés.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#010b40] transition-colors"
              >
                Confidentialité
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#010b40] transition-colors"
              >
                Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
