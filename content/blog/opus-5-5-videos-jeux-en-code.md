---
titre: "Opus 5.5 : des vidéos et des jeux entièrement écrits en code"
description: "Depuis le 22 septembre les réseaux débordent de vidéos et de jeux faits avec Opus 5.5. J'ai ouvert le code d'un Minecraft qu'il a écrit pour vous montrer comment c'est fabriqué et je l'ai testé sur une vraie vidéo de présentation."
date: 2026-10-03
format: actualite
grappe: actus
mot_cle: "claude opus 5.5"
statut: brouillon
mots_cles: ["Claude Opus 5.5", "motion design IA", "vidéo en code", "HyperFrames", "jeu vidéo IA", "Anthropic"]
lire_aussi: ["/blog/nouveautes-ia-septembre-2026", "/blog/quel-outil-ia-entreprise-comparatif", "/"]
---
Claude Opus 5.5 est le modèle d'Anthropic sorti le 22 septembre 2026, et il sait fabriquer des vidéos animées et des jeux jouables en écrivant uniquement du code. Depuis sa sortie, les réseaux se remplissent de films d'animation et de jeux qu'il a produits à partir de quelques phrases, jusqu'à un Minecraft qui tourne dans le navigateur. Mon assistant tourne dessus depuis le premier jour et je lui ai confié une vraie commande pour voir ce que ces démonstrations valent hors de la vitrine.

## Des films écrits en code

Les générateurs de vidéo comme Sora ou Veo inventent des images pixel par pixel. Opus 5.5 procède autrement puisqu'il écrit une page web animée, avec ses textes, ses formes et ses mouvements minutés à la fraction de seconde. Un programme ouvre ensuite cette page dans un navigateur invisible et la filme image par image pour en sortir un fichier vidéo.

Ce détour a des avantages très concrets. Les textes restent parfaitement nets et sans faute d'orthographe, les couleurs sont exactement celles de votre marque et une modification se fait en changeant une ligne au lieu de tout régénérer. Il n'y a pas non plus de main à six doigts, parce que rien n'est inventé au hasard.

