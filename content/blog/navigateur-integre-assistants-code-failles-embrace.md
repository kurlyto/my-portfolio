---
titre: "Failles EMBRACE : le navigateur caché dans vos assistants de code peut lire vos fichiers"
description: "Des chercheurs ont montré que le petit navigateur caché dans Cursor, Copilot, Codex, VS Code et Claude Desktop pouvait lire tout votre disque. J'ai refait leur essai dans un Chrome normal et je vous explique pourquoi lui refuse."
date: 2027-01-29
format: actualite
grappe: actus
mot_cle: "faille navigateur intégré assistant de code Claude Desktop"
image_carte: "/images/blog/cartes/navigateur-integre-assistants-code-failles-embrace-apercu.webp"
image_partage: "/images/blog/partage-navigateur-integre-assistants-code-failles-embrace-apercu.png"
statut: brouillon
mots_cles: ["EMBRACE", "faille Claude Desktop", "Codex", "VS Code", "Cursor", "sécurité assistant de code"]
lire_aussi: ["/blog/prompt-injection-mail", "/blog/ia-remplit-formulaires-chrome", "/agents"]
---
Vous récupérez un petit projet sur GitHub et vous demandez à votre assistant de code de l'installer « comme dit le README ». Il s'exécute et vous tend gentiment un lien pour voir le résultat. Vous cliquez, la page affiche un rapport financier d'une banalité parfaite et pendant ce temps elle lit vos clés d'accès, vos mots de passe rangés dans des fichiers et vos documents. Ce scénario a été publié le 29 octobre par la start-up Forever Security sous le nom d'**EMBRACE**. Il vise le navigateur intégré de cinq assistants de code très répandus : Cursor, GitHub Copilot, Codex d'OpenAI, VS Code et Claude Desktop. Deux de ces failles étaient encore ouvertes le jour de la publication.

## Un navigateur dans l'assistant

Ces cinq outils ont tous glissé un petit navigateur dans leur fenêtre. L'IA s'en sert pour afficher l'aperçu d'une page qu'elle vient de coder ou pour lire une documentation sans que vous ayez à basculer vers Chrome. Un vrai navigateur repose sur une règle que vingt ans de piratages ont forgée : toute page est hostile jusqu'à preuve du contraire. Une page web ne parle pas au logiciel qui l'entoure et une page ouverte depuis votre disque ne lit pas les fichiers posés à côté d'elle.

Les éditeurs ont desserré ces règles pour rendre service à l'IA et [le rapport technique](https://forever.security/blog/embrace-hacking-5-ai-assistants-embedded-browsers-technical) du chercheur Gal Weizman montre que chaque desserrage est devenu une porte. Dans Claude Desktop et VS Code, une page locale avait le droit de lire les fichiers de son propre dossier pour qu'un aperçu charge ses images. La barrière qui l'empêchait d'en sortir ne surveillait que la page elle-même. Il suffisait que la page lance un petit programme en arrière-plan, un « worker » dans le jargon, pour lire n'importe quel fichier du disque et l'envoyer sur un serveur. Chez Codex il n'y avait même pas de barrière.

<figure>
<img src="/blog/navigateur-integre-assistants-code-failles-embrace/1-worker.webp" alt="Schéma : dans le dossier du projet, une page « Rapport financier T3 » lit ses fichiers logo.png et style.css. Un worker lancé par la page franchit la barrière pointillée du dossier et atteint le reste du disque : clés SSH, fichiers .env, documents. Une flèche rouge les envoie vers le serveur de l'attaquant" width="1440" height="1160" loading="lazy">
<figcaption>Dans Claude Desktop et VS Code, la barrière du dossier ne surveillait que la page. Le worker qu'elle lance passait à côté et lisait tout le disque.<span class="credit">D'après le <a href="https://forever.security/blog/embrace-hacking-5-ai-assistants-embedded-browsers-technical">rapport de Forever Security</a>, 29 octobre 2026.</span></figcaption>
</figure>

## Cinq outils et trois failles

<p class="rangee-logos"><span class="logo"><img src="/images/blog/logos/cursor.png" alt="Logo Cursor" width="44" height="44" loading="lazy"><em>Cursor</em></span><span class="logo"><img src="/images/blog/logos/github-copilot.png" alt="Logo GitHub Copilot" width="44" height="44" loading="lazy"><em>GitHub Copilot</em></span><span class="logo"><img src="/images/blog/logos/openai-codex.png" alt="Logo Codex" width="44" height="44" loading="lazy"><em>Codex</em></span><span class="logo"><img src="/images/blog/logos/vscode.png" alt="Logo VS Code" width="44" height="44" loading="lazy"><em>VS Code</em></span><span class="logo"><img src="/images/blog/logos/claude-desktop.png" alt="Logo Claude Desktop" width="44" height="44" loading="lazy"><em>Claude Desktop</em></span></p>

