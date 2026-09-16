// Questions frequentes PAR METIER, affichees sous chaque flyer (/metiers/[slug])
// et reprises dans son balisage FAQPage.
//
// Pourquoi par metier et pas une FAQ commune (16/09/2026) : une page qui
// melange des questions de tous horizons melange autant d'intentions de
// recherche, et personne ne lit 30 questions pour trouver la sienne. Chaque
// page de vente leve donc les objections de SON metier : le secret
// professionnel chez l'avocat, les donnees de sante chez le kine, le telephone
// pendant le service chez le restaurateur. Les questions transverses (prix,
// mois offert, securite generale) restent sur /agents.
//
// Regles d'ecriture : 3 a 5 questions, telles qu'un pro du metier les poserait ;
// aucune promesse d'integration ou de chiffre qu'on ne tient pas ; accents,
// pas de tiret cadratin. Texte nu (pas de **) : il part tel quel dans le JSON-LD.

export const FAQ_METIERS = {
  restaurateur: [
    {
      q: "Un agent IA peut-il vraiment prendre les réservations au téléphone pendant le service ?",
      a: "Oui. Il décroche quand personne ne peut le faire, note le nom, l'heure et le nombre de couverts puis vous envoie un résumé. Vous fixez à l'avance ce qu'il accepte seul (une table de 4 un mardi) et ce qu'il vous remonte (un groupe de 20 un samedi).",
    },
    {
      q: "Est-ce qu'il répond aux avis Google à ma place sans que je relise ?",
      a: "Vous choisissez. La plupart des restaurateurs laissent partir les réponses aux bons avis et relisent celles aux avis négatifs. Un avis sous 3 étoiles vous est toujours signalé avant toute réponse.",
    },
    {
      q: "Ça marche aussi pour un food truck qui change d'emplacement ?",
      a: "Oui, c'est même là que ça sert le plus. L'agent répond aux questions « vous êtes où ce soir ? » sur Instagram et Google à partir de votre planning de la semaine. Vous le tenez à jour une fois et il le répète toute la semaine.",
    },
    {
      q: "Il peut passer mes commandes fournisseurs ?",
      a: "Il prépare la commande à partir de votre seuil de stock et de vos habitudes. L'envoi au fournisseur attend votre validation tant que vous ne lui avez pas dit de le faire seul.",
    },
  ],
  musicien: [
    {
      q: "Comment un agent IA relance les élèves qui n'ont pas payé sans froisser personne ?",
      a: "Il écrit avec le ton que vous lui donnez et vous montre les premiers messages avant de les envoyer. Il sait qui a payé en lisant vos virements ou votre tableau de suivi, donc il ne relance jamais quelqu'un qui est à jour.",
    },
    {
      q: "Il peut gérer mes demandes sur Instagram ?",
      a: "Oui. Il répond aux questions simples comme les tarifs ou les créneaux d'essai et vous transmet tout ce qui demande votre avis, comme une proposition de concert ou une collaboration.",
    },
    {
      q: "Je suis intermittent, ma facturation est un peu particulière. Ça pose problème ?",
      a: "Non. L'agent prépare les factures et les relances à partir de ce que vous lui indiquez. Les déclarations liées au statut d'intermittent restent de votre ressort ou de celui de votre comptable : l'agent vous rappelle seulement les échéances.",
    },
  ],
  "agent-immobilier": [
    {
      q: "Un agent IA peut-il répondre aux demandes de visite SeLoger et Leboncoin ?",
      a: "Oui. Les demandes arrivent par mail : l'agent les lit, répond avec vos créneaux disponibles et inscrit la visite dans votre agenda. Il pose aussi vos questions de qualification (financement, délai) avant de caler le rendez-vous.",
    },
    {
      q: "Les annonces qu'il rédige sont-elles fiables ?",
      a: "Il écrit à partir de votre descriptif et de vos photos, jamais au-delà. Surface, DPE et charges viennent de vous : l'agent ne les invente pas. Vous relisez chaque annonce avant sa publication.",
    },
    {
      q: "Est-ce que ça remplace mon logiciel de transaction ?",
      a: "Non. L'agent travaille à côté de vos outils actuels et s'occupe de ce qui vous prend du temps entre deux visites : relances, comptes-rendus aux propriétaires, veille des annonces concurrentes.",
    },
    {
      q: "Mes mandats et les données de mes clients restent-ils confidentiels ?",
      a: "L'agent tourne sur un serveur qui vous est dédié et vos données ne servent à entraîner aucun modèle. Il n'accède qu'aux boîtes et aux dossiers que vous lui ouvrez.",
    },
  ],
  notaire: [
    {
      q: "Un agent IA est-il compatible avec le secret professionnel du notaire ?",
      a: "C'est la première question à trancher et on la tranche avant de brancher quoi que ce soit. L'agent tourne sur un serveur dédié à l'étude et ne sert à entraîner aucun modèle. Il n'accède qu'aux dossiers que vous lui ouvrez et chaque action est tracée. Dans les échanges, on travaille avec des numéros de dossier.",
    },
    {
      q: "Peut-il rédiger des actes ?",
      a: "Non, et ce n'est pas son rôle. Il prépare le terrain : récapitulatifs à partir des pièces reçues, liste des pièces manquantes, relances des clients. La rédaction et la signature restent entre vos mains.",
    },
    {
      q: "Comment gère-t-il les agendas de plusieurs associés ?",
      a: "Il lit les agendas partagés de l'étude et propose des créneaux de signature sans conflit. Le rendez-vous n'est confirmé au client qu'après votre accord.",
    },
  ],
  epicerie: [
    {
      q: "Comment l'agent sait-il qu'un produit arrive en rupture ?",
      a: "Il lit votre caisse ou votre tableau de stock quand ils sont accessibles. Sinon vous lui dites simplement « il reste 3 paquets ». Sous le seuil que vous avez fixé, il prépare la commande fournisseur et attend votre feu vert.",
    },
    {
      q: "Il peut faire le planning de mes employés ?",
      a: "Oui. Vous lui donnez les contraintes de chacun (heures du contrat, jours off, congés) et il propose un planning que vous validez avant de l'envoyer à l'équipe.",
    },
    {
      q: "Je ne suis pas à l'aise avec l'informatique, c'est un problème ?",
      a: "Non. Vous lui écrivez comme à un employé, par message ou à la voix. Le branchement de vos outils est fait avec vous au démarrage et vous n'avez rien à installer.",
    },
  ],
  electricien: [
    {
      q: "Je suis sur les chantiers toute la journée : comment l'agent répond à mes demandes de devis ?",
      a: "Il lit les demandes qui arrivent par mail ou par votre site. Il demande au client le type de travaux et des photos puis propose un passage selon votre agenda. Vous retrouvez le soir des demandes déjà qualifiées.",
    },
    {
      q: "Il peut vraiment faire un devis à partir d'un vocal ?",
      a: "Oui. Vous dictez le chantier en sortant de chez le client et l'agent met le devis en forme avec votre en-tête et vos tarifs. Aucun devis ne part chez le client sans votre relecture.",
    },
    {
      q: "Il fonctionne avec mon logiciel de devis ?",
      a: "Si votre logiciel permet d'y connecter un outil extérieur, l'agent l'utilise directement. Sinon il produit le devis en PDF et vous le glissez dans votre logiciel. On regarde ensemble votre cas au démarrage.",
    },
  ],
  plombier: [
    {
      q: "Un agent IA peut-il trier les vraies urgences la nuit ?",
      a: "Oui. Il décroche et pose les questions qui font la différence : la fuite est-elle active, l'eau est-elle coupée ? Il ne vous réveille que si c'est une vraie urgence selon vos critères. Le reste est noté pour 8h avec les coordonnées du client.",
    },
    {
      q: "Peut-il faire un devis à partir des photos du client ?",
      a: "Il prépare une première estimation à partir des photos et de votre grille de tarifs, puis vous la soumet. Sur une intervention incertaine, il propose plutôt un déplacement qu'un prix ferme.",
    },
    {
      q: "Comment se passe la relance des factures impayées ?",
      a: "Il repère les factures dépassées dans votre outil de facturation ou votre banque, envoie une relance polie puis une plus ferme si rien ne bouge. Vous gardez la main sur le ton et sur la dernière relance.",
    },
  ],
  coiffeur: [
    {
      q: "Un agent IA peut-il prendre les rendez-vous de mon salon par téléphone et SMS ?",
      a: "Oui. Il lit votre agenda, propose les créneaux libres adaptés à la prestation demandée et note le rendez-vous. Il le fait aussi le soir et le week-end, quand les clientes pensent à réserver.",
    },
    {
      q: "Il fonctionne avec mon logiciel de réservation en ligne ?",
      a: "Si votre logiciel donne un accès aux outils extérieurs, l'agent réserve directement dedans. Sinon il travaille sur un agenda que vous partagez avec lui. On vérifie votre cas avant de commencer.",
    },
    {
      q: "Relancer les clientes qui ne reviennent pas, ce n'est pas un peu insistant ?",
      a: "Un seul message court, avec vos créneaux libres, après le délai que vous choisissez. Pas de relance en boucle : une cliente qui ne répond pas n'est pas relancée une deuxième fois sans votre accord.",
    },
  ],
  avocat: [
    {
      q: "Un agent IA est-il compatible avec le secret professionnel de l'avocat ?",
      a: "On règle ce point avant tout branchement. L'agent tourne sur un serveur dédié au cabinet et vos données ne servent à entraîner aucun modèle. Il n'accède qu'aux dossiers que vous lui ouvrez et chaque consultation est tracée. Dans les échanges, on travaille par numéro de dossier.",
    },
    {
      q: "Peut-il rédiger mes conclusions ?",
      a: "Il prépare un premier brouillon à partir de votre trame et des pièces du dossier. Ce brouillon est un point de départ : l'analyse juridique, la vérification des sources et la signature restent les vôtres.",
    },
    {
      q: "Comment éviter de rater un délai de procédure ?",
      a: "L'agent tient la liste des échéances à partir de vos dossiers et de vos mails. Il vous alerte à l'avance selon le délai que vous choisissez puis vous relance si rien n'a bougé.",
    },
  ],
  "expert-comptable": [
    {
      q: "Un agent IA peut-il relancer les clients qui n'envoient pas leurs justificatifs ?",
      a: "Oui, c'est souvent la première tâche confiée. Il sait qui a envoyé quoi et relance seulement ceux qui manquent, avec la liste précise des pièces attendues. Les clients sensibles peuvent être exclus des relances automatiques.",
    },
    {
      q: "Est-ce qu'il se branche sur Pennylane ?",
      a: "Oui, Pennylane donne un accès aux outils extérieurs. L'agent peut y déposer les factures triées depuis les mails. Pour les autres logiciels, on vérifie au cas par cas ce qu'ils permettent.",
    },
    {
      q: "Il répond aux questions de mes clients à ma place ?",
      a: "Seulement aux questions récurrentes dont vous avez validé la réponse type : échéances, pièces à fournir, accès au portail. Tout ce qui relève du conseil vous est transmis. L'agent ne donne pas d'avis fiscal.",
    },
  ],
  kine: [
    {
      q: "Les notes de séance sont des données de santé : un agent IA peut-il les traiter ?",
      a: "Ce sont des données de santé et elles doivent être hébergées chez un hébergeur certifié HDS. On part donc de votre logiciel de cabinet et on définit ensemble ce que l'agent peut lire, avant de brancher quoi que ce soit. Les tâches administratives (agenda, liste d'attente, relances) ne demandent pas d'accès au dossier médical.",
    },
    {
      q: "Comment l'agent remplit-il un créneau annulé ?",
      a: "Dès qu'une annulation arrive, il propose le créneau par SMS aux patients de votre liste d'attente, dans l'ordre que vous avez défini. Le premier qui accepte est inscrit et les autres sont prévenus.",
    },
    {
      q: "Il fonctionne avec Doctolib ?",
      a: "Doctolib ne propose pas d'accès public à l'agenda des praticiens pour les outils extérieurs. L'agent travaille donc à côté : téléphone, SMS, liste d'attente et relances. On vérifie avec vous ce que votre outil de rendez-vous permet.",
    },
  ],
  "architecte-interieur": [
    {
      q: "Un agent IA peut-il préparer un moodboard ?",
      a: "Il prépare une première planche à partir des envies décrites par le client et de vos références. C'est une base de discussion : la direction artistique reste la vôtre.",
    },
    {
      q: "Il peut suivre mes artisans et mes livraisons ?",
      a: "Oui. Il lit les mails des artisans et des fournisseurs, repère les retards de livraison et vous les résume chaque matin. Il peut aussi relancer un artisan qui n'a pas confirmé sa date.",
    },
    {
      q: "Comment il relance un client qui ne valide pas un plan ?",
      a: "Après le délai que vous fixez, il envoie un rappel court avec le document concerné. Vous choisissez le ton, et un client important peut toujours passer par vous.",
    },
  ],
  consultant: [
    {
      q: "Un agent IA peut-il gérer ma prospection de consultant indépendant ?",
      a: "Il relance les prospects restés sans réponse après votre proposition, au rythme que vous choisissez, et vous signale ceux qui répondent. Il ne démarche pas de nouveaux contacts sans votre accord.",
    },
    {
      q: "Comment prépare-t-il un appel avec un client ?",
      a: "Il rassemble ce qu'il sait déjà : vos derniers échanges, la proposition envoyée, les informations publiques sur l'entreprise. Vous recevez une fiche courte avant l'appel.",
    },
    {
      q: "Ses projections de trésorerie sont-elles fiables ?",
      a: "Elles sont aussi fiables que les chiffres que vous lui donnez : revenus, charges fixes, missions signées. C'est un outil pour voir venir, pas un prévisionnel certifié par un expert-comptable.",
    },
  ],
  photographe: [
    {
      q: "Un agent IA peut-il répondre aux demandes de devis de photographe ?",
      a: "Oui. Il répond par mail et sur Instagram avec vos formules mariage ou corporate. Il vérifie votre disponibilité à la date demandée et vous transmet les demandes hors formule.",
    },
    {
      q: "Il peut bloquer mon temps de retouche ?",
      a: "Oui. Après chaque shooting inscrit à l'agenda, il bloque les jours de retouche que vous avez définis. Vous ne vous retrouvez plus avec trois livraisons la même semaine.",
    },
    {
      q: "Est-ce qu'il touche à mes photos ?",
      a: "Non. L'agent gère l'administratif : les devis et les factures, le planning et l'envoi du lien de galerie. Le tri et la retouche restent votre travail.",
    },
  ],
  garagiste: [
    {
      q: "Un agent IA peut-il prendre les rendez-vous de mon atelier au téléphone ?",
      a: "Oui. Il décroche quand vous êtes sous un véhicule ou après la fermeture, note le véhicule et la panne décrite puis propose un créneau selon le planning de l'atelier.",
    },
    {
      q: "Peut-il faire un devis à partir d'une panne décrite par le client ?",
      a: "Il prépare une estimation à partir de la description, du modèle et de vos tarifs, puis vous la soumet. Une panne floue donne un rendez-vous de diagnostic plutôt qu'un prix.",
    },
    {
      q: "Comment il sait quand la révision d'un client approche ?",
      a: "À partir de l'historique de vos interventions : date et kilométrage de la dernière révision. Il prévient le client au moment que vous choisissez et lui propose un créneau.",
    },
  ],
  "chercheur-emploi": [
    {
      q: "Un agent IA peut-il chercher des offres d'emploi pour moi ?",
      a: "Oui. Il parcourt chaque matin les nouvelles offres qui collent à votre poste et à votre ville et vous envoie une liste courte plutôt que cent annonces.",
    },
    {
      q: "Adapter mon CV à chaque offre, ce n'est pas tricher ?",
      a: "Non, tant qu'il ne vous invente pas d'expérience. L'agent met en avant ce qui compte pour ce poste dans votre vrai parcours et vous relisez avant l'envoi.",
    },
    {
      q: "Il postule à ma place ?",
      a: "Il prépare la candidature et tient votre tableau de suivi à jour. L'envoi reste votre geste, pour que chaque candidature soit une vraie décision.",
    },
  ],
  "vie-personnelle": [
    {
      q: "À quoi sert un agent IA dans la vie personnelle ?",
      a: "À tout ce qui traîne : la boîte mail qui déborde, les rendez-vous à caler et les abonnements qui se renouvellent sans prévenir. Il s'en occupe et vous résume l'essentiel.",
    },
    {
      q: "Est-ce qu'il peut payer ou résilier à ma place ?",
      a: "Non, pas sans vous. Il prépare la résiliation ou la comparaison et vous montre le résultat. Tout ce qui engage votre argent attend votre validation.",
    },
    {
      q: "Mes mails personnels restent-ils privés ?",
      a: "L'agent tourne sur un serveur qui vous est dédié et vos données ne servent à entraîner aucun modèle. Vous pouvez lui retirer l'accès à votre boîte en un clic.",
    },
  ],
};

export function getFaqMetier(slug) {
  return FAQ_METIERS[slug] || [];
}
