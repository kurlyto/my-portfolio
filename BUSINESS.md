# Notes business — agents sur-mesure

Décisions produit, tarification et obligations légales du service de création
d'agents vendu via nathan-knaebel.com. Ce fichier est la source de vérité pour
les arbitrages business ; le fonctionnement de l'agent Nate est décrit dans
`/data/nathan/my-agents/Nate/mission.md`.

Dernière mise à jour : 30 juillet 2026

---

## TODO — à traiter

### Légal (bloquant)
- [ ] **SIRET + adresse du siège** dans `app/mentions-legales/page.js` (un TODO
      est laissé dans le fichier). Obligatoires pour une activité commerciale en
      ligne — la page est en ligne sans eux aujourd'hui.
- [ ] **Contrat de sous-traitance RGPD** (article 28) à faire rédiger par un
      juriste. C'est le document qui encadre ce qu'on fait des données que le
      client confie à son agent. Distinct de la politique de confidentialité.
      Ne pas improviser : c'est celui qui engage vraiment.
- [ ] **Nettoyage automatique des données** aux durées annoncées sur
      `/confidentialite` : conversations 12 mois, prospects sans suite 3 ans,
      compteurs IP 30 jours. La page l'annonce, le code ne le fait pas encore.
- [ ] **Durée de conservation des agents archivés.** Un agent en sommeil garde
      des données personnelles sur le VPS. Définir une durée, puis suppression.

### Tarification (à trancher)
- [ ] **Prix d'installation** template vs sur-mesure. Piste proposée, non
      validée : 390 EUR (template) / 990 à 2 900 EUR (sur-mesure selon
      complexité).
- [ ] **Montant de l'abonnement mensuel.** 25 EUR couvre un usage léger,
      30-35 EUR absorbe la variance. Voir la section "Le vrai risque" ci-dessous.
- [ ] **Paiement d'avance ou mensuel** pour la durée choisie.
- [ ] **Coût WhatsApp et SMS** : Nate annonce au client que WhatsApp est payant
      (cf. mission.md), mais aucun tarif n'existe. Idem SMS.
- [ ] **Le "1 agent offert"** : offre-t-on la construction seulement, ou aussi
      son hébergement et son IA ? Le second agent double le coût
      d'infrastructure sans doubler le revenu.

---

## Décisions actées

### Modèle économique
- **Installation payée une fois + abonnement mensuel.** Pas d'achat unique "à
  vie" : un agent a un coût récurrent (IA + hébergement), donc un paiement
  unique devient déficitaire à partir de la 2e ou 3e année.
- **Durée au choix** : 1 à 12 mois.
- **À l'échéance, l'agent s'arrête.** L'utilisateur n'y a plus accès, le code
  est archivé.
- **Deux niveaux** : agent repris d'un TEMPLATE (Camille, Ousmane, Hugo, Léa
  adaptés au métier du client) vs agent SUR MESURE. Le template coûte beaucoup
  moins cher à livrer et ouvre le marché des petits budgets.
- **1 agent acheté, 1 offert**, limité à un seul offert par client. Annoncé par
  la bannière orange en haut de la page d'accueil.
- **Aucun prix affiché sur la page d'accueil.**

### Coûts d'exploitation
- Hébergement : **5 EUR/mois** facturés (VPS mutualisé, largement rentable).
- IA : **20 EUR/mois** facturés (1 client = 1 abonnement).

### Clause de sortie à prévoir dans les CGV
> En cas d'arrêt du service, un préavis de 3 mois est donné, les sommes versées
> d'avance sont remboursées au prorata, et les données sont exportées sur
> demande.

C'est ce qui rend l'abonnement plus sûr que l'achat unique : arrêter devient
propre au lieu d'être un manquement.

---

## Le vrai risque économique : le coût de l'IA

L'hébergement est un poste marginal. **Le coût qui compte est celui de l'IA, et
il est variable.**

Mesure réelle (Nate, 30/07) : environ **0,05 USD par échange**.

| Usage de l'agent | Coût IA réel / mois | Facturé 20 EUR |
|---|---|---|
| 5 messages/jour | ~7 EUR | rentable |
| 15 messages/jour | ~22 EUR | à l'équilibre |
| 30 messages/jour | ~45 EUR | **déficitaire** |

