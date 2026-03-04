"use client";

import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import { useRuntime } from "@/components/runtime-context";
import { ObjectItem } from "@/lib/domain";
import { createObject } from "@/lib/firestore-service";
import { initialObjects } from "@/lib/mvp-data";
import { FormEvent, useState } from "react";

export default function ObjectenPage() {
  const { tenantId } = useRuntime();
  const [name, setName] = useState("");
  const [type, setType] = useState("Sportvelden");
  const [items, setItems] = useState<ObjectItem[]>(initialObjects);
  const [message, setMessage] = useState("Maak objecten aan voor je operationele werkgebied.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const created = await createObject({ tenantId, name, type });

    const now = new Date().toISOString();
    setItems((current) => [
      {
        id: `obj-${Date.now()}`,
        tenantId,
        createdAt: now,
        updatedAt: now,
        name,
        type,
        status: "actief",
        historie: [],
        fotos: [],
        onderhoudslog: [],
      },
      ...current,
    ]);

    setName("");
    setMessage(created ? "Object opgeslagen in Firestore." : "Object lokaal toegevoegd (Firestore niet actief).");
  };

  return (
    <AppShell>
      <ModuleGuard module="objecten">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Objecten</h2>
        <form onSubmit={handleSubmit} className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-2">
          <p className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700">Tenant: {tenantId}</p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Objectnaam"
            required
          />
          <input
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Type"
            required
          />
          <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Object aanmaken
          </button>
        </form>
        <p className="text-sm text-neutral-700">{message}</p>

        <div className="space-y-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-md border border-neutral-200 p-3">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-neutral-700">
                {item.type} • status: {item.status} • tenant: {item.tenantId}
              </p>
            </article>
          ))}
        </div>
      </section>
      </ModuleGuard>
    </AppShell>
  );
}