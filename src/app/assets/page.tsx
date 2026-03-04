import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import { initialAssets } from "@/lib/mvp-data";

export default function AssetsPage() {
  return (
    <AppShell>
      <ModuleGuard module="assets">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Assets</h2>
        <p className="text-sm text-neutral-700">
          Machines, robots, voertuigen en gereedschap met onderhoud, storingen en uren.
        </p>
        <div className="space-y-2">
          {initialAssets.map((asset) => (
            <article key={asset.id} className="rounded-md border border-neutral-200 p-3">
              <h3 className="font-semibold">{asset.name}</h3>
              <p className="text-sm text-neutral-700">
                {asset.category} • status: {asset.status} • onderhoud: elke {asset.onderhoudsintervalDagen} dagen
              </p>
              <p className="text-sm text-neutral-700">
                storingen: {asset.storingen} • uren: {asset.urenregistratie} • qr: {asset.qrCode}
              </p>
            </article>
          ))}
        </div>
      </section>
      </ModuleGuard>
    </AppShell>
  );
}