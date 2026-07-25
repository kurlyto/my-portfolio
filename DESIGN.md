# Design System — nathan-knaebel.com

## Product Context
- **What this is:** Portfolio personnel de Nathan Knaebel, positionne comme vitrine
  de cas d'usage d'automatisation/agents IA (pas juste un CV en ligne).
- **Who it's for:** Clients potentiels evaluant des besoins d'automatisation,
  recruteurs/pairs techniques.
- **Space/industry:** Dev/ingenierie logicielle, agents IA.
- **Project type:** Marketing/portfolio site avec scroll storytelling, Next.js 16 App Router.

## Aesthetic Direction
- **Direction:** Brutalement minimal, signature "developer/gaming sobre".
- **Decoration level:** Minimal — la typographie et le mouvement font tout le travail,
  zero texture/pattern decoratif.
- **Mood:** Net, rapide, confiant. Le visiteur doit sentir qu'il parle a quelqu'un
  de precis et direct, pas a une agence.
- **Reference sites:** brittanychiang.com (structure sidebar/timeline, a NE PAS copier
  la couleur), pattern de scroll Apple product pages (reveal synchronise au scroll,
  sans pinning lourd pour rester leger).

## Typography
- **Display/Hero:** Geist, weight 800, letter-spacing -0.03em — deja charge via
  next/font/google dans layout.js, aucune nouvelle police a ajouter.
- **Body:** Geist, weight 400.
- **UI/Labels:** Geist Mono, uppercase, letter-spacing 0.1em — deja utilise sur /agents
  pour nav et metadonnees techniques (format/canal), a generaliser a tout le site.
- **Data/Tables:** Geist Mono si besoin plus tard (aucune table actuellement).
- **Code:** Geist Mono.
- **Loading:** next/font/google (deja en place dans app/layout.js), zero CDN externe.
- **Scale:**
  - Hero: clamp(40px, 7vw, 96px) / weight 800 / letter-spacing -0.03em
  - H2 section: 28-32px / weight 700
  - Body: 16-18px / weight 400 / line-height 1.6
  - Label mono (nav, tags): 12-13px / uppercase / letter-spacing 0.1-0.15em

## Color
- **Approach:** Restreinte a l'extreme — noir/blanc/gris uniquement, zero accent
  colore (contrainte explicite du produit).
- **Primary:** #ffffff (fond) — revu le 26/07 : le fond noir evoquait trop un style
  "Vercel/dark mode generique", le produit passe en light-only pour un rendu plus
  "papier", sobre et distinct.
- **Secondary:** #000000 (texte principal)
- **Neutrals:** memes valeurs d'opacite qu'avant, appliquees sur noir au lieu de
  blanc (ex: `border-black/10`, `bg-black/[0.03]`, `text-black/60`).
- **Semantic:** Non applicable — pas de formulaires/alertes dans ce scope (le champ
  de capture de besoin est reporte a une iteration ulterieure).
- **Dark mode:** Le site est nativement light-only (blanc de base). Pas de mode
  sombre prevu.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — assez d'air pour laisser respirer le scroll storytelling,
  sans tomber dans le spacieux qui ralentirait la lecture des cards Projects/Agents.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96)

## Layout
- **Approach:** Hybride — grid-disciplined pour les grilles Work (Projects, Agents,
  deja construites en 3 colonnes bordees), creative/full-bleed pour le hero et les
  transitions de scroll storytelling sur la home.
- **Grid:** 1 colonne mobile, 2 colonnes sm, 3 colonnes lg (deja en place sur
  /agents et la section projets).
