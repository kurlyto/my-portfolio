---
titre: "100 sites piratés par des agents IA"
description: "Un pirate a lancé des agents IA contre plus de cent boutiques en ligne pour environ 50 dollars chacune. J'ai lu l'enquête et j'ai vérifié tout de suite si mon propre site tenait. Je vous dis ce que j'en pense et comment vous protéger."
date: 2026-11-26
format: actualite
grappe: actus
mot_cle: "agents IA piratage sites web entreprises comment protéger son site"
image_carte: "/images/blog/cartes/hacker-agents-ia-100-sites-web-claude-code-sites.webp"
image_partage: "/images/blog/partage-hacker-agents-ia-100-sites-web-claude-code.jpg"
statut: brouillon
mots_cles: ["agents IA piratage", "protéger son site web", "sécurité site e-commerce", "Cairn", "mises à jour site", "panneau d'administration exposé"]
lire_aussi: ["/blog/prompt-injection-mail", "/blog/surveiller-agents-ia", "/agents"]
---
Le 19 octobre, Reuters a raconté l'histoire d'un pirate qui a cambriolé plus de cent sites d'entreprises sans presque toucher son clavier. Il a lancé des agents IA en leur donnant une cible et un but en deux lignes puis il est allé se coucher. À son réveil la porte de derrière était posée sur plusieurs sites. J'ai lu l'enquête puis le rapport du chercheur qui l'a déclenchée, et j'ai voulu vérifier tout de suite si mon propre site et mes agents tenaient debout face à ce genre de robot. Un agent IA comme ceux-là est un programme à qui on fixe un objectif et qui enchaîne seul les actions pour l'atteindre. Il teste un site après l'autre sans qu'un humain reste derrière.

Je fais tourner ce genre d'agent tous les jours pour m'aider. Les voir travailler à forcer des boutiques en ligne m'a sorti de ma chaise. La technique n'est pas nouvelle mais elle est devenue bon marché, et c'est ce prix qui change tout. Je vous raconte ce qui s'est passé, ce que j'ai regardé chez moi en lisant l'article et les quelques gestes qu'un patron de petite entreprise peut faire cette semaine.

## Un pirate qui laisse les robots travailler

