import { MarketingPage } from "@/components/marketing-page";

export default function WanneerPage() {
  return (
    <MarketingPage
      title="Wanneer inzetten?"
      intro="Gebruik GrondiCore zodra je processen complexer worden dan losse spreadsheets en chatberichten."
    >
      <ul className="gc-muted list-inside list-disc space-y-2 text-sm">
        <li>Bij meerdere projecten en objecten tegelijk.</li>
        <li>Wanneer je planning dagelijks wijzigt en snelheid nodig hebt.</li>
        <li>Als je bewijsvoering wil met foto’s, uren en auditlog.</li>
        <li>Voor groei naar meerdere teams of vestigingen.</li>
      </ul>
    </MarketingPage>
  );
}
