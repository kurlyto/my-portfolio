---
titre: "Dots d'OpenAI travaille pendant que vous dormez mais pas en Europe"
description: "OpenAI propose depuis le 29 septembre un agent qui continue de travailler quand on ferme ChatGPT. Je n'ai pas pu l'essayer depuis la France alors j'ai lu toute sa documentation et je vous dis ce que j'en pense."
date: 2027-01-13
format: actualite
grappe: actus
mot_cle: "openai dots agent permanent avis"
image_carte: "/images/blog/cartes/openai-dots-agents-permanents-carte.webp"
image_partage: "/images/blog/partage-openai-dots-agents-permanents.png"
statut: brouillon
mots_cles: ["OpenAI Dots", "agent IA permanent", "ChatGPT Business Premium", "GPT-6 Astra", "RGPD", "agent IA entreprise"]
lire_aussi: ["/blog/meta-muse-fuite-prompt-donnees-contacts", "/blog/agent-ia-definition", "/agents"]
---
Le soir du 29 septembre, OpenAI a présenté Dots et j'ai lu l'annonce deux fois de suite. Dots est un agent qui vit dans ChatGPT et qui continue de travailler quand vous fermez l'application. Il a son propre ordinateur dans les serveurs d'OpenAI, il se branche sur vos outils et il avance sur vos projets jour et nuit. J'ai voulu l'essayer dans la foulée et je suis resté à la porte, parce que l'abonnement Pro qui le donne aux particuliers exclut l'Europe. La porte est toujours fermée trois semaines plus tard.

Ça m'a piqué parce que je fais tourner ce genre d'agent sur mon propre serveur depuis l'été. J'ai donc lu l'annonce, la page d'aide d'OpenAI et les déclarations de Sam Altman pour comprendre comment Dots marche, pourquoi l'Europe attend et ce que ça annonce pour les petites entreprises.

## Un agent qui a son propre ordinateur

Un assistant comme ChatGPT ou Claude travaille quand vous lui parlez. Vous posez une question, il répond, et s'il a une longue tâche à mener il la mène dans la fenêtre que vous avez ouverte. Dots change la règle. Chaque agent reçoit [son propre ordinateur dans le cloud](https://openai.com/index/introducing-dots/) avec un navigateur, tourne sur le modèle GPT-6 Astra et garde ses tâches en route quand vous éteignez votre machine. Vous pouvez ouvrir son ordinateur à tout moment pour regarder où il en est, un peu comme on passe la tête par la porte du bureau d'un collègue.

Quand vous ne lui demandez rien, il cherche de quoi vous aider. OpenAI appelle ça la recherche proactive : l'agent parcourt les applications que vous avez branchées et s'en fait des souvenirs, avec des outils limités à la lecture qui ne peuvent ni envoyer un message ni modifier quoi que ce soit. Pour agir, il suit des règles que vous fixez action par action, sur quatre crans qui vont d'« agir sans demander » à « vous passer la main ». Changer un mot de passe reste toujours à vous.

<figure>
<img src="/blog/openai-dots-agents-permanents/ordinateur-du-dot-la-nuit.webp" alt="Schéma : à gauche un ordinateur portable à l'écran noir avec une lune, marqué Votre ordinateur, éteint. À droite un nuage qui contient un écran allumé avec une fenêtre de navigateur et la tuile de l'IA, marqué L'ordinateur de votre dot. En bas, un cadenas vert Lecture seule à côté des icônes mail, agenda et document" width="1440" height="940" loading="lazy">
<figcaption>Votre ordinateur peut dormir : celui de votre dot tourne dans les serveurs d'OpenAI. Quand il fouille vos applications de lui-même, ses outils ne font que lire.</figcaption>
</figure>

L'exemple qu'OpenAI met en avant est presque banal et c'est pour ça qu'il parle. Un testeur avait oublié de facturer un article publié. Son agent l'a remarqué tout seul, a préparé la facture et l'a envoyée après son accord.

Le saut par rapport à Claude Code, que j'utilise tous les jours, tient à cette permanence. Claude Code travaille tant que la session est ouverte et s'arrête quand on la ferme. Pour qu'il continue la nuit, il faut lui louer une machine et lui écrire des tâches programmées, ce que j'ai fait pour mon propre assistant au prix de pas mal de soirées. Dots livre tout ça d'un bloc avec l'abonnement.

## Pourquoi l'Europe attend

La page d'aide d'OpenAI le dit en une ligne : Dots arrive chez les abonnés Pro [« dans les marchés hors Espace économique européen, Suisse et Royaume-Uni »](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot). La Norvège et l'Islande restent donc dehors avec les Vingt-Sept, Londres et Genève aussi. L'offre Business Premium, celle des entreprises, est en revanche ouverte dans toutes les régions où ChatGPT est disponible et la France en fait partie. Le « pas en Europe » du titre vaut donc pour les particuliers alors qu'une société française peut s'abonner dès aujourd'hui.

