"use client";

import { useRuntime } from "@/components/runtime-context";
import { RoleCapability, hasCapability } from "@/lib/domain";
import { ReactNode } from "react";

export function CapabilityGuard({
  capability,
  children,
}: {
  capability: RoleCapability;
  children: ReactNode;
}) {
  const { role } = useRuntime();

  if (hasCapability(role, capability) || role === "admin") {
    return <>{children}</>;
  }

  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <h2 className="text-lg font-semibold">Geen toegang</h2>
      <p className="mt-2 text-sm text-neutral-700">
        Rol <strong>{role}</strong> heeft geen rechten voor <strong>{capability}</strong>.
      </p>
    </section>
  );
}