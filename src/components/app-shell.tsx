"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { GrondiLogo } from "@/components/logo";
import { useRuntime } from "@/components/runtime-context";
import { useTheme } from "@/components/theme-provider";
import {
  canAccessModule,
  CoreModule,
  hasCapability,
  RoleCapability,
  UserRole,
} from "@/lib/domain";

interface NavLink {
  href: string;
  label: string;
  module?: CoreModule;
  capability?: RoleCapability;
}

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/klant", label: "Klant" },
  { href: "/login", label: "Login" },
  { href: "/projecten", label: "Projecten", module: "objecten" },
  { href: "/planning", label: "Planning", module: "planning" },
  { href: "/assets", label: "Assets", module: "assets" },
  { href: "/taken", label: "Taken", module: "taken" },
  { href: "/uren", label: "Uren", capability: "uren.registreren" },
  { href: "/fotos", label: "Foto upload", capability: "fotos.uploaden" },
  { href: "/rapportage", label: "Rapportage", capability: "rapportages.genereren" },
];

const roleOptions: UserRole[] = ["medewerker", "planner", "beheerder", "admin"];

function ShellContent({ children }: { children: ReactNode }) {
  const { tenantId, userId, role, setTenantId, setUserId, setRole } = useRuntime();
  const { theme, toggleTheme } = useTheme();

  const visibleLinks = links.filter((link) => {
    if (!link.module && !link.capability) {
      return true;
    }

    if (link.module && !canAccessModule(role, link.module)) {
      return false;
    }

    if (link.capability && role !== "admin" && !hasCapability(role, link.capability)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 p-4">
          <GrondiLogo compact={false} />
          <nav className="flex flex-wrap gap-2 text-sm">
            {visibleLinks.map((link) => (
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
            className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-900 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <div className="flex flex-wrap gap-2 text-xs">
            <input
              value={tenantId}
              onChange={(event) => setTenantId(event.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="Tenant"
            />
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="Gebruiker"
            />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
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