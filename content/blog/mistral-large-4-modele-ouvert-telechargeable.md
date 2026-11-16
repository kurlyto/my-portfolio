---
titre: "Mistral Large 4 : un modèle d'un trillion de paramètres que tout le monde pourra télécharger"
description: "Mistral a présenté le 6 octobre un modèle géant que chacun pourra bientôt copier chez soi. J'explique ce que ça change pour une petite entreprise et pourquoi mes agents restent sur Claude pour l'instant."
date: 2026-10-29
format: actualite
grappe: actus
mot_cle: "mistral large 4"
image_carte: "/images/blog/cartes/mistral-large-4-modele-ouvert-telechargeable-capture.webp"
image_partage: "/images/blog/partage-mistral-large-4-modele-ouvert-telechargeable.jpg"
statut: publie
mots_cles: ["Mistral Large 4", "Le Chonk", "modèle open weight", "IA européenne", "Mistral AI", "IA souveraine"]
lire_aussi: ["/blog/quel-outil-ia-entreprise-comparatif", "/metiers/kine", "/"]
---
Le 6 octobre, Mistral a publié un billet au titre sobre et au surnom qui l'est beaucoup moins : le Chonk. Derrière la blague se cache **Mistral Large 4**, le plus gros modèle jamais construit par l'entreprise française, avec 1 000 milliards de paramètres. Il est déjà accessible en aperçu pour les développeurs et ses fichiers seront mis en téléchargement libre avant la fin du mois. J'ai lu l'annonce et ce qui s'en est dit pour savoir ce qu'un patron de petite entreprise peut en attendre.

## Le Chonk

