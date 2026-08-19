// Objections clients, en fin de page. Réponses factuelles : ce sont des
// arguments à réutiliser tels quels en rendez-vous, pas des accroches.
//
// La distinction qui structure toutes les réponses : l'hébergement de
// l'agent et le fournisseur du modèle sont deux maillons séparés. Le
// premier ne protège rien si le second est ailleurs.
export const CLIENT_QUESTIONS = [
  {
    q: "Où vont mes données ?",
    a: "Deux destinations distinctes. L'agent, ses fichiers et ses journaux vivent sur mon serveur Dedibox en France, certifié HDS. Le texte des questions et le contenu des documents transmis partent chez le fournisseur du modèle choisi, dont la localisation figure dans le tableau ci-dessus. C'est ce second maillon qui détermine si une donnée sort de France.",
  },
  {
    q: "Je ne veux rien qui parte aux États-Unis ni en Chine.",
    a: "Ce qui compte est le lieu du calcul et le droit applicable, pas la nationalité de l'éditeur du modèle. Un modèle chinois à poids ouverts, téléchargé et exécuté sur un serveur français, n'envoie rien en Chine : c'est un fichier exécuté sur place. À l'inverse, un fournisseur américain avec des serveurs en Europe reste soumis au droit américain, sa filiale européenne comprise.",
  },
  {
    q: "Je veux que tout reste chez moi, à 100 %.",
    a: "Réalisable : le modèle s'exécute sur une machine dans vos locaux, sans connexion sortante nécessaire. Contreparties : une machine dédiée à acheter et à maintenir, et un modèle moins performant que les grands modèles en ligne. L'écart est faible sur la recherche documentaire, net sur le raisonnement complexe et la rédaction longue.",
  },
  {
    q: "J'ai des données de santé.",
    a: "L'hébergement doit être certifié HDS : c'est le cas de mon serveur. Mais la certification couvre l'hébergement, pas le fournisseur de modèle appelé depuis ce serveur. Les deux maillons doivent être traités séparément, et la colonne « données de santé » du tableau indique lesquels sont utilisables.",
  },
  {
    q: "J'ai des données juridiques sensibles.",
    a: "Aucune certification obligatoire comme en santé, mais le secret professionnel s'applique et engage votre responsabilité. Deux niveaux possibles : un fournisseur européen avec engagement contractuel de non-réutilisation et rétention nulle, ou une exécution entièrement locale si aucun tiers ne doit figurer dans la chaîne.",
  },
  {
    q: "Je veux du souverain, du français.",
    a: "Possible sur les deux maillons : hébergement français certifié HDS, et fournisseur de modèle européen. À vérifier ligne par ligne dans le tableau : la mention « serveurs en Europe » ne suffit pas lorsque l'éditeur est américain, c'est la colonne « droit applicable » qui tranche.",
  },
  {
    q: "Combien ça coûte par rapport à une API classique ?",
    a: "Une API se paie à l'usage, sans investissement initial. Une machine locale demande un achat puis coûte l'électricité. Le seuil de bascule dépend du volume réel de tokens traités chaque mois : les ordres de grandeur figurent dans le tableau matériel.",
  },
];