Cursor portait la faille la plus spectaculaire. Une page visitée pouvait glisser des instructions invisibles dans la zone où l'agent lit vos demandes, et l'agent finissait par installer un logiciel piégé sur la machine. Les chercheurs l'ont signalée le 10 septembre et Cursor l'a corrigée sans un mot le 1er octobre. Chez GitHub Copilot, une page pouvait afficher dans la barre d'adresse le site de son choix, par exemple la page de connexion de GitHub au-dessus d'un faux formulaire. GitHub l'a corrigé de lui-même dans la version 1.1.29 du 13 octobre et n'a même pas eu besoin d'être prévenu.

Les trois autres partagent la même lecture du disque. OpenAI a été prévenu le 27 juillet et n'a jamais répondu aux chercheurs, même si un porte-parole a dit à [The Register](https://www.theregister.com/security/2026/10/29/researchers-find-bugs-in-5-ai-developer-tools-with-openai-and-microsoft-flaws-still-unpatched/5306508) que l'éditeur connaissait le problème et travaillait à le corriger. Microsoft a classé le signalement de VS Code comme invalide, parce que l'utilisateur doit d'abord déclarer le dossier « de confiance » pour que l'aperçu s'ouvre. Le jour de la publication, Codex et VS Code restaient donc vulnérables.

## Le cas Claude Desktop

Chez Anthropic l'histoire est plus tordue. Forever Security a signalé la faille le 23 juillet et Anthropic l'a d'abord refusée avec le même argument que Microsoft. Le lendemain, une autre équipe de chercheurs, Noma Security, a signalé la même faille et Anthropic l'a acceptée. Le rapport ne cite aucune version corrigée de Claude Desktop, mais il ne compte plus que Codex et VS Code parmi les failles ouvertes. Anthropic n'a pas répondu aux questions de The Register.

Je fais tourner tous mes agents sur Claude et ce premier refus me gêne quand même. L'argument du dossier « de confiance » suppose que vous connaissez le contenu de chaque projet que vous ouvrez. Toute l'attaque repose justement sur un projet qui a l'air banal, et c'est l'assistant lui-même qui vous tend le lien piégé avec sa propre crédibilité. Claude Code, l'outil en ligne de commande, ne figure pas parmi les outils testés puisqu'il n'a pas de navigateur intégré.

## Mon essai dans un vrai Chrome

J'ai voulu voir la différence de mes propres yeux. Sur mon serveur, j'ai écrit une page « rapport financier » qui tente de lire un faux fichier secret posé à côté d'elle. Elle essaie d'abord directement, puis depuis un worker comme dans l'attaque. Ouverte dans un Chrome normal en version 153, elle se fait refuser les deux fois avec un message sans appel : un navigateur ne charge pas un fichier du disque à la demande d'une page. Les assistants ont desserré exactement cette règle.

<figure>
<img src="/blog/navigateur-integre-assistants-code-failles-embrace/2-essai-chrome.webp" alt="Capture d'une page « Rapport financier T3 » ouverte dans Chrome 153 depuis le disque : la lecture du fichier voisin est refusée depuis la page et depuis un worker, avec le message d'erreur Fetch API cannot load file:// URL scheme file is not supported" width="1440" height="876" loading="lazy">
<figcaption>Ma page piégée ouverte dans un Chrome normal : refusée depuis la page, refusée depuis le worker. Le fichier « secret » ne contenait qu'une fausse clé de test.</figcaption>
</figure>

Mon assistant à moi tourne sur Claude Code, sur mon serveur, sans navigateur intégré. Quand il doit agir sur le web il passe par [mon propre Chrome](/blog/ia-remplit-formulaires-chrome) grâce à une petite extension que j'ai écrite. C'est un vrai navigateur avec toutes ses protections, même si j'ai avoué dans cet article que je le protège encore mal. J'ai quand même vérifié dans la foulée que Claude Desktop était à jour sur mon PC. EMBRACE me conforte dans mon choix : je préfère prêter à l'IA un navigateur qui se méfie de tout plutôt qu'un navigateur fabriqué pour lui faire confiance.

## Trois gestes

Si vous codez avec l'un de ces outils, ou si votre prestataire le fait pour vous, faites les mises à jour de Cursor, Copilot et Claude Desktop aujourd'hui. Pour ces trois-là elles suffisent.

Codex et VS Code restaient vulnérables à la publication. Quand vous récupérez un projet qui ne vient pas de vous, ouvrez ses pages dans votre navigateur habituel plutôt que dans l'aperçu de l'assistant. Votre Chrome refusera la lecture du disque là où l'aperçu l'accepte.

Méfiez-vous enfin du lien que l'assistant vous tend après avoir lu le README d'un inconnu. L'IA ne vous trompe pas exprès et recopie simplement le texte que le projet lui a demandé d'afficher. Ce clic vaut un clic sur une pièce jointe reçue d'un inconnu et vous savez déjà quoi en penser.

Les assistants de code ont embarqué un navigateur pour aller plus vite et ils ont oublié en route sa première qualité, qui est de se méfier de tout. Tant que le leur n'a pas retrouvé cette méfiance, gardez la vôtre. Si vous voulez un agent taillé pour votre métier et protégé comme il faut, [je vous explique comment je travaille](/agents).
