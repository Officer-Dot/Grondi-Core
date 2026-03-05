import { MarketingPage } from "@/components/marketing-page";

export default function HoePage() {
  return (
    <MarketingPage
      title="Hoe werkt het?"
      intro="GrondiCore draait als webapp op Next.js met Firebase als backend voor authenticatie, data en opslag."
    >
      <ol className="gc-muted list-inside list-decimal space-y-2 text-sm">
        <li>Gebruiker logt in via Firebase Auth.</li>
        <li>Data wordt tenant-gebaseerd opgeslagen in Firestore.</li>
        <li>Taken, planning en assets synchroniseren realtime per team.</li>
        <li>Foto’s gaan naar Firebase Storage en worden aan taken/objecten gekoppeld.</li>
      </ol>
    </MarketingPage>
  );
}