Le principe existait avant Opus 5.5 et des outils libres comme [HyperFrames](https://github.com/heygen-com/hyperframes), publié par HeyGen, le rendent gratuit sur n'importe quel ordinateur. La nouveauté tient à la qualité de ce que le modèle écrit. Dans [l'annonce d'Anthropic](https://www.anthropic.com/claude-opus-5-5), un testeur explique qu'Opus 5.5 a obtenu la meilleure note jamais vue pour le rendu graphique et la finition quand il lui a demandé de construire un jeu.

## Ce que la communauté en a tiré

Un [recueil tenu sur GitHub](https://github.com/magiccreator-ai/awesome-claude-opus-5-5-demos) rassemble déjà deux douzaines de créations. On y trouve un jeu de vélo sur une route côtière où le jour laisse place à la nuit et un jeu de course en 3D avec des dérapages. Le développeur Addy Osmani y a ajouté une explication animée du fonctionnement d'un navigateur en quarante secondes. Dans un autre film, chaque image et même la musique ont été générées en JavaScript.

Le spécialiste du marketing Charlie Hills a poussé l'exercice jusqu'à [seize animations publicitaires](https://charliehills.substack.com/p/opus-55-motion-graphics) tenues dans un seul fichier. Il prévient qu'il n'a pas obtenu ce résultat en une phrase et qu'il lui a fallu décrire chaque état de l'animation, donner une bonne référence et reprendre plusieurs fois. Je suis arrivé exactement au même constat.

## Ma vidéo de 21 secondes

J'avais besoin d'une vidéo de présentation pour un de mes projets, en format horizontal pour un site et en vertical pour les réseaux. Je l'ai confiée à mon assistant en lui décrivant l'idée à voix haute, avec l'accroche, les écrans à montrer et le ton que je voulais.

Le travail s'est fait en quelques grandes étapes. Le modèle a écrit chaque scène sous forme de page animée puis mon serveur a filmé le tout, sans payer le moindre crédit pour le rendu. J'ai ensuite choisi une voix off parmi quatre propositions générées par une IA de Google et une musique parmi trois essais, avant que le tout soit assemblé.

La première version durait 28 secondes et elle était trop lente, avec trop de détails à l'écran. Je lui ai demandé plus de rythme et moins de texte, et la deuxième version tombe à 21 secondes. **Le modèle exécute très bien une direction claire** alors qu'il ne sait pas deviner seul ce qui rend une vidéo accrocheuse. Le choix de la musique est d'ailleurs resté entre mes mains, parce que c'est une affaire de goût et que je n'ai pas envie de la déléguer.

## Minecraft dans le navigateur

Le test qui a le plus circulé est celui de Minecraft. Le 22 septembre, le créateur Noah Wachnik a demandé à Opus 5.5 une version jouable du jeu avec des effets de lumière « aussi réels et beaux que possible ». Il a obtenu [Lumen Vale](https://x.com/noahwachnik/status/2102470200415166699) en un peu plus d'une heure et demie. On s'y promène à la première personne en cassant et en posant des blocs sur un terrain qui monte des plages jusqu'aux montagnes, pendant que l'eau renvoie la lumière d'un soleil qui tourne. Il le trouve lui-même « presque meilleur que le vrai Minecraft ».

Le développeur senko a mené un essai plus sobre et plus parlant. Il a donné à plusieurs modèles la même consigne d'une phrase, qui demandait « un clone simple de Minecraft en HTML, JavaScript et CSS, le tout dans un seul fichier », puis il les a laissés travailler seuls. Opus 5.5 a rendu [un jeu complet](https://senko.net/vibecode-bench/2026/voxel-opus-5.5.html) en 48 minutes pour 14 dollars, avec la pioche, l'établi, le four, la TNT et les creepers. Il se lance d'un clic dans n'importe quel navigateur et je m'en suis servi pour la capture ci-dessous.

<figure>
<img src="/blog/opus-5-5-videos-jeux-en-code/voxelcraft-opus-5-5.webp" alt="Vue à la première personne dans un monde de cubes façon Minecraft : herbe, arbres, fleurs rouges, une barre de vie en cœurs et une rangée d'objets en bas de l'écran" width="1400" height="788" loading="lazy">
<figcaption>Le Minecraft écrit par Opus 5.5 en un seul essai pour le banc d'essai de senko. Tout ce qu'on voit à l'écran sort d'un fichier de 143 Ko.<span class="credit">Capture : senko.net, 27 septembre 2026.</span></figcaption>
</figure>

Les jeux d'action ont suivi dans la foulée. Alex, un créateur qui avait eu accès au modèle avant sa sortie, a publié [The Ashen Gate](https://x.com/The_Alex/status/2102440678282412195), un jeu à la Dark Souls où l'on dirige un chevalier en armure dans des ruines gothiques couvertes de cendre. Sa vidéo de deux minutes montre de vrais combats à l'épée et au bouclier, une jauge de vie et d'endurance et un boss qui garde un pont. Le jeu reprend l'ambiance et le système de combat de la série de FromSoftware avec ses propres décors et ses propres personnages.

<figure>
<img src="/blog/opus-5-5-videos-jeux-en-code/the-ashen-gate-boss.webp" alt="Un chevalier géant en armure sombre brandit une épée immense face au joueur, dans une cour de ruines en pierre claire, avec la jauge du boss Gatewarden, the Last Oath en bas de l'écran" width="1400" height="788" loading="lazy">
<figcaption>Le combat contre le gardien du pont dans The Ashen Gate, tel qu'Alex l'a filmé le jour de la sortie du modèle.<span class="credit">Image : vidéo de @The_Alex sur X, 22 septembre 2026.</span></figcaption>
</figure>

Je garde une réserve sur ces deux-là. Une vidéo montre toujours le meilleur passage et aucun des deux jeux n'a de version publique à essayer, si bien que je n'ai pas pu vérifier combien de temps ils tiennent en main.

## Sous le capot

Pour comprendre comment une phrase devient un jeu, j'ai ouvert le fichier du Minecraft de senko. Il tient en 2 500 lignes de code et pèse 143 Ko, alors qu'une seule photo de téléphone pèse facilement vingt fois plus. On n'y trouve aucune image ni aucun fichier son, parce que le modèle a tout écrit sous forme de recettes que le navigateur exécute au lancement.

Les textures sont peintes pixel par pixel. Pour l'herbe, le code prend un vert, éclaircit ou assombrit au hasard chaque pixel d'un carré de 16 sur 16 et y jette cinquante taches. La terre, la pierre et les planches ont chacune leur petite recette du même genre et le jeu colle ensuite ces carrés sur des milliers de cubes.

<figure>
<img src="/blog/opus-5-5-videos-jeux-en-code/recette-texture-herbe.webp" alt="Schéma en trois étapes : la recette de l'herbe écrite en trois lignes, le carré de 16 pixels sur 16 qu'elle produit, puis les blocs d'herbe dans le jeu" width="1400" height="560" loading="lazy">
<figcaption>La texture d'herbe du jeu refaite à partir de sa recette. Le code tient en une ligne et le petit carré obtenu habille tous les blocs d'herbe du monde.</figcaption>
</figure>

Le relief suit la même logique. Au lieu de dessiner des collines, le code utilise ce que les programmeurs appellent du « bruit ». Il s'agit d'une suite de nombres tirés au hasard puis lissés pour que chaque point ressemble à ses voisins, un peu comme une feuille de papier froissée puis dépliée. Le jeu pose une montagne là où ces nombres montent et de l'eau là où ils descendent, si bien que le monde s'étend sans que personne l'ait dessiné.

Les sons sortent d'un petit synthétiseur intégré au navigateur. Casser un bloc joue un souffle filtré, plus grave pour le bois et plus aigu pour l'herbe, et la partie se sauvegarde dans la mémoire du navigateur sans compte ni serveur. La seule pièce venue d'ailleurs est Three.js, une bibliothèque gratuite qui sait afficher des objets en trois dimensions. C'est la carte graphique de votre ordinateur qui fait le dessin final et le refait des dizaines de fois par seconde. Pour l'eau qui scintille de Lumen Vale, le modèle ajoute de petits programmes que la carte graphique exécute sur chaque pixel afin de calculer un reflet ou une ombre.

J'ai surtout été frappé par la tenue du fichier. Chaque recette porte un nom clair et se range à sa place comme chez un développeur soigneux, si bien qu'on peut demander de changer la couleur de l'herbe sans rien casser d'autre.

## Pour une petite entreprise

Une vidéo de présentation, une démonstration animée d'un logiciel ou un bandeau pour les réseaux demandaient jusqu'ici un motion designer ou des heures sur un logiciel spécialisé. Avec Opus 5.5 et un outil gratuit, un patron qui sait ce qu'il veut montrer obtient un premier jet propre dans la journée. Le modèle coûte 4 dollars le million de jetons lus et 20 dollars le million écrit, et une vidéo courte n'en consomme qu'une petite fraction.

Je fixe deux limites avant de s'y lancer. Ces vidéos sont faites de textes, de formes et d'images existantes, si bien qu'une scène tournée avec de vraies personnes reste hors de portée. Il faut aussi quelqu'un pour tenir la direction artistique et dire « trop lent » ou « trop chargé », faute de quoi on obtient une animation propre qui ne dit rien.

J'ai fait le tour des autres sorties du mois dans [mon bilan de septembre](/blog/nouveautes-ia-septembre-2026). Et si vous voulez qu'un assistant comme [Foxy](/) prépare ce genre de contenu pour votre entreprise, je vous réponds volontiers.
