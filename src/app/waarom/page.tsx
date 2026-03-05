import { MarketingPage } from "@/components/marketing-page";

export default function WaaromPage() {
  return (
    <MarketingPage
      title="Waarom GrondiCore?"
      intro="Omdat operationele teams snelheid en overzicht nodig hebben zonder losse systemen en dubbel werk."
    >
      <ul className="gc-muted list-inside list-disc space-y-2 text-sm">
        <li>Eén waarheid voor planning, assets, taken en objectdata.</li>
        <li>Minder overdrachtsfouten tussen kantoor en uitvoering buiten.</li>
        <li>Sneller beslissen door realtime status en KPI’s.</li>
        <li>Audittrail en rapportages voor kwaliteit en verantwoording.</li>
      </ul>
    </MarketingPage>
  );
}
