# 📊 secretnote — Suivi

> Voir aussi : [CAHIER-CHARGES.md](CAHIER-CHARGES.md) (vision/spec complète)
> Mis à jour : **2026-04-23**

| | |
|---|---|
| **Stack** | React 18 (UMD CDN, createElement direct) + bundle vanilla (~105KB) |
| **Statut** | 🟢 Prod (v1.0, pas de dev actif) |
| **Type** | Cahier de secrets privé multi-notebooks avec PIN, freemium |
| **Tagline** | Tes secrets. Ton cahier. À jamais. |
| **Repo** | github.com/land-lang-120/secretnote |

---

## ✅ Fait

### Lock & sécurité
- PIN à 5 chiffres au lancement (composant `PinScreen`)

### Notebooks (multi)
- Création avec nom + 20 emojis disponibles
- Switch entre notebooks
- Limite par plan (1 / 3 / 5 / 10)

### Pages (= "secrets")
- Texte libre, max 3000 chars
- Numérotation auto par notebook
- Stickers (30 emojis disponibles)
- Bookmarks (favoris)
- Auto-advance après save
- Limite par plan (50 / 100 / 150 / 300)

### Corbeille
- "Déchirer" une page (`torn: true`) — `TrashScreen` dédié
- Restaurer
- Détruire définitivement (avec confirm modal "💀")

### Recherche
- Full-text cross-notebook
- Tap sur résultat → ouvre la page dans le bon notebook

### Subscription (UI seule)
- 4 plans : Basic ($1.99) / Monthly ($4.99) / Monthly+ ($7.99) / Yearly ($99.99)
- Overlays "Limite atteinte" → CTA upgrade
- `SubscriptionScreen` pour comparer
- **Pas de paiement réel intégré**

### Internationalisation
- 16 langues : FR, EN, ES, PT, DE, IT, NL, TR, RU, AR, ZH, JA, KO, HI, SW, PL
- Format date adapté à la locale

### UI/UX
- Charte noir & blanc + page warm off-white pour la zone d'écriture
- Lora (serif) pour le contenu, Inter (sans-serif) pour l'UI
- Toast notifications (2 sec)
- Top bar sticky avec badge plan
- Sheets bottom-up

### Documentation
- CAHIER-CHARGES.md rétrospectif (vision, personas, périmètre, roadmap)

## 🔄 En cours

- Aucun développement actif

## 📋 À faire (priorité décroissante)

### Critique (bloque V1.0 publique)
1. **Vérifier la persistance** : aucune trace de localStorage/IndexedDB dans `app.js` — si l'app reset au reload, c'est un bug bloquant
2. **Implémenter le chiffrement** : la marketing revendique secrets chiffrés, doit être réel (WebCrypto AES-GCM + clé dérivée du PIN)

### Important
3. ~~Créer `CAHIER-CHARGES.md`~~ ← fait dans cette session
4. Migration TypeScript + Vite (recette chrome-messenger)
5. **Sync cloud Firebase** :
   - Auth (OTP téléphone ou magic link email)
   - Firestore : `users/{uid}/notebooks` + `users/{uid}/secrets`
   - Chiffrement E2E ECDH+AES-GCM côté client (le serveur ne voit que des blobs)
6. Notes collaboratives (partage notebook avec un autre user)

### Nice to have
7. Tests E2E création / lecture / suppression / restauration
8. Catégories / tags par page (en plus des stickers)
9. Recherche améliorée (filtres : date, notebook, bookmark, tag)
10. Export PDF (notebook ou page)
11. Backup local (export `.json.enc` chiffré)
12. Build APK Capacitor + soumission Play Store
13. Page promo dans clonex-studio
14. Mode lecture seule "passenger view" (montrer une page sans risque de modif)
