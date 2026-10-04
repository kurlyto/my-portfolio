---
titre: "Les nouveautés de l'IA en septembre 2026"
description: "Quatre grands modèles sont sortis en trois jours ce mois-ci. Je fais le tri et je vous explique ce que j'ai changé chez moi."
date: 2026-10-05
format: actualite
grappe: actus
mot_cle: "actualite ia"
image_carte: "/images/blog/cartes/nouveautes-ia-septembre-2026-logos.webp"
image_partage: "/images/blog/partage-nouveautes-ia-septembre-2026.png"
statut: publie
---
En septembre 2026, quatre grands modèles d'IA sont sortis en trois jours et un cinquième a fait le tour des réseaux avec des vidéos entièrement écrites en code. Le patron d'Anthropic a aussi demandé à toute l'industrie de ralentir. Microsoft et Salesforce ont de leur côté commencé à vendre des agents qui travaillent pendant que vous dormez. Pour une petite entreprise, la nouvelle la plus utile du mois est pourtant la plus discrète : le prix de ce qu'un agent relit a fondu.

Je fais ce tri tous les mois parce que je construis des agents pour des entreprises et que mon propre assistant tourne sur ces modèles du matin au soir. Je vous donne les faits avec leur source et ce que j'en ai fait chez moi.

## Quatre modèles en trois jours

Anthropic a ouvert le bal le 1er septembre avec son nouveau modèle [Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1). Il sort avec un jumeau nommé Mythos 5.1 qui est le même modèle avec moins de garde-fous, réservé à des équipes vérifiées qui travaillent sur la cybersécurité ou les sciences du vivant. Fable 5.1 est ouvert à tous et garde le prix de son prédécesseur.

Le lendemain, Meta a publié [Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3) avec un tarif en deux paliers assez parlant. Le palier le moins cher coûte presque rien parce que Meta se sert de vos données pour entraîner ses produits, et le palier qui les garde privées coûte environ douze fois plus. Google a sorti le même jour [Gemini 3.8 Flash](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/). Ce modèle rapide et bon marché garde son prix d'appel jusqu'au 31 décembre avant de doubler au 1er janvier.

