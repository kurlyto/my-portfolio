---
titre: "La mémoire colossale de mon assistant"
description: "Les IA oublient tout d'une conversation à l'autre alors j'ai donné une mémoire à mon assistant. Je vous montre comment il range plus de 700 fiches et comment il retrouve la bonne au moment où il en a besoin."
date: 2026-11-30
format: explicatif
grappe: foxy
mot_cle: "memoire agent ia"
image_carte: "/blog/memoire-assistant-ia/couverture-v2.jpg"
image_partage: "/blog/memoire-assistant-ia/couverture-v2.jpg"
statut: brouillon
mots_cles: ["mémoire agent IA", "mémoire IA", "assistant IA", "Claude", "base de connaissances", "Foxy"]
lire_aussi: ["/blog/reunion-taches-ia-notion", "/blog/agent-ia-definition", "/"]
---
Le 26 août dernier, j'ai repris mon assistant une fois de trop sur un tiret long glissé dans un de mes textes. Il a noté la règle dans sa mémoire le jour même et il la relit depuis au début de chaque session.

Un modèle d'IA comme Claude ou ChatGPT repart de zéro à chaque nouvelle conversation. La mémoire d'un assistant IA est un ensemble de notes qu'il écrit lui-même au fil du travail et qu'il relit au bon moment pour ne pas reposer deux fois la même question ni refaire deux fois la même erreur.

Le principe a plus d'un siècle. En 1895 les Belges Paul Otlet et Henri La Fontaine se sont mis en tête de ranger sur fiches tout le savoir imprimé du monde. Leur Répertoire bibliographique universel a fini par compter 18 millions de fiches de 12,5 cm sur 7,5 cm. Elles étaient classées dans des meubles à tiroirs dessinés par les deux hommes et une partie orne encore les murs du Mundaneum de Mons.

<figure>
<img src="/blog/memoire-assistant-ia/mundaneum-repertoire-otlet.webp" alt="Un grand meuble en bois à dizaines de petits tiroirs étiquetés, surmonté d'un bandeau peint « Répertoire bibliographique universel »" width="1268" height="1128" loading="lazy">
<figcaption>Une partie du Répertoire bibliographique universel de Paul Otlet, exposée au Mundaneum de Mons et inscrite depuis 2013 au registre Mémoire du monde de l'Unesco.<span class="credit">Photo : Zinneke, CC BY-SA 3.0, via Wikimedia Commons.</span></figcaption>
</figure>

Mon assistant joue dans une catégorie plus modeste. Le 17 novembre 2026, quand j'ai compté, sa mémoire tenait 723 fiches et 50 autres dormaient aux archives. À côté de ces fiches, il a écrit 216 savoir-faire, des modes d'emploi pour les tâches qu'il refait souvent. Pour un indépendant et son assistant, ça fait déjà une belle armoire. Je la tiens aujourd'hui pour la partie la plus précieuse de tout le système et elle pèse plus lourd que le code.

## Une IA qui oublie tout

Prenez un assistant IA sans mémoire et racontez-lui vos habitudes un lundi. Le mardi, dans une nouvelle conversation, il les a oubliées et vous recommencez. Au bout d'un mois on répète les mêmes consignes comme à un stagiaire qui changerait tous les matins.

Coder est devenu la partie banale de mon métier, parce qu'un modèle écrit en un après-midi un outil qui m'aurait pris des jours. La différence se joue dans le savoir qui s'accumule au fil des mois : chaque correction que je donne, chaque piège rencontré sur un serveur et chaque habitude d'un projet. Si l'assistant ne retrouve pas tout ça seul, il reste un très bon exécutant qui débarque chaque matin.

Prenons un exemple très concret. Mon serveur compte les heures en temps universel et il a une ou deux heures de retard sur la France. Quand un programme y affiche 12 h 33, mon assistant m'annonce 14 h 33 sans que j'aie à le préciser, parce que la règle est écrite quelque part et qu'il la relit. Sans elle, il me donnerait l'heure du serveur et je ferais le calcul moi-même.

## Une fiche par fait

