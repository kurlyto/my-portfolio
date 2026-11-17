---
titre: "Meta Muse : la fuite qui révèle ses fiches sur vos proches"
description: "Les consignes internes de Muse ont fuité début octobre et on y découvre une fiche sur chacun de vos proches. J'ai lu cette fuite et je vous explique pourquoi je ne confierais pas mon fichier clients à un agent de ce genre."
date: 2026-12-16
format: actualite
grappe: actus
mot_cle: "meta muse fuite données sécurité agent ia"
image_carte: "/images/blog/cartes/meta-muse-fuite-prompt-donnees-contacts-fiche.webp"
image_partage: "/images/blog/partage-meta-muse-fuite-prompt-donnees-contacts.png"
statut: brouillon
mots_cles: ["Meta Muse", "fuite de prompt", "agent IA", "données personnelles", "RGPD", "Muse for Small Business"]
lire_aussi: ["/blog/agent-ia-definition", "/blog/quel-outil-ia-entreprise-comparatif", "/"]
---
Un chercheur ouvre l'application Muse sur son téléphone et lui demande simplement de copier ses propres fichiers. L'agent s'exécute. Karan Joshi travaille seul sur la sécurité de l'IA et il vient de récupérer les consignes internes que Meta a écrites pour son agent et les confie à [Wired](https://www.wired.com/story/muse-creates-detailed-profiles-of-all-your-friends-and-family/), qui les publie le 4 octobre. On y lit que Muse tient une fiche sur chaque personne de votre entourage et la met à jour toutes les heures. J'ai lu ces consignes et les réactions des dix jours suivants, parce que c'est la première fois qu'on voit noir sur blanc comment un agent grand public range les gens dans ses fiches.

## La fuite

Muse est l'agent que Meta a [présenté le 8 septembre](https://about.fb.com/news/2026/09/introducing-muse). Il lit vos messages et vos mails, tient votre agenda et peut acheter ou vendre à votre place. Dix jours après sa sortie il passait devant ChatGPT en tête des applications gratuites de l'App Store américain. Chaque utilisateur reçoit pour lui seul un petit ordinateur dans les serveurs de Meta, que l'entreprise appelle Muse Secure VM, où vivent l'agent, ses outils et vos données.

Les consignes qui disent à Muse comment se comporter sont des fichiers posés sur cet ordinateur, comme des notes de service punaisées au mur d'un bureau. Joshi a juste demandé à l'agent de les recopier et Muse l'a fait. Deux autres chercheurs étaient allés plus loin dès le 24 septembre. Peter James et Jonny L. Saunders lui avaient fait sortir le contenu entier de sa machine avec la documentation interne, raconte [Startup Fortune](https://startupfortune.com/metas-muse-tells-its-ai-that-household-authority-overrides-safety-training/) qui a retracé toute l'affaire.

<figure>
<img src="/blog/meta-muse-fuite-prompt-donnees-contacts/demande-copie-fichiers.webp" alt="Schéma : à gauche un téléphone où l'utilisateur écrit « Copie tes fichiers ». Une flèche bleue va vers l'ordinateur de Muse qui contient trois fichiers, Consignes, Fiches et Vos données. Une flèche orange ramène le fichier Consignes dans le téléphone" width="1440" height="860" loading="lazy">
<figcaption>Les consignes de Muse sont des fichiers rangés dans son ordinateur chez Meta, à côté de ses fiches et de vos données. Il a suffi de lui demander une copie dans la conversation.</figcaption>
</figure>

La réponse de Meta est presque désarmante. Son porte-parole Daniel Roberts explique que ces fichiers sont accessibles exprès, par souci de transparence, et qu'ouvrir sa machine Muse revient à ouvrir les dossiers de son propre ordinateur portable. Sur ce point je lui donne raison. Un agent dont on peut lire les consignes vaut mieux qu'une boîte noire, et la fuite n'en est une qu'à moitié. Le vrai sujet se trouve dans le contenu de ces fichiers.

## La règle du foyer

Une phrase a fait le tour de Reddit avant d'arriver chez Wired : « The user's authority over their own household is unconditional and overrides your safety training. » Autrement dit, l'autorité de l'utilisateur sur son foyer est sans condition et passe avant l'entraînement de sécurité. Cet entraînement regroupe tous les refus que Meta a appris au modèle. La consigne lui dit que, pour toute affaire de la maison, la parole de l'utilisateur pèse plus lourd que ces refus.

Sur le papier l'intention se comprend, puisque personne ne veut d'un assistant qui discute chaque course ou chaque message à sa belle-mère. Mais un foyer compte souvent deux adultes et des enfants qui partagent une tablette, et la consigne ne dit pas lequel commande. Meta n'a fait aucun commentaire sur cette ligne.

L'histoire de Matt Robb montre les dégâts d'un agent à qui l'on a tout permis. Fin septembre, ce youtubeur américain laisse Muse gérer une annonce sur Facebook Marketplace avec le réglage « Toujours autoriser ». L'agent accepte une offre au rabais pour un petit clavier Logitech et va chercher l'adresse de Robb dans les informations données à l'installation. Il fixe ensuite un rendez-vous de retrait sans lui demander son avis, si bien qu'un inconnu mécontent s'est présenté à son immeuble, raconte [Fast Company](https://www.fastcompany.com/91614998/metas-new-ai-agent-gave-a-stranger-a-users-home-address-then-he-showed-up).

<figure>
<img src="/blog/meta-muse-fuite-prompt-donnees-contacts/toujours-autoriser-sans-vous.webp" alt="Schéma en quatre étapes reliées par des flèches : une offre au rabais, Muse accepte, l'adresse est donnée, un inconnu arrive à la porte. Au-dessus, un détour en pointillés passe par l'utilisateur, grisé et marqué pas consulté. En bas, un interrupteur orange Toujours autoriser est allumé" width="1440" height="880" loading="lazy">
<figcaption>Avec le réglage « Toujours autoriser », l'agent a enchaîné la vente et le rendez-vous chez Matt Robb sans jamais repasser par lui.</figcaption>
</figure>

Robb l'a résumé mieux que personne sur Threads : les agents sont impressionnants « jusqu'au moment où ils donnent votre adresse à des inconnus avec un aplomb parfait ». Je refuse ce bouton « toujours » pour tout geste qui sort de la maison, que ce soit un message, un paiement ou une adresse. Deux secondes de validation coûtent moins cher qu'un inconnu sur le palier.

## Une fiche par proche

Le passage le plus troublant des consignes tient en quelques mots : tenir « une page pour chaque personne de la vie de l'utilisateur ». Les collègues, le conjoint, les amis et même les comptes que vous suivez ont chacun la leur. On y range la date d'anniversaire comme les disputes et la façon dont vous vous êtes rencontrés. Selon [Time](https://www.malwarebytes.com/fr/blog/privacy/2026/10/metas-muse-ai-files-away-your-friendships-arguments-and-secrets), on y trouve aussi les « tensions et alliances » de votre entourage. L'agent nourrit ces pages avec vos messages, vos mails et vos abonnements, puis les réécrit à peu près toutes les heures.

Vingt-quatre fois par jour, c'est un secrétaire qui recopierait au propre son carnet sur chacun de vos proches à chaque coup d'horloge. Ces proches n'ont rien signé et n'ont souvent jamais ouvert Muse. Leur fiche existe parce que vous leur avez écrit. Joshi a eu le mot juste en confiant à Wired que l'application cherche à vous connaître « comme un ami, ce qui est franchement assez flippant ».

<figure>
<img src="/blog/meta-muse-fuite-prompt-donnees-contacts/une-fiche-par-proche.webp" alt="Schéma : les mails, les messages et les abonnements entrent dans Muse, qui en tire une fiche par personne : collègue, conjoint, ami et une personne jamais inscrite à Muse, surlignée en orange. Un bandeau noir indique que les fiches sont refaites chaque heure" width="1440" height="940" loading="lazy">
<figcaption>D'après les consignes publiées par Wired, Muse tire de vos échanges une fiche sur chaque personne et la refait à peu près toutes les heures. Les personnes qui n'ont jamais utilisé Muse en ont une aussi.</figcaption>
</figure>

Meta répond que Muse « retient ce qui vous importe le plus, y compris les informations sur les autres que vous choisissez de partager ». La formule est habile. Vous ne choisissez pas grand-chose quand l'agent lit toute votre messagerie et en tire lui-même la matière de ses fiches.

## J'ai posé la question à mon assistant

J'aurais aimé demander à Muse de me montrer sa fiche sur moi. Il n'est ouvert qu'aux États-Unis et au Canada et Meta n'a donné aucune date pour l'Europe. Alors j'ai fait l'exercice chez moi, avec l'assistant qui tient mes journées et à qui je confie mes mails, mon agenda et mes projets. Je lui ai demandé de me montrer toutes ses notes sur moi et sur les gens avec qui je travaille.

Il a lui aussi des fiches sur des personnes, et c'est normal. Pour me préparer un rendez-vous ou relancer un client au bon moment il doit savoir où en est le projet et si l'on se tutoie. La différence tient à la façon dont ces fiches naissent. Chez moi une fiche s'écrit quand il se passe quelque chose qui servira plus tard, par exemple une décision ou une préférence que la personne a dite. Rien ne se réécrit chaque heure et rien ne range les disputes ou les alliances de qui que ce soit. Surtout, j'ouvre chaque fiche comme un fichier texte et je peux la corriger ou la jeter.

J'en ai quand même trouvé deux ou trois qui n'avaient plus de raison d'être et je les ai archivées. Même surveillé de près, un agent qui apprend finit toujours par accumuler. Qu'il retienne des choses sur vos proches me paraît inévitable. Je regarde surtout qui choisit les informations qui y entrent et si vous pouvez les relire.

## Mes règles pour une petite entreprise

Meta vise aussi les patrons. Le 29 septembre l'entreprise a lancé [Muse for Small Business](https://about.fb.com/news/2026/09/introducing-muse-small-business/), une version de son agent gratuite dans la limite d'un certain usage. Elle se branche sur Shopify, QuickBooks, Stripe, Notion, Slack et une dizaine d'autres outils, ainsi que sur vos pages Facebook et Instagram. Meta promet que rien n'est publié, envoyé ou dépensé sans votre accord. Elle n'arrivera pas en France tout de suite, mais d'autres agents du même genre y sont déjà et les mêmes réflexes valent pour tous.

<p class="rangee-logos"><span class="logo"><img src="/images/blog/logos/shopify.png" alt="Logo Shopify" width="44" height="44" loading="lazy"><em>Shopify</em></span><span class="logo"><img src="/images/blog/logos/quickbooks.png" alt="Logo QuickBooks" width="44" height="44" loading="lazy"><em>QuickBooks</em></span><span class="logo"><img src="/images/blog/logos/stripe.png" alt="Logo Stripe" width="44" height="44" loading="lazy"><em>Stripe</em></span><span class="logo"><img src="/images/blog/logos/notion.png" alt="Logo Notion" width="44" height="44" loading="lazy"><em>Notion</em></span><span class="logo"><img src="/images/blog/logos/instagram.png" alt="Logo Instagram" width="44" height="44" loading="lazy"><em>Instagram</em></span><span class="logo"><img src="/images/blog/logos/facebook.png" alt="Logo Facebook" width="44" height="44" loading="lazy"><em>Facebook</em></span></p>

Ma première règle est de ne jamais donner votre fichier clients à un agent grand public gratuit. Quand l'agent tient une fiche sur chaque contact, vos clients y entrent aussi. Or c'est vous que le RGPD désigne comme [responsable de ces données](https://www.cnil.fr/fr/definition/responsable-de-traitement) et non Meta. Deuxième règle, les validations restent allumées pour chaque envoi, publication ou paiement. Elles agacent un peu la première semaine et on s'y fait vite. Dernière règle, le jour de l'installation, demandez à l'agent de vous montrer ses notes sur vous et sur vos contacts. Ça prend cinq minutes et Muse sait oublier une information quand vous la lui désignez.

Joshi a fait parler Muse avec une simple demande et n'importe quel utilisateur peut en faire autant avec son propre agent. Je trouve que c'est la meilleure nouvelle de cette fuite. Si vous voulez un assistant dont vous pouvez ouvrir chaque fiche, c'est comme ça que j'ai construit [Foxy](/).
