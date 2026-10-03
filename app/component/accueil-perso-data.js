// Contenu de l'accueil perso (racine du domaine depuis le 28/09/2026).
//
// Tout ce qui se lit sur la page est ici, a part du dessin (PersoHomeContent) :
// ajouter un poste, un voyage ou brancher un recit ne demande pas de toucher a
// la mise en page. Les faits viennent du CV (public/cv/, un PDF par langue) et
// de ce que Nathan a dit lui-meme : rien d'arrondi a la hausse, rien d'invente.
//
// La page existe en francais et en anglais (langue du navigateur du visiteur,
// cf app/lib/i18n-projects.js). Un texte s'ecrit { fr, en } ; ce qui ne se lit
// pas (liens, logos, couleurs) est commun aux deux langues.
//
// `recit` : adresse de l'article qui raconte l'element (ex "/blog/kilimandjaro").
// Vide tant que le texte n'est pas ecrit : l'element s'affiche alors sans lien.

// Les textes de la page elle-meme (premier ecran, titres, liens de suite).
const TEXTES = {
  kicker: {
    fr: "Ingénieur · développeur · entrepreneur · voyageur",
    en: "Engineer · developer · entrepreneur · traveler",
  },
  intro: {
    fr: "Ingénieur, j'ai passé six ans dans l'industrie, entre Lyon et Prague. Aujourd'hui je suis co-fondateur et CTO de Mon Devis Dentaire, et je construis des IA qui travaillent pour les entreprises.",
    en: "I'm an engineer and spent six years in industry, between Lyon and Prague. Today I'm co-founder and CTO of Mon Devis Dentaire, and I build AI that works for businesses.",
  },
  aCote: {
    fr: "J'ai beaucoup voyagé et vécu des expériences incroyables dans de nombreux pays, que je raconte dans mes articles.",
    en: "I've traveled a lot and lived incredible experiences in many countries, which I write about in my articles.",
  },
  // Le CV "RESUME" du Drive de Nathan (version du 07/09/2026), une par langue.
  cv: { fr: "/cv/CV-Nathan-Knaebel-FR.pdf", en: "/cv/CV-Nathan-Knaebel-EN.pdf" },
  monCv: { fr: "Mon CV", en: "My CV" },
  mesProduits: { fr: "Mes produits", en: "My products" },
  // Les titres des rubriques, dans l'ordre de Nathan (ses libelles anglais :
  // WORK, STUDIES, PROJECTS, ARTICLES, TRAVEL, OTHERS). Le menu du haut les
  // repete dans Header.js.
  travail: { fr: "Travail", en: "Work" },
  etudes: { fr: "Études", en: "Studies" },
  projets: { fr: "Projets", en: "Projects" },
  articles: { fr: "Articles", en: "Articles" },
  voyages: { fr: "Voyages", en: "Travel" },
  autres: { fr: "Autres", en: "Others" },
  langues: { fr: "Langues", en: "Languages" },
  paysVisites: { fr: "pays visités", en: "countries visited" },
  carteAlt: {
    fr: "Carte du monde : les pays où j'ai voyagé sont en noir.",
    en: "World map: the countries I've traveled to are in black.",
  },
  tousLesProjets: { fr: "Tous mes projets", en: "All my projects" },
  // Le blog n'existe qu'en francais : on le dit plutot que de le cacher.
  articlesEnFrancais: { fr: "", en: "My articles are written in French." },
  tousLesArticles: { fr: "Tous les articles", en: "All articles" },
  formatDate: { fr: "fr-FR", en: "en-US" },
};

