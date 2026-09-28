---
titre: "Cal.com ou Calendly : pourquoi mon lien de rendez-vous est gratuit"
description: "Je voulais un lien de prise de rendez-vous sur mon site et sur ma fiche Google. J'ai choisi Cal.com plutôt que Calendly et je vous explique pourquoi sa version gratuite me suffit."
date: 2026-10-25
format: comparatif
grappe: tutos
mot_cle: "cal.com vs calendly"
image_carte: "/images/blog/cartes/calcom-vs-calendly.webp"
statut: brouillon
mots_cles: ["Cal.com", "Calendly", "prise de rendez-vous en ligne", "lien de réservation", "webhook", "outil gratuit"]
lire_aussi: ["/blog/reunion-taches-ia-notion", "/blog/quel-outil-ia-entreprise-comparatif", "/agents"]
---
Pour un indépendant ou une petite entreprise qui veut un lien de rendez-vous gratuit et relié à ses autres outils, Cal.com fait mieux que Calendly. La version gratuite de Calendly se limite à un seul type de rendez-vous et ne prévient aucun autre logiciel quand quelqu'un réserve. Cal.com gratuit n'a aucune de ces deux limites et son seul défaut est d'afficher son logo sur votre page.

Je connais Calendly depuis longtemps parce que je m'en sers sur un autre projet. Quand il m'a fallu en septembre un lien pour mon agence, j'ai quand même relu les deux offres gratuites avant de choisir Cal.com.

## Le besoin : un lien de 20 minutes partout

L'idée était simple. Un prospect qui tombe sur mon site, sur ma fiche Google ou sur la signature de mes mails doit pouvoir réserver un premier échange de vingt minutes sans avoir à m'écrire. Le même outil devait aussi porter des rendez-vous plus longs réservés à certaines personnes. Le cadrage de projet d'une heure vient quand le premier échange s'est bien passé et le point de suivi sert aux clients déjà lancés.

Une deuxième exigence se voyait moins et comptait autant. Un rendez-vous pris à 23 h ne devait pas rester coincé dans l'outil de réservation. Il devait apparaître tout seul dans mon fichier clients et m'être signalé sur mon téléphone, sans que personne ne recopie quoi que ce soit.

## Calendly gratuit

La [version gratuite de Calendly](https://calendly.com/pricing) donne une page de réservation personnalisable et la connexion d'un seul agenda. Elle ne propose qu'**un seul type de rendez-vous**, si bien qu'il faut choisir entre le premier échange et le cadrage.

Pour relier Calendly à un autre outil, il faut des webhooks. Ce sont les messages automatiques qu'un logiciel envoie à un autre dès qu'il se passe quelque chose : le webhook dit par exemple « une personne vient de réserver jeudi à 10 h ». Chez Calendly, [les webhooks commencent à l'offre Standard](https://calendly.com/help/webhooks-overview), facturée à partir de 10 dollars par mois et par personne. Pour quelqu'un qui veut seulement qu'on puisse le réserver, la version gratuite fait très bien l'affaire. Dès qu'on veut brancher ses rendez-vous sur le reste de son organisation, il faut payer.

## Cal.com gratuit

[Cal.com](https://cal.com/pricing) propose une offre gratuite « Free forever » pour une personne seule, avec des types de rendez-vous et des agendas connectés sans limite. On y trouve aussi les rappels par mail et par SMS, le paiement par Stripe ou PayPal et surtout les webhooks. J'ai monté mes rendez-vous en une soirée : le premier échange public de vingt minutes et trois autres cachés dont le lien se donne à la main.

La contrepartie se voit tout de suite parce que la page affiche le logo et la mention Cal.com. Il faut passer à l'offre Teams, à 12 dollars par mois et par personne, pour les retirer. Pour un premier échange avec un prospect, ce petit logo ne me gêne pas du tout.

<figure>

| | Calendly gratuit | Cal.com gratuit |
|---|---|---|
| Types de rendez-vous | Un seul | Sans limite |
| Agendas connectés | Un seul | Sans limite |
| Webhooks | Offre payante | Inclus |
| Logo de l'outil | Affiché | Affiché |
| Première offre payante | 10 $ par mois | 12 $ par mois |

<figcaption>Les deux offres gratuites comparées sur les pages officielles le 28 septembre 2026. Prix par personne en paiement annuel.</figcaption>
</figure>

## Brancher les réservations sur mon fichier clients

Cal.com inscrit chaque réservation dans mon agenda Google et prévient mon site par un webhook. Mon site crée alors une fiche au nom de la personne dans mon fichier clients, avec une tâche « préparer l'appel » à la date du rendez-vous. L'agent qui suit mes prospects me l'annonce ensuite sur Telegram. Une annulation prend le même chemin et la fiche repasse en relance.

<figure>
<ol class="flux">
<li><strong>Clic</strong>« Réserver un appel » sur le site</li>
<li><strong>Créneau</strong>choisi dans la page Cal.com</li>
<li><strong>Webhook</strong>Cal.com prévient mon site</li>
<li><strong>Fiche</strong>créée dans mon fichier clients</li>
<li><strong>Alerte</strong>mon agent m'écrit sur Telegram</li>
</ol>
<figcaption>Le chemin d'une réservation, du clic sur mon site jusqu'au message sur mon téléphone.</figcaption>
</figure>

Au premier essai, la fiche est apparue dans mon fichier clients **12 secondes après la réservation** et le message est arrivé sur mon téléphone au bout de 36 secondes. Le seul piège de la mise en place concerne les annulations. Cal.com n'envoie un événement que si sa case est cochée dans les réglages du webhook au moment où il se produit, et il ne rattrape jamais les annulations passées. Cochez donc la réservation, le report et l'annulation dès le premier jour.

Autre détail à surveiller : l'adresse d'un rendez-vous garde le nom du modèle de départ. Changez-la avant de coller votre lien sur votre site et sur Google, sinon vous aurez un lien « 15min » pour un rendez-vous de vingt minutes.

## Mon verdict

Je conseille Cal.com à un indépendant ou à une petite équipe dès que l'on veut plus d'un type de rendez-vous ou que les réservations doivent arriver dans un autre outil. Calendly reste un très bon choix si un seul rendez-vous vous suffit ou si votre équipe l'utilise déjà tous les jours. Pour ma part, je n'ai pas encore trouvé de raison de payer.

Le bouton « Réserver un appel » en bas de chaque page de ce site ouvre ce lien. C'est aussi le moyen le plus simple de me demander un coup de main si vous voulez que vos rendez-vous arrivent tout seuls dans vos outils, comme sur les [agents IA sur mesure](/agents) que j'installe.
