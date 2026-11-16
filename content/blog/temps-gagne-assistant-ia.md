---
titre: "Combien de temps me fait gagner mon assistant IA ? J'ai mis un compteur"
description: "J'ai mis un compteur sur mon assistant IA pendant neuf jours. Il a fait 113 heures de travail en une semaine et je vous montre comment il calcule et où je me suis trompé."
date: 2026-10-30
format: explicatif
grappe: agents
mot_cle: "temps gagné assistant ia"
image_carte: "/images/blog/temps-gagne/ecran-temps-gagne.webp"
statut: brouillon
mots_cles: ["temps gagné IA", "assistant IA", "productivité IA", "mesurer le temps gagné", "Foxy"]
lire_aussi: ["/blog/reunion-taches-ia-notion", "/blog/agent-ia-definition", "/"]
---
Le 21 octobre au matin, j'ai regardé le tableau de bord de mon assistant IA et j'ai eu un petit malaise. Je connaissais son coût quotidien au centime près et je n'avais aucune idée du temps qu'il me rendait. Alors j'ai mis un compteur, qui transforme chaque chose faite à ma place en minutes. Sur la semaine du 23 au 29 octobre, il a compté **113 h 40** de travail que j'aurais dû faire à la main, avec un jour médian à 11 h 24.

Mon assistant s'appelle Foxy et tourne sur mon serveur depuis cet été. Il écrit mes brouillons de mail, cherche des contacts, met à jour mes documents et lit ma boîte à ma place. Au soir du deuxième jour, j'avais écrit un premier article avec un chiffre de 12 h 54. J'ai préféré attendre une semaine avant de le publier, et j'ai bien fait parce que ce premier chiffre était faux.

<figure>
<img src="/images/blog/temps-gagne/ecran-temps-gagne.webp" alt="Écran Temps gagné de mon assistant IA : 149 h 42 depuis le début, un camembert par famille et le détail de la recherche" width="1590" height="1084" loading="lazy">
<figcaption>L'écran « Temps gagné » de mon assistant au matin du 30 octobre 2026. Sa colonne « Cette semaine » démarre le lundi 27, d'où l'écart avec la semaine pleine dont je parle plus bas.</figcaption>
</figure>

## Le barème

Tout part d'une question toute bête : combien de temps j'aurais mis à le faire moi-même ? J'écris un mail court en trois à cinq minutes. Un mail plus long où il faut d'abord retrouver un échange, vérifier un chiffre et joindre un document, c'est plutôt dix à vingt minutes.

J'ai donc écrit un barème de vingt-neuf actions rangées en neuf familles, des mails aux réunions, avec une fourchette pour chacune. La fourchette compte plus que le chiffre parce qu'un mail de trois lignes et un mail de deux pages ne valent pas le même temps, même s'ils portent le même nom.

<figure>
<img src="/images/blog/temps-gagne/bareme.webp" alt="Graphique du barème : fourchettes de minutes par action, de 18 secondes pour un mail inutile écarté à 45 à 90 minutes pour une vidéo créée" width="2560" height="1800" loading="lazy">
<figcaption>Une partie du barème. Chaque fourchette dit le temps que j'y aurais passé moi-même, du plus petit au plus gros cas.</figcaption>
</figure>

Ces chiffres sortent de ma tête et de mes habitudes et aucun chronomètre ne les a validés. C'est le point faible assumé de la méthode et c'est pour ça que le barème se modifie en deux clics dans les réglages de l'assistant. Si je trouve un jour qu'un compte-rendu de réunion me prenait plutôt dix minutes que vingt, je change la fourchette et tout ce qui suit est compté avec la nouvelle valeur.

## Qui compte les minutes ?

Mon assistant travaille de deux façons et chacune a sa manière de compter.

Il y a d'abord les tâches qu'il fait seul en arrière-plan, comme lire les mails qui arrivent et me les résumer. Elles font toujours la même chose et chaque passage réussi rapporte simplement le milieu de la fourchette. Un mail lu et résumé vaut une minute et un mail publicitaire jeté vaut dix-huit secondes. Ça paraît ridicule. Sauf qu'en neuf jours il en a lu trois cent cinquante et ces petites minutes font presque six heures.

Il y a ensuite tout ce que je lui demande dans la conversation, et là c'est plus délicat parce qu'une demande peut cacher trois minutes de travail ou une heure. À la fin de chaque échange, un petit modèle d'IA relit ma demande, la liste des outils que l'assistant a utilisés et sa réponse. Il range chaque action dans le barème et choisit le bas ou le haut de la fourchette selon la taille du travail.

<ol class="flux">
<li><strong>Je demande</strong>« prépare un mail à ce contact avec mon CV »</li>
<li><strong>L'assistant travaille</strong>il cherche, rédige et joint le fichier</li>
<li><strong>Un petit modèle relit</strong>la demande, les outils et la réponse</li>
<li><strong>Le barème tranche</strong>un mail travaillé et un renseignement</li>
<li><strong>Le journal note</strong>23 minutes gagnées</li>
</ol>

J'ai posé quatre règles à ce relecteur. Il ne compte que ce qui a été fait, jamais ce qui a été proposé. Une simple discussion ne rapporte rien. Dans le doute il sous-estime. Et surtout son chiffre est ensuite borné par le serveur. Quand il s'emballe et annonce trois heures pour un mail, le compteur retient le haut de la fourchette du mail et rien de plus. Ce contrôle ne coûte presque rien : environ trois dixièmes de centime par échange.

## Le code ne compte pas

J'ai pris une décision qui fait baisser le total de beaucoup. Tout le travail de développement compte zéro, qu'il s'agisse d'écrire du code, de corriger un bug ou de mettre en ligne un site. J'en fais énormément avec l'IA et ce serait facile de gonfler le chiffre avec des après-midis de programmation. Mais aujourd'hui tous les développeurs travaillent comme ça, si bien que ce temps-là n'est plus un gain. C'est juste la nouvelle façon de faire le métier.