// Les produits, dans l'ordre de ce qui se vend le plus. Chaque carte porte la
// couleur de SON site (classe `da-*` de globals.css) : cliquer, c'est changer
// d'univers. `couverture` = le fond du bandeau image, dans les teintes du site
// vise (le NK orange et le renard ne se liraient pas sur leur propre couleur).
const PRODUITS = [
  {
    nom: { fr: "Agents IA sur mesure", en: "Custom AI agents" },
    da: "da-agents",
    href: "/agents",
    pour: { fr: "Pour une tâche précise", en: "For one specific task" },
    titre: {
      fr: "Un agent pour la tâche que vous n'aimez pas faire.",
      en: "An agent for the task you'd rather not do.",
    },
    texte: {
      fr: "Relancer vos devis, trier vos candidatures ou surveiller vos concurrents : l'agent s'en charge chaque jour à votre place.",
      en: "Following up on quotes, sorting job applications or watching competitors: the agent does it for you, every day.",
    },
    cta: { fr: "Voir les agents", en: "See the agents" },
    couverture: "bg-[#141414]",
    visuel: "/images/logo-nk.png",
    visuelClass: "h-20 w-20 rounded-2xl",
    evenement: "clic-accueil-produit-agents",
  },
  {
    nom: "Foxy",
    da: "da-foxy",
    href: "/foxy",
    pour: { fr: "Pour le chef d'entreprise", en: "For business owners" },
    titre: {
      fr: "Un bras droit qui connaît tout votre business.",
      en: "A right hand who knows your whole business.",
    },
    texte: {
      fr: "Vos mails, votre agenda, vos clients et vos tâches au même endroit. Vous lui parlez et il s'occupe du reste.",
      en: "Your emails, calendar, clients and tasks in one place. You talk to it, it handles the rest.",
    },
    cta: { fr: "Découvrir Foxy", en: "Discover Foxy" },
    couverture: "bg-[#241a15]",
    visuel: "/images/cover-aios.png",
    visuelClass: "h-32 w-32 object-contain",
    evenement: "clic-accueil-produit-foxy",
  },
  {
    nom: "Mon Devis Dentaire",
    da: "da-mdd",
    href: "https://mondevisdentaire.fr",
    pour: { fr: "Pour les cabinets dentaires", en: "For dental practices" },
    titre: {
      fr: "Aucun devis ne devrait rester au bord de la route.",
      en: "No quote should be left behind.",
    },
    texte: {
      fr: "L'IA explique chaque acte au patient en langage clair et des relances automatiques suivent les devis en attente.",
      en: "AI explains each procedure to the patient in plain language, and automatic reminders follow up on pending quotes.",
    },
    cta: { fr: "Voir le site", en: "Visit the site" },
    couverture: "bg-accent",
    visuel: "/images/cover-mdd.png",
    visuelClass: "h-24 w-auto rounded-xl object-contain shadow-lg",
    evenement: "clic-accueil-produit-mdd",
  },
  {
    nom: "Football Fight",
    da: "da-footballfight",
    href: "https://footballfight.app",
    pour: { fr: "Pour les fans de foot", en: "For football fans" },
    titre: {
      fr: "Le jeu de culture foot en 1 contre 1.",
      en: "The 1-vs-1 football knowledge game.",
    },
    texte: {
      fr: "Reliez les joueurs qui ont été coéquipiers, tenez la chaîne le plus longtemps possible et affrontez les autres.",
      en: "Link players who were teammates, keep the chain going as long as you can and take on other players.",
    },
    cta: { fr: "Jouer", en: "Play" },
    couverture: "bg-accent",
    visuel: "/images/cover-footballfight-blason.png",
    visuelClass: "h-32 w-32 object-contain",
    evenement: "clic-accueil-produit-footballfight",
  },
];

