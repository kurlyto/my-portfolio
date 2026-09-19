// Outils du suivi des clics (evenements Umami). Module neutre, utilisable dans
// un composant serveur comme dans un composant client. La regle des deux
// attributs est expliquee dans app/component/SuiviClics.js.

// Fabrique un nom d'evenement propre a partir de morceaux libres :
// nomClic("nav", "À propos") -> "clic-nav-a-propos".
export function nomClic(...morceaux) {
  const corps = morceaux
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `clic-${corps}`;
}

// Envoi a la main, pour ce qu'un attribut ne sait pas dire : formulaire
// envoye avec succes, ouverture du chat, etc. Sans effet si Umami est absent
// (developpement local, bloqueur de pub).
export function suivreClic(nom) {
  if (typeof window === "undefined" || !nom) return;
  window.umami?.track(nom);
}

// Une demonstration garde le meme nom qu'on la lance depuis une puce du hero
// ou depuis la liste du lecteur. Les demos de Foxy ont un identifiant en
// "aios-..." : on le range sous "foxy", le nom que le visiteur connait.
export function nomClicDemo(id) {
  if (!id) return undefined;
  return id.startsWith("aios-") ? nomClic("foxy-demo", id.slice(5)) : nomClic("agents-demo", id);
}

// Pour un lien dont la cible varie (meme onglet ou nouvel onglet) : rend le
// bon attribut a etaler sur la balise, `{...attributClic(nom, nouvelOnglet)}`.
export function attributClic(nom, nouvelOnglet) {
  if (!nom) return {};
  return { [nouvelOnglet ? "data-umami-event" : "data-clic"]: nom };
}
