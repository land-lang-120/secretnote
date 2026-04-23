# 📖 SecretNote — Cahier de charges (rétrospectif)

> Cahier de secrets privé chiffré avec PIN, multi-notebooks, freemium
> Version : 1.0 — 2026-04-23
> Voir aussi : [PROGRESS.md](PROGRESS.md)

---

## 1. Vision

Un **cahier de secrets numérique privé** : on note ce qu'on n'écrirait nulle part ailleurs (journal intime, confessions, idées intimes), avec :
- **Verrou PIN** au lancement (5 chiffres)
- **Plusieurs notebooks** (organisés par thème : ❤️ Amour, 🖤 Sombre, 🌙 Rêves, ...)
- **Pages numérotées** avec stickers + bookmarks
- **Corbeille** (pages déchirées récupérables, puis "destruction définitive")
- **Recherche** full-text dans les notes
- **Esthétique** style "vrai cahier" (page warm off-white, ruled lines, encre noire)
- **Modèle freemium** : 4 plans avec limites de notebooks + pages

Tagline : *"Tes secrets. Ton cahier. À jamais."*

## 2. Personas

### 2.1 L'écrivain de l'intime
- Tient un journal quotidien
- Veut une UI minimaliste qui ne perturbe pas l'écriture
- Pas besoin de cloud, juste sa note bien à elle
- Acheteur potentiel pour débloquer plus de pages

### 2.2 Le confesseur sporadique
- Note de temps en temps des choses qu'il ne veut pas oublier ou avouer
- Veut un PIN pour s'assurer que personne ne lit
- Plan basic suffit (1 notebook, 50 pages)

### 2.3 Le créateur d'idées
- Multi-notebooks par thème (rêves, idées business, secrets, lettres jamais envoyées)
- Stickers + bookmarks pour retrouver les pages clés
- Plan Monthly+ ou Yearly

## 3. Périmètre fonctionnel (état actuel)

### 3.1 Verrou
- PIN à **5 chiffres** (`PIN_LENGTH = 5`)
- Écran de PIN au lancement (composant `PinScreen`)
- Si PIN OK → `setLocked(false)` → app

### 3.2 Notebooks
- Création avec nom + emoji (20 emojis disponibles : 📓📕📗📘📙📔🔒💀🖤🤍❤️💎🔥✨🌙⭐🎭👁️🗝️💌)
- Switch entre notebooks via `NotebooksScreen`
- Limite par plan (1 / 3 / 5 / 10)

### 3.3 Pages (= "secrets")
- Texte libre, max **3000 caractères** par page (`CHARS_PER_PAGE`)
- Numérotation auto (Page 1, 2, 3, ...)
- Stickers : 30 emojis disponibles (🔒❤️💔🔥💀👁️🤫💭⚡🌙⭐💎🖤🤍😈👻🎭✨💫🕳️🗝️⛓️🥀🦋💌📎🏷️🔖⚠️♾️)
- Bookmark (étoile) pour marquer les favoris
- Limite par plan (50 / 100 / 150 / 300 pages)
- Auto-advance après save (passe à la page suivante)

### 3.4 Corbeille (pages déchirées)
- Tap sur "déchirer" → page taguée `torn: true`, sortie du flux principal
- `TrashScreen` liste les pages déchirées
- `restorePage(id)` → ramène la page
- `destroyAllTrash()` → supprime définitivement (avec confirm modal "💀")

### 3.5 Recherche
- `SearchScreen` : recherche full-text dans toutes les notes (chiffrées côté client)
- Cross-notebook (résultats marqués par leur notebook)
- Tap sur résultat → ouvre la page dans son notebook

### 3.6 Plans (freemium)

| Plan | Prix | Notebooks | Pages |
|------|------|-----------|-------|
| Basic | $1.99 | 1 | 50 |
| Monthly | $4.99 | 3 | 100 |
| Monthly+ | $7.99 | 5 | 150 |
| Yearly | $99.99 | 10 | 300 |

- Overlays "Limite atteinte" déclenchent l'upgrade
- `SubscriptionScreen` pour comparer/choisir un plan
- Aucun paiement réel intégré pour l'instant (UI seule)

### 3.7 Internationalisation (16 langues)
FR, EN, ES, PT, DE, IT, NL, TR, RU, AR, ZH, JA, KO, HI, SW, PL
- Module `i18n.js` avec `sn(key)` lookup
- Format date selon locale (`snLocale()` map)
- Aujourd'hui / Hier / nom du jour selon langue

### 3.8 Settings
- Sélection langue
- Stats : nombre de pages, notebooks, plan actuel
- Export / backup local (?)

### 3.9 Toast notifications
- Bottom toast 2 secondes pour feedback (✓ Sauvegardé, 🗑️ Page déchirée, ↩️ Restaurée, 💀 Détruit)

### 3.10 PWA
- Installable (manifest)
- Mode offline (service worker — à confirmer dans le code)

## 4. Architecture technique

### 4.1 Stack actuelle
- **Front** : React 18 (UMD CDN cdnjs) + JSX inline en `React.createElement` (pas de Babel — code écrit directement en createElement pour économiser le runtime)
- **Build** : `build.js` Node qui concatène `js/*.js` en `bundle.js` (~105KB)
- **Style** : un seul fichier `css/style.css` + variables JS dans config (`S` object)
- **Données** : entièrement en mémoire React state (pas encore de persistance localStorage visible — à confirmer)
- **PWA** : manifest, pas de SW visible (à confirmer)

