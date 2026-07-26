export const AGENTS = [
  {
    slug: "didier",
    name: "Didier",
    title: "Chef d'équipe",
    shortDescription: "Coordonne tous les agents et vérifie que tout tourne bien.",
    longDescription:
      "Didier supervise l'ensemble des agents : il agrège leurs rapports, repère si l'un d'eux a rencontré un problème, et sert de point d'entrée unique pour savoir où en sont toutes les tâches automatisées.",
    useCase:
      "Chaque matin, il fait le point sur ce qui a tourné dans la nuit et signale immédiatement ce qui a échoué, sans attendre qu'on le lui demande.",
    tools: ["Chat interne", "Rapports des autres agents"],
    format: "Rapport de supervision",
    channel: "Chat interne",
  },
  {
    slug: "marcel",
    name: "Marcel",
    title: "Agent surveillance serveurs",
    shortDescription: "Surveille vos serveurs en continu et alerte avant la panne.",
    longDescription:
      "Marcel garde un œil permanent sur la santé technique de votre infrastructure : charge, espace disque, sauvegardes, certificats de sécurité. Il prévient avant que le problème ne devienne visible pour vos clients.",
    useCase:
      "Un disque qui se remplit dangereusement ? Marcel alerte par email plusieurs heures avant que le service ne tombe en panne.",
    tools: ["Serveurs (VPS)", "Email", "Sauvegardes automatiques"],
    format: "Alertes + rapport d'état",
    channel: "Email",
  },
  {
    slug: "simone",
    name: "Simone",
    title: "Agent détective de bugs",
    shortDescription: "Trouve pourquoi un bug arrive et propose la solution.",
    longDescription:
      "Simone analyse les erreurs qui surviennent en production, lit le code pour remonter jusqu'à la cause réelle, et rédige un correctif prêt à être validé par un humain.",
    useCase:
      "Un client signale un bug ? Simone a déjà identifié la ligne de code fautive et propose une correction avant même qu'un développeur ne s'en occupe.",
    tools: ["Logs serveur", "Code source", "Email"],
    format: "Rapport de diagnostic",
    channel: "Email",
  },
  {
    slug: "hugo",
    name: "Hugo",
    title: "Agent veille",
    shortDescription: "Surveille l'actualité de votre secteur pour vous.",
    longDescription:
      "Hugo suit en continu ce qui se passe dans votre secteur : nouveaux concurrents, changements de réglementation, tendances du marché. Il synthétise l'essentiel sans que vous ayez à chercher.",
    useCase:
      "Un concurrent sort une nouveauté ou une loi change dans votre domaine ? Hugo vous en informe le jour même, avec le contexte utile.",
    tools: ["Recherche web", "Email"],
    format: "Synthèse de veille",
    channel: "Email",
  },
  {
    slug: "kylian",
    name: "Kylian",
    title: "Agent chiffres",
    shortDescription: "Suit vos indicateurs clés et repère les tendances.",
    longDescription:
      "Kylian analyse en continu les chiffres qui comptent pour votre activité : ventes, délais, taux de conversion, trafic. Il détecte les tendances et propose des pistes concrètes d'amélioration.",
    useCase:
      "Une baisse de conversion sur une semaine ? Kylian la détecte et propose une hypothèse sur la cause, avant que vous ne l'ayez remarqué.",
    tools: ["Base de données", "Google Analytics", "Email"],
    format: "Tableau de bord + rapport",
    channel: "Email",
  },
  {
    slug: "ousmane",
    name: "Ousmane",
    title: "Agent prospection",
    shortDescription: "Trouve de nouveaux clients potentiels, tous les jours.",
    longDescription:
      "Ousmane recherche de nouvelles entreprises correspondant à votre client idéal, extrait leurs coordonnées, et alimente votre liste de prospects automatiquement, jour après jour.",
    useCase:
      "Plutôt que de chercher des prospects à la main, vous retrouvez chaque matin une nouvelle liste de contacts qualifiés, prête à démarcher.",
    tools: ["Google Sheets", "Recherche web"],
    format: "Liste de prospects",
    channel: "Google Sheets",
  },
  {
    slug: "camille",
    name: "Camille",
    title: "Agent secrétaire",
    shortDescription: "Gère les mails et l'agenda comme une vraie assistante.",
    longDescription:
      "Camille prend en charge les mails et l'agenda au quotidien : elle fait la synthèse de la semaine, répond aux questions courantes et garde tout organisé, en langage naturel.",
    useCase:
      "Vous demandez simplement \"qu'est-ce qui m'attend cette semaine ?\" et Camille répond avec un résumé clair de vos rendez-vous et tâches en cours.",
    tools: ["Email", "Agenda", "Telegram"],
    format: "Synthèse quotidienne",
    channel: "Telegram",
  },
  {
    slug: "jo",
    name: "Jo",
    title: "Agent contrôle qualité",
    shortDescription: "Relit chaque document avant qu'il ne parte.",
    longDescription:
      "Jo vérifie chaque document généré avant son envoi : structure, champs obligatoires, cohérence des montants. Une relecture automatique qui ne dort jamais et ne laisse rien passer.",
    useCase:
      "Un document mal rempli qui aurait pu partir à un client ? Jo l'intercepte avant l'envoi et prévient de l'erreur à corriger.",
    tools: ["Documents PDF", "Email"],
    format: "Alerte + document annoté",
    channel: "Email",
  },
  {
    slug: "mike",
    name: "Mike",
    title: "Agent des nouveautés",
    shortDescription: "Résume les nouveautés du produit en langage simple.",
    longDescription:
      "Mike résume chaque jour ce qui a été ajouté ou amélioré, en traduisant le tout en langage clair et utile, sans jargon technique.",
    useCase:
      "Plutôt que de lire les journaux de code, vous recevez chaque jour un résumé compréhensible de ce qui a changé et pourquoi ça vous concerne.",
    tools: ["Code source", "Email"],
    format: "Résumé quotidien",
    channel: "Email",
  },
  {
    slug: "lea",
    name: "Lea",
    title: "Agent réseaux sociaux",
    shortDescription: "Propose des publications prêtes à poster chaque semaine.",
    longDescription:
      "Lea propose chaque semaine des idées de publications pour vos réseaux, rédigées et prêtes à relire. Vous gardez toujours la main : elle prépare, vous validez.",
    useCase:
      "Chaque lundi, vous recevez 5 propositions de posts déjà rédigées, il ne reste qu'à choisir et publier.",
    tools: ["LinkedIn", "Email"],
    format: "Propositions de posts",
    channel: "Email",
  },
  {
    slug: "soul",
    name: "Soul",
    title: "Agent sorties",
    shortDescription: "Trouve une sortie ou un événement en une phrase.",
    longDescription:
      "Soul trouve des sorties et événements par ville sur simple demande, en langage naturel, sans menu ni formulaire à remplir.",
    useCase:
      "Vous écrivez \"un bar sympa ce soir\" ou \"un truc culturel ce week-end\", Soul répond avec des propositions concrètes et à jour.",
    tools: ["Telegram", "Recherche web"],
    format: "Réponse conversationnelle",
    channel: "Telegram",
  },
  {
    slug: "nate",
    name: "Nate",
    title: "Agent mails et agenda",
    shortDescription: "Gère mails et agenda au quotidien, sans jamais agir seul.",
    longDescription:
      "Nate lit et résume les mails, prépare des brouillons de réponses, et gère l'agenda. Il n'envoie et ne supprime jamais rien sans validation explicite, pour garder le contrôle total.",
    useCase:
      "Le matin, vous recevez un résumé de ce qui est arrivé pendant la nuit, avec les mails importants déjà triés du reste.",
    tools: ["Gmail", "Google Calendar", "Telegram"],
    format: "Synthèse quotidienne + brouillons",
    channel: "Telegram",
  },
  {
    slug: "jenseng",
    name: "Jenseng",
    title: "Agent contenu",
    shortDescription: "Génère des idées de publications dans votre style.",
    longDescription:
      "Jenseng propose des publications prêtes à poster, écrites dans le ton et le style propres à chacun. Il peut aussi suggérer des réponses à des messages reçus.",
    useCase:
      "Vous demandez \"5 idées de posts sur l'actualité de mon secteur\" et Jenseng les rédige directement, prêtes à copier-coller.",
    tools: ["Telegram", "Recherche web"],
    format: "Propositions de textes",
    channel: "Telegram",
  },
  {
    slug: "ride",
    name: "Ride",
    title: "Agent voyages",
    shortDescription: "Compare tous les moyens de transport pour un trajet.",
    longDescription:
      "Ride compare train, avion, voiture et bus pour un trajet donné, et renvoie une synthèse claire des meilleures options, avec prix et durées.",
    useCase:
      "Vous indiquez juste le départ et l'arrivée, Ride renvoie un comparatif complet des options possibles, sans avoir à ouvrir dix sites différents.",
    tools: ["Telegram", "SNCF", "Comparateurs de vols"],
    format: "Synthèse comparative",
    channel: "Telegram",
  },
];
