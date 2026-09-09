// Tous les textes du site AIOS (racine du domaine), regroupes ici.
//
// Ce module n'est PAS "use client" : la page serveur y lit les questions pour
// generer le balisage FAQPage, les composants clients y lisent les memes
// listes. Une valeur exportee depuis un module "use client" arrive cote serveur
// comme une reference et casse le build au .map().
//
// La promesse du site AIOS, a ne pas melanger avec celle des agents :
//   - un AGENT (site /agents) = une mission precise, dans un metier ;
//   - l'AIOS (ici) = un systeme complet qui connait tout le business et a qui
//     on parle toute la journee.
// Chaque phrase ecrite ici doit tenir de ce cote de la ligne.

// Ce qu'il fait, raconte par la journee de quelqu'un qui l'utilise, pas par
// une liste de fonctionnalites. Chaque entree part d'un moment reel.
export const CAPACITES = [
  {
    id: "matin",
    titre: "Votre journée, déjà triée",
    accroche: "Le point du matin",
    texte:
      "Au réveil, l'essentiel est prêt : ce qui est arrivé pendant la nuit, ce qui vous attend aujourd'hui, ce qui traîne depuis trop longtemps. Vous ouvrez un écran, pas douze.",
    scene: [
      { role: "user", text: "Mon point du matin." },
      {
        role: "aios",
        text: "3 mails à traiter, dont 2 demandes de devis. Rendez-vous à 14h30 avec Mme Roth. Le virement de Diallo est arrivé.",
      },
      {
        role: "aios",
        text: "Votre priorité : rappeler le client qui a confirmé hier, il attend une date.",
      },
    ],
  },
  {
    id: "mails",
    titre: "Vos mails, lus et préparés",
    accroche: "La boîte de réception",
    texte:
      "Il repère ce qui compte, écarte le reste et prépare les réponses. Vous relisez et vous envoyez. Rien ne part sans votre accord.",
    scene: [
      { role: "user", text: "Il y a quoi d'urgent dans mes mails ?" },
      {
        role: "aios",
        text: "Deux choses : le devis Bertrand attend une réponse depuis 3 jours, et votre comptable réclame les factures d'août.",
      },
      {
        role: "aios",
        text: "J'ai préparé les deux réponses. Elles sont dans vos brouillons, à relire.",
      },
    ],
  },
  {
    id: "agenda",
    titre: "Vos rendez-vous, tenus",
    accroche: "L'agenda",
    texte:
      "« Cale un point avec Martin jeudi après-midi. » Il regarde vos disponibilités, crée le rendez-vous, envoie l'invitation, et vous prépare avant d'y aller.",
    scene: [
      { role: "user", text: "Cale un point avec Martin jeudi après-midi." },
      {
        role: "aios",
        text: "Jeudi 15h ou 16h30, les deux sont libres chez vous. Je propose 15h et je lui envoie l'invitation ?",
      },
      { role: "user", text: "Vas-y." },
      { role: "aios", text: "Invitation envoyée. Je vous préparerai un rappel du dossier mercredi soir." },
    ],
  },
  {
    id: "clients",
    titre: "Vos clients, suivis",
    accroche: "Le suivi client",
    texte:
      "Où en est ce devis ? Qui n'a pas répondu depuis deux semaines ? Il croise vos mails, vos documents et votre agenda pour répondre en une phrase.",
    scene: [
      { role: "user", text: "Où j'en suis avec Bertrand ?" },
      {
        role: "aios",
        text: "Devis de 4 200 € envoyé le 26 août, ouvert deux fois, sans réponse. Vous vous êtes vus le 2 septembre.",
      },
      { role: "aios", text: "C'est le bon moment pour relancer. Je vous prépare le mail ?" },
    ],
  },
  {
    id: "voix",
    titre: "À la voix, depuis votre poche",
    accroche: "En déplacement",
    texte:
      "En voiture, entre deux rendez-vous : vous dictez, il exécute et vous rend compte. Le même assistant sur votre téléphone et sur votre ordinateur.",
    scene: [
      { role: "user", text: "Note : rappeler le fournisseur pour les délais.", voice: true },
      { role: "aios", text: "C'est noté pour aujourd'hui. Je vous le remets ce soir si ce n'est pas fait." },
      { role: "user", text: "Et confirme à Sophie pour mardi.", voice: true },
      { role: "aios", text: "Message prêt. Je vous le lis avant de l'envoyer." },
    ],
  },
  {
    id: "apprentissage",
    titre: "Il apprend votre façon de faire",
    accroche: "Vos habitudes",
    texte:
      "Chaque correction est retenue. Au bout de quelques semaines, il écrit comme vous, classe comme vous, et connaît vos habitudes de travail.",
    scene: [
      { role: "user", text: "Trop formel, je tutoie mes clients habituels." },
      { role: "aios", text: "C'est retenu : tutoiement pour vos clients habituels, vouvoiement pour les nouveaux." },
      { role: "user", text: "Voilà." },
      { role: "aios", text: "Je réécris le mail et j'applique la règle aux prochains." },
    ],
  },
];

