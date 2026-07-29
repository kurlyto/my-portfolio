# CLAUDE.md

## Contexte

Portfolio personnel de Nathan Knaebel (nathan-knaebel.com), positionné comme vitrine
de cas d'usage d'automatisation/agents IA — pas un CV classique. La page `/agents`
présente une grille des agents personnels réels de Nathan, dont le contenu (mission,
rôle) est repris depuis le repo séparé `my-agents` (VPS : `/data/nathan/my-agents`,
GitHub : `kurlyto/my-agents`, privé). Voir `DESIGN.md` pour le détail du positionnement
produit et l'historique des agents déjà intégrés à la grille.

Si un nouvel agent est ajouté ou modifié dans `my-agents`, penser à mettre à jour la
grille `/agents` en conséquence (reprendre le `mission.md` du bot concerné).

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