La mémoire de mon assistant est une armoire de fichiers texte. Chaque fiche porte un seul fait durable : une règle que je lui ai donnée, un incident et sa cause, l'état d'un chantier ou la façon d'accéder à un outil. En tête, elle dit pour quel projet elle vaut et si elle est née d'une discussion ou d'une remarque que j'ai dû répéter.

<figure>
<div class="message"><div class="expediteur"><span>Fiche · règle</span><span>26/08/2026</span></div><p class="ligne"><strong>Jamais de tiret long</strong></p><p class="ligne">Elle vaut pour tous les textes.</p><p class="ligne">Elle est née d'une remarque répétée plusieurs fois.</p><p class="ligne">Le tiret long trahit un texte écrit par une IA. On le remplace par un tiret simple ou par deux points.</p></div>
<figcaption>Une fiche reconstituée pour l'exemple : un seul fait avec son origine et le projet où il s'applique.</figcaption>
</figure>

Une armoire de 723 fiches ne se relit pas en entier à chaque conversation, parce que ça coûterait une fortune et noierait l'assistant sous des détails inutiles. Au démarrage il ne reçoit qu'un sommaire très court, rangé comme une bibliothèque en rayons, avec un rayon par projet et un dernier pour les règles qui valent partout. Chaque ligne de ce sommaire sert d'aiguillage vers une page de rayon qui renvoie à son tour vers les fiches. Dès qu'un sujet tombe dans la conversation, l'assistant ouvre le bon rayon avant de répondre.

J'ai longtemps cru qu'un sommaire plus riche l'aiderait à se souvenir. On l'a mesuré en septembre et c'est l'inverse qui s'est produit. Entre le 8 et le 19 septembre, le sommaire est passé de 17 000 à 23 000 caractères et le score de rappel est tombé de 17 bonnes réponses sur 19 à 15. Chaque session y ajoutait ses détails du jour et ce gras noyait les mots qui servent à trouver la bonne fiche. Depuis, une ligne du sommaire porte les mots du sujet et trois mots d'état, et tout le reste vit dans la fiche.

L'autre leçon tient en une phrase : une fiche absente du sommaire est invisible. Elle existe sur le disque et personne ne la relira jamais. En août, on a découvert que 41 renvois entre fiches sur 121 menaient dans le vide pour une bête histoire de tirets et de soulignés dans les noms de fichiers. Un contrôle automatique vérifie depuis les fiches orphelines et les renvois cassés.

## La recherche dans les fiches

Un sommaire a ses angles morts. Certaines réponses vivent au fond d'une fiche dont le titre parle d'autre chose, et aucune ligne de sommaire ne peut tout annoncer. Pour ces cas-là, l'assistant a appris un second réflexe : avant de répondre de tête ou de dire qu'il ne sait pas, il fouille le texte de toutes les fiches.

Cette recherche tourne sur mon serveur sans appeler d'IA et elle ne coûte donc rien. Le jour où on l'a mise en place, elle a sorti la bonne fiche en première position sur les deux questions que le sommaire ratait. J'aime bien l'image du bibliothécaire qui connaît ses rayons par cœur et qui sait aussi quand il faut aller ouvrir les tiroirs.

## Le ménage du dimanche

Une mémoire qui ne fait que grossir finit par s'étouffer. Chaque lecture de fiche est notée dans un journal, si bien qu'on sait lesquelles servent et lesquelles dorment. Le dimanche matin, un programme passe dans les rayons et repère les fiches que personne n'a ouvertes depuis longtemps. Il les propose à l'archivage et je confirme moi-même depuis le 11 novembre, parce qu'une fiche rarement lue peut porter une règle précieuse le jour où le sujet revient.

Rien n'est jamais effacé. Une fiche archivée part dans un tiroir à part d'où on la ressort en une seconde, et une fiche devenue fausse est marquée comme remplacée avec un renvoi vers la nouvelle. La trace datée garde sa valeur parce qu'elle explique pourquoi une règle existe.

Juste après ce ménage, un second passage cherche des liens entre les fiches de la semaine et les plus anciennes. Il remarque par exemple qu'une nouvelle décision contredit une vieille fiche ou qu'une règle s'applique à un chantier ouvert la veille. Ces liens ne s'écrivent pas tout seuls et on ne garde que ceux qui tiennent debout, parce qu'un lien faux égare l'assistant pendant des mois.

