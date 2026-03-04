"use client";

import { AppShell } from "@/components/app-shell";
import { CapabilityGuard } from "@/components/capability-guard";
import { useRuntime } from "@/components/runtime-context";
import { AssetItem, ObjectItem, TaskItem, TimeEntry } from "@/lib/domain";
import {
  subscribeAssets,
  subscribeObjects,
  subscribeTasks,
  subscribeTimeEntries,
} from "@/lib/firestore-service";
import { db } from "@/lib/firebase";
import { initialAssets, initialObjects, initialTasks } from "@/lib/mvp-data";
import { calculateTenantKpis, tasksToCsv } from "@/lib/reporting";
import { useEffect, useMemo, useState } from "react";

export default function RapportagePage() {
  const { tenantId } = useRuntime();

  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    const unsubObjects = subscribeObjects(tenantId, (rows) => {
      if (rows.length > 0) {
        setObjects(rows);
      } else if (!db) {
        setObjects(initialObjects.filter((item) => item.tenantId === tenantId));
      } else {
        setObjects([]);
      }
    });

    const unsubAssets = subscribeAssets(tenantId, (rows) => {
      if (rows.length > 0) {
        setAssets(rows);
      } else if (!db) {
        setAssets(initialAssets.filter((item) => item.tenantId === tenantId));
      } else {
        setAssets([]);
      }
    });

    const unsubTasks = subscribeTasks(tenantId, (rows) => {
      if (rows.length > 0) {
        setTasks(rows);
      } else if (!db) {
        setTasks(initialTasks.filter((item) => item.tenantId === tenantId));
      } else {
        setTasks([]);
      }
    });

    const unsubTimeEntries = subscribeTimeEntries(tenantId, (rows) => {
      setTimeEntries(rows);
    });

    return () => {
      unsubObjects();
      unsubAssets();
      unsubTasks();
      unsubTimeEntries();
    };
  }, [tenantId]);

  const kpis = useMemo(
    () =>
      calculateTenantKpis({
        objects,
        assets,
        tasks,
        timeEntries,
      }),
    [objects, assets, tasks, timeEntries]
  );

  const exportTasksCsv = () => {
    const content = tasksToCsv(tasks);
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `taken-${tenantId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <CapabilityGuard capability="rapportages.genereren">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Rapportage</h2>
          <p className="text-sm text-neutral-700">Tenant: {tenantId}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Objecten totaal</p>
              <p className="text-2xl font-semibold">{kpis.objectenTotaal}</p>
            </article>
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Assets totaal</p>
              <p className="text-2xl font-semibold">{kpis.assetsTotaal}</p>
            </article>
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Taken totaal</p>
              <p className="text-2xl font-semibold">{kpis.takenTotaal}</p>
            </article>
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Taken afgerond</p>
              <p className="text-2xl font-semibold">{kpis.takenAfgerond}</p>
            </article>
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Open storingen</p>
              <p className="text-2xl font-semibold">{kpis.openStoringen}</p>
            </article>
            <article className="rounded-md border border-neutral-200 p-3">
              <p className="text-xs text-neutral-600">Uren (minuten)</p>
              <p className="text-2xl font-semibold">{kpis.urenTotaal}</p>
            </article>
          </div>

          <button
            onClick={exportTasksCsv}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            Exporteer taken (CSV)
          </button>
        </section>
      </CapabilityGuard>
    </AppShell>
  );
}
