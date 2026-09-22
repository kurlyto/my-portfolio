---
titre: "Agent IA pour expert-comptable : usages et données"
description: "Un agent IA qui réclame les justificatifs manquants et trie les factures. Il suit les échéances fiscales selon l'Ordre, sans sortir le secret du cabinet."
h1: "Un agent IA pour votre cabinet d'expertise comptable"
date: 2026-09-03
mot_cle: "agent ia expert comptable"
mots_cles: ["agent IA expert-comptable", "collecte des pièces", "relances clients", "facture électronique", "secret professionnel"]
lire_aussi: ["/blog/quel-agent-ia-pour-votre-metier"]
---
Un agent IA pour expert-comptable est un assistant logiciel qui relance les justificatifs manquants, trie les factures reçues par mail, prépare les rappels d'échéances et répond aux questions récurrentes des clients sous le contrôle du cabinet. Il enlève du chemin la collecte et la relance pour que les collaborateurs passent leur temps sur la production et le conseil.

L'Ordre lui-même encourage la profession à se saisir de l'IA, à une condition qu'il répète dans chacun de ses documents : ne pas charger de données clients non anonymisées dans un outil que le cabinet ne maîtrise pas. Un chapitre entier de cette page est donc consacré à la question des données.

<div class="encadre">
<p><strong>En bref</strong></p>
<p>Un agent IA relance les justificatifs, trie les factures reçues par mail et prépare les rappels d'échéances. Le cabinet valide et garde la main sur la production et le conseil.</p>
<p>L'Ordre déconseille de charger des données clients non anonymisées dans un outil non maîtrisé. Ce qui rend un outil maîtrisé tient surtout au modèle d'IA choisi, à l'endroit où il tourne et à l'offre souscrite.</p>
</div>

## La semaine d'un expert-comptable

Posez la question dans n'importe quel cabinet et la réponse tient souvent en un mot : les relances. Les justificatifs du mois arrivent en retard, par morceaux et sous toutes les formes possibles, de la photo de ticket froissé au PDF glissé dans un fil de mails qui parle d'autre chose.

Il faut ensuite ranger chaque facture dans le bon dossier avant l'import, rappeler à chaque client ses échéances fiscales et répondre pour la dixième fois de la semaine à la question de la date limite de la TVA. En période de bilans cette petite mécanique devient un goulot d'étranglement qui retarde tout le reste.

## Les tâches confiées à l'agent

