"use client";

import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import {
  groupPlanningTasks,
  movePlanningTask,
  planningColumns as columns,
  PlanningStatus,
  PlanningTask,
} from "@/lib/planning";
import { useMemo, useState } from "react";

const initialTasks: PlanningTask[] = [
  {
    id: "p-1",
    title: "Sportveld Noord maaien",
    medewerker: "Lars",
    machine: "Maaier A1",
    route: "Noordroute",
    status: "gepland",
  },
  {
    id: "p-2",
    title: "Gemeentevak snoeien",
    medewerker: "Mila",
    machine: "Bus 03",
    route: "Centrumroute",
    status: "bezig",
  },
];

export default function PlanningPage() {
  const [items, setItems] = useState<PlanningTask[]>(initialTasks);

  const grouped = useMemo(() => groupPlanningTasks(items), [items]);

  const onDrop = (target: PlanningStatus, taskId: string) => {
    setItems((current) => movePlanningTask(current, taskId, target));
  };

  return (
    <AppShell>
      <ModuleGuard module="planning">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Planning Board</h2>
        <p className="text-sm text-neutral-700">
          Drag & drop van taken tussen kolommen. Medewerker, machine en route zichtbaar.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <article
              key={column}
              className="min-h-52 rounded-lg border border-neutral-200 p-3"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const taskId = event.dataTransfer.getData("text/plain");
                if (taskId) {
                  onDrop(column, taskId);
                }
              }}
            >
              <h3 className="mb-2 text-sm font-semibold uppercase">{column}</h3>
              <div className="space-y-2">
                {grouped[column].map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
                    className="rounded-md border border-neutral-300 bg-white p-2"
                  >
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-neutral-600">{item.medewerker}</p>
                    <p className="text-xs text-neutral-600">{item.machine}</p>
                    <p className="text-xs text-neutral-600">{item.route}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      </ModuleGuard>
    </AppShell>
  );
}