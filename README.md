This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Variables d'environnement (local + Vercel)

### TL;DR

- En local, utilise `.env.local` (non commité) : c'est chargé automatiquement par Next.js.
- Dans ce projet, le flag est `NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION`.
  - `"true"` => affiche la page "Site en construction"
  - `"false"` (ou absent) => affiche la vraie home
- Sur Vercel, configure la variable dans **Project Settings → Environment Variables** (séparément pour **Production** et **Preview**).

### Fichiers `.env*` (Next.js)

Next.js charge plusieurs fichiers, et les valeurs sont **toujours des strings**.

Ordre de priorité (le plus prioritaire en haut) :

- `.env.<mode>.local` (ex: `.env.production.local`)
- `.env.local` (sauf en mode `test`)
- `.env.<mode>` (ex: `.env.production`)
- `.env`

Dans ce repo :

- `.env.local` : variables locales, non commitées
- `.env.example` : exemple à commiter, à copier vers `.env.local`

### Vercel (Production vs Preview)

Vercel ne crée pas de fichier `.env` dans ton repo : les variables sont stockées côté Vercel.

Pour ton cas :

- **Production** : `NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION=true`
- **Preview** : `NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION=false`

Note : après modification d'une variable sur Vercel, il faut relancer un déploiement (redeploy) pour qu'elle soit prise en compte.

### Attention à `NEXT_PUBLIC_`

Toute variable préfixée par `NEXT_PUBLIC_` est exposée au navigateur. Ne mets **jamais** de secrets (API keys privées, tokens, etc.) dans une variable `NEXT_PUBLIC_*`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
