---
titre: "Claude Sonnet 5.5 : à quoi bon quand tout le monde utilise Opus ?"
description: "Autour de moi tout le monde travaille avec Opus. Alors je me suis demandé à quoi sert encore Sonnet et je vous montre où je le fais tourner dans mon parc d'agents."
date: 2026-10-21
format: actualite
grappe: actus
mot_cle: "claude sonnet 5.5 avis test"
image_carte: "/images/blog/cartes/claude-sonnet-5-5-annonce.webp"
image_partage: "/images/blog/partage-claude-sonnet-5-5-cuisine.jpg"
statut: brouillon
mots_cles: ["Claude Sonnet 5.5", "Claude Opus 5.5", "choisir un modèle IA", "sous-agents", "abonnement Claude Pro", "Anthropic"]
lire_aussi: ["/blog/opus-5-5-videos-jeux-en-code", "/blog/agent-ia-definition", "/"]
---
Le 28 septembre, Anthropic a sorti Claude Sonnet 5.5 et j'ai d'abord haussé les épaules. Sonnet 5.5 est le modèle intermédiaire de la famille Claude, plus rapide et moins cher qu'Opus, pensé pour les tâches bien cadrées du quotidien. Or autour de moi, chez les développeurs que je croise comme dans mon propre assistant, tout le monde travaille avec Opus 5.5 depuis sa sortie six jours plus tôt. Alors à quoi bon ? En regardant de plus près, je me suis rendu compte qu'il tourne déjà dans une bonne partie de mon parc d'agents, à des endroits que personne ne voit.

## Tout le monde est sur Opus

Opus est le grand modèle d'Anthropic, celui qu'on sort pour le travail de fond. Il écrit du code pendant des heures sans perdre le fil et il se trompe moins quand la consigne est floue. C'est lui que j'ai sous les doigts toute la journée et mon assistant tourne dessus depuis le premier jour. Pour réfléchir avec moi à un projet ou reprendre un gros morceau de code, je ne vois aucune raison de descendre d'un cran.

<figure><img src="/blog/claude-sonnet-5-5/ch1-opus-travail-fond.webp" alt="Un développeur penché sur de grands plans étalés sur son bureau, le soir, avec un grand robot orange qui lui montre un détail du doigt" width="1440" height="960" loading="lazy"><figcaption><span class="credit">Illustration générée par IA</span></figcaption></figure>

Le réflexe est si bien installé qu'on en oublie le prix. La documentation de Claude Code le dit pourtant sans détour : [Opus coûte plusieurs fois plus par tour que Sonnet](https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code). Tant qu'on discute avec lui quelques heures par jour, la différence se fond dans l'abonnement. Elle saute aux yeux le jour où un agent travaille sans vous du matin au soir.

## Sonnet 5.5 en deux mots

