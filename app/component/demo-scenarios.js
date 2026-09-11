// Scenarios des demonstrations jouees dans le hero.
//
// Chaque demo est une conversation ECRITE A L'AVANCE : rien n'est genere par un
// modele. Le but est de montrer en quelques secondes COMMENT un agent
// travaille : la demande en langage courant, le raisonnement etape par etape,
// les OUTILS qu'il ouvre au passage, puis le resultat. Le panneau (DemoPanel)
// affiche un bandeau "ceci est une demonstration" : on ne fait jamais passer ce
// script pour une vraie execution.
//
// Types d'etapes :
//   user  : message du visiteur (bulle a droite)
//   think : une etape de raisonnement. UNE phrase courte qui dit ce que l'agent
//           FAIT ("Je regarde vos rendez-vous dans {l'agenda}."), jamais ce
//           qu'il trouve. L'outil ouvert s'ecrit entre accolades : le lecteur
//           le met en couleur dans la phrase.
//   agent : reponse de l'agent (bulle grise, a gauche)
//
// Regles d'ecriture (retour de Nathan du 11/09/2026, les premieres versions
// etaient "fouillies") :
//   - les etapes decrivent des GESTES, les chiffres vont dans la reponse : une
//     etape "34 mails, il en reste 6" suivie d'une reponse qui en cite 2 oblige
//     le visiteur a refaire le calcul ;
//   - tout chiffre annonce est un chiffre utilise ;
//   - pas de fils "en parallele" : quatre gestes simples a la suite montrent
//     deja qu'une demande touche plusieurs outils, sans lecture en colonnes.
// `delay` : attente PLANCHER en ms avant l'etape ; le lecteur l'allonge selon
// la longueur de ce qui est a lire.
export const DEMOS = [
  {
    id: "impayes",
    chip: "Relancer mes impayés",
    title: "Relance d'impayés",
    steps: [
      { type: "user", delay: 400, text: "Relance les clients qui ne m'ont pas payé." },
      { type: "think", delay: 900, text: "Je cherche les factures en retard dans {votre facturation}." },
      { type: "think", delay: 1400, text: "Je vérifie qui a déjà été relancé dans {vos mails}." },
      {
        type: "agent",
        delay: 1400,
        text: "3 factures sont en retard. J'ai préparé 2 relances : courtoise pour Martin (450 €), plus ferme pour Diallo (1 200 €, déjà relancé une fois). Weber n'a que 6 jours de retard, je le garde à l'œil. Je vous les montre ?",
      },
      { type: "user", delay: 1500, text: "Oui, montre-les moi." },
      {
        type: "agent",
        delay: 1100,
        text: "Elles sont dans vos brouillons. Rien ne part jamais sans votre validation.",
      },
    ],
  },
  {
    id: "brief",
    chip: "Mon point du matin",
    title: "Point du matin",
    steps: [
      { type: "user", delay: 400, text: "Mon point du matin." },
      { type: "think", delay: 900, text: "Je lis les mails de la nuit dans {votre boîte}." },
      { type: "think", delay: 1400, text: "Je regarde vos rendez-vous du jour dans {l'agenda}." },
      { type: "think", delay: 1400, text: "Je vérifie les paiements reçus sur {votre compte}." },
      {
        type: "agent",
        delay: 1400,
        text: "Bonjour ! Cette nuit : 2 demandes de devis et une commande confirmée. Rendez-vous à 14h30 avec Mme Roth, et Diallo vous a réglé ses 1 200 €.",
      },
      {
        type: "agent",
        delay: 1500,
        text: "Votre priorité : rappeler le client qui a confirmé, il attend une date de livraison.",
      },
    ],
  },
  {
    id: "prospection",
    chip: "Trouver des clients",
    title: "Prospection",
    steps: [
      { type: "user", delay: 400, text: "Trouve-moi de nouveaux clients dans ma région." },
      {
        type: "think",
        delay: 900,
        text: "Je cherche les organisateurs d'événements près de chez vous sur {le web}.",
      },
      { type: "think", delay: 1400, text: "J'écarte ceux déjà contactés dans {votre fichier clients}." },
      { type: "think", delay: 1400, text: "J'écris un message personnalisé pour chacun." },
      {
        type: "agent",
        delay: 1400,
        text: "19 nouveaux prospects à moins de 30 km, jamais contactés, sont dans votre tableau avec leur message prêt. Je vous fais valider les 3 premiers ?",
      },
    ],
  },
];

export function getDemo(id) {
  return DEMOS.find((d) => d.id === id) ?? null;
}