## Mesurer la mémoire

Pour savoir si tout ça marche, on a écrit une batterie de questions dont on connaît la réponse, comme le nom de l'endroit où tourne tel agent ou la règle à suivre pour annoncer une heure. Des sessions neuves de l'assistant y répondent seules avec pour unique droit celui de lire, puis on compte les bonnes réponses. La batterie est passée de 19 à 22 questions et le passage du 18 octobre a donné 22 sur 22.

Ce test m'a appris plus que n'importe quelle intuition. Il a montré que le gros sommaire faisait perdre des points et il a désigné les questions que seule la fouille des fiches pouvait rattraper. On le relance après chaque gros rangement, comme on repasse au contrôle technique après avoir touché aux freins.

## La boucle qui nourrit tout

Tout ce rangement resterait vide si personne n'écrivait. Après chaque travail, l'assistant se demande quelle note lui éviterait de tout redécouvrir si on lui redemandait la même chose dans un mois. Une procédure qu'il vient de trouver devient un savoir-faire écrit, avec les commandes et les pièges rencontrés. Une correction de ma part devient une règle qu'il relira la prochaine fois.

Mes remarques sur l'écriture ont ainsi rempli tout un guide rangé par type de texte. Cet article est d'ailleurs passé dans un détecteur de tics d'IA né de ces corrections, qui chasse entre autres le fameux tiret long du 26 août.

Le moment d'écrire a son importance. L'assistant note avant de me rendre la main, même quand une tâche tourne encore en fond. En août, il avait mis une vingtaine de manipulations à comprendre comment un de mes agents récupérait mes favoris sur X. Il n'avait rien noté, donc la fois suivante lui aurait coûté le même chemin.

## Les ratés

Cette mémoire a aussi ses défauts. Au dernier passage du dimanche, 451 fiches n'avaient pas été rouvertes depuis plusieurs semaines et une bonne partie de l'armoire sert donc rarement. Des doublons apparaissent quand deux sessions écrivent sur le même sujet, et un grand tri du contenu est en cours depuis la mi-octobre pour vérifier que chaque vieille fiche dit encore vrai.

Enfin l'assistant ne retrouve que les sujets déjà écrits. Un sujet absent de la mémoire reste absent et il doit alors le dire au lieu d'inventer. Aucun rangement ne remplace cette discipline.

## Pour démarrer

Vous n'avez pas besoin d'un serveur pour commencer. Ouvrez un document et notez-y chaque consigne que vous répétez à votre IA, du ton de vos mails jusqu'au nom exact de vos produits. Collez-le dans les instructions d'un projet sur Claude ou sur ChatGPT, puisque les deux le proposent, et ajoutez une ligne chaque fois que vous vous surprenez à répéter quelque chose. Au bout d'un mois vous tiendrez votre premier tiroir de fiches.

Si vous voulez un assistant qui tient sa mémoire tout seul, [Foxy](/) est la version de mon assistant que j'installe en entreprise et je vous la montre volontiers.

## Questions fréquentes

### Claude et ChatGPT n'ont-ils pas déjà une mémoire ?

Les deux retiennent désormais quelques faits sur vous d'une conversation à l'autre. Cette mémoire reste une liste qu'ils gèrent à leur façon et que vous ne rangez pas vous-même. La mienne est un dossier de fichiers que je peux ouvrir, corriger et vérifier à tout moment.

### Faut-il une base de données spéciale ?

Vous pouvez vous en passer. Des fichiers texte avec un sommaire bien tenu et une recherche dans leur contenu suffisent largement à l'échelle d'une personne ou d'une petite équipe. Les bases qui comparent le sens des phrases et les graphes de connaissances ajoutent surtout de la complexité à cette taille.

### Mes informations restent-elles chez moi ?

Les fiches vivent sur mon propre serveur et une copie part chaque nuit dans une sauvegarde privée. L'assistant n'envoie au modèle d'IA que les fiches dont il a besoin pour la tâche en cours.
