---
titre: "Jev de TypeSafe : l'IA qui décide au lieu d'écrire"
description: "Tout le monde a parlé de Jev cette semaine, un modèle qui ne rédige rien et se contente de trancher. Je l'ai testé sur des annonces immobilières et je vous dis ce qu'il vaut, et pour qui."
date: 2026-09-23
format: explicatif
grappe: agents
mot_cle: "typesafe ai"
image_carte: "/images/blog/cartes/jev-typesafe-ia-qui-decide-schema.webp"
statut: publie
image_partage: "/images/blog/partage-jev-typesafe-ia-qui-decide.png"
mots_cles: ["TypeSafe", "Jev", "modèle de décision", "probabilité calibrée", "extraction de données", "agent IA"]
lire_aussi: ["/blog/agent-ia-definition", "/blog/quel-outil-ia-entreprise-comparatif", "/agents"]
---
Jev est un modèle d'intelligence artificielle qui ne produit jamais de texte. On lui donne un document et une question fermée. Il répond par une décision chiffrée : une option dans une liste, une note sur une grille ou la probabilité que la réponse soit oui.

Son éditeur, [TypeSafe AI](https://www.typesafe.ai/), l'a rendu public le 15 septembre 2026. L'équipe est menée par Diogo Almeida, un ancien d'OpenAI qui a participé à la méthode d'entraînement derrière ChatGPT, et elle a levé 40 millions de dollars pour prendre le chemin inverse de tout le monde. Pendant que les autres laboratoires apprennent à leurs modèles à mieux parler, TypeSafe a construit un modèle qui se tait et qui tranche.

C'est un objet nouveau et j'ai mis quelques jours à comprendre où il rend service et où il ne sert à rien. Cet article explique les trois questions qu'on peut lui poser, comment on lit sa réponse, ce que j'ai regardé sur de vraies annonces immobilières et ce que d'autres en font déjà dans l'industrie.

<div class="encadre">
<p><strong>En bref</strong></p>
<p>Jev répond à trois sortes de questions : choisir une option dans une liste, noter sur une grille, dire oui ou non. Chaque réponse arrive avec une probabilité et un niveau de confiance, en une fraction de seconde, pour un prix presque nul.</p>
<p>Il ne rédige pas, ne résume pas et ne discute pas. Il se place devant ou derrière un modèle comme Claude ou ChatGPT pour trier, vérifier, classer et choisir en volume.</p>
<p>La bonne façon de le lire tient en une règle : une réponse hésitante (55 % contre 45 %) veut dire « je ne sais pas », et votre programme doit alors passer la main à un humain.</p>
</div>

## Un modèle qui ne parle pas

<div class="rangee-logos"><span class="logo"><img src="/images/blog/logos/typesafe.png" alt="Logo TypeSafe AI" width="44" height="44" loading="lazy"><em>TypeSafe</em></span><span class="logo"><img src="/images/blog/logos/claude.png" alt="Logo Claude" width="44" height="44" loading="lazy"><em>Claude</em></span><span class="logo"><img src="/images/blog/logos/chatgpt.png" alt="Logo ChatGPT" width="44" height="44" loading="lazy"><em>ChatGPT</em></span></div>

Un modèle comme Claude ou ChatGPT fabrique sa réponse mot après mot, et c'est pour cela qu'il met plusieurs secondes à répondre et qu'il coûte cher quand on lui pose dix mille fois la même question. TypeSafe appelle son modèle un « System One », en référence au psychologue Daniel Kahneman qui distingue la pensée rapide et intuitive (le système 1) de la pensée lente et réfléchie (le système 2). Jev ne réfléchit pas à voix haute et il ne justifie rien. Il regarde et il tranche.

Imaginez un chef de rayon à qui vous tendez une lettre de réclamation en demandant « c'est pour le service livraison, facturation ou retours ? ». Il jette un œil et répond « retours » sans vous écrire de rapport. Voilà Jev. Si vous lui demandez de rédiger la réponse au client, il vous regarde sans rien dire : il n'a pas été entraîné pour ça.

Le prix découle de ce silence. Comme le modèle ne produit presque aucun mot, TypeSafe facture uniquement ce qu'on lui envoie ([42 dollars par milliard de jetons](https://docs.typesafe.ai/models)) et rien pour la réponse. Les réponses arrivent en 70 à 500 millisecondes selon la taille du document, là où un grand modèle prend de 3 à 30 secondes. Ces chiffres viennent du vendeur et je n'ai pas pu les reproduire, mais l'ordre de grandeur se voit dans toutes les démonstrations publiées.

<figure>
<img src="/blog/jev-typesafe-ia-qui-decide/typesafe-site.webp" alt="Page d'accueil de TypeSafe AI : une fenêtre façon vieux système d'exploitation compare Jev aux modèles Claude et GPT, sous le titre We took the opposite research direction" width="1400" height="1291" loading="lazy">
<figcaption>La page d'accueil de TypeSafe le 22 septembre 2026. Le tableau compare Jev à Claude Haiku, Sonnet, Opus et GPT-5.6 sur une même tâche de tri. Ce sont les mesures de l'éditeur, faites par lui.<span class="credit">Capture : typesafe.ai, 22 septembre 2026.</span></figcaption>
</figure>

## Les trois questions qu'on peut lui poser

Tout ce que Jev sait faire tient dans [trois formes de question](https://docs.typesafe.ai/primitives). Le choix de la forme dépend de ce que votre programme doit faire de la réponse.

**Le choix** (Choice) sert quand la réponse est une option parmi une liste fermée qui peut compter jusqu'à 255 options. Quel service doit traiter ce message, dans quelle catégorie ranger ce produit, lequel de ces montants est la taxe foncière. Jev renvoie l'option retenue et une probabilité pour chacune des autres.

**La note** (Score) sert quand la réponse se place sur une échelle ordonnée. Quelle est la gravité de ce bug, à quel point ce client est agacé, quel niveau d'urgence pour cette demande. Vous décrivez de deux à dix paliers avec des mots et Jev renvoie une position sur cette échelle, avec des décimales quand il hésite entre deux paliers.

**Le oui ou non** (Noul) sert pour une seule affirmation à vérifier. Ce client demande-t-il à parler à un humain, ce mail contient-il une demande de remboursement, cette annonce mentionne-t-elle des travaux. Jev renvoie un seul nombre entre 0 et 1, la probabilité que la réponse soit oui.

<figure class="jev-questions"><div class="jq"><div class="jq-type">Choix</div><div class="jq-etat">« Mes chaussures de course sont arrivées dans la mauvaise taille. Je peux les échanger en 43 ? »</div><div class="jq-question">Quel service doit traiter ce message ?</div><div class="jq-barres"><div class="jq-barre" style="--p:100%"><span>Retours</span><b>100 %</b></div><div class="jq-barre" style="--p:0%"><span>Livraison</span><b>0 %</b></div><div class="jq-barre" style="--p:0%"><span>Facturation</span><b>0 %</b></div></div><div class="jq-conf">Confiance 1,0 : on peut agir sans relire</div></div><div class="jq"><div class="jq-type">Note</div><div class="jq-etat">« Le bouton Exporter fait planter la page sur Safari. Ça marche sur Chrome, mais certains clients n'ont que Safari. »</div><div class="jq-question">Quelle est la gravité du bug ?</div><div class="jq-barres"><div class="jq-barre" style="--p:0%"><span>Cosmétique</span><b>0 %</b></div><div class="jq-barre" style="--p:57%"><span>Cassé, avec un contournement</span><b>57 %</b></div><div class="jq-barre" style="--p:43%"><span>Bloquant</span><b>43 %</b></div></div><div class="jq-conf">Note 1,43 sur 2, confiance 0,35 : il hésite</div></div><div class="jq"><div class="jq-type">Oui ou non</div><div class="jq-etat">« Je peux enfin parler à un vrai humain ? »</div><div class="jq-question">Le client demande-t-il un conseiller humain ?</div><div class="jq-barres"><div class="jq-barre" style="--p:99%"><span>Oui</span><b>0,99</b></div></div><div class="jq-conf">Un seul nombre, la probabilité du oui</div></div><figcaption>Les trois formes de réponse, sur les exemples de la documentation de TypeSafe. La réponse arrive toujours avec la répartition complète des probabilités, jamais avec une phrase.</figcaption></figure>

Vous pouvez poser plusieurs questions d'un coup sur le même document, et elles sont traitées en parallèle dans le même temps. C'est même la façon recommandée de travailler : dix petites questions précises plutôt qu'une grande question floue.

## Comment on construit une question

Une requête contient trois choses : le **document** à juger (un mail ou une annonce), l'**instruction** (la question posée) et les **critères** qui décrivent chaque option ou chaque palier. Jev voit tout cela et rien d'autre. Il ne connaît pas votre entreprise et il ne se souvient pas de la question précédente.

<figure>
<img src="/blog/jev-typesafe-ia-qui-decide/doc-choice-requete.webp" alt="Extrait de la documentation TypeSafe : une requête au format JSON avec le document, la question et trois critères nommés retours, livraison et facturation" width="1400" height="735" loading="lazy">
<figcaption>Une requête telle qu'on l'écrit, tirée de la documentation. Le document, la question, puis une description par option. Chaque exemple de la doc s'ouvre dans un bac à sable en ligne où l'on peut modifier les critères et relancer.<span class="credit">Capture : docs.typesafe.ai, 22 septembre 2026.</span></figcaption>
</figure>

Tout se joue dans les critères, et la documentation donne des [conseils très concrets](https://docs.typesafe.ai/primitives/advanced). Un bon critère décrit une situation, pas un degré : « fonctionnalité cassée mais un contournement existe » vaut mieux que « moyen ». Quand deux options se ressemblent, on précise pour chacune ce qu'elle couvre, ce qu'elle ne couvre pas et un ou deux exemples. On ajoute presque toujours une option « autre » ou « aucun », sans quoi le modèle est obligé de choisir dans une liste qui ne contient pas la bonne réponse. Et on garde une seule idée par question, car « ce mail est-il urgent et vient-il d'un client ? » cache deux jugements et demande deux questions.

Le reste du travail revient à votre programme. Il découpe le document, pose les questions, reçoit les probabilités et applique ses propres règles pour décider quoi faire. Jev ne lance jamais une action de lui-même.

## Comment lire la réponse

Une réponse de Jev se lit à deux niveaux. Le premier est l'option retenue. Le second, plus important, est la **répartition des probabilités** et le niveau de confiance qui en découle. Une réponse concentrée sur une option est sûre. Une réponse étalée sur plusieurs options dit « je ne sais pas ».

Prenez une question sans bonne réponse : « qui est le plus fort, Sangoku ou Naruto ? ». Jev vous renverra quelque chose comme 55 % pour l'un et 45 % pour l'autre. Ce résultat ne vous apprend rien sur les deux héros. Il vous apprend que le modèle n'a aucune conviction et qu'un programme qui prendrait cette réponse pour un verdict ferait n'importe quoi une fois sur deux. La bonne lecture est donc simple. **Sous un certain niveau de confiance, on ne fait rien de la réponse et on passe la main.**

TypeSafe appelle cette propriété la calibration. Le modèle a été entraîné pour que ses probabilités soient honnêtes : quand il annonce 80 %, il a raison environ huit fois sur dix. Cela ne garantit rien sur une réponse prise isolément, mais cela permet de régler des seuils. La documentation propose [une échelle en trois paliers](https://docs.typesafe.ai/patterns/confidence-routing) :

| Confiance | Réaction du programme |
|---|---|
| Sous 0,6 | Il passe la main à un humain |
| Entre 0,6 et 0,85 | Agit sans risque et demande confirmation pour le reste |
| Au-dessus de 0,85 | Agit seul même sur une action sensible |

Le seuil n'a rien de fixe et il se règle selon ce que coûte une erreur. Pour classer un mail dans un dossier, une confiance de 0,6 suffit puisqu'on peut le déplacer. Pour valider un virement, on exige beaucoup plus, ou un humain.

## Ce que j'ai regardé sur des annonces immobilières

Un ami agent immobilier me demande de suivre les annonces de plusieurs agences pour repérer, entre autres, la taxe foncière de chaque bien. Avant de brancher Jev, j'ai pris six annonces réelles de Caen et j'ai noté où se trouvait l'information. Chez Century 21, la taxe est dans un champ étiqueté « Taxe foncière : 1 763 € ». Une simple règle de texte la trouve et l'intelligence artificielle n'a rien à faire là. Chez Pozzo, elle n'apparaît nulle part et aucun modèle au monde ne peut inventer un chiffre absent. Il faut appeler l'agence.

La place de Jev se trouve entre ces deux cas. L'information existe mais elle est noyée dans la description au milieu des travaux et du chauffage et elle prend la forme « TF environ 1 400 €/an ». Une annonce contient une quinzaine de montants et la question « lequel est la taxe foncière ? » est un choix minuscule pour lui. C'est d'ailleurs [la recette officielle de TypeSafe](https://docs.typesafe.ai/cookbooks/pre_parsed_value_extraction_cookbook) pour extraire une valeur d'un texte fouillis.

<figure>
<ol class="flux">
<li><strong>Le texte brut</strong>l'annonce entière, description comprise</li>
<li><strong>Les candidats</strong>une règle relève tous les montants, sans trier</li>
<li><strong>La question</strong>« lequel est la taxe foncière, ou aucun ? »</li>
<li><strong>Le choix</strong>Jev désigne un montant avec sa probabilité</li>
<li><strong>Le programme</strong>recopie le montant tel quel, ou demande à l'agence</li>
</ol>
<figcaption>Extraire un chiffre sans jamais le laisser inventer. Jev choisit parmi des candidats que le programme lui tend, et le programme recopie le morceau désigné sans le retoucher.</figcaption>
</figure>

Le détail qui compte se trouve à la dernière étape. Jev ne recopie rien et n'écrit rien : le programme reprend le morceau de texte désigné tel qu'il figure dans l'annonce. Un modèle qui rédige peut se tromper d'un zéro en recopiant. Un modèle qui désigne ne le peut pas.

La même mécanique s'applique à tout ce qui ressemble à un gros texte en vrac avec un champ à remplir. Je pense au salaire dans une offre d'emploi ou au montant d'une facture reçue, et aussi au numéro de téléphone sur le site d'un commerce ou à la prochaine étape à retenir dans un échange avec un client.

## Ce que les gens en font

En une semaine, une communauté de développeurs a publié une trentaine de démonstrations sur [jevable.com](https://jevable.com/), et c'est là qu'on voit le mieux ce que l'outil change.

<figure>
<img src="/blog/jev-typesafe-ia-qui-decide/jevable-demos.webp" alt="La galerie jevable.com : une grille de démonstrations construites avec Jev, essayage virtuel, classification de plans, tri de Hacker News, filtre de notifications, agent navigateur" width="1400" height="1000" loading="lazy">
<figcaption>La galerie de démonstrations montée par Nikunj Kothari. Chaque carte renvoie vers la publication de son auteur, avec le temps et le coût mesurés.<span class="credit">Capture : jevable.com, 22 septembre 2026.</span></figcaption>
</figure>

Dans l'industrie, Trinay Hari a fait classer par Jev les plans d'un chantier pour en tirer la nomenclature du bâtiment : 26 pages traitées en 2,9 secondes pour un demi-centime. Nikunj Kothari a fait noter 3 000 goûters pour enfants sur plusieurs critères en 28 secondes et pour 11 centimes. Ce genre de travail existait déjà avec un grand modèle, mais à un prix et une lenteur qui faisaient renoncer.

Gregor Zunic est l'auteur de l'outil Browser Use et il a branché Jev sur son agent navigateur. Le modèle ne lit plus l'écran et choisit l'action suivante dans une liste que le programme reconstruit à chaque étape. Une recherche de vols prend 7 secondes et coûte 0,0039 dollar. C'est la même idée que ma taxe foncière appliquée à chaque clic.

D'autres démonstrations touchent au quotidien d'une petite entreprise. Nader Dabit cherche sa boîte mail par intention plutôt que par mots-clés et Ethan coupe les notifications commerciales de son téléphone. Tamir a construit un formulaire qui choisit sa question suivante selon la réponse précédente et Higgsfield aiguille chaque demande vers le modèle d'IA le plus adapté. Quelques expériences de trading automatique circulent aussi et je les regarde avec la plus grande prudence. Un modèle bien calibré sur des textes n'a jamais fait de quelqu'un un bon investisseur.

La recette la plus utile pour une entreprise qui paie ses jetons vient de TypeSafe même. Dans sa [cascade d'extraction](https://docs.typesafe.ai/cookbooks/sde_cascade), un petit modèle bon marché remplit les champs et Jev vérifie chacun d'eux (absent du texte, hors sujet ou mal formaté). Seuls les champs douteux remontent vers un grand modèle coûteux, soit 30 à 40 % des cas dans leur essai. On obtient la qualité du grand modèle pour une fraction de son prix.

## Ce qu'il ne sait pas faire

Jev lit au pied de la lettre. Il répond à la question écrite, pas à celle qu'on avait en tête, et [sa propre documentation](https://docs.typesafe.ai/model-jaggedness/jev-1.13) liste ses faiblesses sans détour. Il compte mal et il lit les dates comme du texte, si bien qu'il se trompe sur « avant » ou « après ». Les doubles négations le perdent et sa précision baisse dès que le document contient beaucoup de choses sans rapport avec la question. Il travaille d'abord en anglais et accepte 64 000 jetons par requête, soit une grosse centaine de pages. Cela exclut de lui donner un long historique de conversation à juger.

Il ne remplace donc pas un modèle qui rédige, et il ne fait pas de miracle sur ce qui demande de réfléchir. Un développeur connu sous le nom de Theo a résumé la critique la plus juste. Ce qui est assez simple pour que Jev le juge, presque tous les modèles le réussissent déjà. Le gain se trouve dans la vitesse, le prix et la probabilité honnête, pas dans l'intelligence. Un premier engouement pour lui faire élaguer la mémoire des agents de programmation est d'ailleurs retombé pour cette raison : il juge chaque morceau isolément, sans voir le fil, et jette parfois ce dont l'agent avait besoin.

Deux réserves de ma part. Les mesures de vitesse et de coût sont celles du vendeur, comparées à une moyenne de grands modèles, et personne ne les a reproduites de façon indépendante. Et Jev tourne uniquement sur les serveurs américains de TypeSafe sans aucune version installable chez soi. Je refuse d'y envoyer des données de santé ou des dossiers couverts par le secret professionnel, quelle que soit la promesse de confidentialité. Pour ces documents, le [guide écrit pour les avocats](/metiers/avocat) détaille les montages possibles.

## Par où commencer

Une clé s'obtient en quelques minutes sur [la console de TypeSafe](https://console.typesafe.ai/), et chaque exemple de la documentation s'ouvre dans un bac à sable où l'on change les critères et relance sans écrire une ligne de code. Des bibliothèques existent pour Python et JavaScript.

Avant d'y brancher une tâche je passe quatre questions. La décision est-elle fermée, avec des options qu'on peut écrire à l'avance ? Peut-on la juger sur un document court qui se suffit à lui-même ? Se répète-t-elle assez souvent pour que la vitesse et le prix comptent ? Et le document peut-il partir chez un tiers ? Quatre oui et Jev est le bon outil. Un seul non et un modèle classique, une règle de trois lignes ou un humain feront mieux.

## Questions fréquentes

### Jev peut-il remplacer ChatGPT ou Claude ?

Non. Il ne produit aucun texte et ne tient aucune conversation. Il se place à côté d'eux pour trier ce qui entre, vérifier ce qui sort ou choisir parmi des options, et il laisse la rédaction au modèle qui sait écrire.

### Combien coûte Jev ?

TypeSafe facture 42 dollars par milliard de jetons envoyés et rien pour les réponses. Une annonce immobilière entière coûte quelques millièmes de centime à juger. Le prix est celui affiché le 22 septembre 2026 sur sa documentation.

### Que veut dire une probabilité « calibrée » ?

Sur un grand nombre de réponses données avec 80 % de probabilité, environ 80 % sont justes. Cela ne dit rien d'une réponse prise seule, mais cela permet de fixer un seuil en dessous duquel votre programme passe la main à un humain.

### Faut-il savoir programmer pour s'en servir ?

Pour l'essayer, non : le bac à sable de la documentation suffit. Pour le brancher sur vos mails ou vos factures il faut en revanche un programme qui découpe les documents, pose les questions et applique les seuils. C'est le genre de brique que je pose dans les [agents que je construis](/agents).

### Mes documents restent-ils confidentiels ?

Ils transitent par les serveurs de TypeSafe aux États-Unis, sans version à installer chez vous. Pour des données de santé ou couvertes par le secret professionnel, je conseille de s'en passer.

Si une tâche de tri ou d'extraction vous coûte des heures, [écrivez-moi](/agents) avec un exemple de document. Je vous dirai en quelques lignes si Jev, un modèle classique ou une simple règle fera l'affaire.
