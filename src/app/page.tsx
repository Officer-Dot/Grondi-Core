import { AppShell } from "@/components/app-shell";
import { GrondiLogo } from "@/components/logo";
import { firebaseInitialized } from "@/lib/firebase";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      <main className="space-y-4">
        <section className="grid gap-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-700 gc-surface lg:grid-cols-[1.7fr_1fr]">
          <div>
            <GrondiLogo />
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Operationeel kernplatform voor projecten en objecten
            </h1>
            <p className="gc-muted mt-3 max-w-3xl text-sm">
              GrondiCore verbindt projecten, objecten, planning, assets en taken in één overzichtelijke
              workflow voor uitvoerende teams.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/demo"
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              >
                Bekijk demo
              </Link>
              <Link
                href="/klant"
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              >
                Naar klantportaal
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h2 className="text-sm font-semibold">Platform status</h2>
            <p className="gc-muted mt-2 text-sm">
              Firebase: {firebaseInitialized ? "Auth + Firestore actief" : "Niet geconfigureerd"}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="gc-muted">• Multi-tenant projecten</p>
              <p className="gc-muted">• Objecten met polygonen</p>
              <p className="gc-muted">• Rollen en toegangsrechten</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Projecten", "Gebieden met toegang per gebruiker"],
            ["Objecten", "Polygon objecten binnen projectgebied"],
            ["Planning", "Drag & drop met medewerker/machine/route"],
            ["Taken", "Uitvoering, uren, status en auditlog"],
          ].map(([title, subtitle]) => (
            <article
              key={title}
              className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700 gc-surface"
            >
              <h2 className="font-semibold">{title}</h2>
              <p className="gc-muted mt-1 text-sm">{subtitle}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700 gc-surface">
          <h2 className="font-semibold">Snelle start</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href="/projecten"
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Open projecten
            </Link>
            <Link
              href="/planning"
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Open planning
            </Link>
            <Link
              href="/taken"
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Open taken
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
