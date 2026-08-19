// Les questions que posent reellement les clients, avec la reponse courte.
// C'est l'entree principale de la page : on ne cherche pas "Anthropic", on
// cherche "j'ai des donnees medicales, je fais quoi".
export const CLIENT_QUESTIONS = [
  {
    q: "Ou vont mes donnees ?",
    a: "Dans deux endroits distincts, a ne pas confondre : le serveur qui heberge l'agent (chez moi, en France, certifie HDS) et le fournisseur du modele, qui recoit le texte des questions et des documents transmis. C'est le second qui determine si quelque chose sort de France.",
  },
  {
    q: "Je ne veux rien qui parte aux Etats-Unis ni en Chine.",
    a: "Deux precisions utiles. Un modele chinois telecharge et execute sur une machine en France n'envoie rien en Chine : c'est un fichier, le calcul se fait sur place. A l'inverse, un fournisseur americain avec des serveurs en Europe reste soumis au droit americain. Ce qui compte est donc QUI execute le calcul et sous quel droit, pas la nationalite de qui a entraine le modele.",
  },
  {
    q: "Je veux que tout reste chez moi, a 100 %.",
    a: "C'est possible : le modele tourne sur une machine posee dans vos locaux, aucune connexion sortante n'est necessaire. Il faut une machine dediee, et le modele est moins performant que les grands modeles en ligne. Sur de la recherche documentaire, la difference se voit peu ; sur du raisonnement complexe, elle se voit.",
  },
  {
    q: "J'ai des donnees de sante.",
    a: "L'hebergement doit etre certifie HDS - c'est le cas de mon serveur. Mais la certification couvre l'hebergement, pas le fournisseur de modele que l'agent appelle : les deux maillons doivent etre traites. Le detail des fournisseurs compatibles est dans le tableau ci-dessous.",
  },
  {
    q: "J'ai des donnees juridiques sensibles.",
    a: "Pas de certification obligatoire comme en sante, mais le secret professionnel s'applique. Deux options selon le niveau d'exigence : un fournisseur europeen avec engagement contractuel de non-reutilisation, ou du 100 % local si le client ne veut aucun tiers dans la chaine.",
  },
  {
    q: "Je veux du souverain, du francais.",
    a: "Possible sur les deux maillons : hebergement francais certifie HDS, et fournisseur de modele europeen. A verifier au cas par cas dans le tableau, la mention 'serveurs en Europe' ne suffisant pas a elle seule quand l'editeur est americain.",
  },
];
