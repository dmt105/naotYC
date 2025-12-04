# 📁 Structure Complète des Dossiers - NaotY Frontend

## Vue d'ensemble de l'architecture

```
naoty-frontend/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Groupe de routes d'authentification
│   │   ├── login/                # Page de connexion
│   │   └── layout.tsx            # Layout spécifique à l'auth
│   ├── (dashboard)/              # Groupe de routes protégées
│   │   ├── dashboard/            # Dashboard principal
│   │   ├── notes/                 # Gestion des notes
│   │   │   ├── create/            # Création de note
│   │   │   ├── [id]/             # Détail/Édition d'une note
│   │   │   └── page.tsx           # Liste des notes
│   │   ├── validation/            # Interface de validation
│   │   ├── archive/               # Notes archivées
│   │   ├── templates/             # Gestion des modèles (Admin)
│   │   ├── users/                # Gestion des utilisateurs (Admin)
│   │   └── layout.tsx            # Layout avec Sidebar + Header
│   ├── api/                      # API Routes (si nécessaire)
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Styles globaux
│
├── components/                    # Composants React réutilisables
│   ├── ui/                       # Composants shadcn/ui de base
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── card.tsx
│   │   └── ...                   # Autres composants UI
│   ├── auth/                     # Composants d'authentification
│   │   ├── LoginForm.tsx          # Formulaire de connexion
│   │   ├── GoogleOAuthButton.tsx  # Bouton OAuth Google
│   │   └── ProtectedRoute.tsx     # HOC pour routes protégées
│   ├── layout/                   # Composants de layout
│   │   ├── Header.tsx             # Header avec profil utilisateur
│   │   ├── Sidebar.tsx            # Sidebar adaptable par rôle
│   │   ├── UserProfileDropdown.tsx # Dropdown du profil
│   │   └── MobileMenu.tsx         # Menu mobile responsive
│   ├── dashboard/                # Composants du dashboard
│   │   ├── DashboardStats.tsx    # Cartes statistiques
│   │   ├── NotesOverview.tsx     # Vue d'ensemble des notes
│   │   ├── RecentActivity.tsx    # Activité récente
│   │   └── Charts/               # Composants graphiques
│   │       ├── ValidationTimeChart.tsx
│   │       └── NotesEvolutionChart.tsx
│   ├── notes/                    # Composants de gestion des notes
│   │   ├── NoteForm.tsx          # Formulaire de création/édition
│   │   ├── NoteList.tsx          # Liste des notes (div-based)
│   │   ├── NoteCard.tsx          # Carte d'une note
│   │   ├── NoteDetail.tsx        # Détail d'une note
│   │   ├── DraftAutoSave.tsx     # Sauvegarde automatique
│   │   └── AttachmentsUpload.tsx # Upload de pièces jointes
│   ├── validation/               # Composants de validation
│   │   ├── ValidationPanel.tsx   # Panneau de validation
│   │   ├── CommentThread.tsx     # Fil de commentaires
│   │   ├── StatusHistory.tsx     # Historique des statuts
│   │   └── ValidationActions.tsx # Actions (Valider/Retourner)
│   ├── templates/                # Composants de modèles
│   │   ├── TemplateList.tsx      # Liste des modèles
│   │   ├── TemplateForm.tsx      # Formulaire de modèle
│   │   └── TemplatePreview.tsx   # Aperçu de modèle
│   └── common/                   # Composants communs
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       └── SearchBar.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts                # Hook d'authentification
│   ├── useNotes.ts               # Hook pour les notes
│   ├── useValidation.ts          # Hook pour la validation
│   ├── useAutoSave.ts            # Hook de sauvegarde auto
│   ├── usePermissions.ts         # Hook pour les permissions
│   └── useDebounce.ts            # Hook de debounce
│
├── lib/                          # Bibliothèques et configurations
│   ├── axios.ts                  # Configuration Axios avec interceptors
│   ├── utils.ts                  # Utilitaires généraux
│   ├── cn.ts                     # Fonction de merge de classes
│   └── validations.ts            # Schémas Zod réutilisables
│
├── services/                     # Services API
│   ├── auth.service.ts           # Service d'authentification
│   ├── notes.service.ts          # Service des notes
│   ├── validation.service.ts     # Service de validation
│   ├── templates.service.ts      # Service des modèles
│   ├── users.service.ts          # Service des utilisateurs
│   └── api-client.ts             # Client API de base
│
├── store/                        # État global (Zustand)
│   ├── auth.store.ts             # Store d'authentification
│   ├── notes.store.ts            # Store des notes
│   ├── ui.store.ts               # Store de l'UI (theme, sidebar)
│   └── index.ts                  # Export centralisé
│
├── types/                        # Types TypeScript
│   ├── auth.types.ts             # Types d'authentification
│   ├── note.types.ts             # Types de notes
│   ├── user.types.ts             # Types d'utilisateurs
│   ├── validation.types.ts       # Types de validation
│   ├── template.types.ts         # Types de modèles
│   └── api.types.ts              # Types d'API (réponses, erreurs)
│
├── utils/                        # Fonctions utilitaires
│   ├── date.utils.ts             # Utilitaires de dates
│   ├── format.utils.ts           # Formatage (texte, nombres)
│   ├── permissions.utils.ts       # Utilitaires de permissions
│   ├── export.utils.ts           # Export PDF
│   └── constants.ts              # Constantes de l'application
│
├── constants/                    # Constantes
│   ├── routes.ts                 # Routes de l'application
│   ├── roles.ts                  # Rôles et permissions
│   ├── note-status.ts            # Statuts des notes
│   └── colors.ts                 # Couleurs de la charte graphique
│
├── i18n/                         # Internationalisation
│   ├── config.ts                 # Configuration i18next
│   ├── locales/                 # Fichiers de traduction
│   │   ├── fr.json
│   │   └── en.json
│   └── hooks.ts                  # Hook useTranslation
│
├── __tests__/                    # Tests unitaires
│   ├── components/
│   │   ├── auth/
│   │   ├── notes/
│   │   └── validation/
│   ├── hooks/
│   ├── utils/
│   └── setup.ts                  # Configuration des tests
│
├── public/                       # Fichiers statiques
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.local                    # Variables d'environnement
├── .env.example                  # Exemple de variables d'environnement
├── next.config.js                # Configuration Next.js
├── tailwind.config.ts            # Configuration Tailwind
├── tsconfig.json                 # Configuration TypeScript
└── package.json                  # Dépendances
```

