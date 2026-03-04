import { AppShell } from "@/components/app-shell";
import { GrondiLogo } from "@/components/logo";

export default function DemoPage() {
  return (
    <AppShell>
      <main className="space-y-6">
        <section className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700 gc-surface">
          <GrondiLogo />
          <h1 className="mt-4 text-2xl font-semibold">Demo omgeving</h1>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            Dit is de demo van GrondiCore: projecten, objecten, planning, assets en taken in één workflow.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Projecten + gebieden",
            "Objecten met polygonen",
            "Planning board",
            "Taken + uren",
            "Assets",
            "Rapportage",
          ].map((item) => (
            <article
              key={item}
              className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700 gc-surface"
            >
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">Beschikbaar in deze demo.</p>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
