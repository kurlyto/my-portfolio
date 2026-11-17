---
titre: "Des agents IA pirates trouvent vos clés oubliées sur GitHub : l'alerte de Microsoft"
description: "J'ai lu l'alerte de Microsoft sur ces agents pirates qui fouillent GitHub à la recherche de clés oubliées. J'ai demandé à mon IA de fouiller mes neuf dépôts publics comme le ferait un attaquant et je vous raconte le résultat."
date: 2027-01-25
format: actualite
grappe: actus
mot_cle: "clé API oubliée GitHub piratage agent IA comment vérifier"
image_carte: "/images/blog/cartes/agents-ia-pirates-cles-secretes-github-artex-github.webp"
image_partage: "/images/blog/partage-agents-ia-pirates-cles-secretes-github-artex-github.jpg"
statut: brouillon
mots_cles: ["clé API", "GitHub", "ARTEX", "Microsoft Threat Intelligence", "secret scanning", "agent IA pirate"]
lire_aussi: ["/blog/faille-php-ia-site-wordpress-mettre-a-jour", "/blog/navigateur-integre-assistants-code-failles-embrace", "/agents"]
---
Tout le monde connaît la clé glissée sous le paillasson pour le livreur ou la baby-sitter. Pendant des années, le cambrioleur devait passer de porte en porte pour la trouver. Le 5 novembre, Microsoft a raconté comment des pirates ont confié cette tournée à des agents IA qui soulèvent des milliers de paillassons à la fois sur GitHub, le site où les développeurs du monde entier rangent leur code. Si un prestataire a déjà écrit le code de votre site ou de votre outil, vérifiez qu'aucune clé ne traîne dans ce code et changez celles qui y sont passées, même une seule fois.

## Cinq minutes entre la clé et le coffre

