import { MarketingPage } from "@/components/marketing-page";

export default function WatIsHetPage() {
  return (
    <MarketingPage
      title="Wat is GrondiCore?"
      intro="GrondiCore is een operationeel kernplatform voor teams die buiten werken aan projecten, objecten, planning, assets en taken."
    >
      <div className="space-y-3 text-sm">
        <p className="gc-muted">
          Het platform combineert projectgebied, objectinformatie, taakuitvoering, urenregistratie en
          rapportage in één workflow.
        </p>
        <p className="gc-muted">
          Je werkt tenant-gebaseerd, waardoor elke organisatie haar eigen data, gebruikers en
          toegangsrechten heeft.
        </p>
      </div>
    </MarketingPage>
  );
}