<figure>
<img src="/blog/openai-dots-agents-permanents/carte-pays-sans-dots-pro.webp" alt="Carte de l'Europe : les pays de l'Espace économique européen, la Suisse et le Royaume-Uni sont en orange avec l'étiquette Pas de Dots en Pro. L'Ukraine, les Balkans hors Union, la Turquie et l'Afrique du Nord sont en blanc avec l'étiquette Dots en Pro. La Russie et la Biélorussie sont en gris" width="1440" height="1280" loading="lazy">
<figcaption>En orange, les pays où l'abonnement Pro n'a pas Dots au 19 octobre 2026. En gris, la Russie et la Biélorussie où ChatGPT n'est pas ouvert. L'offre Business Premium a Dots dans tous ces pays.<span class="credit">Carte : fonds <a href="https://www.naturalearthdata.com/">Natural Earth</a> (domaine public), d'après <a href="https://help.openai.com/en/articles/20001530-getting-started-with-your-dot">l'aide d'OpenAI</a>.</span></figcaption>
</figure>

OpenAI n'a donné aucune raison officielle. Sam Altman s'en est expliqué devant [NBC News](https://www.nbcnews.com/tech/tech-news/openai-launches-dots-ai-agents-safety-questions-rcna600338) le jour du lancement : « Nous avons un excellent historique de lancements dans l'Union européenne mais leur processus prend plus de temps et parfois bien plus qu'on ne peut le prévoir. » Il assure vouloir livrer tous ses produits aux Européens. Aucune date n'a été donnée depuis.

J'ai mon idée sur ce qui coince et elle tient dans la carte des pays exclus. Le Royaume-Uni et la Suisse ne sont pas dans l'Union mais ils ont tous les deux gardé ou recopié le RGPD. La frontière suit donc la protection des données bien plus que la loi européenne sur l'IA. Or Dots lit vos applications en arrière-plan et en tire des souvenirs, y compris sur les gens qui vous écrivent et qui n'ont jamais entendu parler de lui. La page d'aide précise même que [débrancher une application n'efface pas ce que l'agent en a déjà retenu](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot) et qu'il faut supprimer l'agent entier pour ça. On a vu le même genre de fiches sur les proches dans [la fuite des consignes de Muse chez Meta](/blog/meta-muse-fuite-prompt-donnees-contacts). Dans une offre d'entreprise, c'est la société cliente qui porte ces données et signe un contrat de traitement, ce qui expliquerait que Business Premium soit passé et pas Pro. C'est une lecture personnelle et OpenAI ne l'a pas confirmée.

## 4 000 applications pour une petite entreprise

Dots se branche sur [plus de 4 000 applications](https://openai.com/index/introducing-dots/) par les plugins de ChatGPT, et on lui parle dans ChatGPT, dans Slack ou dans Teams. Il peut se servir de votre boîte mail personnelle mais il n'a pas encore d'adresse à lui, et il ne sait pas vous appeler. Les SMS existent en bêta pour une poignée d'abonnés américains.

Pour une petite entreprise les usages décrits par OpenAI sont les bons : relire l'agenda chaque matin pour dire ce qui arrive, repérer la facture oubliée et refaire une présentation quand les chiffres changent. Prenez un gérant de société de nettoyage avec douze salariés et un compte Gmail qui déborde. Un agent qui lui signale le mardi qu'un client n'a pas été facturé pour le chantier de vendredi lui rend de l'argent qu'il aurait laissé filer. Le jour où son logiciel de planning n'a pas de plugin, Dots peut encore passer par son navigateur dans le cloud, mais l'aide d'OpenAI prévient qu'un site peut bloquer ce navigateur. C'est le maillon fragile.

<figure>
<img src="/blog/openai-dots-agents-permanents/facture-oubliee-votre-accord.webp" alt="Schéma en quatre étapes reliées par des flèches : Chantier de vendredi, puis l'agent marqué en orange Pas de facture, puis un personnage bleu sur fond vert marqué Votre accord, puis Facture envoyée" width="1440" height="540" loading="lazy">
<figcaption>L'exemple fictif du gérant de nettoyage : l'agent repère le chantier sans facture et prépare la facture mais elle ne part qu'avec votre accord.</figcaption>
</figure>

Le prix se lit sur [la page des offres entreprise](https://openai.com/business/chatgpt-pricing/). Il faut au moins deux utilisateurs, dont un siège Premium à 100 dollars par mois en paiement annuel ou 125 dollars au mois. Avec un siège standard pour l'associé, l'entrée tourne autour de 120 à 150 dollars par mois. OpenAI promet de vendre plus tard des agents supplémentaires et plus de vitesse mais n'a encore donné aucun prix.

## Mon assistant tourne déjà la nuit

Mon assistant à moi tourne depuis l'été sur un serveur que je loue en France. Il fait sa veille de l'actualité à 7 heures, prépare ma journée et surveille une poignée d'agents qui travaillent sur Telegram pendant que je dors. Je l'ai construit pièce par pièce et ça m'a appris où ce genre d'agent casse : une connexion qui expire dans la nuit ou une tâche programmée qui ne part jamais sans que personne ne s'en rende compte. Je retrouve dans Dots les mêmes réponses à ces pannes, avec le journal d'activité et la pause en un clic, et ça me rassure plutôt sur mes choix.

La différence tient au sur-mesure. Dots est le même agent pour tout le monde et il se branche sur les outils les plus courants en trois clics. Un agent construit pour une entreprise parle à son logiciel métier même sans plugin, il connaît ses règles dès le premier jour et on choisit où il tourne. Je ne vais pas jouer les souverainistes pour autant, puisque le modèle qui fait réfléchir mes agents tourne lui aussi chez un Américain, Anthropic. Mon avis est simple. Pour un patron qui vit dans Gmail et Slack, Dots en Business Premium suffira très vite. Pour celui dont la journée passe par un logiciel métier que personne ne connaît à San Francisco, il faudra encore quelqu'un pour brancher les tuyaux.

## Trois géants en un mois

Septembre 2026 restera le mois où les trois plus gros acteurs ont sorti leur agent permanent. Meta a présenté [Muse](https://about.fb.com/news/2026/09/introducing-muse) le 8 septembre, Microsoft a ouvert l'avant-première d'[Autopilot dans Copilot](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) le 25 et OpenAI a lancé Dots le 29. Meta donne même une version gratuite aux petites entreprises alors qu'OpenAI réserve Dots aux abonnements les plus chers en invoquant le coût du calcul.

<p class="rangee-logos"><span class="logo"><img src="/images/blog/logos/meta.png" alt="Logo Meta" width="44" height="44" loading="lazy"><em>Muse</em></span><span class="logo"><img src="/images/blog/logos/copilot.png" alt="Logo Microsoft Copilot" width="44" height="44" loading="lazy"><em>Autopilot</em></span><span class="logo"><img src="/images/blog/logos/chatgpt.png" alt="Logo ChatGPT" width="44" height="44" loading="lazy"><em>Dots</em></span></p>

Je ne m'en inquiète pas. Quand les trois plus grosses entreprises du secteur se battent pour le même produit le même mois, c'est que le besoin existe et que les patrons vont en entendre parler à la radio avant de m'en parler à moi. Les tâches simples comme l'agenda ou la facture oubliée vont tomber dans ces abonnements et tant mieux. Je n'avais aucune envie de les facturer.

Rien ne presse de votre côté ce mois-ci. Si votre entreprise paie déjà ChatGPT Business, passez un seul siège en Premium pendant un mois pour lui confier une tâche qui vous coûte vraiment comme la relance des factures impayées. Regardez ensuite son journal d'activité chaque soir. Si vous n'êtes pas abonné, attendez que les prix se stabilisent et que l'offre Pro arrive en Europe.

Les agents travaillent désormais pendant qu'on dort. En Europe, pour l'instant, c'est surtout le RGPD qui veille. Et si vous voulez savoir ce qu'un agent construit pour votre métier prendrait chez vous, [je vous explique comment je travaille](/agents).

## Questions fréquentes

### Dots est-il disponible en France ?

Oui pour les entreprises et non pour les particuliers. L'offre Business Premium donne accès à Dots dans toutes les régions où ChatGPT est ouvert, France comprise. L'abonnement personnel Pro l'exclut dans l'Espace économique européen, en Suisse et au Royaume-Uni, sans date annoncée.

### Combien coûte Dots ?

Le premier agent est inclus sans supplément dans les abonnements Pro (à partir de 100 dollars par mois) et Business Premium. Une entreprise doit prendre au moins deux utilisateurs et le siège Premium coûte 100 dollars par mois en paiement annuel, 125 dollars au mois.

### Dots peut-il envoyer un mail sans mon accord ?

Il suit les règles que vous lui donnez, action par action, de « agir sans demander » à « demander avant » ou « vous passer la main ». Pendant sa recherche en arrière-plan il ne peut que lire. OpenAI rappelle que l'agent peut se tromper, y compris en suivant vos règles, et conseille de relire tout travail important.
