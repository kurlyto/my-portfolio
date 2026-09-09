"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AIOS_OFFER } from "./aios-offer";

// Formulaire de reservation d'une place en acces anticipe.
//
// Remplace l'ouverture du chat de Nate sur le bouton "Reserver ma place"
// (demande de Nathan, 08/09/2026) : quelqu'un qui clique ce bouton a deja
// decide, il veut laisser ses coordonnees, pas engager une conversation. Le
// chat reste accessible par les demos et la FAQ, pour ceux qui, eux, cherchent
// encore a comprendre.
//
// Les reponses partent vers /api/aios/reservation, qui depose un lead que
// l'agent Elon transforme en message Telegram pour Nathan.

const UTILISATEURS = [
  "Juste moi",
  "2 à 5 personnes",
  "6 à 20 personnes",
  "Plus de 20 personnes",
];

function Champ({ label, name, type = "text", value, onChange, required = true, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-mono uppercase tracking-wider text-ink/50">
        {label}
        {!required && <span className="text-ink/30"> (facultatif)</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent"
        {...rest}
      />
    </label>
  );
}

export default function ReservationForm({ onClose }) {
  const [valeurs, setValeurs] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    fonction: "",
    utilisateurs: UTILISATEURS[0],
    message: "",
    site: "", // piege a robots, jamais visible
  });
  const [etat, setEtat] = useState("saisie"); // saisie | envoi | envoye
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function maj(champ) {
    return (e) => setValeurs((v) => ({ ...v, [champ]: e.target.value }));
  }

  async function envoyer(e) {
    e.preventDefault();
    setEtat("envoi");
    setErreur(null);
    try {
      const res = await fetch("/api/aios/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valeurs),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Envoi impossible.");
      setEtat("envoye");
    } catch (err) {
      setErreur(err.message);
      setEtat("saisie");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center sm:px-6 sm:py-10">
      <div
        onClick={onClose}
        aria-hidden
        className="absolute inset-0 bg-[#241a15]/70 backdrop-blur-[2px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label="Réserver ma place"
        className="relative w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[92vh] overflow-y-auto bg-surface text-ink sm:rounded-xl shadow-[0_40px_100px_-40px_rgba(36,26,21,0.8)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          data-cursor-hover
          className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full text-2xl leading-none text-ink/40 transition-colors hover:text-ink"
        >
          &times;
        </button>

        {etat === "envoye" ? (
          <div className="px-6 sm:px-10 py-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Votre place est mise de côté.
            </h2>
            <p className="mt-4 text-[15px] text-ink/65 leading-relaxed max-w-md mx-auto">
              Nathan vous rappelle sous 24 heures pour caler le premier échange, comprendre
              votre activité et brancher Foxy sur vos outils.
            </p>
            <button
              type="button"
              onClick={onClose}
              data-cursor-hover
              className="mt-9 inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
            >
              Revenir au site
            </button>
          </div>
        ) : (
          <form onSubmit={envoyer} className="px-6 sm:px-10 py-10 sm:py-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Accès anticipé
            </span>
            <h2 className="font-display mt-3 text-2xl md:text-3xl font-bold tracking-tight">
              Réserver ma place.
            </h2>
            <p className="mt-3 text-[15px] text-ink/65 leading-relaxed">
              Il reste {AIOS_OFFER.placesRestantes} places sur {AIOS_OFFER.placesTotal},
              jusqu&apos;au {AIOS_OFFER.dateLimiteTexte}. On vous rappelle sous 24 heures.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Champ label="Prénom" name="prenom" value={valeurs.prenom} onChange={maj("prenom")} autoFocus autoComplete="given-name" />
              <Champ label="Nom" name="nom" value={valeurs.nom} onChange={maj("nom")} autoComplete="family-name" />
              <Champ label="Email" name="email" type="email" value={valeurs.email} onChange={maj("email")} autoComplete="email" />
              <Champ label="Téléphone" name="telephone" type="tel" value={valeurs.telephone} onChange={maj("telephone")} autoComplete="tel" />
              <Champ label="Entreprise" name="entreprise" value={valeurs.entreprise} onChange={maj("entreprise")} autoComplete="organization" />
              <Champ label="Votre fonction" name="fonction" value={valeurs.fonction} onChange={maj("fonction")} autoComplete="organization-title" placeholder="Gérant, directeur, associé..." />

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink/50">
                  Qui l&apos;utiliserait dans l&apos;entreprise ?
                </span>
                <select
                  name="utilisateurs"
                  value={valeurs.utilisateurs}
                  onChange={maj("utilisateurs")}
                  className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent"
                >
                  {UTILISATEURS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink/50">
                  Ce qui vous prend le plus de temps aujourd&apos;hui
                  <span className="text-ink/30"> (facultatif)</span>
                </span>
                <textarea
                  name="message"
                  rows={3}
                  value={valeurs.message}
                  onChange={maj("message")}
                  className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent resize-none"
                />
              </label>
            </div>

            {/* Champ cache : un robot le remplit, un humain ne le voit pas. */}
            <input
              type="text"
              name="site"
              value={valeurs.site}
              onChange={maj("site")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {erreur && (
              <p className="mt-6 rounded-md border border-accent/30 bg-accent/[0.06] px-4 py-3 text-[13px] text-accent">
                {erreur}
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={etat === "envoi"}
                data-cursor-hover
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
              >
                {etat === "envoi" ? "Envoi..." : "Envoyer ma demande"}
              </button>
              <p className="text-[12px] font-mono leading-relaxed text-ink/45">
                Vos coordonnées servent uniquement à vous rappeler. Aucune inscription
                à une liste de diffusion.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
