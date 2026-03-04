import Link from "next/link";
import { ReactNode } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/objecten", label: "Objecten" },
  { href: "/planning", label: "Planning" },
  { href: "/assets", label: "Assets" },
  { href: "/taken", label: "Taken" },
  { href: "/uren", label: "Uren" },
  { href: "/fotos", label: "Foto upload" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 p-4">
          <h1 className="text-xl font-semibold">GrondiCore</h1>
          <nav className="flex flex-wrap gap-2 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl p-4">{children}</div>
    </div>
  );
}