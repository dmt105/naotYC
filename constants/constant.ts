import { FileCheck, Users, Calendar, Shield, Archive, BarChart,CheckCircle, Clock, Send } from 'lucide-react'

export const navigation = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
]

export const features = [
  {
    icon: FileCheck,
    title: 'Workflow de Validation',
    description: 'Processus de validation multi-niveaux avec commentaires et retours en temps réel.'
  },
  {
    icon: Users,
    title: 'Collaboration Simplifiée',
    description: 'Commentaires, mentions et suivi collaboratif pour une communication efficace.'
  },
  {
    icon: Calendar,
    title: 'Planification Intelligente',
    description: 'Calendrier intégré et rappels automatiques pour une diffusion optimale.'
  },
  {
    icon: Shield,
    title: 'Sécurité des Données',
    description: 'Authentification JWT et OAuth, chiffrement des données sensibles.'
  },
  {
    icon: Archive,
    title: 'Archivage Automatique',
    description: 'Classement et recherche avancée dans les notes archivées.'
  },
  {
    icon: BarChart,
    title: 'Tableaux de Bord',
    description: 'KPIs et statistiques pour suivre les performances de communication.'
  }
]

export const testimonials = [
  {
    name: 'Jean Aimé Raheriniaina',
    role: 'Chef de Projet',
    content: 'NaotY a transformé notre façon de communiquer en interne. Gain de temps considérable et traçabilité parfaite.',
    rating: 5
  },
  {
    name: 'Sarah Andriamanjato',
    role: 'Directrice Exécutive',
    content: 'La validation hiérarchique est maintenant fluide et organisée. Plus jamais de note non validée envoyée par erreur.',
    rating: 2
  },
  {
    name: 'Marc Ravalison',
    role: 'Chef de Département Technique',
    content: 'Les commentaires collaboratifs et le suivi en temps réel ont considérablement amélioré la qualité de nos notes.',
    rating: 5
  },
  {
    name: 'BEZANDRY Dimitri',
    role: 'Gestionnaire de l\'infrastructure numerique',
    content: 'Les temps de reponse sont vraiments rapides .',
    rating: 3
  },
   {
    name: 'Ferdinand',
    role: 'Stagiaire',
    content: 'Cette app est vraiment facile a utiliser.',
    rating: 2
  }
]

export const steps = [
  {
    name: 'Rédaction',
    description: 'Création de la note avec modèles pré-définis et sauvegarde automatique',
    icon: Clock,
    status: 'draft'
  },
  {
    name: 'Validation Hiérarchique',
    description: 'Workflow à 2 niveaux : Chef de Département puis Directeur Exécutif',
    icon: Users,
    status: 'validation'
  },
  {
    name: 'Planification',
    description: 'Choix de la date et heure optimales pour la diffusion',
    icon: Calendar,
    status: 'scheduled'
  },
  {
    name: 'Diffusion',
    description: 'Envoi automatique aux destinataires avec accusés de réception',
    icon: Send,
    status: 'sent'
  },
  {
    name: 'Archivage',
    description: 'Classement automatique et recherche multicritères',
    icon: CheckCircle,
    status: 'archived'
  }
]

export const COLORS = {
  primary: '#010b40',
  secondary: '#f13544',
  gray: '#999999',
  lightGray: '#f5f5f5',
  white: '#ffffff'
} as const;

export const NOTE_TYPES = {
  CONVOCATION: 'Convocation',
  REPORT: 'Rapport',
  ANNOUNCEMENT: 'Annonce',
  OTHER: 'Autre'
} as const;

export const NOTE_STATUS = {
  DRAFT: 'Brouillon',
  PENDING_VALIDATION: 'En attente de validation',
  RETURNED: 'Retourné',
  APPROVED: 'Approuvé',
  SCHEDULED: 'Planifié',
  SENT: 'Envoyé',
  ARCHIVED: 'Archivé'
} as const;