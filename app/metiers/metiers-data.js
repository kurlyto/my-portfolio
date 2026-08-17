// Catalogue des flyers metiers : un metier = un flyer partageable
// (/metiers/[slug]) + un badge dans la section "Metiers" de la home.
//
// Les demandes sont ecrites comme on les dirait a son agent, telles quelles.
// Regles d'ecriture (voulues par Nathan, inspirees de Limova) : du concret et
// du realiste - parfois des chiffres, parfois des prenoms, parfois des
// logiciels, parfois des rendez-vous recurrents (point de 8h, recap du soir).
// 5 demandes par metier, pas plus : le flyer doit se lire d'un coup d'oeil.
// Metiers a secret professionnel (notaire, avocat) : des numeros de dossier,
// jamais de noms de clients.

export const METIERS = [
  {
    slug: "restaurateur",
    emoji: "\u{1F37D}\u{FE0F}",
    badge: "Restaurateur",
    title: "Restaurateur / Food truck",
    demandes: [
      "Réponds à mes 15 derniers avis Google et signale-moi ceux en dessous de 3 étoiles.",
      "Chaque dimanche soir, envoie le planning de la semaine à l'équipe et gère les échanges de services.",
      "On descend sous 10 kg de mozzarella : passe la commande chez Metro, comme d'habitude.",
      "Réponds au téléphone pendant le service et prends les réservations.",
      "Fais-moi le point de 7h : réservations du jour, mails importants, avis à traiter.",
    ],
  },
  {
    slug: "musicien",
    emoji: "\u{1F3B5}",
    badge: "Musicien",
    title: "Musicien / Prof de musique",
    demandes: [
      "Relance les 4 élèves qui n'ont pas payé leur mois de cours, gentiment mais fermement.",
      "Réponds aux demandes de cours d'essai sur Instagram et propose mes créneaux du mercredi.",
      "Facture le cachet du concert de samedi : 450 EUR, envoie-la sur Qonto.",
      "Relance les 12 salles contactées il y a 2 semaines et restées muettes.",
      "Chaque vendredi, fais-moi le point : paiements reçus, cours de la semaine suivante, messages en attente.",
    ],
  },
  {
    slug: "agent-immobilier",
    emoji: "\u{1F3E0}",
    badge: "Agent immobilier",
    title: "Agent immobilier",
    demandes: [
      "Réponds aux demandes de visite SeLoger et Leboncoin, propose des créneaux jeudi et samedi.",
      "Relance les 8 acquéreurs restés silencieux depuis leur visite.",
      "Rédige l'annonce du T3 rue Oberlin à partir des photos et du descriptif.",
      "Après chaque visite, envoie le compte-rendu au propriétaire.",
      "Surveille les annonces concurrentes du secteur et préviens-moi des baisses de prix.",
    ],
  },
  {
    slug: "notaire",
    emoji: "\u{2696}\u{FE0F}",
    badge: "Notaire",
    title: "Notaire",
    demandes: [
      "Fais-moi le point de 8h : mails de la nuit et échéances des dossiers de la semaine.",
      "Relance les clients du dossier 24-312 : il manque encore 3 pièces sur 7.",
      "Prépare le récapitulatif de la succession à partir des pièces reçues ce matin.",
      "Cale les rendez-vous de signature sans conflit avec l'agenda de mes deux associés.",
      "Prépare les factures d'honoraires du mois et envoie-les sur mon outil de facturation.",
    ],
  },
  {
    slug: "epicerie",
    emoji: "\u{1F6D2}",
    badge: "Épicerie",
    title: "Commerce de proximité / Épicerie",
    demandes: [
      "Alerte-moi quand un produit passe sous 5 unités et prépare la commande fournisseur.",
      "Réponds à mes avis Google et fais-moi signe si un avis est en dessous de 3 étoiles.",
      "Fais le planning du mois prochain pour mes 3 employés, avec leurs contraintes.",
      "Chaque semaine, passe mes factures fournisseurs dans Qonto.",
      "Réponds aux clients sur Instagram : horaires, arrivages, disponibilité des produits.",
    ],
  },
  {
    slug: "electricien",
    emoji: "\u{26A1}",
    badge: "Électricien",
    title: "Électricien",
    demandes: [
      "Réponds aux demandes de devis pendant que je suis sur les chantiers et propose un passage cette semaine.",
      "Je te dicte le chantier en vocal, tu me sors le devis propre avec mon en-tête.",
      "Relance les 6 devis restés sans réponse depuis plus d'une semaine.",
      "Organise ma tournée de jeudi pour limiter les trajets entre les 5 interventions.",
      "Chaque soir à 19h, le récap : devis signés, factures parties, planning du lendemain.",
    ],
  },
  {
    slug: "plombier",
    emoji: "\u{1F527}",
    badge: "Plombier",
    title: "Plombier",
    demandes: [
      "Réponds au téléphone la nuit et le week-end : vraie urgence, tu me préviens ; le reste attend 8h.",
      "Fais un devis à partir des photos du client et de ma grille de tarifs.",
      "Relance les 3 factures impayées depuis plus de 30 jours.",
      "Commande les pièces manquantes chez Cedeo et donne-moi la date de livraison.",
      "Organise mes interventions de demain selon les urgences et les adresses.",
    ],
  },
  {
    slug: "coiffeur",
    emoji: "\u{1F487}",
    badge: "Coiffeur",
    title: "Coiffeur / Institut de beauté",
    demandes: [
      "Prends les rendez-vous par téléphone et SMS, même le dimanche soir.",
      "Envoie un petit message aux clientes pas revenues depuis 2 mois, avec mes créneaux libres.",
      "Réponds à mes avis Google et signale-moi ceux en dessous de 3 étoiles.",
      "Fais le planning de l'équipe : Léa en 35h, Sarah le samedi uniquement.",
      "Quand un produit passe sous 3 unités, prépare la commande chez le grossiste.",
    ],
  },
  {
    slug: "avocat",
    emoji: "\u{1F468}\u{200D}\u{2696}\u{FE0F}",
    badge: "Avocat",
    title: "Avocat",
    demandes: [
      "Fais-moi le point de 8h : mails urgents et échéances de procédure de la semaine.",
      "Résume les 40 pages de pièces reçues hier sur le dossier 23-089.",
      "Relance les honoraires impayés depuis plus de 45 jours.",
      "Prépare un premier brouillon de conclusions à partir de ma trame habituelle.",
      "Alerte-moi 10 jours avant chaque délai de procédure.",
    ],
  },
  {
    slug: "expert-comptable",
    emoji: "\u{1F4CA}",
    badge: "Expert-comptable",
    title: "Expert-comptable",
    demandes: [
      "Relance les 12 clients qui n'ont pas envoyé leurs justificatifs du mois.",
      "Trie les factures reçues par mail, client par client, avant l'import dans Pennylane.",
      "Prépare les rappels d'échéances fiscales du trimestre pour chaque client.",
      "Réponds aux questions récurrentes des clients par mail, transfère-moi les cas particuliers.",
      "Chaque lundi à 8h, la liste des bilans en retard et les rendez-vous de la semaine.",
    ],
  },
  {
    slug: "kine",
    emoji: "\u{1F9D1}\u{200D}\u{2695}\u{FE0F}",
    badge: "Kiné / Ostéo",
    title: "Kinésithérapeute / Ostéopathe",
    demandes: [
      "Une annulation ? Propose le créneau par SMS aux patients de la liste d'attente.",
      "Relance les patients en rééducation sans rendez-vous depuis 3 semaines.",
      "Transforme mes notes vocales d'après séance en comptes-rendus propres.",
      "Réponds au téléphone pendant mes consultations et prends les rendez-vous.",
      "Prépare mes notes d'honoraires du mois et envoie-les sur mon outil de compta.",
    ],
  },
  {
    slug: "architecte-interieur",
    emoji: "\u{1F3A8}",
    badge: "Architecte d'intérieur",
    title: "Architecte d'intérieur",
    demandes: [
      "Prépare un moodboard à partir des envies décrites par la cliente d'hier.",
      "Relance Claire : le plan du séjour attend sa validation depuis 10 jours.",
      "Gère mon planning entre rendez-vous chantier et rendez-vous clients.",
      "Fais-moi le point du matin : mails des artisans, livraisons en retard.",
      "Facture les honoraires de la phase 2 : 4 800 EUR HT, envoie-la sur Qonto.",
    ],
  },
  {
    slug: "consultant",
    emoji: "\u{1F4BC}",
    badge: "Consultant",
    title: "Consultant / Coach indépendant",
    demandes: [
      "Fais-moi le point de 8h sur mes mails : ce qui presse, ce qui peut attendre.",
      "Relance les 5 prospects restés sans réponse après ma proposition.",
      "Crée une facture pour Bertrand : mission de mars, 3 200 EUR HT, conditions habituelles.",
      "J'ai un appel avec Angelo demain pour cadrer la mission : prépare-moi le sujet.",
      "Avec mes revenus et mes charges fixes, projette ma trésorerie sur 6 mois.",
    ],
  },
  {
    slug: "photographe",
    emoji: "\u{1F4F7}",
    badge: "Photographe",
    title: "Photographe",
    demandes: [
      "Réponds aux demandes de devis mail et Instagram avec mes formules mariage et corporate.",
      "Relance les 4 clients qui n'ont pas validé leur devis.",
      "Après chaque shooting, bloque 2 jours de retouche dans mon agenda.",
      "Facture le shooting de samedi : 850 EUR, envoie-la avec le lien de la galerie.",
      "Réponds sur Instagram : disponibilités, tarifs, délais de livraison.",
    ],
  },
  {
    slug: "garagiste",
    emoji: "\u{1F697}",
    badge: "Garagiste",
    title: "Garagiste / Mécanicien auto",
    demandes: [
      "Réponds au téléphone et prends les rendez-vous atelier, même à 21h.",
      "Fais un devis à partir de la panne décrite et du modèle du véhicule.",
      "Commande les plaquettes et les filtres manquants chez mon fournisseur habituel.",
      "Préviens les clients quand leur révision approche, selon le kilométrage.",
      "Chaque soir, le récap : véhicules rendus, devis en attente, planning de demain.",
    ],
  },
  // Deux profils hors metier, en fin de liste : ils elargissent la cible
  // au-dela des pros sans se melanger aux metiers.
  {
    slug: "chercheur-emploi",
    emoji: "\u{1F3AF}",
    badge: "Chercheur d'emploi",
    title: "Chercheur d'emploi",
    demandes: [
      "Chaque matin à 8h, les nouvelles offres qui collent à mon profil sur LinkedIn et Welcome to the Jungle.",
      "Adapte mon CV et ma lettre de motivation à cette offre de chef de projet.",
      "Relance les 6 recruteurs sans réponse depuis plus d'une semaine.",
      "Tiens mon tableau de candidatures à jour : envoyée, relancée, entretien.",
      "Entretien jeudi : prépare-moi les questions probables et les infos clés sur la boîte.",
    ],
  },
  {
    slug: "vie-personnelle",
    emoji: "\u{1F9D8}",
    badge: "Vie personnelle",
    title: "Vie personnelle",
    demandes: [
      "J'ai pas ouvert ma boîte mail depuis 2 jours : résume-moi les sujets importants, marque le reste comme lu.",
      "Trouve-moi un créneau chez l'ophtalmo sur Doctolib et cale-le dans mon agenda.",
      "Surveille mes abonnements et préviens-moi avant chaque renouvellement.",
      "Compare mon assurance auto et mon forfait mobile : dis-moi si je peux payer moins cher.",
      "Prépare le week-end à Lisbonne : itinéraire, budget, 3 options d'hôtel.",
    ],
  },
];

export function getMetier(slug) {
  return METIERS.find((m) => m.slug === slug);
}
