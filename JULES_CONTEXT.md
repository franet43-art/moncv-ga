# MonCV.ga — Contexte Projet

## 1. Stack Technique
- Next.js App Router
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui
- Zustand
- Zod
- Supabase (à venir)
- Groq IA (à venir)
- MyPayGa (à venir)

## 2. Règles Absolues de Développement
- Ne jamais supprimer de code qui fonctionne.
- Tout texte UI doit être en français.
- `npm run build` doit passer après chaque modification.
- Modifier un fichier à la fois.
- `npm run dev` ne fonctionne pas — utiliser `npm run build && npm run start`.

## 3. Ce qui est terminé et validé ✅
- Design System (shadcn/ui, Tailwind v4, couleur primary #6C63FF)
- Layout global (Header, Footer, ThemeProvider, dark mode)
- Landing Page complète
- Éditeur de CV complet avec preview temps réel
- Personnalisation visuelle : 3 templates (Classic, Modern, Minimal), couleurs, polices, photo de profil, taille de texte

## 4. Architecture Clés
- `src/types/cv.ts` : schémas Zod complets incluant `CVSettingsSchema`
- `src/store/cv-store.ts` : Zustand avec persist localStorage et merge strategy
- `src/components/editor/cv-preview.tsx` : 3 templates dynamiques
- `src/components/editor/design-panel.tsx` : panneau de personnalisation
- `src/app/editor/new/page.tsx` : éditeur split-screen

## 5. Prochaine étape — Prompt 6 : IA Groq
- Intégration de l'IA Groq avec deux fonctionnalités principales :
  - **Importation de CV existant** par collage de texte : `src/app/api/ai/parse-cv/route.ts` (parser un CV existant et retourner un JSON mappé sur les schémas Zod existants).
  - **Amélioration de texte** avec l'IA : `src/app/api/ai/enhance/route.ts` (améliorer un texte).
- **Composant de modal d'import** : `src/components/editor/import-cv-modal.tsx` (L'utilisateur colle le texte de son ancien CV dans une textarea, validation Zod avant injection dans le store via `setCurrentCV()`).

## 6. Variables d'environnement nécessaires
- `GROQ_API_KEY`
