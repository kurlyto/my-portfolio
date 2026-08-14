import UnderConstruction from "../component/UnderConstruction";

// Brouillon servi publiquement en 200 : hors index (cf. page_EnConstruction,
// contenu identique). La vraie page est /photography.
export const metadata = {
  title: "En construction",
  robots: { index: false, follow: false },
};

export default function PagePhotographies() {
	return <UnderConstruction />;
}