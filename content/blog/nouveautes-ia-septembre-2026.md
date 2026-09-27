---
titre: "Les nouveautés de l'IA en septembre 2026"
description: "Quatre grands modèles sont sortis en trois jours ce mois-ci. Je fais le tri et je vous explique ce que j'ai changé chez moi."
date: 2026-10-01
format: actualite
grappe: actus
mot_cle: "actualite ia"
statut: brouillon
---
En septembre 2026, quatre grands modèles d'IA sont sortis en trois jours et un cinquième a fait le tour des réseaux avec des vidéos entièrement écrites en code. Le patron d'Anthropic a aussi demandé à toute l'industrie de ralentir. Microsoft et Salesforce ont aussi commencé à vendre des agents qui travaillent pendant que vous dormez. Pour une petite entreprise, la nouvelle la plus utile du mois est pourtant la plus discrète : le prix de ce qu'un agent relit a fondu.

Je fais ce tri tous les mois parce que je construis des agents pour des entreprises et que mon propre assistant tourne sur ces modèles du matin au soir. Je vous donne les faits avec leur source et ce que j'en ai fait chez moi.

## Quatre modèles en trois jours

Anthropic a ouvert le bal le 1er septembre avec son nouveau modèle [Claude Fable 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1). Il sort avec un jumeau nommé Mythos 5.1 qui est le même modèle avec moins de garde-fous, réservé à des équipes vérifiées qui travaillent sur la cybersécurité ou les sciences du vivant. Fable 5.1 est ouvert à tous et garde le prix de son prédécesseur.

Le lendemain, Meta a publié [Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3) avec un tarif en deux paliers assez parlant. Le palier le moins cher coûte presque rien parce que Meta se sert de vos données pour entraîner ses produits, et le palier qui les garde privées coûte environ douze fois plus. Google a sorti le même jour [Gemini 3.8 Flash](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/). Ce modèle rapide et bon marché garde son prix d'appel jusqu'au 31 décembre avant de doubler au 1er janvier.

