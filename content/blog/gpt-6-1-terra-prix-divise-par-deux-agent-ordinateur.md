---
titre: "GPT-6.1 Terra : l'agent d'OpenAI qui clique à votre place, à moitié prix"
description: "OpenAI a sorti fin octobre un modèle qui regarde l'écran et clique à votre place pour deux fois moins cher. Je l'ai comparé à Claude sur mes propres formulaires et je vous dis s'il vaut le détour."
date: 2026-11-14
format: actualite
grappe: actus
mot_cle: "GPT-6.1 Terra avis prix"
image_carte: "/images/blog/cartes/gpt-6-1-terra-prix-divise-par-deux-agent-ordinateur-fenetre.webp"
image_partage: "/images/blog/partage-gpt-6-1-terra-prix-divise-par-deux-agent-ordinateur-fenetre.png"
statut: publie
mots_cles: ["GPT-6.1 Terra", "OpenAI", "ChatGPT Work", "computer use", "prix API", "agent IA"]
lire_aussi: ["/blog/nouveautes-ia-septembre-2026", "/blog/jev-typesafe-ia-qui-decide", "/"]
---
Lundi 26 octobre, OpenAI a sorti un nouveau modèle au milieu de sa gamme avec une promesse qui parle à tous ceux qui passent leurs journées à remplir des cases. Il s'appelle **GPT-6.1 Terra** et il sait regarder un écran, cliquer dans les bons champs et taper à votre place. Son prix pour les développeurs est divisé par deux. Mon assistant remplit déjà des formulaires pour moi depuis septembre et il le fait avec Claude, alors j'ai voulu savoir si ce nouveau venu méritait de prendre sa place.

## Un modèle qui voit l'écran

D'après [l'annonce d'OpenAI](https://openai.com/index/introducing-gpt-6-1-terra/), Terra est taillé pour les tâches de bureau qui remplissent une journée : rédiger une proposition, lire un plan technique, remplir un formulaire ou monter une vidéo. On appelle ce savoir-faire l'usage de l'ordinateur. L'IA reçoit une photo de votre écran, y repère le champ à remplir et renvoie un geste précis, comme un clic à tel endroit ou un texte à taper. Puis elle reçoit une nouvelle photo et recommence.

L'exemple choisi par OpenAI est parlant pour une petite entreprise. Le modèle lit les factures qui arrivent et recopie leurs informations dans le logiciel de comptabilité, une corvée que beaucoup de gérants font encore le dimanche soir. Chaque tour de cette boucle renvoie une image au modèle et chaque image se paie. Un formulaire d'une vingtaine de champs demande des dizaines de tours, si bien que le prix d'un modèle compte autant que son intelligence dès qu'on le fait cliquer.

<figure>
<img src="/blog/gpt-6-1-terra-prix-divise-par-deux-agent-ordinateur/1-boucle-v3.webp" alt="Schéma : une fenêtre de comptabilité affiche une facture de 1 240 euros et un formulaire dont le curseur Terra remplit le montant. En dessous, trois étapes reliées par des flèches : une photo de tout l'écran, Terra qui la lit, un seul geste (clic, taper 1 240) qui revient dans le champ. Une rangée de 40 cases dont 7 noircies montre qu'on en est au septième tour" width="1440" height="1300" loading="lazy">
<figcaption>La boucle de l'usage de l'ordinateur : une photo de l'écran part, un seul geste revient, et on recommence jusqu'au bout du formulaire. La facture est un exemple fictif.</figcaption>
</figure>

## Qui peut s'en servir

Terra est ouvert depuis le 26 octobre aux abonnés Plus, Pro, Enterprise et Edu, dans ChatGPT Work et dans Codex. ChatGPT Work est le mode agent de ChatGPT, celui qui va sur des sites et enchaîne les tâches pour vous. Codex est l'outil d'OpenAI pour écrire du code. Les comptes gratuits restent sur un modèle plus petit et Terra n'est [pas encore arrivé](https://www.blogdumoderateur.com/gpt-6-1-terra-performances-tarifs-disponibilite/) dans le ChatGPT classique où l'on discute.

Pour un abonné, la baisse de prix ne se voit pas sur la facture. Le forfait reste le même et OpenAI promet seulement qu'il couvre plus de tâches qu'avant. La division par deux concerne les développeurs qui branchent le modèle dans leurs propres outils, comme je le fais pour mes agents. Ils paient 1 dollar pour un million de jetons lus et 5 dollars pour un million de jetons écrits. Un million de jetons représente à peu près le texte de plusieurs romans.