// Le parcours, du premier appel a l'usage quotidien. Trois etapes, formulees
// du point de vue du client (ce qu'IL vit), pas du notre.
export const ETAPES = [
  {
    numero: "01",
    titre: "On s'appelle une demi-heure",
    texte:
      "Vous racontez votre activité, vos outils et ce qui vous prend du temps. On prépare ensemble ce que Foxy devra savoir faire en premier.",
  },
  {
    numero: "02",
    titre: "On le branche sur vos outils",
    texte:
      "Vos mails, votre agenda, vos documents, vos logiciels métier. Vous autorisez, on connecte. Rien à installer, rien à changer dans vos habitudes.",
  },
  {
    numero: "03",
    titre: "Il travaille, vous corrigez",
    texte:
      "Les premières semaines, vous le reprenez ; il retient. C'est ce qui le transforme d'un outil générique en votre bras droit.",
  },
];

// Temoignages des testeurs de l'acces anticipe.
//
// REGLE, identique a celle du site agents (DESIGN.md) : on n'invente JAMAIS
// une identite. Tant que `name` vaut null, la carte affiche le profil et
// l'usage, pas un faux prenom. Ces citations decrivent des usages REELS de
// l'AIOS ; avant toute mise en ligne, faire valider chaque phrase par la
// personne concernee et remplir alors `name`, `jobTitle` et `photo`.
export const TEMOIGNAGES_AIOS = [
  {
    quote:
      "Je lui demande où j'en suis avec un client, il me répond en une phrase. Avant, je fouillais mes mails pendant dix minutes pour reconstituer l'historique.",
    profil: "Testeur accès anticipé",
    usage: "Suivi client",
    name: null,
    jobTitle: null,
    initials: null,
    photo: null,
  },
  {
    quote:
      "Le matin, tout est déjà trié : ce qui est urgent, ce qui attend, ce que j'ai oublié. Je commence la journée en sachant quoi faire au lieu d'ouvrir ma boîte mail en apnée.",
    profil: "Testeur accès anticipé",
    usage: "Point du matin",
    name: null,
    jobTitle: null,
    initials: null,
    photo: null,
  },
  {
    quote:
      "Je lui parle en conduisant : « ajoute ça à ma liste », « réponds-lui que c'est bon pour mardi ». Quand j'arrive, c'est fait et je n'ai plus qu'à relire.",
    profil: "Testeur accès anticipé",
    usage: "Commande à la voix",
    name: null,
    jobTitle: null,
    initials: null,
    photo: null,
  },
];

// FAQ propre a l'AIOS : les questions qu'on se pose devant un systeme qui voit
// TOUT le business, pas devant un agent qui fait une tache. La securite et le
// controle passent donc devant.
//
// Comme sur le site agents, les passages entre **doubles asterisques** sont
// mis en avant a l'ecran et retires du balisage FAQPage (Google doit recevoir
// du texte nu).
export const QUESTIONS_AIOS = [
  {
    q: "C'est quoi un AIOS, au juste ?",
    a: "AIOS veut dire **système d'exploitation à intelligence artificielle**. Votre ordinateur a Windows, votre téléphone a Android : votre entreprise, elle, n'a rien. Chaque outil vit dans son coin et c'est vous qui faites le lien toute la journée. **Un AIOS est la couche qui manque** : il est branché sur tous vos outils, il garde la mémoire de votre activité, il apprend votre façon de faire et il travaille même quand vous ne lui demandez rien. **Foxy est notre AIOS.**",
  },
  {
    q: "Concrètement, c'est quoi la différence avec ChatGPT ?",
    a: "ChatGPT ne connaît que ce que vous lui collez dans la conversation, et il oublie tout ensuite. **Foxy est branché sur vos vrais outils** : vos mails, votre agenda, vos documents, vos clients. Il n'a pas besoin qu'on lui explique le contexte, il l'a déjà. Et **il agit** : il envoie, il crée, il range, au lieu de vous rendre un texte à recopier.",
  },
  {
    q: "Est-ce qu'il peut faire des choses sans me demander ?",
    a: "Non, pas sur ce qui engage. **Tout ce qui sort de chez vous** - un mail envoyé, un rendez-vous créé, un document partagé - **passe par votre validation**. Le reste (lire, trier, résumer, préparer) se fait tout seul, c'est justement ce qui vous fait gagner du temps.",
  },
  {
    q: "Où sont mes données ?",
    a: "Sur **un serveur qui vous est dédié**, pas sur une plateforme partagée. Vos données ne servent à entraîner aucun modèle. Vous choisissez outil par outil ce qu'il peut voir, et **vous pouvez tout lui retirer en un clic**, sans rien casser.",
  },
  {
    q: "Il faut être à l'aise avec la technique ?",
    a: "Non. **Vous lui parlez normalement**, au clavier ou à la voix, comme à un collaborateur. Le branchement de vos outils, c'est nous qui le faisons avec vous pendant la mise en route. **Il n'y a rien à installer ni à maintenir** de votre côté.",
  },
  {
    q: "Et si je change d'avis ?",
    a: "Vous partez avec vos données et vous coupez les accès. **Aucun engagement de durée** : Foxy doit se garder parce qu'il vous fait gagner du temps, pas parce qu'un contrat vous retient.",
  },
  {
    q: "Pourquoi des places limitées ?",
    a: "Parce que chaque mise en route demande du temps réel : comprendre votre activité, brancher vos outils, corriger avec vous les premières semaines. **Au-delà de dix entreprises en même temps, la qualité tombe.** Les premiers inscrits gardent leurs conditions de lancement à vie.",
  },
];

// Retire le balisage **...** pour le JSON-LD (meme role que stripEmphasis cote
// site agents, duplique ici pour que ce module reste autonome).
export function stripEmphasisAios(text) {
  return text.replace(/\*\*/g, "");
}
