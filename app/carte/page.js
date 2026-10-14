import { redirect } from "next/navigation";

// Adresse du QR code de la carte de visite electronique (14/10/2026) : courte
// a scanner, elle ouvre le portfolio avec la pop-up "Ajouter a mes contacts".
export default function Carte() {
  redirect("/?carte");
}