[L'équipe de renseignement sur les menaces de Microsoft](https://www.microsoft.com/en-us/security/blog/2026/11/05/threat-actors-use-agentic-ai-tooling-to-find-and-abuse-exposed-secrets/) a publié son alerte le 5 novembre 2026. Depuis le mois d'août, des pirates lancent sur GitHub des avalanches de recherches qui mêlent le nom d'une entreprise visée et des mots comme « mot de passe », « clé » ou le nom d'un service d'IA. Quand une clé sort, l'agent ne la range pas dans un fichier pour plus tard. Il l'essaie tout de suite pour se connecter aux services de l'entreprise, dresse l'inventaire des portes qu'elle ouvre et emporte les données qui ont de la valeur. Dans un cas, Microsoft a vu un agent passer de la recherche sur GitHub au vol de données dans un coffre à secrets Azure en **cinq minutes**, à peine le temps de boire un café.

<figure>
<img src="/blog/agents-ia-pirates-cles-secretes-github-artex/1-microsoft.webp" alt="Extrait du rapport de Microsoft du 5 novembre 2026 avec la phrase surlignée : dans au moins un cas, un agent IA est passé de la recherche de secrets sur GitHub au vol de données dans Azure Key Vault en seulement cinq minutes" width="1440" height="1570" loading="lazy">
<figcaption>Microsoft le dit en une phrase : de la recherche sur GitHub au coffre vidé, cinq minutes.<span class="credit">Capture du <a href="https://www.microsoft.com/en-us/security/blog/2026/11/05/threat-actors-use-agentic-ai-tooling-to-find-and-abuse-exposed-secrets/">blog sécurité de Microsoft</a>, 5 novembre 2026.</span></figcaption>
</figure>

Les pirates se servent d'ARTEX, un programme d'attaque en libre accès qui fait travailler plusieurs agents ensemble et qui marche avec n'importe quel modèle d'IA. Son auteur l'a refermé quand les abus sont devenus publics, mais [les copies déjà téléchargées continuent de circuler](https://labs.cloudsecurityalliance.org/research/csa-research-note-cyberstrikeai-artex-multi-agent-offense-20/). Un détail du rapport m'a frappé : quand une commande échouait, l'agent corrigeait sa demande et la relançait une demi-minute plus tard, comme un développeur qui lit son message d'erreur. Et les clés qu'il cherchait en priorité sont celles des services d'IA, pour faire tourner ses propres agents aux frais de la victime.

## Effacer le fichier ne suffit pas

Le réflexe de tout le monde, quand on découvre une clé dans son code, c'est de supprimer la ligne et de renvoyer le fichier propre. Sauf que GitHub garde chaque version de chaque fichier, et que n'importe qui peut remonter l'historique d'un dépôt public jusqu'à la toute première modification. Microsoft l'écrit sans détour : une clé publiée reste utilisable tant qu'on ne l'a pas révoquée, et retirer le texte d'origine ne règle rien parce que des copies vivent dans l'historique, les caches et les archives. Microsoft demande donc de tenir pour volée toute clé exposée, même si elle n'est restée en ligne qu'une heure.

<figure>
<img src="/blog/agents-ia-pirates-cles-secretes-github-artex/2-historique.webp" alt="Schéma de l'historique d'un dépôt GitHub. Le lundi, une version du fichier contient une clé. Le mardi, une nouvelle version la supprime. Un agent pirate remonte l'historique jusqu'au lundi, récupère la clé et ouvre le service, parce que la clé n'a jamais été changée" width="1440" height="1320" loading="lazy">
<figcaption>Supprimer la clé crée une nouvelle version du fichier. L'ancienne reste lisible et la clé marche toujours tant qu'on ne la change pas. Exemple fictif.<span class="credit">D'après le <a href="https://www.microsoft.com/en-us/security/blog/2026/11/05/threat-actors-use-agentic-ai-tooling-to-find-and-abuse-exposed-secrets/">rapport de Microsoft</a>, 5 novembre 2026.</span></figcaption>
</figure>

J'en ai fait l'expérience cet automne sur un dépôt privé où de vrais documents avaient été recopiés dans des fichiers de test. Supprimer le dossier ne servait à rien, puisque chaque ancienne version les gardait, et j'ai dû réécrire tout l'historique avant de le renvoyer. Pour une clé, il existe heureusement plus simple que ce grand ménage : on la change et l'ancienne ne vaut plus rien nulle part.

## Mon essai sur mes propres dépôts

J'ai neuf dépôts publics sur GitHub. On y trouve des petits jeux écrits pour apprendre et le code de ce site, soit près de 250 modifications depuis décembre 2025. J'ai demandé à Claude Code, l'agent qui code avec moi tous les jours, de les fouiller comme le ferait un attaquant. Il a copié chaque dépôt avec tout son historique et passé dessus gitleaks, l'outil libre de référence pour repérer les secrets. Puis il a relu lui-même chaque ajout à la recherche d'un mot de passe ou d'un fichier de réglages effacé.

<figure class="haute">
<img src="/blog/agents-ia-pirates-cles-secretes-github-artex/3-essai.webp" alt="Vraie sortie du terminal : gitleaks analyse mes neuf dépôts publics un par un et répond « no leaks found » pour chacun" width="1440" height="2168" loading="lazy">
<figcaption>La vraie sortie de l'essai du 10 novembre : neuf dépôts, tout leur historique, zéro clé trouvée.</figcaption>
</figure>

Il n'a trouvé aucune clé. Le seul « jeton » qu'il a remonté était un faux exemple écrit dans un mode d'emploi pour montrer le format attendu. Mes projets utilisent un fichier d'exemple vide pour les réglages et gardent les vraies valeurs hors du code. Mes projets sérieux sont privés, et mon agent cherche les secrets avant chaque envoi depuis la fin de l'été. Il m'a quand même signalé une chose que j'avais oubliée : mon adresse mail personnelle signe presque toutes mes modifications, et elle est lisible par n'importe qui. Un agent pirate ramasse ce genre de détail pour préparer un faux mail crédible. GitHub propose une adresse masquée pour signer ses modifications et je vais la remettre dans mes réglages.

## Trois gestes à faire cette semaine

Le premier geste consiste à changer toute clé passée dans du code public. Chez Stripe, OpenAI ou votre hébergeur, l'espace client a une page des clés avec un bouton pour en créer une nouvelle et supprimer l'ancienne. Votre prestataire met la nouvelle dans votre site et l'ancienne devient inutile, même si elle dort encore dans un vieux recoin de GitHub.

Le deuxième geste est de limiter les droits de chaque clé. Une clé qui sert à afficher une carte n'a aucune raison de pouvoir lire vos factures. Quand le service le propose, un plafond de dépenses mensuel transforme un vol en petite facture au lieu d'une catastrophe.

Le troisième geste est d'activer la protection de GitHub. Sur un dépôt public, GitHub [cherche déjà les secrets gratuitement](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security) et prévient le fournisseur d'une clé reconnue pour qu'il puisse l'annuler. Le blocage avant envoi s'active à la main dans les réglages du dépôt : la rubrique Advanced Security porte un bouton « Push protection ». GitHub refuse alors le code qui contient une clé reconnue avant même qu'il soit publié.

## La question à poser à votre prestataire

Vous me direz que vous ne savez même pas où se trouve le code de votre site. La plupart des patrons que je croise sont dans ce cas et c'est normal. Il suffit d'écrire à la personne qui l'a fabriqué : « Le code de mon site est-il public sur GitHub ? Une clé ou un mot de passe y est-il déjà passé ? » S'il répond oui à la seconde question, il change la clé dans la journée. S'il ne sait pas répondre, il a un outil gratuit pour le vérifier en dix minutes.

Si un agent IA écrit votre code, la consigne se donne une fois pour toutes. Aucune clé ne part sur GitHub, les réglages secrets vivent dans un fichier à part que GitHub ignore et l'agent cherche les secrets avant chaque envoi. Mon agent le fait sans que je le lui rappelle, et c'est lui qui a refait la tournée des paillassons de mes dépôts avant les pirates. Si vous voulez un agent qui veille sur ce genre de détail dans vos outils, [je vous explique comment je travaille](/agents).
