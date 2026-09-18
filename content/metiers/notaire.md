---
titre: "Agent IA pour notaire : usages, secret et données"
description: "Ce qu'un agent IA prend en charge dans une étude notariale, ce que disent les règles du notariat et comment garder la main sur les données de vos clients."
h1: "Un agent IA pour votre étude notariale"
date: 2026-08-26
mot_cle: "ia notaire"
mots_cles: ["agent IA notaire", "secret professionnel", "pièces de dossier", "relances clients", "hébergement des données"]
---
Un agent IA pour notaire est un assistant logiciel qui trie les mails de l'étude, relance les pièces manquantes, cale les rendez-vous de signature et prépare des récapitulatifs de dossier que le notaire vérifie. Il prépare le travail et ne touche ni à la rédaction des actes ni au conseil, qui restent l'affaire du notaire.

Reste la question que tout notaire pose avant les autres : que deviennent les données de ses clients ? Le notariat a lui-même tranché une partie du débat cet été et un chapitre entier de cette page y est consacré.

<div class="encadre">
<p><strong>En bref</strong></p>
<p>Un agent IA relance les pièces manquantes, cale les signatures et prépare les récapitulatifs de dossier. La rédaction des actes et le conseil restent au notaire.</p>
<p>Pour le secret, le modèle d'IA et l'endroit où il tourne comptent davantage que l'agent. Le Conseil supérieur du notariat a retenu en juillet 2026 le français Mistral AI hébergé chez Scaleway, sans interdire d'autres outils conformes à sa charte.</p>
</div>

## Qu'est-ce qui mange la semaine d'un notaire ?

Un dossier de vente ou de succession ressemble souvent à un puzzle dont les pièces arrivent au compte-gouttes. Le diagnostic manque encore, un héritier n'a pas renvoyé son livret de famille et la banque promet l'offre de prêt « pour la fin de semaine » depuis dix jours.

Pendant ce temps la boîte de l'étude se remplit de questions sur l'avancement des dossiers, les agendas de trois associés doivent s'accorder pour une signature et les factures d'honoraires du mois attendent d'être préparées. Chacune de ces tâches paraît minuscule mais leur somme occupe des journées entières de collaborateurs qualifiés.

## Que fait un agent IA dans une étude notariale ?

Imaginez un clerc infatigable dont le seul métier serait de courir après les pièces et de tenir les agendas. L'agent ne rédige pas l'acte, mais il fait en sorte que le dossier soit complet le jour où vous vous asseyez pour le rédiger. Si le mot « agent » vous paraît flou, j'ai écrit une [explication simple de ce qu'est un agent IA](/blog/agent-ia-definition).

- **Le point du matin.** À 8 h l'agent vous envoie les mails de la nuit et les échéances des dossiers de la semaine.
- **Les pièces manquantes.** Il tient pour chaque dossier la liste de ce qui est arrivé et de ce qui manque, puis prépare les relances que vous validez.
- **Les rendez-vous de signature.** Il propose des créneaux qui ne se heurtent à l'agenda d'aucun associé et envoie les confirmations.
- **Les récapitulatifs.** À partir des pièces reçues il prépare une fiche de synthèse du dossier que vous contrôlez avant d'en tirer quoi que ce soit.
- **Les factures d'honoraires.** Il les prépare à la fin du mois et les dépose dans votre outil de facturation.

<figure>
<div class="message">
<div class="expediteur"><span>Assistant de l'étude</span><span>8:00</span></div>
<div class="ligne"><strong>Bonjour. Voici votre mardi.</strong></div>
<div class="ligne">Dossier 24-312 : 4 pièces reçues sur 7. Il manque le diagnostic, l'offre de prêt et un justificatif d'identité. Relances prêtes.</div>
<div class="ligne">Signature du dossier 24-298 : jeudi 10 h ou vendredi 15 h, les deux créneaux sont libres pour les associés.</div>
<div class="ligne">6 mails de clients sur l'avancement de leur dossier. Réponses préparées.</div>
<div class="actions"><span>Valider les relances</span><span>Choisir le créneau</span></div>
</div>
<figcaption>Exemple de point du matin. Les dossiers sont désignés par leur numéro et les chiffres sont fictifs.</figcaption>
</figure>

## Secret de l'étude : où vont les données de vos clients ?