// 01 - Travail : du plus recent au plus ancien. Intitules avec majuscules et
// `points` (2 ou 3 realisations) tires du CV "RESUME" de Nathan (07/09/2026) ;
// les chiffres sont les siens, sauf "15+ cas d'usage vendus" (Nathan, 29/09).
const TRAVAIL = [
  {
    poste: { fr: "Concepteur d'Agents IA, Indépendant", en: "Freelance AI Agent Builder" },
    entreprise: { fr: "Foxy et agents sur mesure", en: "Foxy and custom agents" },
    dates: { fr: "2026 - aujourd'hui", en: "2026 - present" },
    points: {
      fr: [
        "Plus de 15 cas d'usage vendus, pour des entrepreneurs et des petites équipes.",
        "Plus de 20 agents à mon usage personnel, et mon propre AIOS, qui a donné naissance à Foxy.",
        "Architecture d'agents : outils branchés, mémoire, gestion du contexte.",
      ],
      en: [
        "15+ use cases sold to entrepreneurs and small teams.",
        "20+ agents for my own use, and my own AIOS, which gave birth to Foxy.",
        "Agent architecture: connected tools, memory, context management.",
      ],
    },
    logo: "/images/logo-nk.png",
  },
  {
    poste: { fr: "Co-Fondateur & CTO", en: "Co-Founder & CTO" },
    entreprise: {
      fr: "Mon Devis Dentaire, SaaS pour les cabinets dentaires",
      en: "Mon Devis Dentaire, SaaS for dental practices",
    },
    dates: { fr: "2025 - aujourd'hui", en: "2025 - present" },
    points: {
      fr: [
        "Roadmap produit : arbitrer entre les besoins des utilisateurs et les contraintes techniques.",
        "Acquisition client : canaux, campagnes, démos produit.",
        "Architecture et mise en production : automatisation, suivi des bugs, déploiement continu.",
      ],
      en: [
        "Product roadmap: prioritizing user needs against technical constraints.",
        "Customer acquisition: channels, campaigns, product demos.",
        "Architecture and CI/CD: automation, bug tracking, deployment.",
      ],
    },
    logo: "/images/parcours/mdd.svg",
    recit: "",
  },
  {
    poste: "Customer Quality Engineer",
    entreprise: {
      fr: "Continental, électronique automobile, Prague",
      en: "Continental, automotive electronics, Prague",
    },
    dates: "2023 - 2025",
    points: {
      fr: [
        "Interface qualité avec Renault : animation des réunions de résolution de problèmes avec le client, les équipes internes et les fournisseurs.",
        "Plus de 100 problèmes traités jusqu'à leur solution, sur un système d'affichage microélectronique.",
        "Deux audits IATF, et des visites Renault chaque semaine.",
      ],
      en: [
        "Managed the Renault quality interface and led problem-solving meetings with the customer, internal teams and suppliers.",
        "Handled 100+ 8D claims through to resolution on a microelectronic display solution.",
        "Took part in two IATF audits and weekly Renault visits.",
      ],
    },
    logo: "/images/parcours/continental.svg",
  },
  {
    poste: { fr: "Ingénieur Qualité Production", en: "Production Quality Engineer" },
    entreprise: {
      fr: "Gindre Duchavany, métallurgie du cuivre, Lyon",
      en: "Gindre Duchavany, copper metallurgy, Lyon",
    },
    dates: "2020 - 2022",
    points: {
      fr: [
        "Lancement d'une machine de dressage du cuivre, un investissement de plus d'un million d'euros : réglages, formation des opérateurs, standards.",
        "Pilotage d'un projet d'optimisation du flux de production (dressage et tréfilage) : gains en qualité, productivité et logistique.",
        "Mise en place d'un test métallographique en routine au laboratoire.",
      ],
      en: [
        "Launched a copper straightening machine, a €1M+ investment: settings, operator training, standards.",
        "Led a production flow optimization project (drawing and straightening): gains in quality, productivity and logistics.",
        "Made metallography testing a routine laboratory analysis.",
      ],
    },
    logo: "/images/parcours/gindre.svg",
  },
  {
    poste: { fr: "Ingénieur Qualité & Supply Chain", en: "Quality & Supply Chain Engineer" },
    entreprise: {
      fr: "Fresenius Medical Care, dispositifs médicaux, Lyon",
      en: "Fresenius Medical Care, medical devices, Lyon",
    },
    dates: "2018 - 2020",
    points: {
      fr: [
        "Qualité : analyse des produits défectueux pour remonter aux causes, création d'une défauthèque et formation des équipes.",
        "Supply chain : 15 % de stock dormant en moins en six mois dans l'entrepôt externe.",
        "Plannings logistiques automatisés (SAP, Excel) : 60 % de temps gagné sur les tâches répétitives.",
      ],
      en: [
        "Quality: analyzed defective products to trace root causes, built a defect library and trained the teams.",
        "Supply chain: 15% less idle inventory in six months at the external warehouse.",
        "Automated logistics planning (SAP, Excel): 60% less time on repetitive tasks.",
      ],
    },
    logo: "/images/parcours/fresenius.png",
  },
];

