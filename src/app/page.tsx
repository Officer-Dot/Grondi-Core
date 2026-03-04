import { AppShell } from "@/components/app-shell";
import { roleCapabilities } from "@/lib/domain";
import { firebaseInitialized } from "@/lib/firebase";

export default function Home() {
  return (
    <AppShell>
      <main className="space-y-6">
        <section className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-2xl font-semibold">Operationeel Kernplatform</h2>
          <p className="mt-2 text-sm text-neutral-700">
            Vier pijlers: Objecten, Planning, Assets en Taken. Firebase status: {" "}
            {firebaseInitialized ? "Geconfigureerd" : "Nog niet geconfigureerd"}
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          {["Objecten", "Planning", "Assets", "Taken"].map((pillar) => (
            <article key={pillar} className="rounded-lg border border-neutral-200 p-4">
              <h3 className="font-semibold">{pillar}</h3>
              <p className="mt-1 text-sm text-neutral-700">Kernmodule binnen GrondiCore.</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-neutral-200 p-4">
          <h3 className="font-semibold">RBAC overzicht</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(roleCapabilities).map(([role, capabilities]) => (
              <article key={role} className="rounded-md border border-neutral-200 p-3">
                <h4 className="text-sm font-semibold capitalize">{role}</h4>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {capabilities.slice(0, 3).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}