Tout part du travail de Snorre Fagerland, un chercheur de la société NorForge. En cherchant sur internet des tableaux de bord d'agents laissés ouverts, il est tombé sur une vingtaine de panneaux d'un outil appelé Cairn, [détaillés dans son rapport](https://norforge.com/blog/inside_cairn). Cairn est un logiciel libre qui pilote des agents IA vers un but. On lui donne une adresse et une mission, et ses agents enquêtent, cherchent les failles et tentent d'entrer en se partageant leurs trouvailles sur un tableau commun. Son auteur, qui signe le1xia0, a répondu [sur X](https://norforge.com/blog/inside_cairn) qu'il ne l'avait pas conçu pour attaquer.

Un groupe parlant chinois s'en servait pourtant à grande échelle. [Reuters](https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/) a compté plus de 1 200 sites visés depuis le 25 septembre et plus de 100 réellement forcés, surtout des boutiques en ligne aux États-Unis, au Japon et en Australie. Parmi les victimes nommées par l'agence : le fabricant de tracteurs Deere, l'électroménager SharkNinja et le motoriste Cummins. Deere dit avoir corrigé et n'avoir vu aucune donnée sensible touchée, SharkNinja parle d'un simple site d'aide produit vite contenu, et Cummins enquête sur le site d'un de ses prestataires.

Le rapport montre les tableaux de bord des pirates eux-mêmes, laissés sans mot de passe sur internet, un comble pour des gens qui forcent les serrures des autres. On y voit chaque mission avancer étape par étape, de son point de départ en bleu vers le but en rouge.

<figure>
<img src="/blog/hacker-agents-ia-100-sites-web-claude-code/tableau-de-bord-cairn.webp" alt="Tableau de bord d'une mission Cairn : des dizaines de petites boîtes violettes reliées par des lignes, partant d'une boîte verte en haut à gauche vers une boîte rouge à droite" width="1313" height="572" loading="lazy">
<figcaption>Le parcours d'une attaque sur un tableau de bord Cairn laissé ouvert, du départ en vert jusqu'au but atteint en rouge.<span class="credit">Image : rapport <a href="https://norforge.com/blog/inside_cairn">Inside Cairn</a> de NorForge, octobre 2026.</span></figcaption>
</figure>

## Pourquoi cette fois c'est différent

Le choc n'est pas dans la ruse mais dans l'addition. Fagerland estime le coût à environ 50 dollars par site forcé, soit à peu près 5 000 dollars de calcul pour toute la campagne. Une intrusion réussie demandait un peu moins de 23 heures à l'agent, qui travaillait seul pendant ce temps. Le pirate, lui, avait juste écrit la consigne et laissé tourner. Avant, forcer un site prenait des heures d'un spécialiste qui coûte cher. Là, le spécialiste est remplacé par un abonnement et quelques dollars.

<figure>
<img src="/blog/hacker-agents-ia-100-sites-web-claude-code/economie-attaque.webp" alt="Une grille d'environ 240 petits carrés gris, dont à peu près un sur dix en orange, sous le titre Plus de 1 200 boutiques passées au crible" width="1440" height="808" loading="lazy">
<figcaption>Sur les 1 200 boutiques visées, à peu près une sur dix a vraiment cédé, chacune pour environ 50 dollars de calcul. Grille illustrée, pas le compte exact.</figcaption>
</figure>

Les cibles n'étaient même pas choisies à la main. Le groupe avait monté une petite chaîne pour ça. Elle ramassait des boutiques sur internet et les classait par trafic. Un outil vérifiait même qu'on pouvait vraiment y passer commande avant d'envoyer l'adresse à l'agent. C'est de l'abattage. Vous n'êtes plus visé parce que vous valez le coup, vous êtes visé parce que votre adresse est tombée dans la liste et que le robot a cinq dollars à dépenser pour voir si ça s'ouvre.

Faut-il paniquer pour autant ? Non. Le taux de réussite tournait autour de 10 %, et les sites qui ont cédé étaient surtout de grosses boutiques à vieux logiciels mal tenus, avec un panneau d'administration traînant sur internet ou une rallonge jamais mise à jour. L'agent est rapide et patient, mais il entre par les mêmes portes mal fermées qu'avant. Désormais il les essaie sur tout le monde.

## Ce que j'ai regardé chez moi

En lisant l'article, j'ai fait le tour de ma propre maison, parce que je prêche la sécurité à mes clients et que ça m'aurait agacé d'être le cordonnier mal chaussé. Mon site et mes agents tournent sur un serveur que je loue en France, et la première chose qu'un robot comme ceux-là cherche, c'est une porte ouverte.

J'ai donc listé les portes que ma machine présente à l'extérieur. Le pare-feu n'en laisse que quatre, juste de quoi afficher les sites et rien d'autre. Mon assistant lui-même n'écoute que sur mon réseau privé. Celui qui lit mes mails et prépare ma journée reste invisible depuis internet. C'est l'inverse exact des pirates du rapport, dont le tableau de bord était grand ouvert sur le web. Un agent qui travaille pour vous ne doit jamais être joignable par n'importe qui, et débrancher ce qui n'a pas besoin d'être exposé est le geste le plus rentable de la semaine.

<figure>
<img src="/blog/hacker-agents-ia-100-sites-web-claude-code/serveur-prive.webp" alt="Deux panneaux côte à côte. À gauche, encadré orange, un serveur avec un point d'exclamation, Les pirates du rapport, tableau de bord grand ouvert. À droite, encadré vert, une tuile d'IA avec un cadenas, Mon serveur, assistant sur réseau privé" width="1440" height="748" loading="lazy">
<figcaption>Les pirates se sont fait repérer en laissant leur tableau de bord ouvert à tous. Mon assistant, lui, reste derrière le réseau privé.</figcaption>
</figure>

J'ai aussi regardé mes panneaux d'administration, ceux d'où l'on pilote un site. Aucun n'est accessible sans passer par mon réseau privé d'abord. Ça n'a l'air de rien, mais c'est précisément le maillon que les agents de Cairn cherchaient en priorité quand la façade d'un gros site ne cédait pas.

## Cinq gestes pour une petite entreprise

Si vous avez une boutique ou un site vitrine, voilà les gestes qui protègent le mieux face à ce genre d'attaque, sans jargon et par ordre d'efficacité.

**Mettez votre site à jour.** La plupart des intrusions passent par une vieille rallonge ou un logiciel non corrigé. Si votre site tourne sur WordPress, PrestaShop ou Shopify, ouvrez l'administration et installez les mises à jour en attente sans oublier les extensions. C'est cinq minutes et ça ferme la porte la plus courante.

**Fermez ce qui n'a pas à être ouvert.** Une page de connexion à l'administration, un outil de test, une sauvegarde posée dans un coin : tout ce qui traîne sur internet est une porte. Demandez à la personne qui gère votre site de rendre cette administration accessible à vous seul et fermée au reste d'internet.

**Sauvegardez ailleurs.** Une copie de votre site faite chaque jour et gardée sur un autre serveur vous permet de tout remettre d'aplomb si une attaque passe. Beaucoup d'hébergeurs le font déjà : vérifiez que c'est activé et que vous savez où cliquer pour restaurer.

**Choisissez un hébergeur qui s'occupe de la sécurité.** Pour la plupart des petites entreprises, la bonne réponse n'est pas de devenir expert. Mieux vaut confier le site à un hébergeur géré ou à une plateforme comme Shopify qui applique les correctifs à votre place. Vous payez un peu plus et vous dormez mieux.

**Ne changez rien dans la panique.** Si votre site est à jour et hébergé sérieusement, vous n'avez rien de spécial à faire ce mois-ci. Un bon conseil, parfois, c'est de ne rien toucher.

## Ce que ça dit des agents que je construis

Cette histoire ne me détourne pas des agents IA, elle me conforte dans la façon de les poser. Un agent est un ouvrier très rapide et très obéissant, et un ouvrier obéissant fait de gros dégâts si on lui donne trop de clés. Le même outil qui force des boutiques dans cette affaire prépare mes journées dans la mienne. La différence tient à deux règles simples.

La première tient en trois mots : les droits au minimum. Un agent ne reçoit que les accès dont sa tâche a besoin et pas un de plus. Celui qui lit mes mails ne peut pas en envoyer tout seul, et celui qui prépare une facture ne la fait partir qu'avec mon accord. Je refuse de donner à un agent une clé que je ne confierais pas à un stagiaire de première semaine.

<figure>
<img src="/blog/hacker-agents-ia-100-sites-web-claude-code/droits-agent.webp" alt="Trois lignes : Lire vos mails avec une pastille verte oui, Envoyer un message avec une pastille bleue votre accord, Changer un mot de passe avec une pastille noire jamais" width="1440" height="660" loading="lazy">
<figcaption>Un agent bien posé ne reçoit pas tous les droits d'un coup : lire oui, agir seulement avec votre accord, toucher à un mot de passe jamais.</figcaption>
</figure>

La seconde est la surveillance. Mes agents se regardent entre eux et gardent une trace de chacun de leurs gestes. Je raconte [ce système ici](/blog/surveiller-agents-ia). S'il s'en passe un anormal, je le vois le soir même. Les pirates du rapport avaient justement oublié de se surveiller eux-mêmes. Ils se sont fait prendre en laissant leur propre tableau de bord ouvert sur internet.

Le robot qui a cambriolé cent boutiques et celui qui trie mon agenda sont le même outil à quelques permissions près. Tout se joue sur les portes qu'on laisse ouvertes et sur qui tient les clés. Si vous voulez un agent taillé pour votre métier, avec des droits serrés et une trace de chacun de ses gestes, [je vous explique comment je travaille](/agents).

## Questions fréquentes

### Mon petit site est-il vraiment une cible ?

Oui. Mais pas parce qu'on vous en veut. Les attaques décrites par Reuters ratissent des milliers d'adresses au hasard et tentent leur chance sur chacune pour quelques dollars. Vous n'êtes pas choisi : vous tombez juste dans le lot. Un site à jour et bien hébergé résiste très bien à ce ratissage.

### Faut-il payer un expert en sécurité ?

Une petite entreprise en a rarement besoin. Les trois quarts du travail tiennent dans les mises à jour et le choix d'un hébergeur sérieux, deux choses que vous pouvez régler sans spécialiste. Un audit payant se justifie si vous gardez des données sensibles ou des paiements sur votre propre serveur.

### Est-ce que l'IA rend le piratage impossible à arrêter ?

Non. L'IA rend l'attaque moins chère et plus fréquente sans la rendre plus maligne. Les agents de cette affaire sont entrés par de vieilles failles connues. Les vieilles défenses marchent encore : mises à jour, accès fermés, sauvegardes. Elles doivent juste être vraiment appliquées.