// 02 - Etudes (intitules du CV "RESUME").
const ETUDES = [
  {
    diplome: {
      fr: "Master Ingénieur & Chef de Projet",
      en: "Engineering Master's Degree & Project Management",
    },
    ecole: { fr: "École d'Ingénieurs CESI, Lyon", en: "CESI Engineering School, Lyon" },
    dates: "2016 - 2021",
    logo: "/images/parcours/cesi.png",
    recit: "",
  },
];

// Drapeaux en SVG (public/images/drapeaux) : Windows n'affiche pas les emojis
// drapeaux, il ecrit "FR" a la place.
const LANGUES = [
  {
    langue: { fr: "Français", en: "French" },
    niveau: { fr: "Langue maternelle (C2)", en: "Native (C2)" },
    drapeau: "/images/drapeaux/fr.svg",
  },
  {
    langue: { fr: "Anglais", en: "English" },
    niveau: { fr: "Courant (C2)", en: "Fluent (C2)" },
    drapeau: "/images/drapeaux/gb.svg",
  },
  {
    langue: { fr: "Espagnol", en: "Spanish" },
    niveau: { fr: "Intermédiaire (B1/B2)", en: "Intermediate (B1/B2)" },
    drapeau: "/images/drapeaux/es.svg",
  },
  {
    langue: { fr: "Tchèque", en: "Czech" },
    niveau: { fr: "Débutant (A1)", en: "Beginner (A1)" },
    drapeau: "/images/drapeaux/cz.svg",
  },
];

// 03 - Projets : les noms des projets de ProjectCards a montrer, produits
// compris (Nathan, 29/09 : ils sont AUSSI des projets). Leur nom et leur
// description en anglais vivent avec eux (`nameEn`, `descriptionEn`).
// Les projets clients de l'agence suivent les produits (03/10).
export const PROJETS_MONTRES = [
  "Agents IA sur-mesure",
  "Foxy",
  "Mon Devis Dentaire",
  "Football Fight",
  "FeatuRing",
  "BB.Booking",
  "Planning pour restaurants",
  "FetaFrance",
  "AI or Not",
  "Variante de Poker Japonais",
  "Insider Bot",
  "Fichage Notariat",
];

// 05 - Voyages. Legendes des photos volontairement sobres : seul le lieu qui
// est SUR (maillot "Strasbourg Athenes 2022" devant l'Acropole, nom du fichier
// pour Riga) est ecrit.
const PHOTOS = [
  {
    src: "/images/voyages/velo.webp",
    legende: { fr: "Strasbourg → Athènes, 2022", en: "Strasbourg → Athens, 2022" },
    alt: {
      fr: "Nathan brandit son vélo devant l'Acropole, à l'arrivée de Strasbourg-Athènes",
      en: "Nathan holds his bike up in front of the Acropolis, at the end of Strasbourg-Athens",
    },
  },
  {
    src: "/images/voyages/ascension.webp",
    legende: { fr: "Au sommet, au lever du soleil", en: "At the summit, at sunrise" },
    alt: {
      fr: "Nathan et son guide au sommet, au-dessus d'une mer de nuages",
      en: "Nathan and his guide at the summit, above a sea of clouds",
    },
  },
  {
    src: "/images/voyages/bateau.webp",
    legende: { fr: "Pause sur un lac de montagne", en: "A break on a mountain lake" },
    alt: {
      fr: "Nathan allongé dans une barque sur un lac entouré de montagnes",
      en: "Nathan lying in a rowing boat on a lake surrounded by mountains",
    },
  },
  {
    src: "/images/voyages/riga.webp",
    legende: "Riga",
    alt: {
      fr: "Nathan en chapka devant une église rouge à Riga",
      en: "Nathan in a fur hat in front of a red church in Riga",
    },
  },
];

