---
titre: "IA pour kiné et ostéopathe : usages et données de santé"
description: "Un agent IA qui tient la liste d'attente et rappelle les patients perdus de vue. Il prend le téléphone pendant les séances, dans le respect des données de santé."
h1: "Un agent IA pour votre cabinet de kiné ou d'ostéopathie"
date: 2026-08-28
mot_cle: "ia kiné"
mots_cles: ["agent IA kinésithérapeute", "données de santé", "agenda du cabinet", "liste d'attente", "comptes rendus"]
lire_aussi: ["/blog/quel-agent-ia-pour-votre-metier"]
---
Un agent IA pour kinésithérapeute ou ostéopathe est un assistant logiciel qui gère la liste d'attente, relance les patients perdus de vue, prend les rendez-vous pendant les séances et met en forme les notes dictées après une consultation. Il s'occupe de l'administratif pour que le praticien reste auprès de ses patients.

Tout ce qui touche au soin relève pourtant des données de santé, qui sont parmi les plus protégées du droit français. Un chapitre entier de cette page explique la manière de les traiter et ce que change le choix du modèle d'IA.

<div class="encadre">
<p><strong>En bref</strong></p>
<p>Un agent IA gère la liste d'attente, relance les patients perdus de vue et met en forme les notes de séance. Le praticien relit tout et garde la main sur le soin.</p>
<p>Les données de santé exigent un hébergeur certifié HDS et un stockage dans l'Union européenne. Le choix du modèle d'IA et de l'endroit où il tourne décide du reste.</p>
</div>

## La semaine d'un kiné

Un kiné en libéral travaille les mains occupées et c'est précisément le problème. Le téléphone sonne pendant une mobilisation d'épaule et la personne au bout du fil veut un rendez-vous que personne ne peut lui donner avant la fin de la séance.

Une annulation de dernière minute laisse un créneau vide alors que trois patients attendaient justement une place. Un patient en rééducation du genou ne revient plus depuis trois semaines sans que personne ne s'en aperçoive. Et le soir, les notes griffonnées ou dictées entre deux séances attendent encore d'être transformées en comptes rendus lisibles.

## Les tâches confiées à l'agent

Imaginez une secrétaire médicale qui ne serait jamais en pause déjeuner et qui connaîtrait votre agenda mieux que vous. Je refuse qu'un agent touche au traitement, mais il garde le cabinet plein et les dossiers à jour. Si le mot « agent » vous paraît flou, une [explication simple de ce qu'est un agent IA](/blog/agent-ia-definition) vous attend sur le blog.

- **La liste d'attente.** Dès qu'un patient annule, l'agent propose le créneau par SMS aux patients qui attendaient une place.
- **Les patients perdus de vue.** Il repère ceux qui n'ont plus de rendez-vous depuis trois semaines en pleine rééducation et prépare une relance que vous validez.
- **Le téléphone pendant les séances.** Il répond, se présente comme l'assistant du cabinet et propose des créneaux libres.
- **Les comptes rendus.** Vos notes vocales d'après séance deviennent un texte propre que vous relisez avant de le classer.
- **Les notes d'honoraires.** Il les prépare à la fin du mois pour votre outil de comptabilité.

<figure>
<div class="message">
<div class="expediteur"><span>Assistant du cabinet</span><span>12:14</span></div>
<div class="ligne"><strong>Annulation de 16 h 30</strong></div>
<div class="ligne">Le créneau a été proposé à 3 patients de la liste d'attente.</div>
<div class="ligne">Le premier a accepté à 12 h 12. Le rendez-vous est inscrit à l'agenda et les deux autres ont été prévenus.</div>
<div class="actions"><span>Voir l'agenda</span></div>
</div>
<figcaption>Exemple d'annulation rattrapée pendant une séance. Aucune donnée de soin ne circule dans ce message et les horaires sont fictifs.</figcaption>
</figure>

C'est la même mécanique que [la liste d'attente d'un salon de coiffure](/metiers/coiffeur) et je conseille de commencer par cette partie parce qu'elle n'ouvre jamais le dossier de soins.

## Les données de santé de vos patients

Pour savoir où partent les données, il faut d'abord séparer deux pièces que l'on confond souvent. L'agent est le programme qui lit vos mails, range les documents et prépare les brouillons. Pour comprendre un texte ou en écrire un, il interroge un modèle d'IA qui tourne quelque part sur un serveur, un peu comme un collaborateur qui passerait un coup de fil à un expert extérieur. Le sort de vos données dépend de ce modèle et de l'endroit où il tourne bien plus que de l'agent lui-même.

