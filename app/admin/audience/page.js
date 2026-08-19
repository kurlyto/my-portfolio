import { StatsDashboard } from "../StatsDashboard";

export const metadata = {
  title: "Audience",
  robots: { index: false, follow: false },
};

// Le garde de session et le cadre de page vivent dans layout.js.
export default function AudiencePage() {
  return <StatsDashboard />;
}
