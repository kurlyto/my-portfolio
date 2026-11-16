---
titre: "Mon IA remplit les formulaires dans mon propre navigateur"
description: "Depuis septembre mon assistant remplit des formulaires dans mon propre Chrome et Jev lui fait gagner un temps fou. Je vous montre comment il s'y prend et j'avoue aussi que je protège encore mal mon navigateur."
date: 2027-01-21
format: tutoriel
grappe: perso
mot_cle: "ia remplir formulaire"
statut: brouillon
mots_cles: ["IA remplir formulaire", "extension Chrome IA", "agent navigateur", "Jev", "TypeSafe", "sécurité navigateur"]
lire_aussi: ["/blog/jev-typesafe-ia-qui-decide", "/blog/prompt-injection-mail", "/agents"]
---
Un soir je dois créer un compte sur un logiciel en ligne pour l'essayer. Le formulaire compte une vingtaine de champs avec une liste de pays interminable, une case pour les conditions et un code de vérification envoyé par mail. Je tape une phrase dans le chat de mon assistant et je retourne à ce que je faisais. Quand je reviens sur l'onglet, tout est rempli et un seul bouton m'attend, encadré en rouge.

Mon assistant IA agit dans le Chrome où je suis déjà connecté partout et il le fait grâce à une petite extension que j'ai écrite. Il lit la page, remplit les champs et clique sur Suivant, puis il s'arrête devant tout ce qui engage, comme payer, envoyer ou signer.

## Pourquoi mon propre navigateur

Au départ mon IA se promenait sur le web dans un Chrome à part que j'avais installé sur mon serveur. Elle s'en sortait très bien sur les pages publiques et butait dès qu'il fallait se connecter, parce que chaque site redemandait un identifiant qu'elle n'avait pas et un code envoyé sur mon téléphone.

Mon Chrome à moi a déjà tout ça. Les sessions sont ouvertes, le gestionnaire de mots de passe connaît mes comptes et je vois chaque geste en direct si j'en ai envie. Faire travailler l'IA ici revient à prêter son bureau à un assistant plutôt que de lui en monter un vide à l'autre bout de la ville.

## L'extension qui reçoit les ordres

L'extension tourne en fond dès que Chrome est ouvert. Mon assistant vit sur mon serveur et lui envoie des ordres simples comme ouvrir une page, la lire, cliquer ou taper un texte. Elle travaille dans un onglet caché, si bien que je reste sur ce que je faisais et qu'un panneau sur le côté affiche chaque geste.

Pour décrire une page à l'IA l'extension n'envoie pas de capture d'écran. Elle dresse une liste numérotée de tout ce qu'on peut toucher (champs, boutons, cases) et l'IA répond « tape ceci dans le 11 » ou « clique sur le 24 ». Sur la page d'accueil d'un site de billets de train, cette liste pèse 3 Ko quand le code de la page en pèse 737. C'est la différence entre une carte postale et un annuaire, et n'importe quel petit modèle lit une carte postale.

Les connexions se font comme je les ferais moi-même. Le gestionnaire de mots de passe de Chrome pose le mot de passe et **l'IA ne le lit jamais**. Un code reçu par mail, elle va le chercher dans ma boîte et elle le tape. Le code reçu par SMS reste pour moi puisqu'il arrive sur mon téléphone.

## Le remplissage avec Jev

Au début Claude remplissait les formulaires champ par champ. Il regardait la page, réfléchissait, tapait une valeur puis regardait de nouveau. J'ai mesuré ce rythme sur mes journaux et il fallait entre deux et six minutes par formulaire, dont plus de la moitié passée à réfléchir entre deux gestes.

Fin septembre j'ai confié ce travail à [Jev](/blog/jev-typesafe-ia-qui-decide), le modèle de TypeSafe qui n'écrit rien et se contente de choisir. Remplir un formulaire consiste surtout à choisir. Quelle information de ma fiche va dans ce champ ? Quelle option de la liste ? Faut-il cocher la case ? Jev commence par trancher en tant que qui je remplis, parce que je ne m'inscris pas partout avec la même adresse selon que c'est pour moi ou pour une de mes sociétés. Il désigne ensuite, pour chaque champ et en un seul appel, la bonne information avec une probabilité. Le programme recopie la vraie valeur.

Tout ce qui demande d'écrire revient à Claude. C'est le cas d'une question ouverte comme « Comment nous avez-vous connus ? » et de tout champ où Jev est sûr à moins de 70 %. Sur mon banc d'essai de quatre formulaires et 44 champs, Jev en a rempli 43 justes en une demi-seconde et il a laissé le dernier à Claude plutôt que de deviner. Claude seul mettait quinze à vingt secondes sur les mêmes. J'aime bien ce partage du travail entre un modèle qui tranche vite et un autre qui sait écrire.