### Les règles sur les données de santé

Toute personne qui héberge des données de santé pour le compte d'un professionnel doit être [certifiée HDS](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049577902), pour hébergeur de données de santé. Le [décret du 24 mars 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053717250) durcit la règle puisque ce stockage devra se faire exclusivement dans l'Union européenne ou l'Espace économique européen à partir du 26 septembre 2026. L'hébergeur devra aussi prévenir ses clients des lois étrangères qui permettraient d'accéder aux données.

La Haute Autorité de santé recommande de son côté de [ne partager aucune information permettant d'identifier un patient](https://www.has-sante.fr/jcms/p_3703115/fr/premieres-clefs-d-usage-de-l-ia-generative-en-sante) avec un outil d'IA qui ne garantit pas la confidentialité. Les ostéopathes n'ont pas d'Ordre mais ils sont [tenus au secret](https://www.osteopathe-syndicat.fr/osteopathe-secret-professionnel) de la même façon.

### D'où vient le modèle et quel droit l'accompagne ?

Les modèles d'IA se rangent en trois grandes familles et chacune voyage avec le droit de son pays.

- **Les modèles américains.** Ce sont ceux d'OpenAI et d'Anthropic, de Google ou de Meta. Le [CLOUD Act](https://www.congress.gov/bill/115th-congress/house-bill/4943/text) de 2018 oblige une entreprise américaine à livrer sur réquisition les données qu'elle détient même quand elles sont stockées hors des États-Unis. Interrogé sous serment au Sénat en juin 2025, le directeur des affaires publiques et juridiques de Microsoft France a reconnu [ne pas pouvoir garantir](https://www.senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html) que les données des Français ne seraient jamais transmises.
- **Les modèles européens.** Le plus connu est celui de Mistral AI, une entreprise française qui [héberge par défaut les données dans l'Union européenne](https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data). C'est ce partenaire que le [Conseil supérieur du notariat a choisi](https://www.csn.notaires.fr/fr/actualites/intelligence-artificielle-le-conseil-superieur-du-notariat-choisit-mistral-ai-et) en juillet 2026 avec un hébergement chez le français Scaleway.
- **Les modèles chinois.** DeepSeek, Qwen chez Alibaba et Kimi chez Moonshot AI en sont les têtes d'affiche. Utilisé en direct, DeepSeek [stocke les données en Chine](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) et l'autorité italienne de protection des données a [ordonné en urgence la limitation](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450) du traitement des données de ses utilisateurs italiens dès janvier 2025.

Une subtilité change pourtant la donne. Le droit qui s'applique dépend moins du pays qui a conçu le modèle que de l'entreprise qui le fait tourner et garde les données. Beaucoup de modèles sont publiés « à poids ouverts » et on peut alors les télécharger pour les installer sur son propre serveur. Un modèle chinois ou américain installé sur une machine française que vous contrôlez n'envoie rien à son éditeur.

### Où le modèle tourne-t-il ?

Choisir où tourne le modèle ressemble beaucoup au choix d'un endroit pour ranger des archives sensibles. On peut les confier au coffre d'une banque étrangère ou à l'agence française de cette même banque. On peut aussi préférer un coffre français agréé par l'État ou l'armoire fermée à clé de son propre bureau.

- **Le coffre étranger : l'API du fournisseur.** Vous appelez directement le modèle chez OpenAI, Anthropic ou Google. Vous profitez des modèles les plus puissants du marché et le CLOUD Act s'applique pleinement.
- **L'agence locale : un cloud américain installé en Europe.** Microsoft propose par exemple de [traiter les requêtes dans l'Union européenne](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy) sans les utiliser pour l'entraînement. Amazon a ouvert en janvier 2026 un [cloud européen](https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud) géré par des sociétés de droit allemand. L'opérateur reste pourtant rattaché à un groupe américain et aucun juge n'a encore dit si le CLOUD Act l'atteint.
- **Le coffre agréé : un cloud qualifié SecNumCloud.** Cette qualification délivrée par l'ANSSI exige que le prestataire soit [soumis exclusivement au droit européen](https://cyber.gouv.fr/enjeux-technologiques/cloud/faq-qualification-secnumcloud/) et que les données restent dans l'Union. L'ANSSI la présente comme une protection face à une possible injonction étrangère et [Outscale](https://en.outscale.com/llmaas-by-outscale/) propose déjà des modèles de Mistral sur une telle infrastructure.
- **L'armoire du bureau : un modèle installé chez vous.** Un modèle à poids ouverts tourne alors sur un serveur du cabinet ou sur un serveur dédié chez un hébergeur français. La [CNIL recommande](https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative) justement de privilégier ce déploiement « sur site » pour des données sensibles et [Mistral Small 3.1](https://mistral.ai/news/mistral-small-3-1/) tient par exemple sur une seule carte graphique haut de gamme.

L'armoire a ses propres contraintes. Les modèles qui tiennent sur une machine de cabinet restent moins brillants que les plus gros modèles du marché sur les tâches complexes et le serveur réclame des mises à jour, des sauvegardes et une vraie surveillance. Tout le logiciel autour du modèle doit aussi jouer le jeu, puisqu'une messagerie ou une sauvegarde hébergée ailleurs suffit à faire sortir les données par une autre porte. Les licences méritent enfin un coup d'œil car celle de Llama 4 [exclut les entreprises établies dans l'Union](https://github.com/meta-llama/llama-models/blob/main/models/llama4/LICENSE) pour ses modèles multimodaux.

### Vos données servent-elles à entraîner le modèle ?

C'est la crainte qui revient le plus souvent et la réponse dépend moins du fournisseur que de l'offre souscrite. Presque tous les grands acteurs appliquent en effet deux régimes bien distincts.

- **Les comptes grand public, gratuits ou payants.** Chez OpenAI les conversations de ChatGPT Free, Plus et Pro [servent à l'entraînement par défaut](https://help.openai.com/en/articles/8983130-what-if-i-want-to-keep-my-history-on-but-disable-model-training) tant que l'utilisateur ne l'a pas désactivé. L'assistant de Mistral [fonctionne de la même manière](https://help.mistral.ai/en/articles/347617-do-you-use-my-user-data-to-train-your-artificial-intelligence-models) tandis qu'Anthropic [laisse le choix](https://www.anthropic.com/news/updates-to-our-consumer-terms) depuis 2025 et conserve cinq ans les conversations de ceux qui acceptent.
- **Les offres professionnelles et les API.** OpenAI [n'entraîne pas ses modèles](https://developers.openai.com/api/docs/guides/your-data) sur les données envoyées à son API depuis 2023 et Anthropic applique la même règle à ses offres commerciales. Chez Google les règles de l'API payante [valent pour tous les utilisateurs européens](https://ai.google.dev/gemini-api/terms) même sur le quota gratuit. Chez Mistral la [documentation de l'API payante](https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training) reste ambiguë et le réglage mérite une vérification dans la console.

Pas d'entraînement ne veut pas dire pour autant zéro conservation. OpenAI et Anthropic gardent par défaut les échanges de leurs API jusqu'à trente jours pour détecter les abus. L'option « zéro rétention » existe mais s'obtient sur accord et Anthropic conserve malgré tout trente jours les échanges avec [ses modèles les plus avancés](https://privacy.claude.com/en/articles/15425996-data-retention-practices-for-covered-models) depuis juin 2026. Un juge peut aussi s'en mêler puisqu'en 2025 le procès intenté par le New York Times a [obligé OpenAI à conserver](https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html) pendant plusieurs mois les journaux de ChatGPT et de son API.

Ma règle pratique tient donc en une phrase : un compte grand public n'a rien à faire dans un cabinet, qu'il soit gratuit ou payant.

### Les montages qui tiennent la route

Du plus fermé au plus ouvert, cinq montages reviennent dans la pratique et chacun a son prix.

<figure>

| Montage | Où vont les données | Ce qu'il faut accepter |
|---|---|---|
| Modèle ouvert sur un serveur du cabinet ou chez un hébergeur français | Nulle part ailleurs | Un modèle moins puissant et un serveur à entretenir |
| Modèle ouvert en service chez un opérateur qualifié SecNumCloud | Chez un opérateur soumis au seul droit européen | Un choix de modèles plus restreint |
| Modèle européen par API avec hébergement dans l'Union | Chez Mistral, dans l'Union par défaut | Des sous-traitants possibles hors de l'Union et des réglages à vérifier |
| Modèle américain dans un cloud américain installé en Europe | En Europe, chez un opérateur rattaché à un groupe américain | Une exposition au CLOUD Act qui n'est pas levée |
| Modèle américain par l'offre professionnelle du fournisseur | Chez le fournisseur, trente jours par défaut | Le CLOUD Act et une conservation courte mais réelle |

<figcaption>Les cinq montages, du plus souverain au moins souverain. Les comptes grand public et le service en ligne de DeepSeek sont à exclure pour des données de patients.</figcaption>
</figure>

Deux précisions évitent les mauvaises surprises. La première concerne la pseudonymisation qui remplace les noms par des codes avant l'envoi au modèle. La CNIL rappelle que des données pseudonymisées [restent des données personnelles](https://www.cnil.fr/fr/lanonymisation-de-donnees-personnelles) et le secret couvre de toute façon tout ce que le patient vous confie bien au-delà des noms. La seconde concerne le contrat, puisque le RGPD impose un [contrat de sous-traitance](https://www.cnil.fr/fr/rgpd-et-professionnels-de-sante-liberaux-ce-que-vous-devez-savoir) avec chaque prestataire qui touche aux données et que la CNIL recommande d'y interdire noir sur blanc toute réutilisation par le fournisseur.

Un cabinet de santé ajoute une contrainte qui ne se discute pas. Chaque maillon qui stocke des données de patients doit se trouver chez un hébergeur certifié HDS, de la messagerie aux sauvegardes en passant par les brouillons. Cloud Temple annonce par exemple une [inférence sur une infrastructure qualifiée SecNumCloud et certifiée HDS](https://www.cloud-temple.com/en/products/large-language-model-as-a-service-llmaas/). Savoir si un fournisseur d'IA qui ne conserve rien est un hébergeur au sens de la loi reste une question sans réponse officielle et c'est pourquoi je penche pour les montages les plus fermés.

Le bon montage dépend enfin de ce que l'agent touche réellement. La liste d'attente et les relances manipulent déjà des données de patients sans ouvrir le dossier de soins, alors que la mise en forme des notes de séance touche le cœur des données de santé. Rien n'empêche donc de réserver le montage le plus fermé à ces notes. Nous tranchons ce point ensemble à l'audit et vous connaissez chaque concession avant le début de la construction.

## Les lignes rouges

### Poser un diagnostic ou adapter un traitement

La Haute Autorité de santé rappelle qu'[aucun contenu généré par une IA n'est vérifié par défaut](https://www.has-sante.fr/jcms/p_3703115/fr/premieres-clefs-d-usage-de-l-ia-generative-en-sante). Un compte rendu reste donc un brouillon tant que vous ne l'avez pas relu et la responsabilité du soin reste entièrement la vôtre.

### Répondre à une question médicale d'un patient

L'agent peut donner un horaire ou déplacer un rendez-vous. Dès qu'un patient décrit une douleur ou demande un conseil, je veux qu'il transmette au praticien sans rien improviser.

### Faire croire qu'on parle à un humain

Le règlement européen sur l'IA [est devenu applicable le 2 août 2026](https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai) et son [article 50](https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-50) demande que toute personne qui échange avec une IA en soit informée. Au téléphone comme par SMS, l'agent se présente comme l'assistant du cabinet.

### Vous dispenser des formalités RGPD

Il n'y a plus de déclaration préalable à la CNIL, mais [le registre des traitements et l'information des patients](https://www.cnil.fr/fr/rgpd-et-professionnels-de-sante-liberaux-ce-que-vous-devez-savoir) restent obligatoires, tout comme un contrat avec chaque prestataire qui touche aux données.

## Comment ça se passe ?

Tout commence par un audit gratuit pendant lequel on regarde ensemble où filent vos heures et quelles données l'agent aurait besoin de toucher. Beaucoup de tâches, comme la liste d'attente ou les relances, se passent très bien du dossier médical. C'est à ce moment qu'on choisit le montage technique.

Je construis ensuite l'agent sur les outils que vous utilisez déjà. Son prix dépend des tâches confiées et se fixe après l'audit. Le premier mois est gratuit et sans engagement.

Pour savoir par quelle tâche commencer dans votre cabinet, [Nate vous répond en deux minutes](/agents?chat=1&metier=kine).
