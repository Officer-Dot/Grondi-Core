"use client";

import { CoreModule } from "@/lib/domain";
import { ReactNode } from "react";
import { useRuntime } from "@/components/runtime-context";

export function ModuleGuard({
  module,
  children,
}: {
  module: CoreModule;
  children: ReactNode;
}) {
  const { role, canAccess } = useRuntime();

  if (canAccess(module)) {
    return <>{children}</>;
  }

  return (
    <section className="rounded-lg border border-neutral-200 p-4">
      <h2 className="text-lg font-semibold">Geen toegang</h2>
      <p className="mt-2 text-sm text-neutral-700">
        Rol <strong>{role}</strong> heeft geen toegang tot module <strong>{module}</strong>.
      </p>
    </section>
  );
}