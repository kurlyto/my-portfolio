---
titre: "Faille critique dans PHP trouvée avec l'aide de l'IA : votre site WordPress est-il à jour ?"
description: "Deux failles énormes dans PHP ont été corrigées le 21 octobre et des modèles d'IA ont aidé à les trouver. Je vous montre comment vérifier en deux minutes si votre site WordPress a reçu le correctif."
date: 2027-01-29
format: actualite
grappe: actus
mot_cle: "faille PHP octobre 2026 mettre à jour site WordPress"
image_carte: "/images/blog/cartes/faille-php-ia-site-wordpress-mettre-a-jour-sante.webp"
image_partage: "/images/blog/partage-faille-php-ia-site-wordpress-mettre-a-jour-logo.png"
statut: brouillon
mots_cles: ["faille PHP", "PHP2Shell", "mise à jour WordPress", "version de PHP", "GPT-5.6 Sol", "Gemini 4 Argon"]
lire_aussi: ["/blog/navigateur-integre-assistants-code-failles-embrace", "/blog/hacker-agents-ia-100-sites-web-claude-code", "/agents"]
---
Le 20 octobre vers 17 heures, des numéros de failles encore secrets ont commencé à circuler sur Internet. Le lendemain à 16 heures, le projet PHP a publié avec un jour d'avance le correctif de deux failles qui permettent de prendre la main sur un site sans le moindre mot de passe. PHP est le langage qui fait tourner WordPress et [près de sept sites sur dix](https://w3techs.com/technologies/details/pl-php) dans le monde. Si votre site est un WordPress, vérifiez que sa version de PHP a reçu ce correctif, parce que c'est la seule protection complète.

## Deux failles dans le moteur de PHP

Les deux failles portent les numéros CVE-2026-109618 et CVE-2026-109619 et une note de gravité de 9,2 sur 10. Elles se cachent dans la façon dont PHP gère une requête qui manque de mémoire. Quand un visiteur envoie une demande énorme, PHP s'interrompt en plein travail et laisse derrière lui des données à moitié rangées. La requête suivante passe par le même programme et reprend ces restes comme s'ils étaient propres. Imaginez un garçon de café pressé qui débarrasse une table à moitié : le client suivant trouve les papiers du précédent et peut même glisser les siens dans la pile. Un pirate qui prépare bien ses requêtes finit ainsi par faire exécuter son propre code au serveur.

<figure>
<img src="/blog/faille-php-ia-site-wordpress-mettre-a-jour/1-memoire.webp" alt="Schéma en deux temps. À gauche, une requête énorme remplit la mémoire de PHP jusqu'à 128 Mo et PHP s'arrête en laissant des cases non effacées. À droite, la requête suivante passe par le même programme, reprend ces restes et fait tourner le code du pirate" width="1440" height="1040" loading="lazy">
<figcaption>La première requête fait déborder la mémoire et PHP abandonne des restes. La seconde les reprend pour du propre et fait tourner le code du pirate.<span class="credit">D'après l'<a href="https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w">avis de sécurité de PHP</a>, 21 octobre 2026.</span></figcaption>
</figure>