Le compteur ne mesure donc que ce qui ressemble au travail d'un assistant de direction : écrire, chercher, lire, ranger et préparer.

## Mon premier chiffre était faux

Le 22 octobre au soir, le compteur affichait 12 h 54 pour mes deux premiers jours. Recomptés une semaine plus tard, ces deux mêmes jours valent 35 h 14. L'écart vient de deux erreurs, et une troisième jouait dans l'autre sens.

La première est bête : j'ai photographié l'écran à vingt heures alors que la journée n'était pas finie, et la soirée a été la plus chargée de la semaine. La deuxième est plus intéressante. Quand un échange s'arrêtait en route parce que je cliquais sur Stop ou que le compte atteignait sa limite, le compteur ne notait rien du tout. Le travail pouvait pourtant être fait aux trois quarts. Ce soir-là, une série de vingt-six formulaires remplis par l'assistant est passée à la trappe de cette façon. Les échanges coupés comptent maintenant comme les autres.

La troisième erreur gonflait le chiffre. Le relecteur comptait une recherche par tranche de dix éléments, si bien que le tri d'une liste de trois cent six contacts lui avait rapporté trente et une recherches. J'ai coupé la recherche en trois actions (une info retrouvée dans mes propres mails, un renseignement sur une entreprise et une vraie étude) et une étude compte désormais pour un seul sujet, quelle que soit la longueur de la liste.

## Une semaine de mesures

Du 23 au 29 octobre, le compteur a noté 113 h 40, soit 16 h 14 par jour en moyenne. La moyenne ment un peu parce qu'une journée écrase toutes les autres.

<figure>
<img src="/images/blog/temps-gagne/jours.webp" alt="Graphique en barres du temps gagné jour par jour du 21 au 29 octobre 2026, avec un pic à 44 h 39 le vendredi 23 et un jour médian à 11 h 24" width="2560" height="1520" loading="lazy">
<figcaption>Le temps gagné jour par jour. Le pic du 23 octobre correspond au lancement d'une campagne de prospection.</figcaption>
</figure>

Le vendredi 23, j'ai lancé une campagne de prospection et mon assistant a écrit en une nuit cinquante mails et cinquante messages LinkedIn personnalisés, chacun après avoir lu le profil de la personne. Ce seul échange vaut huit heures au barème, et la journée monte à 44 h 39. Le dimanche, à l'inverse, il descend à 4 h 42 parce que je lui demande peu de choses.

Vous allez me dire qu'une journée n'a que vingt-quatre heures. Vous avez raison, et c'est le point le plus important pour lire ce compteur. Il additionne le travail fait à ma place et je fais souvent tourner cinq conversations en même temps. Les heures comptées sont des heures de travail que j'aurais dû faire moi-même ou payer à quelqu'un. Mon agenda, lui, n'a pas gagné 113 heures.

Le chiffre qui me parle le plus est le jour médian qui tourne autour de 11 heures. Un jour ordinaire, mon assistant abat donc le travail d'une personne et demie à plein temps.

## Où part le temps gagné

Sur les neuf jours, la recherche pèse la moitié du total avec 74 heures. Il y a dedans 82 études (lister des groupes de restaurants, comparer des outils), 121 renseignements sur une entreprise ou une personne et 292 infos retrouvées dans mes mails ou mes fichiers. Mon premier article la plaçait déjà en tête avec un tiers du total, et la semaine a creusé l'écart.

Les mails écrits ne font que 9 h 43, soit un peu plus de 6 % du total. Je m'attendais à les voir en tête et je comprends maintenant pourquoi ils n'y sont pas : un mail court vaut peu et le temps part dans toutes les infos à réunir avant de l'écrire.

J'ai eu une autre surprise. Les tâches que l'assistant fait seul en arrière-plan, comme trier les mails ou résumer les réunions, ne pèsent que 7 heures sur 149. Le reste vient de mes demandes dans la conversation. J'imaginais l'inverse quand j'ai commencé et j'en retiens qu'un assistant rapporte à proportion de ce qu'on ose lui confier.

## Les limites de ma mesure

Le chiffre est un temps brut. Il ne retire pas les minutes que je passe à relire un brouillon ou à corriger une recherche à côté de la plaque. Sur un mail la relecture prend trente secondes. Sur un cahier des charges, elle peut prendre dix minutes et le gain réel devient plus mince.

Une bonne partie de ce travail n'aurait jamais été faite sans l'assistant. Je n'aurais pas écrit cent messages de prospection personnalisés en une soirée et je n'aurais pas trié trois cents participants d'un salon un par un. Le compteur leur donne une valeur en minutes alors que pour moi la vraie question était de les faire ou pas.

La semaine mesurée était enfin une semaine chargée, avec une campagne de prospection qui démarrait. Je laisse tourner le compteur et je reviendrai sur ces chiffres quand j'aurai un mois complet.

## Pour démarrer

Vous n'avez pas besoin de tout ce système pour vous faire une idée. Prenez une semaine et notez sur un papier chaque fois que vous confiez quelque chose à un outil d'IA, avec le temps que vous y auriez passé. À la fin de la semaine vous aurez votre propre barème et un premier chiffre, et vous saurez si ça vaut le coup d'aller plus loin.

Il y a neuf jours je connaissais le prix de mon assistant au centime près et j'ignorais sa valeur. Aujourd'hui j'ai les deux chiffres sous les yeux, et si vous voulez qu'on regarde ensemble ce qu'un outil sur mesure pourrait vous rendre comme heures, vous pouvez [réserver un appel](/) avec moi.