OpenAI a fermé la marche le 3 septembre avec [GPT-6 Astra](https://openai.com/index/gpt-6-astra/), ouvert d'abord à quelques organisations puis aux abonnés payants de ChatGPT les jours suivants. [CNBC](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html) rappelle que la sortie avait été retardée après des attaques informatiques menées en juillet par des agents d'OpenAI que personne n'avait autorisées.

J'ai essayé les trois concurrents sur des tâches de mon quotidien et aucun ne m'a donné envie de quitter Claude, sur lequel tourne tout mon parc d'agents. Une migration coûte des jours de réglages et je ne la lance que pour un gain net. J'ai en revanche basculé sur Fable 5.1 dès sa sortie, pour une raison de coût que je détaille juste en dessous.

## Le prix des relectures

Un agent relit tout son contexte à chaque échange, c'est-à-dire ses consignes, l'historique de la conversation et les documents qu'il a ouverts. Les fournisseurs gardent ce contexte en mémoire tampon (le « cache ») et le facturent moins cher qu'un texte neuf. Avec Fable 5.1, Anthropic a divisé par quatre le prix de ces relectures : il passe à 0,25 dollar le million de jetons contre 1 dollar avant. L'éditeur annonce une facture en baisse d'environ 25 % pour un usage courant et jusqu'à 45 % pour un usage très tourné vers les agents.

J'ai voulu savoir si ces chiffres tenaient chez moi et j'ai mesuré une semaine de travail de mes agents. Ils relisent **plus de cent fois plus de texte qu'ils n'en écrivent**, si bien que la baisse du prix des relectures pèse bien plus que celle des réponses. Je retiens la leçon au-delà de ce modèle précis : quand on compare deux IA pour un agent, le prix du cache pèse plus lourd que le prix affiché en gros sur la page.

La comparaison du mois l'illustre bien. GPT-6 Astra et Fable 5.1 affichent le même prix pour le texte lu et le texte écrit, alors que la relecture en cache coûte 1 dollar le million chez OpenAI et quatre fois moins chez Anthropic. Pour un agent qui travaille toute la journée, cet écart finit par peser lourd sur la facture.

## Opus 5.5 fait des films

Anthropic a sorti [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5) le 22 septembre. Sur la plupart des travaux, il se hisse au niveau de Fable 5.1 pour un prix nettement plus bas de 4 dollars le million de jetons lus et 20 dollars le million écrit. L'éditeur le dit aussi 30 % plus rapide que la version précédente.

Ce sont pourtant ses créations qui ont fait parler de lui. En quelques jours les réseaux se sont remplis de films d'animation, de jeux jouables dans le navigateur et de scènes en 3D qu'il a entièrement écrits en code. Certains ont même leur musique composée par le modèle. Un [recueil tenu sur GitHub](https://github.com/magiccreator-ai/awesome-claude-opus-5-5-demos) en rassemble déjà deux douzaines, du jeu de vélo sur la côte à l'explication animée du fonctionnement d'un navigateur.

Quelques films de la communauté m'ont bluffé. Kevin Ngo a sorti [une petite histoire dessinée à la main](https://x.com/kevin_t_ngo/status/2102437977435893771) dont chaque image et la musique sortent du code. Addy Osmani explique [le fonctionnement d'un navigateur en 40 secondes](https://x.com/addyosmani/status/2103009037164110327) avec des croquis animés, et vittorio raconte [l'histoire de l'Occident par son architecture](https://x.com/IterIntellectus/status/2103212539895017864) en deux minutes. Aucun de ces films n'a été tourné ni monté dans un logiciel de vidéo.

<figure>
<img src="/blog/nouveautes-ia-septembre-2026/films-en-code-opus-5-5.webp" alt="Trois images tirées de films écrits en code avec Claude, sur fond de pellicule. En grand, une fille salue depuis sa fenêtre une étoile souriante au-dessus d'une ville la nuit (Kevin Ngo). À droite, un petit robot mesure une page dans une fenêtre de navigateur (Addy Osmani), puis un temple grec dessiné au trait sous le titre « Then we built perfection » (vittorio)." width="1440" height="1090" loading="lazy">
<figcaption>Trois films écrits en code, sans caméra ni logiciel de montage : l'histoire dessinée de Kevin Ngo, le navigateur d'Addy Osmani en 40 secondes et l'Occident de vittorio en deux minutes.<span class="credit">Images : vidéos de <a href="https://x.com/kevin_t_ngo/status/2102437977435893771">@kevin_t_ngo</a> (22 septembre 2026), <a href="https://x.com/addyosmani/status/2103009037164110327">@addyosmani</a> et <a href="https://x.com/IterIntellectus/status/2103212539895017864">@IterIntellectus</a> (24 septembre 2026) sur X</span></figcaption>
</figure>

## Mes vidéos de présentation

Mon assistant tourne sur Opus 5.5 depuis sa sortie et le 26 septembre au soir, j'ai voulu savoir s'il savait en faire autant pour Mon Devis Dentaire. Je lui ai envoyé sans aucun cahier des charges une consigne en anglais de deux lignes.

> « make a dynamic 40-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a résumé. go all out. Topic : presenting Mon Devis Dentaire »

Je lui demandais une vidéo animée de 40 secondes qui montre quel motion designer incroyable il est, comme la bande démo qu'on joint à un CV, en y mettant tout ce qu'il a. Dans la foulée j'ai ajouté qu'il fallait mettre en avant les fonctions les plus importantes et trouver des phrases qui tuent, avec une piste d'accroche : « Vos devis reviennent enfin signés ».

L'assistant n'ouvre aucun logiciel de montage. Il écrit une page web animée que [HyperFrames](https://github.com/heygen-com/hyperframes), un outil libre, filme image par image pour en tirer un fichier vidéo. La voix off vient de Gemini chez Google et les bruitages d'une banque de sons libres de droits. La première version m'a bluffé et c'est la septième que vous voyez ici.

<figure>
<video controls preload="none" playsinline poster="/blog/nouveautes-ia-septembre-2026/mon-devis-dentaire.webp" width="1920" height="1080"><source src="/blog/nouveautes-ia-septembre-2026/mon-devis-dentaire.mp4" type="video/mp4"></video>
<figcaption>Mon Devis Dentaire en 40 secondes, du devis envoyé depuis le logiciel du cabinet jusqu'à la signature du patient sur son téléphone.</figcaption>
</figure>

Le soir même, j'ai dicté la même envie pour Football Fight, mon jeu de culture foot où l'on relie des joueurs par les clubs qu'ils ont en commun. Cette fois je parlais en français et je donnais le fil : on comprend le jeu en 30 secondes avec sa direction artistique, puis on découvre le mode carrière, le classement et le vestiaire. Mon premier retour a ajouté l'accroche des trois premières secondes, « Est-ce que tu connais vraiment le football ? ».

Il a fallu dix versions. L'image était juste presque du premier coup et je l'ai corrigée par petites touches, comme un clic de souris sur le bouton final ou du vert quand deux joueurs partagent un club. Une seule fois j'ai tout refusé, quand l'assistant a remplacé ses dessins par de vraies captures du jeu. Le vrai chantier a été le son. **La voix m'endormait** alors que je voulais une pub qui transporte. J'ai fini par choisir moi-même entre trois nouvelles voix en les écoutant.

<figure>
<video controls preload="none" playsinline poster="/blog/nouveautes-ia-septembre-2026/football-fight.webp" width="1920" height="1080"><source src="/blog/nouveautes-ia-septembre-2026/football-fight.mp4" type="video/mp4"></video>
<figcaption>Football Fight en 22 secondes, de la première chaîne de joueurs jusqu'à la montée au classement.</figcaption>
</figure>

Celle de Foxy n'est pas encore finie. Elle arrive bientôt !


## Des agents avec un prénom

Le 11 septembre, Salesforce a présenté [une équipe de sept agents](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/) qui portent chacun un prénom et un métier. Casey répond aux clients par téléphone, SMS ou WhatsApp et Hunter relance les ventes qui risquent de capoter avant la fin du trimestre. Hunter peut suivre un objectif sur plusieurs semaines en décidant lui-même des tâches à faire et du moment où il doit demander l'accord d'un vendeur.

Microsoft a suivi le 25 septembre avec un [Copilot refondu](https://news.microsoft.com/source/emea/2026/09/new-microsoft-copilot-brings-home-code-and-autopilot-together/) dont l'onglet Autopilot crée un agent avec un nom, un rôle et un but. Il continue de travailler dans Microsoft 365 quand plus personne n'est devant l'écran. Autopilot n'est ouvert qu'en avant-première privée et aucun prix n'est annoncé.

De plus en plus d'entreprises vendent leurs agents de cette façon, en équipe de collègues virtuels qui ont chacun un prénom et un poste. En France, Limova suit ce modèle depuis un moment avec [huit agents](https://limova.fr/agents-ia) qui se partagent le support client, le référencement, la prospection ou la comptabilité. Je pense que c'est la bonne direction parce qu'un patron comprend tout de suite ce qu'il achète quand on lui présente quelqu'un qui relance ses devis plutôt qu'un « outil d'automatisation ».

Mes agents ont un prénom depuis le premier jour et chacun a son périmètre, si bien que ce virage me conforte plus qu'il ne m'inquiète. Les offres de Salesforce et de Microsoft visent pour l'instant de grands comptes et il faudra attendre les prix pour savoir si un artisan ou un commerçant y aura accès.

## Faut-il ralentir l'IA ?

Le 12 septembre, le patron d'Anthropic Dario Amodei a publié un long texte intitulé [« We Must Pace the Frontier »](https://darioamodei.com/post/we-must-pace-the-frontier) où il demande aux laboratoires de ralentir la course aux modèles plus puissants. Il propose des évaluateurs indépendants installés à demeure chez chaque laboratoire et un organisme commun de normes sur le modèle du gendarme de la bourse américaine. Anthropic applique déjà la première mesure de son côté et Sam Altman, le patron d'OpenAI, s'est dit d'accord dans la foulée.

<figure>
<img src="/blog/nouveautes-ia-septembre-2026/dario-amodei-techcrunch-2023.webp" alt="Dario Amodei, lunettes et chemise bleue, parle sur scène devant le décor TechCrunch Disrupt" width="1400" height="1050" loading="lazy">
<figcaption>Dario Amodei, le patron d'Anthropic, sur scène à TechCrunch Disrupt en 2023. Le 12 septembre, il a publié « We Must Pace the Frontier », un long texte où il demande aux laboratoires de ralentir la course aux modèles plus puissants.<span class="credit">Photo : TechCrunch, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Dario_Amodei_at_TechCrunch_Disrupt_2023_07.jpg">Wikimedia Commons</a></span></figcaption>
</figure>

La réponse n'a pas tardé. Le 18 septembre, quatre consommateurs ont [attaqué en justice](https://news.bloomberglaw.com/litigation/openai-anthropic-google-spacexai-hit-with-antitrust-lawsuit) Anthropic, OpenAI, Google et SpaceXAI à San Francisco. Ils les accusent de s'entendre pour freiner des produits concurrents, ce que le droit américain de la concurrence interdit.

Je comprends qu'on veuille ralentir, parce que cette amélioration permanente fait peur et qu'elle me fait peur à moi aussi. Chaque mois apporte un modèle qui rend le précédent dépassé. Je pense que nos souris et nos claviers vont disparaître bien plus vite qu'on ne l'imagine et qu'une bonne partie de ce qu'on apprend aujourd'hui sera obsolète dans trois ans. Pour une petite entreprise, rien ne change dans l'immédiat puisque les modèles actuels restent disponibles et que ce débat porte sur les suivants.

## Mistral lève 3 milliards

Le 8 septembre, Mistral AI a annoncé une [levée de 3 milliards d'euros](https://www.franceinfo.fr/internet/intelligence-artificielle/la-start-up-francaise-mistral-annonce-une-nouvelle-levee-de-fonds-de-trois-milliards-d-euros-portant-sa-valorisation-a-plus-de-21-milliards-d-euros_8182583.html) qui porte sa valeur au-delà de 21 milliards. C'est la plus grosse levée jamais faite par une entreprise technologique européenne non cotée. Je la suis de près pour une raison concrète. Certains métiers comme les avocats, les notaires ou la santé me demandent un modèle hébergé en Europe et soumis au droit européen, et Mistral est aujourd'hui l'alternative la plus solide pour eux.

<figure>
<img src="/blog/nouveautes-ia-septembre-2026/arthur-mensch-mistral-downing-street-2025.webp" alt="Arthur Mensch, en costume sombre, discute avec Keir Starmer dans un salon aux murs orange de Downing Street" width="1400" height="934" loading="lazy">
<figcaption>Arthur Mensch, cofondateur et patron de Mistral AI, reçu à Downing Street par le Premier ministre britannique Keir Starmer en janvier 2025.<span class="credit">Photo : Simon Dawson / No 10 Downing Street, <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Prime_Minister_Keir_Starmer_meets_Arthur_Mensch_(54256710173).jpg">Wikimedia Commons</a></span></figcaption>
</figure>

## Ce que j'ai changé chez moi

Mon agent le plus gourmand est passé sur Fable 5.1 le jour où j'ai compris que le cache pesait l'essentiel de sa facture. Le changement a pris plus de temps que prévu parce que le nom du modèle était écrit à plusieurs endroits de son code et que l'agent retombait sur l'ancien selon le chemin par lequel on l'appelait.

J'ai aussi mesuré le niveau de réflexion qu'on peut demander à ces modèles. Sur une vraie tâche de raisonnement, l'effort le plus bas a coûté deux fois moins cher et répondu plus de trois fois plus vite avec la même réponse juste. Sur une question courte, le réglage ne change rien au prix. Mon assistant a désormais un bouton à côté de la zone de saisie pour choisir le modèle et l'effort selon la tâche.

<figure class="haute">
<img src="/blog/nouveautes-ia-septembre-2026/menu-modele-effort-assistant.webp" alt="Capture du menu ouvert au-dessus de la zone de saisie : quatre modèles (Fable 5.1, Opus 5.5 coché, Sonnet 5.5, Haiku 4.5) et cinq efforts de Faible à Max, Faible choisi" width="1440" height="1680" loading="lazy">
<figcaption>Capture de mon assistant sur téléphone : le bouton à côté de la zone de saisie ouvre ce menu, où je choisis le modèle et l'effort pour chaque conversation.</figcaption>
</figure>

Le reste du mois est passé sur la chaîne qui transforme mes réunions en tâches faites, que je raconte dans [un article dédié](/blog/reunion-taches-ia-notion).

## Ce que je ferais à votre place

Pas grand-chose ! Vous n'avez aucune raison de suivre ces sorties au jour le jour et changer d'outil à chaque nouveau modèle fait perdre plus de temps qu'il n'en fait gagner. Les baisses de prix finissent de toute façon par arriver chez ceux qui construisent leurs outils sur ces modèles.

Si vous n'avez encore jamais essayé, commencez par un texte que vous repoussez. Copiez le dernier avis Google laissé sur votre commerce dans la version gratuite de ChatGPT ou de Claude et demandez-lui une réponse. Ça prend deux minutes et vous verrez tout de suite ce que ces outils savent faire sans rien brancher. Et si vous voulez savoir ce qu'un assistant comme [Foxy](/) prendrait en charge chez vous, je vous réponds volontiers.