Selon [Wiz](https://www.wiz.io/blog/php2shell-php-rce), toutes les versions de PHP sorties depuis la 5.4 sont touchées par l'une ou l'autre faille. Ses chercheurs ont pris le contrôle de WordPress, Drupal et Joomla dans leurs dernières versions, sans compte et sans extension douteuse. Le défaut loge dans PHP lui-même. Mettre à jour WordPress ou ses extensions ne change donc rien et [Cloudflare le rappelle](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/) dans son avis.

## Trouvée avec l'aide de l'IA

[OpenAI raconte](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/) que la société Calif a trouvé l'une des failles avec GPT-5.6 Sol, dans le cadre de son programme « Patch the Planet ». Wiz, la société de cybersécurité rachetée par Google, a trouvé les deux de son côté avec son agent Atlas, Gemini 4 Argon et le même GPT-5.6 Sol. Ses chercheurs expliquent que le code fautif dormait là depuis plus de dix ans parce que monter l'attaque demandait une chaîne d'étapes à la limite des capacités d'un humain. Les modèles leur ont permis d'adapter une attaque à chaque site en quelques heures.

<figure>
<img src="/blog/faille-php-ia-site-wordpress-mettre-a-jour/2-wiz.webp" alt="Capture du rapport de Wiz du 21 octobre 2026, avec la phrase surlignée : We used Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol throughout this research" width="1440" height="612" loading="lazy">
<figcaption>Dans son rapport, Wiz cite les trois IA qui ont servi à trouver la faille, construire l'attaque et vérifier le correctif.<span class="credit">Capture : <a href="https://www.wiz.io/blog/php2shell-php-rce">Wiz Research</a>, 21 octobre 2026.</span></figcaption>
</figure>

OpenAI ajoute qu'à sa connaissance l'IA a trouvé ces failles avant les attaquants. [La fondation PHP](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) raconte la suite. Les numéros ont fuité le 20 octobre dans l'après-midi et une vidéo de démonstration a été mise en ligne par erreur le soir même. Le lendemain matin à 9 h 41 une entreprise a publié ses logiciels corrigés sans attendre l'heure convenue. Cloudflare a vu des attaques contre ses clients avant la sortie officielle, avec des pirates qui retouchaient leurs requêtes pour passer ses filtres. L'agence américaine de cybersécurité a classé les deux failles parmi les failles exploitées [le 26 octobre](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching).

Les deux récits tiennent ensemble. L'IA a offert quelques semaines d'avance aux défenseurs et une fuite les a effacées en une soirée.

## Vérifier sa version de PHP

Dans WordPress, connectez-vous en administrateur et ouvrez **Outils**, puis **Santé du site**. L'onglet **Informations** contient une rubrique **Serveur** où la ligne « Version de PHP » donne le numéro complet. Comparez-le au tableau.

| Votre version de PHP | Protégée à partir de |
|---|---|
| 8.5 | 8.5.12 |
| 8.4 | 8.4.27 |
| 8.3 | 8.3.36 |
| 8.2 | 8.2.35 |
| 8.1, 8.0 ou 7.4 | Correctif à part que l'hébergeur doit poser |
| 7.3 et plus ancienne | Aucun correctif prévu |

<figure>
<img src="/blog/faille-php-ia-site-wordpress-mettre-a-jour/3-sante-du-site.webp" alt="Capture de WordPress, page Santé du site, onglet Informations, rubrique Serveur ouverte : la ligne Version de PHP affiche 8.3.36" width="1440" height="1447" loading="lazy">
<figcaption>La page Santé du site de WordPress, rubrique Serveur. Ici 8.3.36 : le correctif est posé.<span class="credit">Capture d'un WordPress d'essai installé pour l'article.</span></figcaption>
</figure>

Chez moi la question s'est réglée vite parce qu'aucun de mes sites ne tourne en PHP : ce blog et Mon Devis Dentaire sont écrits en JavaScript. J'ai quand même regardé de l'extérieur le site WordPress d'un client, en lisant juste les informations que son serveur renvoie à chaque visite. Il annonce « PHP/8.3 » et garde pour lui le dernier chiffre. Or c'est lui qui dit si le correctif est posé, et de dehors personne ne peut le savoir. Seuls la page Santé du site et l'hébergeur répondent.

## Le message à votre hébergeur

Sur un hébergement mutualisé, c'est l'hébergeur qui installe PHP et votre espace client vous laisse souvent choisir la version. Si la page Santé du site affiche un numéro trop bas, ou si vous n'avez pas accès au tableau de bord, envoyez ce message à votre hébergeur ou à la personne qui gère votre site.

> Bonjour. Mon site [adresse] tourne sous PHP [version lue]. Avez-vous installé le correctif PHP du 21 octobre (failles CVE-2026-109618 et CVE-2026-109619) ? Merci de me confirmer la version exacte.

Si votre site est encore en 8.1 ou plus ancien, profitez-en pour passer en 8.3 ou 8.4. La 8.2 elle-même ne recevra [plus aucune mise à jour](https://www.php.net/) après le 31 décembre. Un changement de version peut casser une vieille extension, alors faites d'abord une sauvegarde complète avec l'outil de votre hébergeur et visitez vos pages principales juste après la bascule. Si votre site passe déjà par Cloudflare, même l'offre gratuite filtre ces attaques depuis le 21 octobre à 5 heures du matin. Cloudflare précise lui-même que son filtre ne dispense pas de la mise à jour.

## La course des mises à jour

Une semaine après la publication, [Wiz comptait encore](https://www.wiz.io/blog/php2shell-exploitation-so-far) un peu moins de 53 % des organisations touchées au départ qui restaient vulnérables. Une sur deux n'avait donc rien corrigé au bout de sept jours, alors que les premières attaques avaient précédé la sortie du correctif. OpenAI prévient que ces failles ne sont qu'une partie de celles déjà trouvées par ses modèles et s'attend à une forte hausse de ce genre de découvertes dans les prochains mois.

Je passe mes journées avec des agents qui codent et je les vois relire un programme plus vite qu'aucun humain. La semaine dernière encore, j'expliquais comment [le navigateur caché des assistants de code](/blog/navigateur-integre-assistants-code-failles-embrace) pouvait lire tout un disque. Les pirates disposent des mêmes modèles, si bien que le temps entre une faille trouvée et une faille exploitée se compte maintenant en heures. Un site dont personne ne surveille les mises à jour finira par se faire ouvrir. Si personne n'en a la charge chez vous, désignez quelqu'un cette semaine.

La prochaine fois, les numéros circuleront peut-être un samedi soir et votre site n'aura que son hébergeur pour le défendre. Si vous voulez un agent qui garde un œil sur vos outils et vous prévient quand une mise à jour presse, [je vous explique comment je travaille](/agents).
