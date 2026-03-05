import { MarketingPage } from "@/components/marketing-page";

export default function KostenPage() {
  return (
    <MarketingPage
      title="Kosten en implementatie"
      intro="De kosten hangen af van teamgrootte, modules en implementatie-intensiteit; GrondiCore is ontworpen om modulair op te starten."
    >
      <div className="space-y-3 text-sm">
        <p className="gc-muted">
          Start met de MVP-kern (projecten, objecten, planning, taken) en breid uit met assets,
          rapportages en maatwerk automatisering.
        </p>
        <p className="gc-muted">
          Technisch bestaat de basis uit Next.js + Firebase, waardoor de infrastructuur snel schaalbaar
          is en beheerlast laag blijft.
        </p>
      </div>
    </MarketingPage>
  );
}