Jev tourne aux États-Unis et je n'avais pas envie de lui confier mon adresse. Il ne voit donc jamais mes informations. Il reçoit le nom de chaque case de ma fiche avec une description en anglais sans aucun nom propre, et toute valeur qui m'appartient est remplacée par son étiquette avant le départ, jusque dans le texte de la page. Il désigne une case et c'est mon serveur qui la remplit.

## Une inscription de bout en bout

1. Je tape ma demande dans le chat, en une phrase, avec le lien du site.
2. L'extension ouvre la page dans un onglet caché et accepte le bandeau de cookies.
3. Jev choisit l'identité puis remplit les champs qu'il sait remplir.
4. Claude rédige les réponses libres et reprend les champs où Jev hésitait.
5. La case des conditions d'utilisation est cochée d'office.
6. Si le site envoie un code par mail, l'IA le lit dans la bonne boîte et le tape.
7. Le bouton final est bloqué et une notification arrive sur mon téléphone. Je relis puis je clique.

Les cases à cocher « habillées » et les listes qui ne sont pas de vraies listes ont donné du fil à retordre. L'extension les repère maintenant et Claude ouvre la liste, la lit puis clique sur la bonne option.

## Le bouton final

Payer, envoyer, soumettre, valider, signer, déclarer et supprimer : ces boutons me sont réservés. La règle n'est pas écrite dans les consignes de l'IA, où une page bien tournée pourrait la lui faire oublier. Elle est écrite dans le code de l'extension, qui refuse le clic, encadre le bouton en rouge et me prévient sur mon téléphone. Même quand je dis à mon assistant « envoie », il me passe l'onglet et c'est moi qui appuie.

Je tiens à cette frontière parce qu'une erreur de remplissage se corrige en dix secondes. Un paiement parti ou un dossier déposé au mauvais nom ne se rattrape pas aussi facilement.

## Les sites qui résistent

Certains sites se dessinent mal dans un onglet caché. Chrome économise ses forces sur les onglets qu'on ne regarde pas et des éditeurs de texte un peu sophistiqués refusent alors d'enregistrer. La parade consiste à afficher l'onglet un instant, et c'est moi qui décide quand.

La fenêtre où Google redemande « confirmez que c'est bien vous » échappe complètement à l'extension et je la valide à la main. Les captchas à images passent une fois sur deux. L'IA les tente d'abord et elle m'appelle seulement quand elle a vraiment échoué. Enfin, un site qui change sa page entre deux gestes oblige à relire la liste numérotée, faute de quoi on clique à côté.

## Comment je protège mon navigateur

Honnêtement je fais encore pas grand-chose pour le protéger. Trois protections tiennent vraiment : le bouton final verrouillé dans le code, le mot de passe que l'IA ne voit jamais et le masquage de mes informations avant qu'elles partent chez Jev. Le reste tient surtout à la confiance, et j'en suis le premier gêné.

L'extension a les clés de toute la maison. Elle peut lire et agir sur tous les sites, et pour faire de vrais clics elle pilote Chrome comme un outil de développeur, ce qui fait apparaître un bandeau « AIOS débogue ce navigateur ». Elle travaille dans mon Chrome principal, celui où ma banque et mes mails sont ouverts. Son cerveau se met en plus à jour tout seul depuis mon serveur. C'est très pratique pour corriger un bug sans rien réinstaller. Si quelqu'un prenait un jour la main sur ce serveur, l'extension obéirait sans broncher à son nouveau maître.

Reste le risque que je connais le mieux. Une page web peut cacher des phrases écrites pour l'IA qui la lit et elle marche alors exactement comme [un mail piégé](/blog/prompt-injection-mail). J'ai écrit une garde qui coupe toute sortie de données dès que l'IA a lu un contenu étranger, mais elle n'est pas encore branchée. Seule une veille tourne aujourd'hui, et elle signale les textes suspects sans rien bloquer.

Le premier geste qui me paraît évident serait de sortir l'IA de mon Chrome principal. Un profil Chrome à part, connecté seulement aux sites où elle travaille, lui retirerait d'un coup la banque et tout ce qu'elle n'a pas à voir. Si vous installez une extension qui donne des mains à une IA, faites-le chez vous dès le premier jour. Créez-lui son propre profil Chrome et réglez son accès aux sites dans la page des extensions.

Je lui ai donné mon propre navigateur parce que c'était le plus simple. Il me reste à lui en donner un à elle.