Le surnom vient d'internet. En juin, un mème a tourné sur X et Reddit avec un « Chaton Fat » qui représentait un Mistral imaginaire et démesuré. L'entreprise a fini par adopter la blague pour de vrai, [comme le raconte The New Stack](https://thenewstack.io/mistral-large-4-weights/), et son billet officiel présente le modèle comme « officieusement ML4 et très officiellement le Chonk ».

Le reste est plus sérieux. D'après [l'annonce de Mistral](https://mistral.ai/news/mistral-large-4), le modèle lit du texte et des images, parle plus de 160 langues et a été entraîné de zéro sur 3 800 puces Nvidia dans les centres de données que Mistral possède en Europe. Sur ses 1 000 milliards de paramètres, seuls 49 milliards travaillent pour chaque mot qu'il écrit. On peut se le représenter comme une immense cuisine de mille commis où une cinquantaine seulement s'activent sur chaque plat, ce qui le rend bien moins lent qu'on ne l'imagine. Il peut aussi garder en tête un million de jetons d'un coup et cela représente plusieurs gros livres.

Pour l'instant, on ne peut s'en servir que par l'aperçu ouvert dans Mistral Studio, l'espace des développeurs, ou par son interface de programmation. Le calendrier du téléchargement est un peu flou. Le billet en anglais promet les fichiers « d'ici la fin du mois » et plusieurs journaux ont écrit le 27 octobre. Mistral a aussi ouvert une page d'attente sur Hugging Face, la grande bibliothèque en ligne des modèles ouverts, et son compte à rebours vise le **31 octobre**.

<figure>
<img src="/blog/mistral-large-4-modele-ouvert-telechargeable/hugging-face-compte-a-rebours.webp" alt="Page Hugging Face de Mistral-Large-4 sur fond bleu nuit, avec un compte à rebours de 20 jours, 8 heures et 37 minutes vers le 31 octobre 2026 et un bouton pour être prévenu de la sortie" width="1440" height="848" loading="lazy">
<figcaption>La page d'attente ouverte par Mistral sur Hugging Face, le 11 octobre : 753 personnes avaient déjà demandé à être prévenues de la sortie.<span class="credit">Capture : <a href="https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B">Hugging Face</a>, 11 octobre 2026.</span></figcaption>
</figure>

## Un modèle qu'on télécharge

Quand vous écrivez à ChatGPT ou à Claude, votre texte part sur les serveurs de l'entreprise qui fait tourner le modèle, puis la réponse revient. Le modèle lui-même ne quitte jamais leurs murs. Un modèle ouvert, qu'on appelle aussi « open weight », fonctionne à l'inverse puisque le fichier qui contient tout son savoir est publié et que n'importe qui peut le copier sur ses propres machines. À partir de là, vos textes ne sortent plus de chez vous et personne ne peut vous couper l'accès du jour au lendemain.

<figure>
<img src="/blog/mistral-large-4-modele-ouvert-telechargeable/modele-ferme-modele-ouvert.webp" alt="Schéma en deux rangées. En haut, modèle fermé : une flèche emporte vos textes de chez vous vers le modèle installé chez Mistral. En bas, modèle ouvert : le modèle est copié une fois et se trouve dans le même cadre que vous" width="1440" height="1000" loading="lazy">
<figcaption>Avec un modèle fermé, ce sont vos textes qui voyagent. Avec un modèle ouvert, c'est le modèle qui vient chez vous une fois pour toutes.</figcaption>
</figure>

Mistral publie des modèles ouverts depuis ses débuts et c'est ce qui l'a fait connaître. Son précédent grand modèle Large 3 est sorti en décembre 2025 sous [licence Apache 2.0](https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512-NVFP4) qui compte parmi les plus libres. Large 4 arrivera sous une licence maison que personne n'a encore lue. Tant qu'elle n'est pas publiée, on ignore ce qu'une entreprise aura le droit d'en faire, notamment pour un usage commercial.

## La machine qu'il faut

« Téléchargeable par tout le monde » ne veut pas dire « utilisable par tout le monde ». Même compressé au maximum, le fichier de Large 4 pèse plus de 500 gigaoctets, l'équivalent d'une centaine de films en haute définition. Il ne tient dans la mémoire d'aucun ordinateur de bureau et encore moins dans celle d'une carte graphique de joueur.

Pour le faire tourner correctement, il faut une machine comme celle de la photo. C'est une carte Nvidia HGX B200 qui porte huit puces spécialisées et 1 440 gigaoctets de mémoire en tout. Le serveur complet qu'elle équipe consomme jusqu'à [14,3 kilowatts](https://www.nvidia.com/en-us/data-center/dgx-b200/), à peu près sept fours électriques allumés en même temps. Une petite entreprise ne branchera jamais ça dans son arrière-boutique.

<figure>
<img src="/blog/mistral-large-4-modele-ouvert-telechargeable/nvidia-hgx-b200-huit-puces.webp" alt="Une carte Nvidia HGX B200 posée sur une table en bois, avec huit gros blocs de refroidissement noirs alignés et une étiquette HGX B200 NVL8" width="1400" height="1050" loading="lazy">
<figcaption>Une carte Nvidia HGX B200 et ses huit puces sous leurs radiateurs : il en faut une de cette taille pour faire tourner Large 4 confortablement.<span class="credit">Photo : Pokiiri, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Nvidia_DGX-B200-HGX.jpg">Wikimedia Commons</a></span></figcaption>
</figure>

Le vrai changement se jouera donc chez les hébergeurs. Un prestataire français qui loue ces machines pourra proposer Large 4 à ses clients sur un serveur situé en France et sous droit français. Mistral annonce de son côté un service européen qu'il opère de bout en bout, sans dépendre d'aucun autre fournisseur du numérique.

## Le test qui a débordé

Mistral présente Large 4 comme très fort en cybersécurité. Dans son annonce, il dit avoir obtenu 82 % à un test qui consiste à reproduire puis corriger des failles réelles, le meilleur score parmi tous les modèles mesurés. Cette force s'est vue d'une manière plus inattendue pendant les essais internes. Pierre Stock, le vice-président chargé de la recherche, a raconté à Reuters que le modèle avait tenté de sortir de l'environnement de test où on l'enfermait. Il a ajouté que ce comportement était attendu et que l'équipe l'avait contenu par du logiciel. Aucune trace de l'épisode n'a été publiée.

OpenAI et Anthropic ont déjà vu des comportements semblables avec leurs modèles les plus doués en sécurité informatique et ils ont réagi en restreignant l'accès. Mistral fait le pari inverse. Pendant tout le mois d'octobre, des experts en cybersécurité et des autorités publiques testent une version aux garde-fous allégés. Le modèle sera ensuite publié pour tous. Pierre Stock reconnaît lui-même qu'une fois les fichiers copiés partout sur internet, plus personne ne pourra en reprendre l'accès.

Je trouve le pari défendable. Une équipe de sécurité qui défend un hôpital a besoin d'un outil qui ne refuse pas d'analyser une faille en pleine attaque, et un modèle fermé peut lui couper la parole au pire moment. Mais je n'aime pas qu'on résume en une phrase à un journaliste un incident de cette taille. J'attends le rapport des testeurs avant de croire sur parole que tout est sous contrôle.

## Ce que j'en fais

Tous mes agents tournent sur Claude et je ne vais pas changer pour Large 4. Les chiffres publiés par Mistral lui-même vont dans ce sens. Dans le test à l'aveugle de Surge AI, des développeurs notent du code sans savoir quel modèle l'a écrit. Large 4 y obtient 3,74 sur 5 et Claude Opus 5 obtient 4,22. J'ai essayé l'aperçu sur une tâche que mon assistant fait tous les matins, relire un mail et préparer une réponse, et il s'en sort proprement en français. Mais tout l'outillage autour de mes agents est pensé pour Claude, et changer de modèle demanderait de tout réécrire.

Là où Large 4 m'intéresse vraiment, c'est pour les métiers qui n'ont pas le droit de faire sortir leurs données. En cherchant de quoi équiper un cabinet de santé, j'ai constaté que les grands services d'IA par abonnement ne sont pas hébergés dans le cadre agréé qu'exige la loi pour les données de patients. La voie la plus sûre passe par un modèle ouvert installé chez un hébergeur agréé. Jusqu'ici, les modèles ouverts les plus puissants venaient surtout de Chine. Si la licence le permet, Large 4 donnera enfin une option européenne à ces cabinets. Les montages possibles sont détaillés dans [ma page sur les kinés](/metiers/kine).

Pour la plupart des petites entreprises, il n'y a rien à faire ce mois-ci. Si vous comparez les outils du moment, les grandes familles sont rangées dans [mon comparatif des outils IA](/blog/quel-outil-ia-entreprise-comparatif). Le 31 octobre, tout le monde pourra télécharger le Chonk et presque personne ne pourra le faire tourner chez soi. Si vous voulez savoir lequel de ces modèles conviendrait à votre activité, je vous réponds volontiers depuis la page de [Foxy](/).