<figure>
<img src="/blog/gpt-6-1-terra-prix-divise-par-deux-agent-ordinateur/2-prix-v3.webp" alt="Graphique en barres du prix pour lire un million de jetons : GPT-6.1 Terra 1 dollar en orange, son ancien prix de 2 dollars en pointillé, Claude Sonnet 5.5 2 dollars, Claude Opus 5.5 4 dollars. Pour écrire : 5, 10 et 20 dollars" width="1440" height="940" loading="lazy">
<figcaption>Les tarifs publics pour un million de jetons lus, au 29 octobre 2026. Terra coûte deux fois moins que Claude Sonnet 5.5 et quatre fois moins que Claude Opus 5.5.<span class="credit">Sources : <a href="https://openai.com/index/introducing-gpt-6-1-terra/">OpenAI</a> et <a href="https://docs.claude.com/en/docs/about-claude/pricing">Anthropic</a>.</span></figcaption>
</figure>

L'écart avec Claude est net. [Sonnet 5.5 et Opus 5.5](https://docs.claude.com/en/docs/about-claude/pricing) coûtent respectivement 2 et 4 dollars le million de jetons lus. OpenAI va plus loin dans son annonce et affirme qu'une tâche coûte environ neuf fois moins cher avec Terra qu'avec Opus 5.5 réglé au maximum, parce que Terra consomme aussi moins de jetons pour arriver au bout. Ce chiffre vient de son propre test et je le garde de côté tant que personne ne l'a refait.

## Mon essai face à Claude

Mon assistant remplit des formulaires dans mon propre Chrome grâce à une petite extension que j'ai écrite. Quand je l'ai mesuré sur mes journaux, Claude mettait entre deux et six minutes par formulaire en travaillant champ par champ. Sur le papier, Terra coûte deux fois moins que Sonnet et OpenAI le dit trois fois plus rapide que ses gros modèles. J'ai donc fait passer à Terra un de mes formulaires d'inscription à la place de Claude.

Il fait le travail. Je n'ai pourtant pas trouvé de raison de tout rebrancher. L'explication tient à la façon dont mon extension décrit une page. Elle n'envoie pas de photo de l'écran. Elle dresse une liste numérotée de tout ce qu'on peut toucher et l'IA répond « tape ceci dans le 11 ». Sur un site de billets de train, cette liste pèse 3 Ko quand le code de la page en pèse 737. La grande force de Terra, ses yeux, me sert donc peu sur le web où une liste suffit.

Elle servira là où il n'y a rien d'autre à lire qu'une image. C'est le cas d'un vieux logiciel de comptabilité installé sur un PC, d'un PDF scanné ou d'un plan d'architecte. Pour ces tâches, un modèle qui voit bien et coûte peu devient très intéressant, et je pense que les petites entreprises en profiteront d'abord par les outils qui l'intégreront.

## Des chiffres maison

OpenAI met en avant une baisse spectaculaire des erreurs. Son test interne pose des questions conçues pour piéger le modèle. Le taux d'erreur avec peu de réflexion y tombe de 53,6 % pour l'ancien Terra à 16,7 % pour le nouveau. Avec la réflexion au maximum, il descend à 4,3 %. Terra résout aussi 50,3 % des problèmes de programmation de Terminal-Bench 4.0 contre 21,5 % pour son prédécesseur.

Tous ces chiffres sont mesurés par OpenAI sur ses propres tests et [Decrypt](https://decrypt.co/381883/openai-launches-gpt-6-1-terra-half-good-half-price) le rappelle à juste titre. Le seul classement indépendant que j'ai trouvé, celui de [Vals AI](https://vals.ai/models/openai_gpt-6.1-terra), place Terra au 11e rang sur 29 modèles au 29 octobre. C'est honorable pour son prix et loin du sommet.

Un détail de l'annonce mérite qu'on s'y arrête. Dans la grille d'évaluation des risques d'OpenAI, Terra atteint en cybersécurité le niveau « critique » qui est le plus haut de l'échelle. Autrement dit, le modèle est assez doué pour aider à pirater un système et OpenAI lui applique les protections conçues pour GPT-6 Astra, son modèle le plus puissant. Le risque qui vous concerne est plus terre à terre. Une IA qui clique lit aussi tout ce qu'affichent les pages et une phrase cachée dans un site peut tenter de la détourner. OpenAI dit que Terra a bien résisté à ces pièges dans ses essais, sans publier le détail dans l'annonce.

## Mon verdict

Je reste sur Claude pour mes agents. Mon outillage est pensé pour lui et un prix plus bas ne compense pas une réécriture. Mais je trouve la nouvelle très bonne pour tout le monde, parce qu'elle oblige les concurrents à suivre. En septembre déjà, [le prix des modèles](/blog/nouveautes-ia-septembre-2026) devenait un argument de vente aussi fort que leurs performances.

Si vous payez déjà ChatGPT Plus, essayez ChatGPT Work sur une seule corvée de saisie que vous faites chaque semaine, sur un site où il n'y a rien à payer. Regardez-le faire jusqu'au bout. Gardez pour vous les boutons qui engagent, comme payer, envoyer ou signer. Si vous êtes sur le compte gratuit, il n'y a rien à faire ce mois-ci. Terra clique désormais à votre place pour moitié prix et le dernier clic reste le vôtre. Si vous voulez savoir quelle corvée de votre semaine un agent pourrait prendre, je vous réponds depuis la page de [Foxy](/).