[L'annonce d'Anthropic](https://www.anthropic.com/claude-sonnet-5-5) tient en peu de lignes. Sonnet 5.5 garde le prix de Sonnet 5 : 2 dollars le million de jetons lus et 10 dollars le million de jetons écrits. Un million de jetons représente environ sept cent mille mots, soit de quoi remplir une dizaine de romans. Anthropic annonce des réponses plus de 30 % plus rapides que Sonnet 5 et une facture jusqu'à 30 % plus légère par tâche dans ses propres tests, parce que le modèle consomme moins de jetons pour arriver au même résultat.

<figure><img src="/blog/claude-sonnet-5-5/annonce-anthropic.webp" alt="Haut de la page d'annonce d'Anthropic : le titre Claude Sonnet 5.5 et la date du 28 septembre 2026 sur une vue de la Terre depuis le hublot d'un vaisseau" width="1440" height="900" loading="lazy"><figcaption>La page d'annonce publiée par Anthropic le 28 septembre 2026, six jours après celle d'Opus 5.5.<span class="credit">Capture : <a href="https://www.anthropic.com/claude-sonnet-5-5">anthropic.com</a>, 30 septembre 2026</span></figcaption></figure>

L'éditeur le présente comme le complément d'Opus 5.5, qu'il réserve au travail complexe qui demande du jugement. Sonnet 5.5 serait le plus à l'aise sur les tâches bien délimitées comme la correction de bugs ou la fabrication de documents, de présentations et de tableurs. Il est disponible dans les applications Claude comme chez Amazon, Google et Microsoft, et [un Haiku 5.5 pour les gros volumes](https://www.unite.ai/anthropic-releases-claude-sonnet-5-5-at-unchanged-sonnet-5-pricing/) doit suivre dans les prochaines semaines.

## Par l'API

Le premier endroit où Sonnet reprend l'avantage, c'est l'API, ce branchement direct qui permet à un logiciel de parler au modèle et de payer au jeton. Prenons l'agent qui répond aux messages d'une boutique en ligne. Il en voit passer des centaines par jour et la plupart demandent où en est un colis ou si un pull existe en taille M. Chaque réponse coûte une fraction de centime et c'est la multiplication qui fait la facture.

<figure><img src="/blog/claude-sonnet-5-5/ch3-boutique-messages.webp" alt="Dans l'arrière-boutique d'un magasin de vêtements, un petit robot bleu-vert assis devant un ordinateur répond à une nuée d'enveloppes et de bulles qui entrent par la fenêtre" width="1440" height="960" loading="lazy"><figcaption><span class="credit">Illustration générée par IA</span></figcaption></figure>

Sur ce genre de message, Opus coûterait plusieurs fois plus cher pour une réponse que le client ne distinguerait pas. J'aime bien faire le calcul à l'envers avec les clients en partant du nombre de messages par jour, puis en cherchant le plus petit modèle qui ne décevra personne. Le dernier point de qualité d'Opus se paie sur chaque message alors que la personne qui demande son numéro de suivi ne le verra jamais.

## En sous-agent

Le deuxième usage est moins visible et c'est celui que je préfère. Mes agents ne travaillent pas seuls : quand une demande se découpe en morceaux, le modèle principal confie chaque morceau à un sous-agent. C'est une copie de lui-même lancée pour une seule mission, qui rend son résultat et disparaît. Le choix du modèle se fait alors tâche par tâche. Haiku prend le mécanique comme le résumé d'une longue conversation avant qu'elle déborde, Sonnet prend ce qui demande un peu de jugement et Opus garde la décision.

<figure><img src="/blog/claude-sonnet-5-5/ch4-cuisine-chef-commis.webp" alt="Une cuisine de restaurant où un grand robot chef orange goûte une sauce pendant que deux petits robots commis épluchent des carottes et coupent des légumes" width="1440" height="960" loading="lazy"><figcaption><span class="credit">Illustration générée par IA</span></figcaption></figure>

Ça ressemble à une cuisine de restaurant où le chef goûte et tranche pendant que les commis épluchent et découpent. Personne ne demande au chef d'éplucher les carottes. Certains de mes agents tournent même entièrement sur Sonnet, comme celui qui trie chaque jour mes favoris sur X. Il lit un message, décide s'il mérite une tâche et l'inscrit dans ma liste sans jamais avoir besoin d'une longue réflexion.

## Avec un abonnement Pro

Le troisième cas concerne ceux qui ne passent pas par l'API. Un abonnement Claude Pro donne une enveloppe d'usage qui [se recharge toutes les cinq heures, avec un plafond par semaine](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work) qui vaut pour tous les modèles. Opus vide cette enveloppe beaucoup plus vite que Sonnet. Si vous utilisez Claude quelques fois par jour dans votre navigateur, vous n'avez rien à changer. Pour un agent qui tourne toute la journée, le choix du modèle décide s'il tient la semaine ou s'il s'arrête le mercredi.

<figure><img src="/blog/claude-sonnet-5-5/ch5-agent-toute-la-journee.webp" alt="Un petit robot écrit des lettres à son bureau à côté d'une pile d'enveloppes, devant une fenêtre dont une moitié montre le soleil et l'autre la lune" width="1440" height="960" loading="lazy"><figcaption><span class="credit">Illustration générée par IA</span></figcaption></figure>

Je l'ai vécu le lendemain de la sortie. Un client fait tourner sur son propre forfait Pro un agent qui prépare chaque jour des dizaines de brouillons de mails, et sous Opus le forfait se vidait trop vite. Le 29 septembre, j'ai basculé l'agent et tous ses sous-agents sur Sonnet 5.5. Le changement tient en une ligne de réglage et le retour en arrière aussi, ce qui permet d'essayer sans trembler. J'y ai appris un détail qui peut faire perdre une journée. Dans Claude Code, le raccourci « sonnet » désignait encore Sonnet 5 au lendemain de la sortie et il fallait écrire le nom complet `claude-sonnet-5-5` pour obtenir le nouveau.

## Mon critère

Ma règle tient en une question que je me pose pour chaque agent : a-t-il besoin d'une réflexion profonde ? S'il peut s'en passer il reste sur Sonnet. Un agent qui n'a pas des milliers de paramètres et d'outils à prendre en compte dans ses calculs tourne mieux en Sonnet, parce qu'il répond plus vite et coûte moins sans rien perdre d'utile.

<figure class="haute"><img src="/blog/claude-sonnet-5-5/menu-modeles-aios.webp" alt="Le menu de choix du modèle dans mon assistant : Fable 5.1, Opus 5.5 pour les travaux complexes, Sonnet 5.5 pour le bon équilibre au quotidien et Haiku 4.5, puis cinq niveaux d'effort" width="1440" height="1549" loading="lazy"><figcaption>Le menu de mon assistant où je choisis le modèle et l'effort de chaque conversation.</figcaption></figure>

Opus se garde pour l'agent qui jongle avec beaucoup d'outils et de règles à la fois, par exemple celui qui doit croiser un agenda, une boîte mail et un tableur avant d'agir. C'est aussi sur les consignes floues que Sonnet décroche encore. Quand une demande laisse beaucoup à deviner, Opus comble mieux les trous et je le sens dès la première réponse.

J'avais haussé les épaules le 28 septembre. Une semaine plus tard, Sonnet fait tourner une bonne partie des agents qu'on ne voit jamais, pendant qu'Opus reste celui avec qui je parle. Si vous vous demandez quel modèle suffirait à votre propre assistant, c'est une des premières questions que je règle quand j'installe [Foxy](/) chez quelqu'un.