### 4.2 Stack cible
- **Front** : React 18 + TypeScript + Vite (recette chrome-messenger)
- **Persistance locale** : IndexedDB (capacité > localStorage, async friendly)
- **Chiffrement local** : WebCrypto AES-GCM avec clé dérivée du PIN via PBKDF2
- **Backend optionnel** : Firebase Firestore avec **chiffrement E2E ECDH+AES-GCM côté client** (le serveur ne voit que des blobs chiffrés)
- **Auth cloud** : OTP téléphone ou email magic link
- **Mobile** : Capacitor APK Android + iOS

### 4.3 Modèle de données

```typescript
type Plan = 'basic' | 'monthly' | 'monthlyPlus' | 'yearly';

interface Notebook {
  id: number;
  name: string;
  emoji: string;
  createdAt: string; // ISO date
  color: string;
}

interface Secret {  // = page
  id: number;
  notebookId: number;
  page: number;        // numéro de page dans le notebook
  date: string;        // ISO date de création
  content: string;     // texte (max 3000 chars)
  bookmarked?: boolean;
  stickers?: string[];
  torn?: boolean;      // dans la corbeille
}
```

### 4.4 Sécurité
- **PIN local** : actuellement non hashé (à confirmer/améliorer — devrait être PBKDF2)
- **Chiffrement** : revendiqué dans le marketing, à vérifier dans le code (peut-être pas encore implémenté)
- **Sync cloud** : aucune, donc 0 risque de fuite serveur — mais aussi 0 backup (perte si téléphone perdu)
- **V1 cloud cible** : E2E ECDH+AES-GCM, le PIN dérive la clé, le serveur stocke des blobs

## 5. Charte UI

### 5.1 Couleurs
- **Tout noir & blanc** (palette pure pour minimalisme)
- BG : `#0A0A0A` (presque noir)
- Surface : `#111111` → `#222222` (3 niveaux)
- Lignes : `#2A2A2A` → `#444444` (3 niveaux)
- Texte : `#666` muted → `#F5F5F5` titre
- **Page (notebook)** : `#F8F7F2` (warm off-white) avec lignes ruled `#D4D0C8`
- Encre : `#1A1A1A`
- Accent : blanc + transparent
- Danger : `#FF4444`
- Or (premium) : `#C9A84C`

### 5.2 Typographie
- **Lora** (serif) pour les titres et le contenu des pages (style "manuscrit")
- **Inter** (sans-serif) pour l'UI (boutons, labels, métadonnées)

### 5.3 Composants visuels distinctifs
- Logo : un cahier à spirale stylisé avec un cadenas SVG
- Top bar sticky : logo + nom + badge plan (📖/⭐/💫/💎)
- Page editor : esthétique "vraie page de cahier" avec lignes
- Stickers en grille
- Sheets bottom-up pour création notebook
- Modals "Limite atteinte" avec call-to-action upgrade

## 6. Roadmap

### ✅ Fait (V1.0 stable)
- PIN lock + verrouillage app
- Notebooks multiples avec emoji
- Pages numérotées avec stickers + bookmarks
- Corbeille (déchirer / restaurer / détruire)
- Recherche full-text cross-notebook
- 4 plans freemium avec UI subscription
- 16 langues i18n
- Toast notifications
- Top bar avec badge plan
- Auto-advance entre pages
- Charte noir & blanc + Lora/Inter

### 🔄 En cours
- Aucun dev actif

### 📋 À faire (priorité)
1. **Persistance locale** : passer de React state à IndexedDB (chiffré)
2. **Chiffrement réel** : WebCrypto AES-GCM + clé dérivée du PIN
3. **Sync cloud E2E Firebase** (ECDH + AES-GCM, le serveur ne voit que des blobs)
4. **Auth cloud** (OTP téléphone ou magic link email)
5. Migration TypeScript + Vite
6. Notes collaboratives (partage notebook avec un autre user via clé partagée)
7. Tests E2E création / lecture / suppression / restauration
8. Catégories / tags par page (en plus des stickers)
9. Recherche améliorée (filtres : date, notebook, bookmark, tag)
10. Build APK Capacitor + soumission Play Store
11. Page promo dans clonex-studio
12. Export PDF (notebook entier ou page seule)
13. Backup local (export `.json.enc` chiffré)

## 7. Risques

### Risques techniques
- **Pas de persistance visible** dans le code actuel : si confirmé, l'app perd tout au reload — gros bug critique à investiguer
- **PIN non hashé** (à vérifier) : si stocké en clair → risque
- **Chiffrement revendiqué dans le marketing** : doit être implémenté avant prod publique pour respecter la promesse

### Risques métier
- **Marché saturé** (Notes Apple, Google Keep, OneNote, Bear, Day One...). Différenciation : esthétique + PIN obligatoire + multi-notebooks + sync E2E
- **Modèle freemium** : prix à $1.99 pour basic = barrière basse mais à comparer avec abonnement Bear/Day One

## 8. Conventions code

- React via CDN UMD, pas de JSX (createElement direct) → pas besoin de Babel
- Préfixe fonctions/vars : `sn*` (snTodayStr, snFmtDay, snLocale, snFmt*) ou `Sn*` (SnLogo)
- Préfixe localStorage : `sn_*` (à confirmer)
- Constants UPPERCASE : `PLANS`, `STICKERS`, `CHARS_PER_PAGE`, `PIN_LENGTH`
- `S` = objet design tokens (couleurs)
- `Si` = objet icônes SVG
