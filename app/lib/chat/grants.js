// Consomme les autorisations deposees par Elon quand Nathan accepte que Nate
// communique un code gratuit (voir Elon/telegram-bot/src/leads.js
// writeCodeGrant). Chaque fichier consomme est supprime : il a rempli son role
// une fois le code marque comme liberable en base.
//
// Pourquoi un dossier de fichiers plutot qu un appel direct : Elon et le site
// tournent dans deux conteneurs distincts, et chat.db vit dans un volume
// Docker qui n appartient qu au site. Deux processus sqlite ecrivant le meme
// WAL depuis deux conteneurs, c est la corruption assuree. Le dossier partage
// nate/data/ est deja monte des deux cotes : un ecrivain, un lecteur.
import * as fs from "node:fs";
import * as path from "node:path";
import { releaseCode } from "./codes";

const GRANTS_DIR = "/data/nathan/my-agents/Nate/data/grants";

/**
 * Applique les autorisations en attente. Appelee au fil de l eau (a chaque
 * tour de conversation) plutot que par un cron : le seul moment ou une
 * autorisation compte, c est quand le visiteur ecrit son prochain message.
 */
export function consumePendingGrants() {
  let files;
  try {
    files = fs.readdirSync(GRANTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return 0;
  }

  let applied = 0;
  for (const name of files) {
    const file = path.join(GRANTS_DIR, name);
    try {
      const { code } = JSON.parse(fs.readFileSync(file, "utf8"));
      if (code) {
        // releaseCode renvoie false si le code n existe pas ou a deja ete
        // consomme. On le trace : sans ca, une autorisation sur un code
        // inconnu disparait en silence alors qu Elon a deja annonce a Nathan
        // que c etait fait.
        if (releaseCode(code)) {
          applied++;
        } else {
          console.error(`Autorisation ignoree : code ${code} inconnu ou deja utilise.`);
        }
      }
      fs.unlinkSync(file);
    } catch (err) {
      // Fichier illisible : on le supprime quand meme, sinon il serait relu en
      // boucle a chaque tour de chaque visiteur.
      console.error(`Autorisation de code illisible (${name}), ignoree :`, err.message);
      try {
        fs.unlinkSync(file);
      } catch {
        // Suppression impossible : on laisse, le prochain passage retentera.
      }
    }
  }
  return applied;
}