// La carte des voyages (inspiree de marekdlugos.com/hobbies) : les pays
// visites, code ISO alpha-2 (celui de carte-monde.js). Liste donnee par Nathan
// le 29/09/2026 : la Sicile et les Acores comptent dans l'Italie et le
// Portugal ; Hong Kong et Macao comptent a part mais sont trop petits pour la
// carte (la Chine allumee les couvre). Ajouter un pays = ajouter une ligne ici,
// la carte (app/carte-voyages.svg) et le compteur suivent seuls.
const CONTINENTS = [
  { id: "europe", nom: { fr: "Europe", en: "Europe" } },
  { id: "asie", nom: { fr: "Asie", en: "Asia" } },
  { id: "afrique", nom: { fr: "Afrique", en: "Africa" } },
  { id: "ameriques", nom: { fr: "Amériques", en: "Americas" } },
];

const PAYS = [
  { code: "FR", continent: "europe", nom: { fr: "France", en: "France" } },
  { code: "ES", continent: "europe", nom: { fr: "Espagne", en: "Spain" } },
  { code: "PT", continent: "europe", nom: { fr: "Portugal", en: "Portugal" } },
  { code: "DE", continent: "europe", nom: { fr: "Allemagne", en: "Germany" } },
  { code: "CH", continent: "europe", nom: { fr: "Suisse", en: "Switzerland" } },
  { code: "IT", continent: "europe", nom: { fr: "Italie", en: "Italy" } },
  { code: "DK", continent: "europe", nom: { fr: "Danemark", en: "Denmark" } },
  { code: "NL", continent: "europe", nom: { fr: "Pays-Bas", en: "Netherlands" } },
  { code: "CZ", continent: "europe", nom: { fr: "Tchéquie", en: "Czechia" } },
  { code: "PL", continent: "europe", nom: { fr: "Pologne", en: "Poland" } },
  { code: "EE", continent: "europe", nom: { fr: "Estonie", en: "Estonia" } },
  { code: "LV", continent: "europe", nom: { fr: "Lettonie", en: "Latvia" } },
  { code: "AL", continent: "europe", nom: { fr: "Albanie", en: "Albania" } },
  { code: "HR", continent: "europe", nom: { fr: "Croatie", en: "Croatia" } },
  { code: "RS", continent: "europe", nom: { fr: "Serbie", en: "Serbia" } },
  { code: "TR", continent: "europe", nom: { fr: "Turquie", en: "Turkey" } },
  { code: "GR", continent: "europe", nom: { fr: "Grèce", en: "Greece" } },
  { code: "AT", continent: "europe", nom: { fr: "Autriche", en: "Austria" } },
  { code: "SK", continent: "europe", nom: { fr: "Slovaquie", en: "Slovakia" } },
  { code: "HU", continent: "europe", nom: { fr: "Hongrie", en: "Hungary" } },
  { code: "MA", continent: "afrique", nom: { fr: "Maroc", en: "Morocco" } },
  { code: "EG", continent: "afrique", nom: { fr: "Égypte", en: "Egypt" } },
  { code: "TZ", continent: "afrique", nom: { fr: "Tanzanie", en: "Tanzania" } },
  { code: "TH", continent: "asie", nom: { fr: "Thaïlande", en: "Thailand" } },
  { code: "IL", continent: "asie", nom: { fr: "Israël", en: "Israel" } },
  { code: "KH", continent: "asie", nom: { fr: "Cambodge", en: "Cambodia" } },
  { code: "LA", continent: "asie", nom: { fr: "Laos", en: "Laos" } },
  { code: "VN", continent: "asie", nom: { fr: "Vietnam", en: "Vietnam" } },
  { code: "CN", continent: "asie", nom: { fr: "Chine", en: "China" } },
  { code: "HK", continent: "asie", nom: { fr: "Hong Kong", en: "Hong Kong" } },
  { code: "MO", continent: "asie", nom: { fr: "Macao", en: "Macau" } },
  { code: "ID", continent: "asie", nom: { fr: "Indonésie", en: "Indonesia" } },
  { code: "PE", continent: "ameriques", nom: { fr: "Pérou", en: "Peru" } },
  { code: "BO", continent: "ameriques", nom: { fr: "Bolivie", en: "Bolivia" } },
  { code: "CL", continent: "ameriques", nom: { fr: "Chili", en: "Chile" } },
];

