export const AGENTS = [
  {
    slug: "camille",
    name: "Camille",
    title: "Secrétaire",
    shortDescription:
      "Camille prend en charge les mails et l'agenda au quotidien : elle fait la synthèse de la semaine, répond aux questions courantes et garde tout organisé, en langage naturel.",
    longDescription:
      "Camille prend en charge les mails et l'agenda au quotidien : elle fait la synthèse de la semaine, répond aux questions courantes et garde tout organisé, en langage naturel.",
    useCase:
      "Vous demandez simplement \"qu'est-ce qui m'attend cette semaine ?\" et Camille répond avec un résumé clair de vos rendez-vous et tâches en cours.",
    tools: ["Gmail", "Google Calendar", "Google Sheets", "Telegram"],
    format: "Synthèse quotidienne",
    channel: "Telegram",
  },
  {
    slug: "ousmane",
    name: "Ousmane",
    title: "Prospection",
    shortDescription:
      "Ousmane recherche de nouvelles entreprises correspondant à votre client idéal, extrait leurs coordonnées, et alimente votre liste de prospects automatiquement, jour après jour.",
    longDescription:
      "Ousmane recherche de nouvelles entreprises correspondant à votre client idéal, extrait leurs coordonnées, et alimente votre liste de prospects automatiquement, jour après jour.",
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
      "Kylian analyse en continu les chiffres qui comptent pour votre activité : ventes, délais, taux de conversion, trafic. Il détecte les tendances et propose des pistes concrètes d'amélioration.",
    longDescription:
      "Kylian analyse en continu les chiffres qui comptent pour votre activité : ventes, délais, taux de conversion, trafic. Il détecte les tendances et propose des pistes concrètes d'amélioration.",
    useCase:
      "Une baisse de conversion sur une semaine ? Kylian la détecte et propose une hypothèse sur la cause, avant que vous ne l'ayez remarqué.",
    tools: ["Base de données", "Google Analytics", "Gmail"],
    format: "Tableau de bord + rapport",
    channel: "Gmail",
  },
  {
    slug: "lea",
    name: "Lea",
    title: "Réseaux",
    shortDescription:
      "Lea propose chaque semaine des idées de publications pour vos réseaux, rédigées et prêtes à relire. Vous gardez toujours la main : elle prépare, vous validez.",
    longDescription:
      "Lea propose chaque semaine des idées de publications pour vos réseaux, rédigées et prêtes à relire. Vous gardez toujours la main : elle prépare, vous validez.",
    useCase:
      "Chaque lundi, vous recevez 5 propositions de posts déjà rédigées, il ne reste qu'à choisir et publier.",
    tools: ["LinkedIn", "Gmail"],
    format: "Propositions de posts",
    channel: "Gmail",
  },
  {
    slug: "mike",
    name: "Mike",
    title: "Nouveautés",
    shortDescription:
      "Mike résume chaque jour ce qui a été ajouté ou amélioré, en traduisant le tout en langage clair et utile, sans jargon technique.",
    longDescription:
      "Mike résume chaque jour ce qui a été ajouté ou amélioré, en traduisant le tout en langage clair et utile, sans jargon technique.",
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
      "Hugo suit en continu ce qui se passe dans votre secteur : nouveaux concurrents, changements de réglementation, tendances du marché. Il synthétise l'essentiel sans que vous ayez à chercher.",
    longDescription:
      "Hugo suit en continu ce qui se passe dans votre secteur : nouveaux concurrents, changements de réglementation, tendances du marché. Il synthétise l'essentiel sans que vous ayez à chercher.",
    useCase:
      "Un concurrent sort une nouveauté ou une loi change dans votre domaine ? Hugo vous en informe le jour même, avec le contexte utile.",
    tools: ["Recherche web", "Gmail"],
    format: "Synthèse de veille",
    channel: "Gmail",
  },
  {
    slug: "marcel",
    name: "Marcel",
    title: "Surveillance",
    shortDescription:
      "Marcel garde un œil permanent sur la santé technique de votre infrastructure : charge, espace disque, sauvegardes, certificats de sécurité. Il prévient avant que le problème ne devienne visible pour vos clients.",
    longDescription:
      "Marcel garde un œil permanent sur la santé technique de votre infrastructure : charge, espace disque, sauvegardes, certificats de sécurité. Il prévient avant que le problème ne devienne visible pour vos clients.",
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
      "Ride compare train, avion, voiture et bus pour un trajet donné, et renvoie une synthèse claire des meilleures options, avec prix et durées.",
    longDescription:
      "Ride compare train, avion, voiture et bus pour un trajet donné, et renvoie une synthèse claire des meilleures options, avec prix et durées.",
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
      "Soul trouve des sorties et événements par ville sur simple demande, en langage naturel, sans menu ni formulaire à remplir.",
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
    title: "Boîte mail",
    shortDescription:
      "Nate lit et résume les mails, prépare des brouillons de réponses, et gère l'agenda. Il n'envoie et ne supprime jamais rien sans validation explicite, pour garder le contrôle total.",
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
    title: "Contenu",
    shortDescription:
      "Jenseng propose des publications prêtes à poster, écrites dans le ton et le style propres à chacun. Il peut aussi suggérer des réponses à des messages reçus.",
    longDescription:
      "Jenseng propose des publications prêtes à poster, écrites dans le ton et le style propres à chacun. Il peut aussi suggérer des réponses à des messages reçus.",
    useCase:
      "Vous demandez \"5 idées de posts sur l'actualité de mon secteur\" et Jenseng les rédige directement, prêtes à copier-coller.",
    tools: ["Telegram", "Recherche web"],
    format: "Propositions de textes",
    channel: "Telegram",
  },
  {
    slug: "didier",
    name: "Didier",
    title: "Supervision",
    shortDescription:
      "Didier supervise l'ensemble des agents : il agrège leurs rapports, repère si l'un d'eux a rencontré un problème, et sert de point d'entrée unique pour savoir où en sont toutes les tâches automatisées.",
    longDescription:
      "Didier supervise l'ensemble des agents : il agrège leurs rapports, repère si l'un d'eux a rencontré un problème, et sert de point d'entrée unique pour savoir où en sont toutes les tâches automatisées.",
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
      "Simone analyse les erreurs qui surviennent en production, lit le code pour remonter jusqu'à la cause réelle, et rédige un correctif prêt à être validé par un humain.",
    longDescription:
      "Simone analyse les erreurs qui surviennent en production, lit le code pour remonter jusqu'à la cause réelle, et rédige un correctif prêt à être validé par un humain.",
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
      "Jo vérifie chaque document généré avant son envoi : structure, champs obligatoires, cohérence des montants. Une relecture automatique qui ne dort jamais et ne laisse rien passer.",
    longDescription:
      "Jo vérifie chaque document généré avant son envoi : structure, champs obligatoires, cohérence des montants. Une relecture automatique qui ne dort jamais et ne laisse rien passer.",
    useCase:
      "Un document mal rempli qui aurait pu partir à un client ? Jo l'intercepte avant l'envoi et prévient de l'erreur à corriger.",
    tools: ["Documents PDF", "Gmail"],
    format: "Alerte + document annoté",
    channel: "Gmail",
  },
];