Un agent de prospection qui tourne en continu (cas foodtruck) est dans la
dernière ligne. Trois options :
1. Inclure un volume ("jusqu'à 500 messages/mois"), ajuster au-delà
2. Facturer 30-35 EUR pour absorber la variance
3. Deux paliers : 20 EUR usage léger, 50 EUR usage intensif

---

## Capacité du VPS (mesuré le 30/07)

Ressources : 30 Go RAM, 12 vCPU, `/` 20 Go (86 % plein), `/data` 917 Go.

**C'est la RAM qui limite, pas le disque.**

| Ressource | Par agent | Plafond théorique |
|---|---|---|
| Disque | ~200 Mo | ~4 000 agents |
| RAM au repos | ~50 Mo | ~300 agents |
| RAM en cours de réponse | ~1 Go (pic mesuré : 7,5 Go) | **12-20 simultanés** |

**Estimation praticable : 150 à 200 agents hébergés**, avec une dizaine actifs
aux heures de pointe. Un agent qui tourne en boucle compte comme dix agents
ordinaires.

Conclusion : **l'infrastructure ne sera pas le facteur limitant** de la
croissance, et le "1 agent offert" ne pose aucun problème technique.

### Points d'attention infra
- `/` à 86 % (2,7 Go libres). Si ce disque se remplit, tout s'arrête, y compris
  la prod. Les images Docker et les logs vivent là. `/data` a 785 Go libres :
  y déplacer le stockage Docker.
- ClamAV consomme 950 Mo en permanence, pour une utilité discutable sur ce
  serveur (~19 agents actifs de perdus).
- Un process `claude` a été mesuré à 7,46 Go. À surveiller si plusieurs agents
  répondent en même temps.

---

## RGPD : le code et les données sont deux choses distinctes

- **Le code** de l'agent : propriété légitime de Nathan, c'est son travail.
- **Les données** que l'agent traite (mails, contacts, tarifs du client) : elles
  ne lui appartiennent **jamais**, même stockées sur son serveur.

Statut : **sous-traitant** au sens RGPD. Le client reste responsable de ses
données et garde le droit de les récupérer ou de les faire supprimer, y compris
après résiliation. Une clause "je garde tout" serait sans valeur juridique.

**Formulation retenue sur `/confidentialite`** : Nathan a un accès technique
nécessaire à la maintenance (c'est factuellement vrai — c'est son serveur), mais
n'exploite les données à aucune autre fin. Écrire "je n'y accède pas" aurait été
une déclaration fausse dans un document juridique.

**Conséquence pratique** : archiver le code, mais proposer l'export des données
à la résiliation. Un client qui part avec ses données ne peut pas reconstruire
l'agent — il n'a que ce qui lui appartenait déjà. Ça devient un argument de
vente : "vos données restent les vôtres".

---

## Quand arrêter de "booster" un agent

**Ce n'est pas la mémoire qui casse en premier.** Mesure : Nate charge ~44 k
tokens de contexte stable sur une fenêtre de 1 M, soit **4 %**. On pourrait lui
donner 20 fois plus de documentation sans toucher au plafond technique.

**Le vrai point de rupture : le nombre de décisions concurrentes par tour.**
Un agent mono-mission se demande "où en suis-je ?". Un agent compta + mails +
prospection se demande d'abord "de quoi s'agit-il ?", puis "quel outil ?", puis
"quelle procédure ?". Chaque question ajoutée dégrade les autres — observé en
direct sur Nate : quand les instructions se sont empilées, il a commencé à
oublier le marqueur `---IDENTITE---`.

| Signal | Interprétation |
|---|---|
| Il oublie des étapes de son parcours | Trop de missions concurrentes |
| Il confond deux procédures | Périmètres trop proches |
| Il faut un "si… alors…" en tête de prompt pour l'aiguiller | **Signal net : séparer** |
| Deux missions ont des interdictions contradictoires | Séparation obligatoire |

**Règle : un agent = un déclencheur + un objectif.** Si tu dois écrire "selon la
demande, comporte-toi comme X ou comme Y", tu as deux agents.

**Argument commercial** : un agent qui fait tout = un abonnement. Trois agents
spécialisés = trois abonnements. L'offre "1 acheté 1 offert" n'a de sens que si
les agents sont séparables.

**Contre-argument et sa réponse** : un client ne veut pas parler à trois bots.
La solution est déjà dans le catalogue — Camille "peut piloter les autres agents
depuis une seule conversation". Façade unique, spécialistes derrière.