// Demonstrations de Foxy (site racine), meme lecteur que ci-dessus. La
// difference tient au SCENARIO : un agent sur mesure fait UNE tache, Foxy
// enchaine plusieurs outils pour une seule demande (et se souvient, et revient
// tout seul le lendemain). Les outils colores dans les phrases SONT l'argument :
// chaque etape en ouvre un different.
export const AIOS_DEMOS = [
  {
    id: "aios-leads",
    chip: "Relancer mes leads chauds",
    title: "Leads chauds et rendez-vous",
    steps: [
      {
        type: "user",
        delay: 400,
        text: "Récupère les leads qui ont cliqué sur ma campagne et occupe-toi d'eux.",
      },
      { type: "think", delay: 900, text: "Je regarde qui a cliqué cette semaine dans {Lemlist}." },
      { type: "think", delay: 1400, text: "J'écarte ceux qui ont déjà un rendez-vous dans {l'agenda}." },
      { type: "think", delay: 1400, text: "Je lis l'actualité de chaque entreprise sur {le web}." },
      { type: "think", delay: 1400, text: "Je rédige les relances dans {vos mails}." },
      {
        type: "agent",
        delay: 1400,
        text: "8 personnes ont cliqué sans avoir encore de rendez-vous. Leurs relances sont prêtes en brouillon, chacune rebondit sur une actualité de l'entreprise : une levée de fonds, un recrutement. Rien ne part sans vous.",
      },
    ],
  },
  {
    id: "aios-client",
    chip: "Où j'en suis avec ce client ?",
    title: "Le point sur un client",
    steps: [
      { type: "user", delay: 400, text: "Où j'en suis avec Martin ?" },
      { type: "think", delay: 900, text: "Je relis vos échanges avec lui dans {vos mails}." },
      { type: "think", delay: 1400, text: "Je retrouve le devis envoyé dans {vos devis}." },
      { type: "think", delay: 1400, text: "Je regarde votre dernier appel dans {l'agenda}." },
      { type: "think", delay: 1400, text: "Je relis ce que je sais de lui dans {ma mémoire}." },
      {
        type: "agent",
        delay: 1400,
        text: "Votre devis de 2 400 € a été ouvert deux fois, sans réponse, et votre appel de jeudi n'a rien conclu. En juin, c'était déjà le délai de livraison qui le bloquait. Je vous prépare une relance courte qui lève ce doute ?",
      },
      { type: "user", delay: 1600, text: "Oui, vas-y." },
      {
        type: "agent",
        delay: 1100,
        text: "C'est dans vos brouillons. Vous relisez, vous envoyez.",
      },
    ],
  },
  {
    id: "aios-mails",
    chip: "Trie mes mails",
    title: "Le tri du matin",
    steps: [
      { type: "user", delay: 400, text: "Trie mes mails, je n'ai pas le temps de tout lire." },
      { type: "think", delay: 900, text: "Je lis les mails de la nuit dans {votre boîte}." },
      {
        type: "think",
        delay: 1400,
        text: "Mme Roth veut décaler jeudi : je cherche un créneau dans {l'agenda}.",
      },
      {
        type: "think",
        delay: 1400,
        text: "Le comptable réclame la facture d'août : je la retrouve dans {le Drive}.",
      },
      {
        type: "agent",
        delay: 1400,
        text: "2 mails attendent une réponse aujourd'hui : Mme Roth (je lui propose mardi 16h) et le comptable (facture d'août jointe). Les deux réponses sont en brouillon. Le reste, ce sont des newsletters et des notifications : rien d'urgent.",
      },
    ],
  },
  {
    id: "aios-journee",
    chip: "Organise ma journée",
    title: "La journée organisée",
    steps: [
      { type: "user", delay: 400, text: "Organise ma journée." },
      { type: "think", delay: 900, text: "Je regarde vos rendez-vous dans {l'agenda}." },
      { type: "think", delay: 1400, text: "Je liste ce qui traîne dans {vos tâches}." },
      { type: "think", delay: 1400, text: "Je calcule le trajet jusqu'à Colmar sur {la carte}." },
      {
        type: "agent",
        delay: 1400,
        text: "Vous avez Durand à 11h et le chantier de Colmar à 15h. Je vous bloque 9h-10h30 pour les trois devis en retard, en commençant par le plus ancien. Le reste peut attendre demain.",
      },
      {
        type: "agent",
        delay: 1500,
        text: "Et je vous referai ce point chaque matin à 7h30, sans que vous le demandiez.",
      },
    ],
  },
];

export function getAiosDemo(id) {
  return AIOS_DEMOS.find((d) => d.id === id) ?? null;
}

// Identifiant special : ouvrir le lecteur SANS scenario, sur l'ecran de choix.
// Aucune demo ne porte cet id, donc getDemo/getAiosDemo rendent null et le
// panneau sait qu'il doit proposer la liste.
export const DEMO_MENU = "__choix__";
