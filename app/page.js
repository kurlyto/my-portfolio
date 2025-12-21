import HomePageContent from "./component/HomePageContent";
import UnderConstruction from "./component/UnderConstruction";

export default function Home() {
  const isUnderConstruction = process.env.NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION === "true";

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }

  return <HomePageContent />;
}
