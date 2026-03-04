"use client";

import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import { useRuntime } from "@/components/runtime-context";
import { AssetItem } from "@/lib/domain";
import { createAsset, subscribeAssets } from "@/lib/firestore-service";
import { db } from "@/lib/firebase";
import { initialAssets } from "@/lib/mvp-data";
import { FormEvent, useEffect, useState } from "react";

export default function AssetsPage() {
  const { tenantId } = useRuntime();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetItem["category"]>("machine");
  const [items, setItems] = useState<AssetItem[]>(initialAssets);
  const [message, setMessage] = useState("Beheer assets met onderhoud en storingen.");

  useEffect(() => {
    const unsubscribe = subscribeAssets(tenantId, (rows) => {
      if (rows.length > 0) {
        setItems(rows);
      } else if (!db) {
        setItems(initialAssets.filter((item) => item.tenantId === tenantId));
      } else {
        setItems([]);
      }
    });

    return () => unsubscribe();
  }, [tenantId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const created = await createAsset({ tenantId, name, category });
    if (!created) {
      const now = new Date().toISOString();
      setItems((current) => [
        {
          id: `ast-${Date.now()}`,
          tenantId,
          createdAt: now,
          updatedAt: now,
          name,
          category,
          status: "beschikbaar",
          onderhoudsintervalDagen: 30,
          storingen: 0,
          qrCode: `QR-${Date.now()}`,
          urenregistratie: 0,
        },
        ...current,
      ]);
      setMessage("Asset lokaal toegevoegd (Firestore niet actief).");
    } else {
      setMessage("Asset opgeslagen in Firestore.");
    }

    setName("");
  };

  return (
    <AppShell>
      <ModuleGuard module="assets">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Assets</h2>
          <form onSubmit={handleSubmit} className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-2">
            <p className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700">Tenant: {tenantId}</p>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Asset naam"
              required
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as AssetItem["category"])}
              className="rounded-md border border-neutral-300 px-3 py-2"
            >
              <option value="machine">machine</option>
              <option value="robot">robot</option>
              <option value="voertuig">voertuig</option>
              <option value="gereedschap">gereedschap</option>
              <option value="materiaal">materiaal</option>
            </select>
            <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100">
              Asset aanmaken
            </button>
          </form>
          <p className="text-sm text-neutral-700">{message}</p>

          <div className="space-y-2">
            {items.map((asset) => (
              <article key={asset.id} className="rounded-md border border-neutral-200 p-3">
                <h3 className="font-semibold">{asset.name}</h3>
                <p className="text-sm text-neutral-700">
                  {asset.category} • status: {asset.status} • onderhoud: elke {asset.onderhoudsintervalDagen} dagen
                </p>
                <p className="text-sm text-neutral-700">
                  storingen: {asset.storingen} • uren: {asset.urenregistratie} • qr: {asset.qrCode}
                </p>
              </article>
            ))}
          </div>
        </section>
      </ModuleGuard>
    </AppShell>
  );
}