Imaginez un assistant dont l'unique obsession serait que chaque dossier soit complet le jour où un collaborateur l'ouvre. Je ne laisse jamais un agent passer une écriture engageante ni donner un conseil fiscal, mais il fait disparaître une bonne partie du travail de collecte. Un autre article explique [ce qu'est un agent IA](/blog/agent-ia-definition) en mots simples.

- **Les justificatifs manquants.** L'agent sait ce qui manque pour chaque client et prépare des relances personnalisées que le cabinet valide.
- **Le tri des factures.** Il repère les factures reçues par mail et les range client par client avant l'import dans votre logiciel de production.
- **Les échéances fiscales.** Il prépare les rappels du trimestre pour chaque client, selon son régime.
- **Les questions récurrentes.** Il prépare les réponses aux questions qui reviennent sans cesse et transfère au bon collaborateur tout ce qui sort de l'ordinaire.
- **Le point du lundi.** À 8 h il envoie la liste des bilans en retard et les rendez-vous de la semaine.

<figure>
<div class="message">
<div class="expediteur"><span>Assistant du cabinet</span><span>8:00</span></div>
<div class="ligne"><strong>Bonjour. Voici votre semaine.</strong></div>
<div class="ligne">12 clients n'ont pas envoyé leurs justificatifs d'août. Relances prêtes.</div>
<div class="ligne">37 factures reçues par mail, rangées dans 21 dossiers clients.</div>
<div class="ligne">3 bilans en retard sur l'échéancier : dossiers 1042, 1107 et 1188.</div>
<div class="actions"><span>Valider les relances</span><span>Voir les bilans</span></div>
</div>
<figcaption>Exemple de point du lundi. Les clients sont désignés par leur numéro de dossier et les chiffres sont fictifs.</figcaption>
</figure>

## Le secret professionnel et les données de vos clients

Pour savoir où partent les données, il faut d'abord séparer deux pièces que l'on confond souvent. L'agent est le programme qui lit vos mails, range les documents et prépare les brouillons. Pour comprendre un texte ou en écrire un, il interroge un modèle d'IA qui tourne quelque part sur un serveur, un peu comme un collaborateur qui passerait un coup de fil à un expert extérieur. Le sort de vos données dépend de ce modèle et de l'endroit où il tourne bien plus que de l'agent lui-même.

### Ce que disent la loi et l'Ordre

L'expert-comptable est tenu au secret par l'[article 21 de l'ordonnance du 19 septembre 1945](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033678954) et sa violation expose aux peines du code pénal. [La notice que l'Ordre consacre à ChatGPT](https://www.experts-comptables.fr/sites/default/files/assets/files/COMMENT%20UTILISER%20CHATGPT%20-%20A4_p%C3%A0p.pdf) demande de ne charger ni mails clients ni FEC ni DSN non anonymisés dans des « sites non maîtrisés ».

Le [livre blanc de l'Ordre de Paris](https://www.oec-paris.fr/wp-content/uploads/2025/09/livre-blanc_IA-et-data.pdf) va plus loin et invite à privilégier les offres européennes conformes au RGPD. Toute la question devient alors de savoir ce qu'est un outil maîtrisé et j'ai écrit les lignes qui suivent pour y répondre.

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

<figcaption>Les cinq montages, du plus souverain au moins souverain. Les comptes grand public et le service en ligne de DeepSeek sont à exclure pour des données de clients.</figcaption>
</figure>

Deux précisions évitent les mauvaises surprises. La première concerne la pseudonymisation qui remplace les noms par des codes avant l'envoi au modèle. La CNIL rappelle que des données pseudonymisées [restent des données personnelles](https://www.cnil.fr/fr/lanonymisation-de-donnees-personnelles) et le secret couvre de toute façon les informations que vos clients vous confient bien au-delà des noms. La seconde concerne le contrat, puisque le RGPD impose un [contrat de sous-traitance](https://www.cnil.fr/fr/rgpd-et-professionnels-de-sante-liberaux-ce-que-vous-devez-savoir) avec chaque prestataire qui touche aux données et que la CNIL recommande d'y interdire noir sur blanc toute réutilisation par le fournisseur.

Le bon montage dépend enfin de ce que l'agent touche réellement. Un agent qui relance des justificatifs manquants manipule bien moins d'informations sensibles qu'un agent qui ouvre les FEC ou les bulletins de paie. Rien n'empêche donc de réserver le montage le plus fermé aux tâches qui touchent aux chiffres des clients. Le montage se décide avec vous pendant l'audit et je vous dis avant de construire ce que chaque option vous fait abandonner.

## Les lignes rouges

### Valider une déclaration ou un conseil fiscal

Le modèle de charte proposé par l'Ordre pose que l'IA [ne remplace pas la décision humaine](https://www.experts-comptables.fr/sites/default/files/assets/files/COMMENT%20UTILISER%20CHATGPT%20-%20A4_p%C3%A0p.pdf) et le livre blanc de l'Ordre de Paris demande que toute production d'IA soit [relue et vérifiée](https://www.oec-paris.fr/wp-content/uploads/2025/09/livre-blanc_IA-et-data.pdf) avant d'être communiquée. Une erreur reste celle du cabinet, quel que soit l'outil qui l'a produite. Rien ne part donc de l'agent sans relecture.

### Faire la vigilance anti-blanchiment à votre place

L'agent peut aider à rassembler les pièces d'identification d'un client. La vigilance et la décision de déclarer un soupçon à Tracfin restent en revanche des obligations du professionnel et il est interdit d'en révéler l'existence au client. Je préfère donc sortir ces dossiers du périmètre de l'agent dès l'audit et la même règle vaut dans [une étude notariale](/metiers/notaire).

### Se prendre pour une plateforme de facturation électronique

Depuis le 1er septembre 2026 toutes les entreprises concernées doivent pouvoir recevoir leurs factures électroniques [par une plateforme agréée](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf). Un agent IA n'en est pas une. Il peut préparer et trier, mais la réception et l'émission au sens de la réforme passent par la plateforme choisie. Le côté client de cette chaîne est décrit sur la page des [consultants indépendants](/metiers/consultant).

### Se faire passer pour un humain

Le règlement européen sur l'IA [est devenu applicable le 2 août 2026](https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai) et son [article 50](https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-50) demande que toute personne qui échange avec une IA en soit informée. Quand l'agent répond à un client, il se présente toujours comme l'assistant du cabinet.

## Comment ça se passe ?

Tout commence par un audit gratuit pendant lequel on regarde ensemble où filent les heures du cabinet et quelles données l'agent aurait besoin de toucher. C'est à ce moment qu'on choisit le montage technique, en partant des recommandations de l'Ordre et du niveau de souveraineté que vous visez.

Je construis ensuite l'agent sur les outils que vous utilisez déjà. Son prix dépend des tâches confiées et se fixe après l'audit. Le premier mois est gratuit et sans engagement.

Pour savoir par quelle tâche commencer dans votre cabinet, [Nate vous répond en deux minutes](/agents?chat=1&metier=expert-comptable).
