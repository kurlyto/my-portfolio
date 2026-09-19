"use client";

import { useEffect, useState } from "react";
import { attributClic } from "../lib/suivi-clics";

const PHONE = "+33622164758";
const CALL_URL = `tel:${PHONE}`;
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}`;

// `evenement` : nom du clic suivi (Umami). Le lien change de nature selon
// l'appareil (tel: dans le meme onglet, WhatsApp dans un nouvel onglet), donc
// l'attribut change avec lui : voir SuiviClics.js.
export default function CallButton({ className, children, evenement }) {
  const [href, setHref] = useState(WHATSAPP_URL);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setHref(isMobile ? CALL_URL : WHATSAPP_URL);
  }, []);

  return (
    <a href={href} target={href === CALL_URL ? undefined : "_blank"} rel={href === CALL_URL ? undefined : "noopener noreferrer"} data-cursor-hover {...attributClic(evenement, href !== CALL_URL)} className={className}>
      {children}
    </a>
  );
}