- **Max content width:** 1100-1200px pour le contenu texte, full-bleed pour le hero.
- **Border radius:** Quasi nul — sm:4px (badges, boutons), pas de radius plus large
  nulle part (coherent avec l'esthetique brutaliste, pas de bulles arrondies).

## Navigation
- **Structure:** Deux dropdowns au hover/clic, style epure (bordure fine, pas
  d'ombre lourde) :
  - **Work** → Projects, Agents
  - **More** → Travel, Photography (pages a construire plus tard, chacune avec
    sa PROPRE direction artistique, distincte de ce systeme)
- **Comportement:** Ouverture au hover desktop, au clic sur mobile/touch. Menu
  positionne juste sous le label parent, fond noir plein + bordure blanche 35%.

## Motion
- **Approach:** Intentionnel avec un risque assume — scroll-driven via Framer
  Motion (`useScroll` + `useTransform`, ou `whileInView` pour les reveals simples).
  PAS de pinning de section (sticky + scroll-jack complexe) : le scroll reste natif
  et fluide sur mobile, priorite a la legerete/vitesse de livraison sur l'ambition
  technique du pinning.
- **Pattern de reveal:** Chaque section demarre a `opacity: 0, y: 24px` et anime
  vers `opacity: 1, y: 0` au passage dans le viewport (`whileInView`, `once: true`).
- **Hero — effet signature:** Le titre du hero s'assemble lettre par lettre a
  l'arrivee sur la page ("scramble"/decrypte, ~500-700ms, caracteres aleatoires
  puis resolution progressive gauche->droite). Effet ponctuel au premier chargement
  uniquement, jamais repete au scroll (eviter la fatigue visuelle).
- **Risque 2 — curseur personnalise:** Petit cercle (20px, bordure 1.5px blanche,
  `mix-blend-mode: difference`) qui suit la souris et grossit (48px + fond blanc
  15% opacite) au survol des liens/cards. Renforce le cote "interactif/gaming"
  sans ajouter de couleur. Desactive automatiquement sur touch/mobile (`pointer: fine`
  media query).
- **Hover cards (deja en place):** translateY(-4px) + shadow ring blanche 25% +
  glow doux, transition 200ms ease-out — a conserver tel quel sur Projects/Agents.
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(500-700ms
  reserve a l'effet scramble du hero)

## Hero (home)
- **Titre:** "Une tâche que vous n'aimez pas faire ? On l'automatise."
- **Sous-titre:** "Des tonnes de cas d'usages. Quel est le vôtre ?"
- **CTA implicite:** Le sous-titre pousse vers Work > Agents (grille de cas d'usage
  deja construite sur /agents) sans lien explicite surligne — la nav fait le travail.
- **Pas de formulaire de capture** dans cette iteration (reporte : voir Decisions Log).

## Section temoignages (post-hero)
- **Emplacement:** Juste apres le hero sur la home, avant la nav/le reste du scroll.
- **Format:** Composant carrousel de temoignages (pas une grille statique) —
  defilement automatique lent, pause au survol/touch, une carte visible a la fois
  (ou 2 en desktop large).
- **Contenu de cette iteration:** PLACEHOLDER uniquement. Nathan doit fournir de
  vrais retours clients plus tard. Ne pas ecrire de fausses citations presentees
  comme des clients reels — utiliser des libelles clairement provisoires (ex:
  "[Temoignage a venir — Notaire]") le temps que le vrai contenu arrive. Prevoir
  les champs du composant (citation, nom du metier/role, avatar/initiale) pour
  qu'il suffise de remplacer le texte plus tard sans retoucher la structure.
- **Style carte:** Coherent avec le systeme (bordure fine, fond noir, mono pour
  le role/metier, sans-serif pour la citation), memes transitions hover que les
  cards Work.

## Pages et repartition du contenu
- **Home (`/`):** Hero minimal (titre + sous-titre + nav) uniquement. Le contenu
  actuel (expertise, tech stack, contact) est retire de la home et redistribue :
  - Tech stack + intro "Ingenieur industriel & logiciel" → page Projects
  - Contact (email/LinkedIn/GitHub) → footer global ou page dediee, a trancher
    a l'implementation
- **Work > Projects (`/projects`):** Les 6 projets deja rediges (Poker JP, Featuring,
  AI or Not, Fichage Notariat prive, Insider Bot, Mon Devis Dentaire prive avec lien
  mondevisdentaire.fr), grille 3 colonnes deja construite sur la home actuelle a
  deplacer telle quelle.
- **Work > Agents (`/agents`):** Grille de 11 agents deja construite, style deja
  conforme a ce systeme (a garder, juste re-router dans le nouveau menu Work).
- **More > Travel, More > Photography:** Pages "a venir" sobres pour cette iteration
  (placeholder minimal coherent avec le systeme noir/blanc), direction artistique
  propre a chacune a definir dans un chantier separe.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-25 | Systeme de design cree via /design-consultation | Refonte complete demandee : nav Work/More, scroll storytelling Apple-like, noir/blanc pur |
| 2026-07-25 | Pas de pinning de section (scroll-jack) | Prioriser legerete/vitesse de livraison ; whileInView + parallax leger suffisent pour l'effet recherche |
| 2026-07-25 | Champ de capture de besoin sur le hero reporte | Complexite (backend email ou LLM) hors scope de cette iteration ; a traiter separement |
| 2026-07-25 | Hero final : "Une tache que vous n'aimez pas faire ? On l'automatise." / "Des tonnes de cas d'usages. Quel est le votre ?" | Positionne le site comme vitrine de cas d'usage d'automatisation plutot que CV personnel classique |
| 2026-07-26 | Retrait du curseur personnalise | Feedback utilisateur direct |
| 2026-07-26 | Cards Agents et Projects sans bordures, plus espacees, titre en avant | Le format grille dense en bordures faisait "tableau" plutot que vitrine visuelle |
| 2026-07-26 | Ajout de 4 agents perso (Soul, Nate, Jenseng, Ride) a la grille | Missions reprises telles quelles depuis le VPS (mission.md de chaque bot) |
| 2026-07-26 | Avatars prevus en full body vertical (2:3) a gauche du texte, generes par l'utilisateur via IA externe | Remplace le rond+initiale, l'utilisateur genere les images lui-meme (prompts fournis) |
| 2026-07-26 | Inversion complete noir->blanc (fond blanc, texte noir) | Le fond noir evoquait trop un style "Vercel/dark mode" generique, feedback utilisateur direct |