---

## 📋 Explications Détaillées par Dossier

### 🎯 **app/** - Routes Next.js (App Router)
- **`(auth)/`** : Groupe de routes pour l'authentification (login, OAuth)
- **`(dashboard)/`** : Groupe de routes protégées nécessitant une authentification
- **`api/`** : Routes API Next.js (si nécessaire pour des proxies)
- **`layout.tsx`** : Layout racine avec providers globaux
- **`page.tsx`** : Landing page publique

### 🧩 **components/** - Composants React
- **`ui/`** : Composants UI de base (shadcn/ui) réutilisables
- **`auth/`** : Composants spécifiques à l'authentification
- **`layout/`** : Header, Sidebar, Navigation (adaptables par rôle)
- **`dashboard/`** : Composants du tableau de bord (stats, graphiques)
- **`notes/`** : Composants de gestion des notes (CRUD)
- **`validation/`** : Composants du workflow de validation
- **`templates/`** : Composants de gestion des modèles (Admin)
- **`common/`** : Composants communs (Loading, EmptyState, etc.)

### 🎣 **hooks/** - Custom Hooks
- Hooks personnalisés pour la logique métier réutilisable
- Exemple : `useAuth`, `useNotes`, `useValidation`

### 📚 **lib/** - Bibliothèques
- Configuration Axios avec interceptors JWT
- Utilitaires généraux (cn, validations Zod)

### 🔌 **services/** - Services API
- Couche d'abstraction pour les appels API
- Un service par domaine métier (auth, notes, validation, etc.)

### 🗄️ **store/** - État Global (Zustand)
- Stores Zustand pour la gestion d'état
- Séparation par domaine (auth, notes, UI)

### 📝 **types/** - Types TypeScript
- Définitions de types strictes pour toute l'application
- Un fichier par domaine métier

### 🛠️ **utils/** - Utilitaires
- Fonctions utilitaires pures (dates, formatage, permissions)
- Pas de dépendances React

### 📌 **constants/** - Constantes
- Routes, rôles, statuts, couleurs
- Valeurs immuables de l'application

### 🌍 **i18n/** - Internationalisation
- Configuration i18next
- Fichiers de traduction (FR, EN)

### ✅ **__tests__/** - Tests
- Tests unitaires organisés par domaine
- Configuration Jest + React Testing Library

---

## 🎨 Principes d'Organisation

1. **SOLID** : Chaque composant a une responsabilité unique
2. **Modularité** : Séparation claire des préoccupations
3. **Réutilisabilité** : Composants et hooks réutilisables
4. **Typage strict** : TypeScript partout
5. **Testabilité** : Code testable et tests inclus

---

## 🚀 Ordre de Développement Recommandé

1. ✅ Structure des dossiers
2. ✅ Types et constants
3. ✅ Authentification
4. ✅ Layout (Header, Sidebar)
5. ✅ Dashboard
6. ✅ Gestion des notes (CRUD)
7. ✅ Workflow de validation
8. ✅ Statistiques et graphiques
9. ✅ Gestion des modèles (Admin)
10. ✅ Tests et optimisations

