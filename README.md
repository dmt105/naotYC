# NaotY Frontend - Application de Gestion des Notes Internes

Application web frontend pour la gestion des notes internes de l'Association Youth Computing.

## 🚀 Technologies

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Zustand** (State Management)
- **React Hook Form + Zod** (Formulaires & Validation)
- **Axios** (API Client avec interceptors JWT)

## 📁 Structure du Projet

Voir `STRUCTURE_DOSSIERS.md` pour la structure complète des dossiers.

## 🛠️ Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet** (si applicable)
```bash
git clone <repository-url>
cd naoty-frontend
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

4. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🧪 Tests

```bash
npm run test
```

## 📦 Build de Production

```bash
npm run build
npm start
```

## 🎨 Charte Graphique

- **Couleurs principales** :
  - Bleu : `#010b40`
  - Fuchsia : `#f13544`
  - Gris : `#999999`

- **Polices** :
  - Principale : Ubuntu
  - Secondaire : Century Gothic

## 👥 Rôles Utilisateurs

1. **Rédacteur** : Crée et soumet des notes
2. **Chef de Département** : Valide en premier niveau
3. **Directeur Exécutif** : Validation finale
4. **Destinataire** : Reçoit et lit les notes
5. **Administrateur** : Gestion complète

## 🔐 Authentification

- Connexion email/mot de passe
- Connexion Google OAuth (restriction @youthcomputing.org)
- JWT avec refresh token
- Routes protégées
- **Comptes démo** pour tous les rôles (voir `DEMO_ACCOUNTS.md`)

## 📝 Fonctionnalités Principales

- ✅ Authentification complète
- ✅ Dashboard personnalisé par rôle
- ✅ Gestion des notes (CRUD)
- ✅ Workflow de validation
- ✅ Planification et rappels
- ✅ Archivage et recherche
- ✅ Gestion des modèles (Admin)
- ✅ Statistiques et graphiques

## 🏗️ Architecture

- **SOLID** : Principe de responsabilité unique
- **Modulaire** : Séparation claire des préoccupations
- **Typage strict** : TypeScript partout
- **Responsive** : Mobile-first design
- **Accessible** : Conforme WCAG

## 📚 Documentation

- `STRUCTURE_DOSSIERS.md` : Structure complète des dossiers
- `DEMO_ACCOUNTS.md` : Guide des comptes démo
- `IMPLEMENTATION_STATUS.md` : État d'implémentation
- Code commenté en anglais

## 🔄 Intégration Backend

L'application est prête à intégrer le backend FastAPI. Les services API sont configurés dans `services/` et utilisent Axios avec interceptors JWT.

## 📄 Licence

Propriété de l'Association Youth Computing
