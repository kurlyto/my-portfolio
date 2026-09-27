---
titre: "De la réunion à la tâche faite : ma chaîne avec Fathom, Notion et l'IA"
description: "Je ne prends plus de notes pendant mes réunions. Je vous montre la chaîne que j'ai montée pour qu'une visio finisse en tâches rangées que l'IA fait ensuite."
date: 2026-09-28
format: explicatif
grappe: foxy
mot_cle: "notes de reunion ia"
statut: brouillon
mots_cles: ["notes de réunion IA", "Fathom", "Notion", "compte rendu automatique", "assistant IA", "tâches"]
lire_aussi: ["/blog/agent-ia-definition", "/blog/quel-outil-ia-entreprise-comparatif", "/"]
---
Une réunion produit toujours deux choses : ce qu'on s'est dit et ce qu'on a promis de faire. La première se perd vite et la seconde se perd encore plus vite, parce qu'elle reste dans un carnet que personne ne rouvre. J'ai donc monté une chaîne où la visio s'enregistre seule, où l'IA en tire les actions et où chaque action finit en tâche que mon assistant sait exécuter.

Je ne vais pas tout déballer ici. Je vous montre les grandes étapes et les choix qui comptent, ceux qui m'ont coûté quelques essais.

## La réunion s'enregistre seule

Le premier maillon s'appelle [Fathom](https://www.fathom.ai). C'est un preneur de notes par IA qui rejoint les visios sur Google Meet, Zoom ou Teams et qui rend un résumé quelques instants après le raccrochage. L'offre gratuite couvre l'enregistrement, la transcription et le résumé sans limite de nombre, ce qui suffit largement pour démarrer.

Je l'ai choisi pour une raison simple : il a une API, c'est-à-dire une porte d'entrée qu'un autre programme peut utiliser pour lire les réunions. Sans cette porte, les notes restent enfermées dans l'application et tout le reste de la chaîne devient impossible.

Deux limites à connaître avant de s'y mettre. Fathom ne lit qu'un seul agenda par compte, si bien qu'une réunion posée dans un deuxième agenda passe à la trappe. Et il ne suit ni WhatsApp ni Discord, alors qu'une partie de mes échanges passe par là.

## Mon assistant va chercher les notes

Le deuxième maillon est mon assistant IA, celui qui tourne sur mon serveur et que je vends aussi aux entreprises sous le nom de [Foxy](/). Il a une page Réunions qui interroge Fathom et affiche chaque réunion avec son résumé et les actions repérées, qui a dit quoi et pour qui.

Un piège m'a fait perdre une soirée. L'API de Fathom ne renvoie les actions que si on les demande explicitement dans la requête. Sans cette précision, le champ arrive vide et on croit que l'offre ne les fournit pas, alors que Fathom les a bien extraites. Si vous branchez Fathom vous-même, lisez la documentation ligne par ligne avant de conclure qu'une donnée manque.

Une réunion encore jamais ouverte porte une pastille sur la page, et cette mémoire vit sur le serveur. Une note lue sur mon téléphone ne reste donc pas marquée comme nouvelle sur l'ordinateur.

## Une action devient une tâche

Fathom rend ses actions dans un anglais télégraphique du genre « Review code w/ dev ». J'ai refusé de pousser ce texte brut dans ma liste de tâches sans l'avoir vu. Chaque action a donc un bouton qui ouvre une petite fenêtre préremplie où je corrige la phrase, puis je choisis la catégorie et la priorité avant d'envoyer la tâche dans Notion.

C'est le seul geste manuel de la chaîne et je l'ai gardé exprès. Une réunion sort facilement une dizaine d'actions dont trois comptent vraiment, et ce tri demande un humain qui sait ce qui compte cette semaine. L'assistant se souvient aussi des actions déjà passées en tâche, ce qui m'évite les doublons quand je repasse sur une vieille réunion.

## La tâche se fait

Le dernier maillon est celui qui change tout. Dans ma liste de tâches, chacune a un bouton « Demander à l'IA » qui ouvre une conversation avec mon assistant déjà briefé sur la tâche. Il sait d'où elle vient et ce qu'elle demande. Il a aussi accès à mes mails, à mon agenda et à mon fichier clients.

Prenons un rendez-vous client où j'ai promis d'envoyer un devis et de caler une démo. Les deux actions sortent de Fathom, je les passe en tâche en deux clics, puis l'assistant prépare le brouillon du devis et propose un créneau dans mon agenda. Je relis et je valide. Rien ne part sans moi, ni un mail ni un rendez-vous.

## Pourquoi pas un branchement direct

Fathom sait envoyer ses notes dans Notion en passant par [Zapier ou Make](https://www.fathom.ai/integrations/notion) et j'aurais pu m'arrêter là. J'aurais obtenu une base Notion pleine de comptes rendus que je n'aurais jamais relus. Le temps gagné vient du passage par l'assistant, parce qu'il transforme une note en action et une action en travail fait.

Il y a aussi une raison technique. Fathom peut prévenir un autre programme dès qu'une réunion est prête, mais mon assistant n'est pas ouvert sur internet et c'est voulu. Il va donc chercher les réunions lui-même, régulièrement, et pour des notes de réunion quelques minutes de décalage ne gênent personne.

## Ce qui coince encore

Le tri des actions reste à ma charge et je ne suis pas pressé de le confier. Les réunions en présentiel échappent à Fathom tant que son application mobile ne les enregistre pas. Les échanges sur WhatsApp passent aussi à travers la chaîne, et c'est le prochain trou que j'ai envie de boucher.

Si vous voulez la même chose chez vous, commencez par le premier maillon seul pendant deux semaines. Un bon résumé automatique fait déjà gagner du temps, et vous saurez alors si le reste de la chaîne vaut le coup pour vous. Et si vous voulez qu'on regarde ensemble ce qu'un assistant comme [Foxy](/) prendrait en charge après vos réunions, je vous réponds volontiers.
