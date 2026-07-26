"use client";

import { useEffect, useState } from "react";

const PHONE = "+33622164758";
const CALL_URL = `tel:${PHONE}`;
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}`;

export default function CallButton({ className, children }) {
  const [href, setHref] = useState(WHATSAPP_URL);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setHref(isMobile ? CALL_URL : WHATSAPP_URL);
  }, []);

  return (
    <a href={href} target={href === CALL_URL ? undefined : "_blank"} rel={href === CALL_URL ? undefined : "noopener noreferrer"} data-cursor-hover className={className}>
      {children}
    </a>
  );
}