export const PAYS_VISITES = PAYS.map((p) => p.code);

const VOYAGES = [
  { titre: { fr: "Strasbourg → Athènes, à vélo", en: "Strasbourg → Athens, by bike" }, quand: "2022", recit: "" },
  { titre: { fr: "Prague → Belgrade, à vélo", en: "Prague → Belgrade, by bike" }, recit: "" },
  { titre: { fr: "L'ascension d'un volcan en Bolivie", en: "Climbing a volcano in Bolivia" }, recit: "" },
  { titre: { fr: "L'ascension du Kilimandjaro", en: "Climbing Kilimanjaro" }, recit: "" },
  {
    titre: {
      fr: "Six mois en Asie : Thaïlande, Laos, Cambodge, Vietnam, Chine, Indonésie",
      en: "Six months in Asia: Thailand, Laos, Cambodia, Vietnam, China, Indonesia",
    },
    recit: "",
  },
  {
    titre: { fr: "Lauréat de la Bourse Aventure Land Rover", en: "Winner of the Land Rover Adventure Competition" },
    recit: "",
  },
];

// 06 - Autres.
const AUTRES = [
  { titre: { fr: "Professeur bénévole en Tanzanie", en: "Volunteer teacher in Tanzania" }, recit: "" },
  {
    titre: { fr: "La construction d'une école en Tanzanie", en: "Building a school in Tanzania" },
    detail: { fr: "2 000 € collectés", en: "€2,000 raised" },
    recit: "",
  },
  { titre: { fr: "Un drone fait maison", en: "A home-made drone" }, detail: { fr: "C#, impression 3D", en: "C#, 3D printing" } },
  {
    titre: { fr: "Du sport", en: "Sports" },
    detail: {
      fr: "vélo au long cours, badminton, foot, volley, randonnée",
      en: "long-distance cycling, badminton, football, volleyball, hiking",
    },
  },
];

// Garde, champ par champ, la version de la langue demandee ; un champ sans
// traduction (lien, logo, nom propre) passe tel quel.
function traduire(element, lang) {
  return Object.fromEntries(
    Object.entries(element).map(([cle, valeur]) => [
      cle,
      valeur?.fr === undefined ? valeur : (valeur[lang] ?? valeur.fr),
    ])
  );
}

// Tout le contenu de l'accueil dans la langue du visiteur ("fr" ou "en").
export function contenuAccueil(lang) {
  const liste = (elements) => elements.map((element) => traduire(element, lang));
  const pays = liste(PAYS);
  // Les pays ranges par continent (continents sans pays omis), par ordre
  // alphabetique dans la langue du visiteur.
  const continents = liste(CONTINENTS)
    .map((c) => ({
      ...c,
      pays: pays
        .filter((p) => p.continent === c.id)
        .map((p) => p.nom)
        .sort((a, b) => a.localeCompare(b, lang)),
    }))
    .filter((c) => c.pays.length);
  return {
    nombrePays: pays.length,
    continents,
    textes: traduire(TEXTES, lang),
    produits: liste(PRODUITS),
    travail: liste(TRAVAIL),
    etudes: liste(ETUDES),
    langues: liste(LANGUES),
    photos: liste(PHOTOS),
    voyages: liste(VOYAGES),
    autres: liste(AUTRES),
  };
}
