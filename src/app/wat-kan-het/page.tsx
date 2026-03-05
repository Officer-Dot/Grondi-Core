import { MarketingPage } from "@/components/marketing-page";

export default function WatKanHetPage() {
  return (
    <MarketingPage
      title="Wat kan het?"
      intro="Van intake tot uitvoering en rapportage: GrondiCore ondersteunt de kern van je dagelijkse operatie."
    >
      <ul className="gc-muted list-inside list-disc space-y-2 text-sm">
        <li>Projecten beheren met gebiedspolygonen en toegangscontrole per gebruiker.</li>
        <li>Objecten vastleggen binnen projectgebied met type, status en historie.</li>
        <li>Planning draaien met statusflow en toewijzing van medewerker/machine/route.</li>
        <li>Taken uitvoeren inclusief auditlog, foto’s, uren en materiaalgebruik.</li>
        <li>Assets beheren met onderhoudscycli, storingen en inzetdata.</li>
      </ul>
    </MarketingPage>
  );
}