Pour savoir où partent les données, il faut d'abord séparer deux pièces que l'on confond souvent. L'agent est le programme qui lit vos mails, range les documents et prépare les brouillons. Pour comprendre un texte ou en écrire un, il interroge un modèle d'IA qui tourne quelque part sur un serveur, un peu comme un collaborateur qui passerait un coup de fil à un expert extérieur. Le sort de vos données dépend de ce modèle et de l'endroit où il tourne bien plus que de l'agent lui-même.

### Ce que disent les règles du notariat

Le secret du notaire couvre [tout ce qui a été porté à sa connaissance](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000049060714) dans l'exercice de ses fonctions et les règles professionnelles lui demandent d'y astreindre ses collaborateurs comme ses prestataires. Un outil d'IA est un prestataire comme un autre. Un membre du CSN le résumait sans détour en août 2026 dans [Les Petites Affiches](https://www.petitesaffiches.fr/actualites,069/droit,044/le-notariat-mise-sur-une-ia,44669.html) : « Si je mets un projet d'acte sur un outil d'IA grand public, je viole mes obligations de secret professionnel. »

Le Conseil supérieur du notariat a ensuite pris position en [choisissant Mistral AI](https://www.csn.notaires.fr/fr/actualites/intelligence-artificielle-le-conseil-superieur-du-notariat-choisit-mistral-ai-et) pour un partenariat de dix-huit mois avec un hébergement chez le français Scaleway et une charte IA professionnelle. Les notaires restent libres d'utiliser d'autres outils à condition de respecter cette charte, dont le texte intégral n'est pas public.

### D'où vient le modèle et quel droit l'accompagne ?

Les modèles d'IA se rangent en trois grandes familles et chacune voyage avec le droit de son pays.

- **Les modèles américains.** Ce sont ceux d'OpenAI et d'Anthropic, de Google ou de Meta. Le [CLOUD Act](https://www.congress.gov/bill/115th-congress/house-bill/4943/text) de 2018 oblige une entreprise américaine à livrer sur réquisition les données qu'elle détient même quand elles sont stockées hors des États-Unis. Interrogé sous serment au Sénat en juin 2025, le directeur des affaires publiques et juridiques de Microsoft France a reconnu [ne pas pouvoir garantir](https://www.senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html) que les données des Français ne seraient jamais transmises.
- **Les modèles européens.** Le plus connu est celui de Mistral AI, une entreprise française qui [héberge par défaut les données dans l'Union européenne](https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data). C'est lui que le notariat a retenu pour la profession.
- **Les modèles chinois.** DeepSeek, Qwen chez Alibaba et Kimi chez Moonshot AI en sont les têtes d'affiche. Utilisé en direct, DeepSeek [stocke les données en Chine](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) et l'autorité italienne de protection des données a [ordonné en urgence la limitation](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450) du traitement des données de ses utilisateurs italiens dès janvier 2025.

Une subtilité change pourtant la donne. Le droit qui s'applique dépend moins du pays qui a conçu le modèle que de l'entreprise qui le fait tourner et garde les données. Beaucoup de modèles sont publiés « à poids ouverts » et on peut alors les télécharger pour les installer sur son propre serveur. Un modèle chinois ou américain installé sur une machine française que vous contrôlez n'envoie rien à son éditeur.

### Où le modèle tourne-t-il ?

Choisir où tourne le modèle ressemble beaucoup au choix d'un endroit pour ranger des archives sensibles. On peut les confier au coffre d'une banque étrangère ou à l'agence française de cette même banque. On peut aussi préférer un coffre français agréé par l'État ou l'armoire fermée à clé de son propre bureau.

- **Le coffre étranger : l'API du fournisseur.** Vous appelez directement le modèle chez OpenAI, Anthropic ou Google. Vous profitez des modèles les plus puissants du marché et le CLOUD Act s'applique pleinement.
- **L'agence locale : un cloud américain installé en Europe.** Microsoft propose par exemple de [traiter les requêtes dans l'Union européenne](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy) sans les utiliser pour l'entraînement. Amazon a ouvert en janvier 2026 un [cloud européen](https://aws.amazon.com/blogs/aws/opening-the-aws-european-sovereign-cloud) géré par des sociétés de droit allemand. L'opérateur reste pourtant rattaché à un groupe américain et aucun juge n'a encore dit si le CLOUD Act l'atteint.
- **Le coffre agréé : un cloud qualifié SecNumCloud.** Cette qualification délivrée par l'ANSSI exige que le prestataire soit [soumis exclusivement au droit européen](https://cyber.gouv.fr/enjeux-technologiques/cloud/faq-qualification-secnumcloud/) et que les données restent dans l'Union. L'ANSSI la présente comme une protection face à une possible injonction étrangère et [Outscale](https://en.outscale.com/llmaas-by-outscale/) propose déjà des modèles de Mistral sur une telle infrastructure.
- **L'armoire du bureau : un modèle installé chez vous.** Un modèle à poids ouverts tourne alors sur un serveur de l'étude ou sur un serveur dédié chez un hébergeur français. La [CNIL recommande](https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative) justement de privilégier ce déploiement « sur site » pour des données sensibles et [Mistral Small 3.1](https://mistral.ai/news/mistral-small-3-1/) tient par exemple sur une seule carte graphique haut de gamme.

L'armoire a ses propres contraintes. Les modèles qui tiennent sur une machine de l'étude restent moins brillants que les plus gros modèles du marché sur les tâches complexes et le serveur réclame des mises à jour, des sauvegardes et une vraie surveillance. Tout le logiciel autour du modèle doit aussi jouer le jeu, puisqu'une messagerie ou une sauvegarde hébergée ailleurs suffit à faire sortir les données par une autre porte. Les licences méritent enfin un coup d'œil car celle de Llama 4 [exclut les entreprises établies dans l'Union](https://github.com/meta-llama/llama-models/blob/main/models/llama4/LICENSE) pour ses modèles multimodaux.

### Vos données servent-elles à entraîner le modèle ?

C'est la crainte qui revient le plus souvent et la réponse dépend moins du fournisseur que de l'offre souscrite. Presque tous les grands acteurs appliquent en effet deux régimes bien distincts.

- **Les comptes grand public, gratuits ou payants.** Chez OpenAI les conversations de ChatGPT Free, Plus et Pro [servent à l'entraînement par défaut](https://help.openai.com/en/articles/8983130-what-if-i-want-to-keep-my-history-on-but-disable-model-training) tant que l'utilisateur ne l'a pas désactivé. L'assistant de Mistral [fonctionne de la même manière](https://help.mistral.ai/en/articles/347617-do-you-use-my-user-data-to-train-your-artificial-intelligence-models) tandis qu'Anthropic [laisse le choix](https://www.anthropic.com/news/updates-to-our-consumer-terms) depuis 2025 et conserve cinq ans les conversations de ceux qui acceptent.
- **Les offres professionnelles et les API.** OpenAI [n'entraîne pas ses modèles](https://developers.openai.com/api/docs/guides/your-data) sur les données envoyées à son API depuis 2023 et Anthropic applique la même règle à ses offres commerciales. Chez Google les règles de l'API payante [valent pour tous les utilisateurs européens](https://ai.google.dev/gemini-api/terms) même sur le quota gratuit. Chez Mistral la [documentation de l'API payante](https://help.mistral.ai/en/articles/455207-can-i-opt-out-of-my-input-or-output-data-being-used-for-training) reste ambiguë et le réglage mérite une vérification dans la console.

Pas d'entraînement ne veut pas dire pour autant zéro conservation. OpenAI et Anthropic gardent par défaut les échanges de leurs API jusqu'à trente jours pour détecter les abus. L'option « zéro rétention » existe mais s'obtient sur accord et Anthropic conserve malgré tout trente jours les échanges avec [ses modèles les plus avancés](https://privacy.claude.com/en/articles/15425996-data-retention-practices-for-covered-models) depuis juin 2026. Un juge peut aussi s'en mêler puisqu'en 2025 le procès intenté par le New York Times a [obligé OpenAI à conserver](https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html) pendant plusieurs mois les journaux de ChatGPT et de son API.

Ma règle pratique tient donc en une phrase : un compte grand public n'a rien à faire dans une étude, qu'il soit gratuit ou payant.

### Les montages qui tiennent la route

Du plus fermé au plus ouvert, cinq montages reviennent dans la pratique et chacun a son prix.

<figure>

| Montage | Où vont les données | Ce qu'il faut accepter |
|---|---|---|
| Modèle ouvert sur un serveur de l'étude ou chez un hébergeur français | Nulle part ailleurs | Un modèle moins puissant et un serveur à entretenir |
| Modèle ouvert en service chez un opérateur qualifié SecNumCloud | Chez un opérateur soumis au seul droit européen | Un choix de modèles plus restreint |
| Modèle européen par API avec hébergement dans l'Union | Chez Mistral, dans l'Union par défaut | Des sous-traitants possibles hors de l'Union et des réglages à vérifier |
| Modèle américain dans un cloud américain installé en Europe | En Europe, chez un opérateur rattaché à un groupe américain | Une exposition au CLOUD Act qui n'est pas levée |
| Modèle américain par l'offre professionnelle du fournisseur | Chez le fournisseur, trente jours par défaut | Le CLOUD Act et une conservation courte mais réelle |

<figcaption>Les cinq montages, du plus souverain au moins souverain. Les comptes grand public et le service en ligne de DeepSeek sont à exclure pour des données de clients.</figcaption>
</figure>

Deux précisions évitent les mauvaises surprises. La première concerne la pseudonymisation qui remplace les noms par des codes avant l'envoi au modèle. La CNIL rappelle que des données pseudonymisées [restent des données personnelles](https://www.cnil.fr/fr/lanonymisation-de-donnees-personnelles) et le secret couvre de toute façon tout ce qui a été porté à la connaissance du notaire bien au-delà des noms. La seconde concerne le contrat, puisque le RGPD impose un [contrat de sous-traitance](https://www.cnil.fr/fr/rgpd-et-professionnels-de-sante-liberaux-ce-que-vous-devez-savoir) avec chaque prestataire qui touche aux données et que la CNIL recommande d'y interdire noir sur blanc toute réutilisation par le fournisseur.

Le bon montage dépend enfin de ce que l'agent touche réellement. Un agent qui cale des rendez-vous de signature manipule bien moins d'informations sensibles qu'un agent qui prépare le récapitulatif d'une succession. Rien n'empêche donc de réserver le montage le plus fermé aux tâches qui ouvrent le fond des dossiers. Je choisis le montage avec vous à l'audit et j'annonce chaque compromis avant de construire.

## Ce qu'un agent IA ne doit pas faire à votre place

### Rédiger l'acte ou conseiller le client

Les règles professionnelles sont nettes : le notaire [ne peut sous-traiter](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000049060714) ni la rédaction de ses actes, ni leur réception, ni le conseil. Je ne construis donc aucun agent qui rédige un acte. L'agent prépare les pièces et les synthèses mais la plume reste la vôtre. Le guide publié par l'Institut d'études juridiques du CSN en décembre 2025 parle d'une [responsabilité « pleine et entière »](https://www.csn.notaires.fr/fr/actualites/introduction-lintelligence-artificielle-le-nouveau-guide-juridique-de-liej) de l'acte notarié.

### Toucher aux dossiers de lutte contre le blanchiment

Il est interdit de révéler à un client [l'existence d'une déclaration de soupçon](https://www.economie.gouv.fr/tracfin/la-confidentialite-de-la-declaration-de-soupcon) adressée à Tracfin. Un assistant qui prépare des réponses aux clients n'a donc rien à faire dans ces dossiers et ils sortent de son périmètre dès l'audit. La même prudence vaut pour [un cabinet d'expertise comptable](/metiers/expert-comptable).

### Répondre seul aux clients

Un brouillon relu puis envoyé par l'étude reste un courrier de l'étude. Un robot qui converse directement avec vos clients pose une autre question de secret et de responsabilité et [la page des avocats](/metiers/avocat) explique comment le CNB l'a traitée. Par défaut je préfère que l'agent prépare et que l'étude envoie.

### Se faire passer pour un humain

Le règlement européen sur l'IA [est devenu applicable le 2 août 2026](https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai) et son [article 50](https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-50) demande que toute personne qui échange avec une IA en soit informée. Si l'agent répond un jour à un premier contact, il se présente comme l'assistant de l'étude.

## Comment ça se passe ?

Tout commence par un audit gratuit pendant lequel on regarde ensemble où filent les heures de l'étude et quelles données l'agent aurait besoin de toucher. C'est à ce moment qu'on choisit le montage technique, en partant de la charte du notariat et du niveau de souveraineté que vous visez.

Je construis ensuite l'agent sur les outils que vous utilisez déjà. Son prix dépend de ce qu'il fait et se fixe après l'audit. Le premier mois est gratuit et sans engagement.

Si vous voulez savoir ce qu'un agent prendrait en charge dans votre étude, [Nate vous répond en deux minutes](/agents?chat=1&metier=notaire).
