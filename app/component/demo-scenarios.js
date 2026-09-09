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
//   user     : message du visiteur (bulle orange, a droite)
//   think    : le raisonnement de l'agent, une phrase simple par etape
//   tool     : le raisonnement AVEC l'outil ouvert a ce moment-la. `tool` est le
//              nom de l'outil, affiche en pastille monospace. C'est ce qui rend
//              visible qu'UNE demande touche PLUSIEURS outils : sans ce marqueur
//              le visiteur voit un texte qui defile, pas un agent branche.
//   parallel : plusieurs fils menes EN MEME TEMPS (`branches`, chacune une liste
//              d'etapes tool/think). Un agent qui enchaine, tout le monde
//              l'imagine ; deux choses de front, non : il faut le montrer.
//   agent    : reponse de l'agent (bulle grise, a gauche)
// `delay` : attente en ms AVANT l'apparition de l'etape. Les etapes de
// raisonnement sont espacees d'environ 1,5 s : assez pour etre lues, assez
// courtes pour que la demo entiere tienne sous 20 secondes.
export const DEMOS = [
  {
    id: "impayes",
    chip: "Relancer mes impayés",
    title: "Relance d'impayés",
    steps: [
      { type: "user", delay: 400, text: "Relance les clients qui ne m'ont pas payé." },
      {
        type: "tool",
        delay: 900,
        tool: "Facturation",
        text: "Je parcours vos factures et leurs échéances.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Facturation",
        text: "3 factures en retard : Martin (450 €, 12 jours), Diallo (1 200 €, 31 jours), Weber (280 €, 6 jours).",
      },
      {
        type: "think",
        delay: 1600,
        text: "Weber est à moins de 7 jours : trop tôt pour relancer, je le garde à l'œil.",
      },
      {
        type: "tool",
        delay: 1500,
        tool: "Mails",
        text: "Diallo a déjà reçu une relance le 12 : je durcis le ton pour la seconde.",
      },
      {
        type: "agent",
        delay: 1400,
        text: "J'ai préparé 2 mails de relance : ton courtois pour Martin, plus ferme pour Diallo (c'est sa 2e relance). Je vous les montre avant envoi ?",
      },
      { type: "user", delay: 1500, text: "Oui, montre-les moi." },
      {
        type: "agent",
        delay: 1100,
        text: "Ils sont dans vos brouillons. Rien ne part jamais sans votre validation.",
      },
    ],
  },
  {
    id: "brief",
    chip: "Mon point du matin",
    title: "Point du matin",
    steps: [
      { type: "user", delay: 400, text: "Mon point du matin." },
      { type: "tool", delay: 900, tool: "Mails", text: "Je lis les mails arrivés cette nuit." },
      {
        type: "think",
        delay: 1600,
        text: "2 demandes de devis, 1 client qui confirme sa commande, le reste peut attendre.",
      },
      {
        type: "parallel",
        delay: 1500,
        branches: [
          {
            label: "Votre journée",
            steps: [{ tool: "Agenda", text: "Un rendez-vous à 14h30 avec Mme Roth." }],
          },
          {
            label: "Votre argent",
            steps: [{ tool: "Banque", text: "Le virement de 1 200 € de Diallo est arrivé." }],
          },
        ],
      },
      {
        type: "agent",
        delay: 1600,
        text: "Bonjour ! 2 nouvelles demandes de devis (je peux les préparer), un rendez-vous à 14h30 avec Mme Roth, et Diallo vous a bien réglé.",
      },
      {
        type: "agent",
        delay: 1500,
        text: "Votre priorité du jour : rappeler le client qui a confirmé, il attend une date de livraison.",
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
        type: "tool",
        delay: 900,
        tool: "Recherche web",
        text: "Je cherche les entreprises qui correspondent à votre profil de client idéal.",
      },
      {
        type: "think",
        delay: 1600,
        text: "27 organisateurs d'événements trouvés dans un rayon de 30 km.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Votre fichier clients",
        text: "J'écarte ceux déjà contactés le mois dernier : il en reste 19.",
      },
      {
        type: "agent",
        delay: 1400,
        text: "19 nouveaux prospects ajoutés à votre tableau, chacun avec un message personnalisé prêt à partir. Je vous fais valider les 3 premiers ?",
      },
    ],
  },
];

export function getDemo(id) {
  return DEMOS.find((d) => d.id === id) ?? null;
}

