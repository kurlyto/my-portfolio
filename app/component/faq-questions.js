// Source unique des questions de la FAQ.
//
// Ce module n'est volontairement PAS marque "use client" : il est lu a la fois
// par Faq.js (composant client, qui les affiche) et par app/page.js (composant
// serveur, qui en genere le balisage FAQPage). Une valeur exportee depuis un
// module "use client" et importee cote serveur n'arrive pas comme un tableau
// mais comme une reference client - le .map() casse alors le build.
//
// Les deux usages doivent rester sur cette liste : Google traite un FAQPage
// annoncant des questions absentes de l'ecran comme du balisage trompeur.
//
// Questions volontairement primaires : la cible est quelqu'un qui n'a jamais
// utilise d'agent IA et qui se demande d'abord "concretement, ca fait quoi et
// est-ce que ca touche a mes donnees".
//
// Les passages entre **doubles asterisques** sont les phrases cles de chaque
// reponse : Faq.js les affiche en gras orange pour que la reponse se scanne
// d'un coup d'oeil. Le balisage FAQPage (page.js) les retire via
// stripEmphasis() : Google doit recevoir du texte nu.
export const QUESTIONS = [
  {
    q: "Qu'est-ce que peut faire mon agent ?",
    a: "Tout ce qui est répétitif et passe par un écran. Il lit vos mails et y répond, remplit un tableau, relance un client, surveille un site, prépare un devis, trie des documents et vous fait un résumé chaque matin. **Si vous savez expliquer la tâche à un stagiaire, un agent peut la faire.** Contrairement à un logiciel classique il comprend le langage courant et gère donc aussi les cas un peu flous.",
  },
  {
    q: "Comment mon agent accède à mes applications ?",
    a: "Vous lui donnez un accès **exactement comme à un nouveau collaborateur**. Le plus souvent vous cliquez sur « autoriser » depuis votre compte Google, Microsoft ou votre CRM. Sinon l'outil fournit une clé que l'on confie à l'agent. Vous choisissez ce qu'il peut voir et faire et **vous pouvez lui retirer l'accès à tout moment** en un clic sans rien casser.",
  },
  {
    q: "Est-ce que mes données sont en sécurité ?",
    a: "L'agent tourne sur **un serveur dédié** et non sur une plateforme publique où vos données serviraient à entraîner un modèle. Il n'accède qu'aux outils que vous avez autorisés. **Tout ce qu'il fait est tracé** et vous pouvez relire ce qu'il a consulté ou envoyé.",
  },
  {
    q: "Est-ce que je dois savoir coder ou m'en occuper tous les jours ?",
    a: "Non. **Vous lui écrivez normalement comme à un collègue** sur WhatsApp, Telegram, par mail ou dans votre navigateur. Une fois en place il travaille seul et vous prévient quand il a besoin de vous. **Il n'y a rien à installer ni à maintenir** de votre côté.",
  },
  {
    q: "Faut-il changer mes outils actuels ?",
    a: "Non. **L'agent vient se brancher sur ce que vous utilisez déjà.** Vos mails, votre tableur, votre logiciel métier et votre agenda restent en place. Personne dans l'équipe n'a de nouvelle interface à apprendre.",
  },
  {
    q: "Et si l'agent se trompe ?",
    a: "On définit ensemble ce qu'il fait tout seul et ce qui doit passer par vous. En pratique **un envoi, un paiement ou une suppression attend toujours votre validation** et le reste est automatique. Les premières semaines on regarde ce qu'il produit pour l'ajuster.",
  },
  {
    q: "Combien de temps avant que ça tourne ?",
    a: "Un premier agent utile est en général **en place en quelques jours**. Les cas qui touchent à plusieurs outils prennent quelques semaines. On commence toujours par une tâche précise qui marche plutôt que par un grand système qui n'arrive jamais.",
  },
  {
    q: "Combien ça coûte et comment marche le mois offert ?",
    a: "Vous testez votre agent **gratuitement pendant un mois et sans engagement d'achat**. On le construit et il tourne chez vous. Vous voyez concrètement ce qu'il vous fait gagner avant de payer quoi que ce soit. Ensuite le prix dépend de la tâche car un agent simple n'a rien à voir avec un système branché sur cinq outils. Décrivez votre besoin à Nate et il vous donne un ordre de grandeur tout de suite.",
  },
];

// Retire les marqueurs d'emphase pour les usages qui exigent du texte nu
// (balisage FAQPage, meta descriptions).
export function stripEmphasis(text) {
  return text.split("**").join("");
}
