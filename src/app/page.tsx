import { AppShell } from "@/components/app-shell";
import { GrondiLogo } from "@/components/logo";
import { firebaseInitialized } from "@/lib/firebase";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      <main className="space-y-6">
        <section className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700 gc-surface">
          <GrondiLogo />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Operationeel kernplatform voor projecten en objecten
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-neutral-700 dark:text-neutral-300">
            GrondiCore verbindt projecten, objecten, planning, assets en taken in één overzichtelijke
            workflow voor uitvoerende teams.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/demo"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
            >
              Bekijk demo
            </Link>
            <Link
              href="/klant"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
            >
              Naar klantportaal
            </Link>
          </div>
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
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{subtitle}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700 gc-surface">
          <h2 className="font-semibold">Platform status</h2>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
            Firebase: {firebaseInitialized ? "Geconfigureerd" : "Niet geconfigureerd"}
          </p>
        </section>
      </main>
    </AppShell>
  );
}