// Demonstrations de Foxy (site racine), meme lecteur que ci-dessus. La
// difference tient au SCENARIO : un agent sur mesure fait UNE tache, Foxy croise
// plusieurs outils dans une seule demande, et mene parfois deux fils de front.
// C'est exactement ce qu'on vend au-dessus du catalogue d'agents, donc c'est ce
// que les demos doivent montrer : les pastilles d'outils et les blocs
// "en parallele" ne sont pas de la decoration, ils SONT l'argument.
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
      {
        type: "tool",
        delay: 900,
        tool: "Lemlist",
        text: "340 contacts dans la campagne, 11 ont cliqué sur le lien cette semaine.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Lemlist",
        text: "J'écarte les 3 qui ont déjà un rendez-vous calé : il en reste 8.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Recherche web",
        text: "Je regarde qui ils sont : 6 sur 8 ont levé des fonds ou recrutent en ce moment.",
      },
      {
        type: "parallel",
        delay: 1700,
        branches: [
          {
            label: "Les 8 leads",
            steps: [
              { tool: "Mails", text: "Je rédige 8 messages, chacun avec sa raison propre de recontact." },
            ],
          },
          {
            label: "Duval, en attente",
            steps: [
              { tool: "Agenda", text: "Il demande une démo depuis mardi : je cherche vos créneaux." },
            ],
          },
        ],
      },
      {
        type: "tool",
        delay: 1800,
        tool: "Agenda",
        text: "Jeudi 14h et vendredi 10h sont libres. Jeudi vous laisse la matinée entière.",
      },
      {
        type: "agent",
        delay: 1500,
        text: "8 relances prêtes en brouillon, et une proposition de démo à Duval pour jeudi 14h. Rien ne part sans vous.",
      },
    ],
  },
  {
    id: "aios-client",
    chip: "Où j'en suis avec ce client ?",
    title: "Le point sur un client",
    steps: [
      { type: "user", delay: 400, text: "Où j'en suis avec Martin ?" },
      { type: "tool", delay: 900, tool: "Mails", text: "Je relis vos échanges avec lui." },
      {
        type: "tool",
        delay: 1600,
        tool: "Devis",
        text: "Devis de 2 400 € envoyé le 2, ouvert deux fois, jamais répondu.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Agenda",
        text: "Vous l'avez eu au téléphone jeudi dernier, 20 minutes.",
      },
      {
        type: "think",
        delay: 1500,
        text: "Je me souviens que son délai de livraison le bloquait déjà en juin.",
      },
      {
        type: "agent",
        delay: 1400,
        text: "Martin a ouvert votre devis deux fois sans répondre, et votre appel de jeudi n'a rien conclu. Il hésite, sûrement sur le délai. Je vous prépare une relance courte qui lève ce doute ?",
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
      { type: "tool", delay: 900, tool: "Mails", text: "34 mails reçus depuis hier soir." },
      {
        type: "think",
        delay: 1600,
        text: "J'écarte les newsletters et les notifications : il en reste 6 qui vous concernent vraiment.",
      },
      {
        type: "parallel",
        delay: 1600,
        branches: [
          {
            label: "Mme Roth",
            steps: [
              { tool: "Agenda", text: "Elle veut décaler jeudi : mardi 16h est libre des deux côtés." },
            ],
          },
          {
            label: "Le comptable",
            steps: [{ tool: "Drive", text: "Il réclame la facture d'août : je la retrouve." }],
          },
        ],
      },
      {
        type: "agent",
        delay: 1800,
        text: "2 choses vous attendent aujourd'hui : Mme Roth (je propose mardi 16h) et le comptable (facture d'août jointe). Les deux réponses sont en brouillon, les 4 autres mails peuvent attendre demain.",
      },
    ],
  },
  {
    id: "aios-journee",
    chip: "Organise ma journée",
    title: "La journée organisée",
    steps: [
      { type: "user", delay: 400, text: "Organise ma journée." },
      {
        type: "parallel",
        delay: 900,
        branches: [
          {
            label: "Ce qui est fixe",
            steps: [{ tool: "Agenda", text: "11h Durand, 15h le chantier de Colmar." }],
          },
          {
            label: "Ce qui traîne",
            steps: [{ tool: "Tâches", text: "Trois devis attendent, dont un depuis 5 jours." }],
          },
        ],
      },
      {
        type: "think",
        delay: 1800,
        text: "Entre les deux rendez-vous et la route, il vous reste 3 heures utiles.",
      },
      {
        type: "agent",
        delay: 1500,
        text: "Je vous ai bloqué 9h-10h30 pour les devis en retard, en commençant par le plus ancien. Le reste peut glisser à demain sans conséquence.",
      },
      {
        type: "tool",
        delay: 1600,
        tool: "Tous les matins, 7h30",
        text: "Je referai ce point demain avant votre réveil, sans que vous le demandiez.",
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
