import UnderConstruction from "../component/UnderConstruction";

// Brouillon laisse dans app/, donc servi publiquement en 200. Sans ce noindex,
// Google indexe deux pages "en construction" au contenu identique (celle-ci et
// page_Photographies) et les compte comme du contenu duplique.
export const metadata = {
  title: "En construction",
  robots: { index: false, follow: false },
};

export default function EnConstruction() {
  return <UnderConstruction />;
}
