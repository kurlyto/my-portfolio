export const AGENTS = [
  {
    slug: "camille",
    name: "Camille",
    title: "Secrétaire",
    shortDescription:
      "Camille gère vos mails et votre agenda comme une vraie assistante. Elle fait le point sur votre semaine, répond aux questions courantes et garde tout bien rangé.",
    longDescription:
      "Camille gère vos mails et votre agenda comme une vraie assistante. Elle fait le point sur votre semaine, répond aux questions courantes et garde tout bien rangé.",
    useCase:
      "Vous lui demandez simplement \"qu'est-ce qui m'attend cette semaine ?\" et Camille répond avec un résumé clair de vos rendez-vous et tâches en cours.",
    tools: ["Gmail", "Google Calendar", "Google Sheets", "Telegram"],
    format: "Synthèse quotidienne",
    channel: "Telegram",
  },
  {
    slug: "ousmane",
    name: "Ousmane",
    title: "Prospection",
    shortDescription:
      "Ousmane prospecte pour vous, chaque jour. Il repère les entreprises qui collent à votre profil idéal, récupère leurs coordonnées et remplit votre liste de prospects tout seul.",
    longDescription:
      "Ousmane prospecte pour vous, chaque jour. Il repère les entreprises qui collent à votre profil idéal, récupère leurs coordonnées et remplit votre liste de prospects tout seul.",
    useCase:
      "Plutôt que de chercher des prospects à la main, vous retrouvez chaque matin une nouvelle liste de contacts qualifiés, prête à démarcher.",
    tools: ["Google Sheets", "Recherche web"],
    format: "Liste de prospects",
    channel: "Google Sheets",
  },
  {
    slug: "kylian",
    name: "Kylian",
    title: "Pilotage",
    shortDescription:
      "Kylian surveille les chiffres qui comptent pour vous : ventes, délais, taux de conversion, trafic. Il repère les tendances avant tout le monde et propose de vraies pistes d'amélioration.",
    longDescription:
      "Kylian surveille les chiffres qui comptent pour vous : ventes, délais, taux de conversion, trafic. Il repère les tendances avant tout le monde et propose de vraies pistes d'amélioration.",
    useCase:
      "Une baisse de conversion sur une semaine ? Kylian la détecte et propose une hypothèse sur la cause, avant même que vous l'ayez remarquée.",
    tools: ["Base de données", "Google Analytics", "Gmail"],
    format: "Tableau de bord + rapport",
    channel: "Gmail",
  },
  {
    slug: "lea",
    name: "Lea",
    title: "Réseaux",
    shortDescription:
      "Lea construit votre présence sur les réseaux : elle rédige vos posts, crée les visuels sur Canva et vous les soumet prêts à publier. Vous gardez toujours la main : elle prépare, vous validez.",
    longDescription:
      "Lea construit votre présence sur les réseaux : elle rédige vos posts, crée les visuels sur Canva et vous les soumet prêts à publier. Vous gardez toujours la main : elle prépare, vous validez.",
    useCase:
      "Chaque lundi, vous recevez 5 propositions de posts déjà rédigées et illustrées, il ne reste qu'à choisir et publier.",
    tools: ["LinkedIn", "Canva", "Gmail"],
    format: "Propositions de posts",
    channel: "Gmail",
  },
  {
    slug: "mike",
    name: "Mike",
    title: "Nouveautés",
    shortDescription:
      "Mike surveille votre produit et vous résume chaque jour ce qui a changé, dans un langage clair, sans jargon technique.",
    longDescription:
      "Mike surveille votre produit et vous résume chaque jour ce qui a changé, dans un langage clair, sans jargon technique.",
    useCase:
      "Plutôt que de lire les journaux de code, vous recevez chaque jour un résumé compréhensible de ce qui a changé et pourquoi ça vous concerne.",
    tools: ["Code source", "Gmail"],
    format: "Résumé quotidien",
    channel: "Gmail",
  },
  {
    slug: "hugo",
    name: "Hugo",
    title: "Veille",
    shortDescription:
      "Hugo scrute en continu ce qui bouge dans votre secteur : nouveaux concurrents, changements de réglementation, tendances du marché. Il vous sort l'essentiel sans que vous ayez à chercher.",
    longDescription:
      "Hugo scrute en continu ce qui bouge dans votre secteur : nouveaux concurrents, changements de réglementation, tendances du marché. Il vous sort l'essentiel sans que vous ayez à chercher.",
    useCase:
      "Un concurrent sort une nouveauté ou une loi change dans votre domaine ? Hugo vous prévient le jour même, avec le contexte utile.",
    tools: ["Recherche web", "Gmail"],
    format: "Synthèse de veille",
    channel: "Gmail",
  },
  {
    slug: "marcel",
    name: "Marcel",
    title: "Surveillance",
    shortDescription:
      "Marcel veille sur la santé de votre infrastructure : charge, espace disque, sauvegardes, certificats de sécurité. Il vous prévient avant que le problème devienne visible pour vos clients.",
    longDescription:
      "Marcel veille sur la santé de votre infrastructure : charge, espace disque, sauvegardes, certificats de sécurité. Il vous prévient avant que le problème devienne visible pour vos clients.",
    useCase:
      "Un disque qui se remplit dangereusement ? Marcel alerte par email plusieurs heures avant que le service ne tombe en panne.",
    tools: ["Serveurs (VPS)", "Gmail", "Sauvegardes automatiques"],
    format: "Alertes + rapport d'état",
    channel: "Gmail",
  },
  {
    slug: "ride",
    name: "Ride",
    title: "Voyages",
    shortDescription:
      "Ride compare train, avion, voiture et bus pour votre trajet, et vous sort une synthèse claire des meilleures options, prix et durées inclus.",
    longDescription:
      "Ride compare train, avion, voiture et bus pour votre trajet, et vous sort une synthèse claire des meilleures options, prix et durées inclus.",
    useCase:
      "Vous indiquez juste le départ et l'arrivée, Ride renvoie un comparatif complet des options possibles, sans avoir à ouvrir dix sites différents.",
    tools: ["Telegram", "SNCF", "Comparateurs de vols"],
    format: "Synthèse comparative",
    channel: "Telegram",
  },
  {
    slug: "soul",
    name: "Soul",
    title: "Sorties",
    shortDescription:
      "Soul connaît votre ville comme sa poche. Il est au courant de tous les bons plans, sait où trouver les informations, même les soirées et évènements bien discrets.",
    longDescription:
      "Soul connaît votre ville comme sa poche. Il est au courant de tous les bons plans, sait où trouver les informations, même les soirées et évènements bien discrets.",
    useCase:
      "Vous écrivez \"un bar sympa ce soir\" ou \"un truc culturel ce week-end\", Soul répond avec des propositions concrètes et à jour.",
    tools: ["Telegram", "Recherche web"],
    format: "Réponse conversationnelle",
    channel: "Telegram",
  },
  {
    slug: "nate",
    name: "Nate",
    title: "Boîte mail",
    shortDescription:
      "Nate lit et résume vos mails, prépare des brouillons de réponses, et gère votre agenda. Il n'envoie et ne supprime jamais rien sans votre feu vert.",
    longDescription:
      "Nate lit et résume vos mails, prépare des brouillons de réponses, et gère votre agenda. Il n'envoie et ne supprime jamais rien sans votre feu vert.",
    useCase:
      "Le matin, vous recevez un résumé de ce qui est arrivé pendant la nuit, avec les mails importants déjà triés du reste.",
    tools: ["Gmail", "Google Calendar", "Telegram"],
    format: "Synthèse quotidienne + brouillons",
    channel: "Telegram",
  },
  {
    slug: "jensen",
    name: "Jensen",
    title: "Contenu",
    shortDescription:
      "Jensen rédige vos publications prêtes à poster, dans votre ton et votre style. Il vous suggère aussi des réponses aux messages que vous recevez.",
    longDescription:
      "Jensen rédige vos publications prêtes à poster, dans votre ton et votre style. Il vous suggère aussi des réponses aux messages que vous recevez.",
    useCase:
      "Vous demandez \"5 idées de posts sur l'actualité de mon secteur\" et Jensen les rédige directement, prêtes à copier-coller.",
    tools: ["X", "Telegram", "Recherche web"],
    format: "Propositions de textes",
    channel: "Telegram",
  },
  {
    slug: "didier",
    name: "Didier",
    title: "Supervision",
    shortDescription:
      "Didier supervise toute l'équipe d'agents : il agrège leurs rapports, repère si l'un d'eux a rencontré un problème, et devient votre point d'entrée unique pour savoir où en sont toutes les tâches automatisées.",
    longDescription:
      "Didier supervise toute l'équipe d'agents : il agrège leurs rapports, repère si l'un d'eux a rencontré un problème, et devient votre point d'entrée unique pour savoir où en sont toutes les tâches automatisées.",
    useCase:
      "Chaque matin, il fait le point sur ce qui a tourné dans la nuit et signale immédiatement ce qui a échoué, sans attendre qu'on le lui demande.",
    tools: ["Gmail"],
    format: "Rapport de supervision",
    channel: "Gmail",
  },
  {
    slug: "simone",
    name: "Simone",
    title: "Débogage",
    shortDescription:
      "Simone traque les erreurs qui surviennent en production, lit le code pour remonter jusqu'à la vraie cause, et rédige un correctif prêt à être validé.",
    longDescription:
      "Simone traque les erreurs qui surviennent en production, lit le code pour remonter jusqu'à la vraie cause, et rédige un correctif prêt à être validé.",
    useCase:
      "Un client signale un bug ? Simone a déjà identifié la ligne de code fautive et propose une correction avant même qu'un développeur ne s'en occupe.",
    tools: ["Logs serveur", "Code source", "Gmail"],
    format: "Rapport de diagnostic",
    channel: "Gmail",
  },
  {
    slug: "jo",
    name: "Jo",
    title: "Relecture",
    shortDescription:
      "Jo relit chaque document avant son envoi : structure, champs obligatoires, cohérence des montants. Une relecture qui ne dort jamais et ne laisse rien passer.",
    longDescription:
      "Jo relit chaque document avant son envoi : structure, champs obligatoires, cohérence des montants. Une relecture qui ne dort jamais et ne laisse rien passer.",
    useCase:
      "Un document mal rempli qui aurait pu partir à un client ? Jo l'intercepte avant l'envoi et prévient de l'erreur à corriger.",
    tools: ["Documents PDF", "Gmail"],
    format: "Alerte + document annoté",
    channel: "Gmail",
  },
];
