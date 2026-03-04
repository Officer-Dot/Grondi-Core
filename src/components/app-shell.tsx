"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { GrondiLogo } from "@/components/logo";
import { useRuntime } from "@/components/runtime-context";
import { useTheme } from "@/components/theme-provider";
import { UserRole } from "@/lib/domain";

const links = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/klant", label: "Klant" },
  { href: "/login", label: "Login" },
  { href: "/projecten", label: "Projecten" },
  { href: "/planning", label: "Planning" },
  { href: "/assets", label: "Assets" },
  { href: "/taken", label: "Taken" },
  { href: "/uren", label: "Uren" },
  { href: "/fotos", label: "Foto upload" },
  { href: "/rapportage", label: "Rapportage" },
];

const roleOptions: UserRole[] = ["medewerker", "planner", "beheerder", "admin"];

function ShellContent({ children }: { children: ReactNode }) {
  const { tenantId, userId, role, setTenantId, setUserId, setRole } = useRuntime();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 p-4">
          <GrondiLogo compact={false} />
          <nav className="flex flex-wrap gap-2 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-neutral-300 px-3 py-1 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <div className="flex flex-wrap gap-2 text-xs">
            <input
              value={tenantId}
              onChange={(event) => setTenantId(event.target.value)}
              className="rounded-md border border-neutral-300 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-900"
              placeholder="Tenant"
            />
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="rounded-md border border-neutral-300 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-900"
              placeholder="Gebruiker"
            />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="rounded-md border border-neutral-300 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-900"
            >
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl p-4">{children}</div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return <ShellContent>{children}</ShellContent>;
}