OpenAI a fermé la marche le 3 septembre avec [GPT-6 Astra](https://openai.com/index/gpt-6-astra/), ouvert d'abord à quelques organisations puis aux abonnés payants de ChatGPT les jours suivants. [CNBC](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html) rappelle que la sortie avait été retardée après des attaques informatiques menées en juillet par des agents d'OpenAI que personne n'avait autorisées.

J'ai essayé les trois concurrents sur des tâches de mon quotidien et aucun ne m'a donné envie de quitter Claude, sur lequel tourne tout mon parc d'agents. Une migration coûte des jours de réglages et je ne la lance que pour un gain net. J'ai en revanche basculé sur Fable 5.1 dès sa sortie, pour une raison de coût que je détaille juste en dessous.

## Le prix qui compte est celui qu'on relit

Un agent relit tout son contexte à chaque échange, c'est-à-dire ses consignes, l'historique de la conversation et les documents qu'il a ouverts. Les fournisseurs gardent ce contexte en mémoire tampon (le « cache ») et le facturent moins cher qu'un texte neuf. Avec Fable 5.1, Anthropic a divisé par quatre le prix de ces relectures : il passe à 0,25 dollar le million de jetons contre 1 dollar avant. L'éditeur annonce une facture en baisse d'environ 25 % pour un usage courant et jusqu'à 45 % pour un usage très tourné vers les agents.

J'ai voulu savoir si ces chiffres tenaient chez moi et j'ai mesuré une semaine de travail de mes agents. Ils relisent **plus de cent fois plus de texte qu'ils n'en écrivent**, si bien que la baisse du prix des relectures pèse bien plus que celle des réponses. Je retiens la leçon au-delà de ce modèle précis : quand on compare deux IA pour un agent, le prix du cache compte plus que le prix affiché en gros sur la page.

La comparaison du mois l'illustre bien. GPT-6 Astra et Fable 5.1 affichent le même prix pour le texte lu et le texte écrit, alors que la relecture en cache coûte 1 dollar le million chez OpenAI et quatre fois moins chez Anthropic. Pour un agent qui travaille toute la journée, cet écart finit par peser lourd sur la facture.

## Opus 5.5 fait des films

Anthropic a sorti [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5) le 22 septembre. Sur la plupart des travaux, il se hisse au niveau de Fable 5.1 pour un prix nettement plus bas de 4 dollars le million de jetons lus et 20 dollars le million écrit. L'éditeur le dit aussi 30 % plus rapide que la version précédente.

Ce sont pourtant ses créations qui ont fait parler de lui. En quelques jours les réseaux se sont remplis de films d'animation, de jeux jouables dans le navigateur et de scènes en 3D qu'il a entièrement écrits en code. Certains ont même leur musique composée par le modèle. Un [recueil tenu sur GitHub](https://github.com/magiccreator-ai/awesome-claude-opus-5-5-demos) en rassemble déjà deux douzaines, du jeu de vélo sur la côte à l'explication animée du fonctionnement d'un navigateur.

Mon assistant tourne sur Opus 5.5 depuis le jour de sa sortie. Je lui ai fait fabriquer une vidéo de présentation de 21 secondes pour un de mes projets, entièrement en code, avec la voix et la musique posées ensuite. **Il a fallu plusieurs allers-retours** pour obtenir le bon rythme et j'y reviens en détail dans mon prochain article.

## Des agents avec un prénom

Le 11 septembre, Salesforce a présenté [une équipe de sept agents](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/) qui portent chacun un prénom et un métier. Casey répond aux clients par téléphone, SMS ou WhatsApp et Hunter relance les ventes qui risquent de capoter avant la fin du trimestre. Hunter peut suivre un objectif sur plusieurs semaines en décidant lui-même des tâches à faire et du moment où il doit demander l'accord d'un vendeur.

Microsoft a suivi le 25 septembre avec un [Copilot refondu](https://news.microsoft.com/source/emea/2026/09/new-microsoft-copilot-brings-home-code-and-autopilot-together/) dont l'onglet Autopilot crée un agent avec un nom, un rôle et un but. Il continue de travailler dans Microsoft 365 quand plus personne n'est devant l'écran. Autopilot n'est ouvert qu'en avant-première privée et aucun prix n'est annoncé.

Je trouve ce virage rassurant parce qu'il valide ce que je construis depuis des mois pour des structures beaucoup plus petites. Mes agents ont un prénom depuis le premier jour et chacun a son périmètre. Ces offres visent pour l'instant de grands comptes équipés de Salesforce ou de Microsoft 365, et il faudra attendre les prix pour savoir si un artisan ou un commerçant y aura accès.

## Faut-il ralentir l'IA ?

Le 12 septembre, le patron d'Anthropic Dario Amodei a publié un long texte intitulé [« We Must Pace the Frontier »](https://darioamodei.com/post/we-must-pace-the-frontier) où il demande aux laboratoires de ralentir la course aux modèles plus puissants. Il propose des évaluateurs indépendants installés à demeure chez chaque laboratoire et un organisme commun de normes sur le modèle du gendarme de la bourse américaine. Anthropic applique déjà la première mesure de son côté et Sam Altman, le patron d'OpenAI, s'est dit d'accord dans la foulée.

La réponse n'a pas tardé. Le 18 septembre, quatre consommateurs ont [attaqué en justice](https://news.bloomberglaw.com/litigation/openai-anthropic-google-spacexai-hit-with-antitrust-lawsuit) Anthropic, OpenAI, Google et SpaceXAI à San Francisco. Ils les accusent de s'entendre pour freiner des produits concurrents, ce que le droit américain de la concurrence interdit.

Je n'ai pas encore d'avis tranché sur le fond. Pour une petite entreprise, rien ne change dans l'immédiat parce que les modèles actuels restent disponibles et que ce débat porte sur les suivants.

## Mistral lève 3 milliards

Le 8 septembre, Mistral AI a annoncé une [levée de 3 milliards d'euros](https://www.franceinfo.fr/internet/intelligence-artificielle/la-start-up-francaise-mistral-annonce-une-nouvelle-levee-de-fonds-de-trois-milliards-d-euros-portant-sa-valorisation-a-plus-de-21-milliards-d-euros_8182583.html) qui porte sa valeur au-delà de 21 milliards. C'est la plus grosse levée jamais faite par une entreprise technologique européenne non cotée. Je la suis de près pour une raison concrète. Certains métiers comme les avocats, les notaires ou la santé me demandent un modèle hébergé en Europe et soumis au droit européen, et Mistral est aujourd'hui l'alternative la plus solide pour eux.

## Ce que j'ai changé chez moi

Mon agent le plus gourmand est passé sur Fable 5.1 le jour où j'ai compris que le cache pesait l'essentiel de sa facture. Le changement a pris plus de temps que prévu parce que le nom du modèle était écrit à plusieurs endroits de son code et que l'agent retombait sur l'ancien selon le chemin par lequel on l'appelait.

J'ai aussi mesuré le niveau de réflexion qu'on peut demander à ces modèles. Sur une vraie tâche de raisonnement, l'effort le plus bas a coûté deux fois moins cher et répondu plus de trois fois plus vite avec la même réponse juste. Sur une question courte, le réglage ne change rien au prix. Mon assistant a désormais un bouton à côté de la zone de saisie pour choisir le modèle et l'effort selon la tâche.

Le reste du mois est passé sur la chaîne qui transforme mes réunions en tâches faites, que je raconte dans [un article dédié](/blog/reunion-taches-ia-notion).

## Ce que je ferais à votre place

Si vous payez déjà un outil d'IA, demandez à votre fournisseur quel modèle tourne derrière et s'il a répercuté la baisse du cache de septembre. Si vous hésitez entre deux offres d'agents, comparez le coût d'une journée de travail plutôt que le prix au million affiché en tête de page. Et si vous voulez savoir ce qu'un assistant comme [Foxy](/) prendrait en charge chez vous, je vous réponds volontiers.
