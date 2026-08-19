// Offre RAG : faire repondre une IA sur les documents d'un client sans que
// ces documents sortent de chez lui.
//
// RAG = le modele ne "connait" pas les documents. A chaque question, on va
// chercher les quelques passages pertinents et on ne lui donne QUE ceux-la.
// C'est pour ca que 20 000 documents tiennent sans probleme : le modele n'en
// voit jamais plus d'une quinzaine de paragraphes a la fois.

export const RAG_STEPS = [
  {
    step: "1",
    title: "Indexation",
    when: "Une fois au demarrage, puis a chaque nouveau document",
    what:
      "Chaque document est decoupe en passages de la taille d'un paragraphe. Un petit modele transforme chaque passage en coordonnees qui representent son SENS : deux passages qui parlent de la meme chose se retrouvent au meme endroit, meme sans mot commun.",
    cost:
      "Pour 20 000 documents : quelques centaines de milliers de passages, quelques Go sur le disque, une nuit de traitement. Ne se refait pas ensuite.",
  },
  {
    step: "2",
    title: "Recherche",
    when: "A chaque question, en une seconde",
    what:
      "La question est transformee de la meme facon, puis on remonte les 10 a 20 passages les plus proches. C'est une recherche par le sens, pas par mot-cle : une question sur les servitudes trouve un acte qui parle de droit de passage.",
    cost: "Instantane, meme sur une grosse base.",
  },
  {
    step: "3",
    title: "Reponse",
    when: "Dans la foulee",
    what:
      "Le modele recoit la question et uniquement ces passages, et redige la reponse en citant ses sources. Il ne voit jamais le reste de la base.",
    cost:
      "10 a 20 secondes avec un modele local. Compare aux 20 minutes de recherche manuelle, le client est gagnant.",
  },
];

// La question qui revient : outil du marche ou developpement maison.
export const RAG_BUILD_VS_BUY = [
  {
    name: "AnythingLLM",
    domain: "anythingllm.com",
    approach: "Outil pret a l'emploi",
    setup: "Quelques heures",
    handles:
      "Lecture des PDF/Word/mails, decoupage, reindexation, comptes et droits par utilisateur, affichage des sources, interface de discussion",
    limits:
      "Il faut faire avec ses choix. Toute logique tres specifique au metier se greffe autour, pas dedans.",
    verdict: { label: "A privilegier", tone: "good" },
  },
  {
    name: "Open WebUI",
    domain: "openwebui.com",
    approach: "Outil pret a l'emploi",
    setup: "Quelques heures",
    handles:
      "Interface de discussion soignee, multi-utilisateurs, RAG integre, se branche directement sur Ollama",
    limits: "Oriente interface de chat : la gestion documentaire est moins poussee qu'AnythingLLM.",
    verdict: { label: "Bonne alternative", tone: "good" },
  },
  {
    name: "Developpement maison",
    domain: null,
    approach: "Code sur mesure",
    setup: "Plusieurs semaines pour un resultat fiable",
    handles: "Exactement ce qu'on decide, integre au logiciel metier du client",
    limits:
      "Le prototype se fait en 200 lignes. Ce qui coute, c'est la suite : PDF scannes, decoupage qui ne casse pas un article en deux, reindexation, droits, affichage des sources. Ce travail est deja fait et maintenu dans les outils ci-dessus.",
    verdict: { label: "A eviter au depart", tone: "warn" },
  },
];

export const RAG_HARDWARE = [
  {
    name: "Poste de travail existant",
    domain: null,
    scope: "1 utilisateur, base modeste",
    detail:
      "Un ordinateur recent suffit pour tester et pour de petites bases. Lent des que la base grossit.",
    cost: "0 EUR",
    verdict: { label: "Pour tester", tone: "neutral" },
  },
  {
    name: "Machine dediee au cabinet",
    domain: null,
    scope: "1 a 5 utilisateurs, grosse base",
    detail:
      "Une machine posee dans le bureau, avec une carte graphique. Rien ne sort du local, jamais. C'est la configuration a proposer a un notaire ou un avocat.",
    cost: "Achat unique, plus installation et maintenance",
    verdict: { label: "L'offre serieuse", tone: "good" },
  },
  {
    name: "Serveur loue en France",
    domain: null,
    scope: "Plusieurs clients",
    detail:
      "Les donnees sortent du bureau mais restent en France, chez un hebergeur identifie. Compromis entre le cout et la souverainete.",
    cost: "Abonnement mensuel",
    verdict: { label: "Compromis", tone: "warn" },
  },
];

// Le risque a nommer explicitement devant un client : c'est ce qui protege
// le client ET celui qui vend l'outil.
export const RAG_WARNING = {
  title: "Le vrai risque n'est pas technique",
  body:
    "Un client pose une question, recoit une reponse fausse sur un point, et n'a aucun moyen de le savoir. D'ou deux regles non negociables : afficher systematiquement les passages sources sous chaque reponse, et positionner l'outil comme un moyen de RETROUVER les bons dossiers, jamais comme un moyen d'obtenir une reponse juridique ou medicale. Sur ces metiers, c'est aussi ce qui protege celui qui vend l'outil.",
};
