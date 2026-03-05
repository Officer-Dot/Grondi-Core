import { AppShell } from "@/components/app-shell";
import Link from "next/link";
import { ReactNode } from "react";

interface MarketingPageProps {
  title: string;
  intro: string;
  children: ReactNode;
}

export function MarketingPage({ title, intro, children }: MarketingPageProps) {
  return (
    <AppShell>
      <main className="space-y-4">
        <section className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700 gc-surface">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="gc-muted mt-2 text-sm">{intro}</p>
        </section>

        <section className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700 gc-surface">
          {children}
        </section>

        <section className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700 gc-surface">
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="gc-nav-button rounded-md border px-3 py-2 text-sm">
              Terug naar home
            </Link>
            <Link href="/demo" className="gc-nav-button rounded-md border px-3 py-2 text-sm">
              Bekijk demo
            </Link>
            <Link href="/login" className="gc-nav-button rounded-md border px-3 py-2 text-sm">
              Klant login
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
