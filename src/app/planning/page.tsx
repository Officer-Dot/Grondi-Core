"use client";

import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import { useRuntime } from "@/components/runtime-context";
import { TaskItem } from "@/lib/domain";
import { subscribeTasks, updateTaskPlanning, updateTaskStatus } from "@/lib/firestore-service";
import { db } from "@/lib/firebase";
import {
  groupPlanningTasks,
  planningColumns as columns,
  PlanningStatus,
  PlanningTask,
} from "@/lib/planning";
import { initialTasks } from "@/lib/mvp-data";
import { useMemo, useState, useEffect } from "react";

interface EditState {
  medewerker: string;
  machine: string;
  route: string;
  herhaling: string;
}

const toPlanningTask = (task: TaskItem): PlanningTask => ({
  id: task.id,
  title: task.description,
  medewerker: task.medewerker || "Niet toegewezen",
  machine: task.machine || "Niet toegewezen",
  route: task.route || "Geen route",
  status: task.status,
});

export default function PlanningPage() {
  const { tenantId } = useRuntime();
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [message, setMessage] = useState("Planning op basis van live taken.");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState>({
    medewerker: "",
    machine: "",
    route: "",
    herhaling: "",
  });

  useEffect(() => {
    const unsubscribe = subscribeTasks(tenantId, (rows) => {
      if (rows.length > 0) {
        setTasks(rows);
      } else if (!db) {
        setTasks(initialTasks.filter((task) => task.tenantId === tenantId));
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, [tenantId]);

  const planningTasks = useMemo(() => tasks.map(toPlanningTask), [tasks]);
  const grouped = useMemo(() => groupPlanningTasks(planningTasks), [planningTasks]);

  const onDrop = async (target: PlanningStatus, taskId: string) => {
    const updated = await updateTaskStatus(tenantId, taskId, target);

    if (!updated) {
      setTasks((current) =>
        current.map((task) => (task.id === taskId ? { ...task, status: target, auditlog: [`Status gewijzigd naar ${target}`] } : task))
      );
      setMessage("Status lokaal bijgewerkt (Firestore niet actief).");
    }
  };

  const openEdit = (task: TaskItem) => {
    setEditingTaskId(task.id);
    setEditState({
      medewerker: task.medewerker || "",
      machine: task.machine || "",
      route: task.route || "",
      herhaling: task.herhaling || "",
    });
  };

  const saveEdit = async () => {
    if (!editingTaskId) {
      return;
    }

    const updated = await updateTaskPlanning({
      tenantId,
      taskId: editingTaskId,
      medewerker: editState.medewerker,
      machine: editState.machine,
      route: editState.route,
      herhaling: editState.herhaling,
    });

    if (!updated) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                medewerker: editState.medewerker,
                machine: editState.machine,
                route: editState.route,
                herhaling: editState.herhaling,
                auditlog: ["Planning bijgewerkt"],
              }
            : task
        )
      );
      setMessage("Toewijzing lokaal bijgewerkt (Firestore niet actief).");
    } else {
      setMessage("Toewijzing opgeslagen in Firestore.");
    }

    setEditingTaskId(null);
  };

  return (
    <AppShell>
      <ModuleGuard module="planning">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Planning Board</h2>
          <p className="text-sm text-neutral-700">Drag & drop taken en beheer medewerker/machine/route toewijzing.</p>
          <p className="text-sm text-neutral-700">{message}</p>

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
                  {grouped[column].map((item) => {
                    const sourceTask = tasks.find((task) => task.id === item.id);
                    return (
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
                        <button
                          type="button"
                          onClick={() => sourceTask && openEdit(sourceTask)}
                          className="mt-2 rounded-md border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100"
                        >
                          Toewijzing bewerken
                        </button>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {editingTaskId ? (
            <section className="rounded-lg border border-neutral-200 p-4">
              <h3 className="text-sm font-semibold">Planning toewijzing</h3>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <input
                  value={editState.medewerker}
                  onChange={(event) => setEditState((current) => ({ ...current, medewerker: event.target.value }))}
                  className="rounded-md border border-neutral-300 px-3 py-2"
                  placeholder="Medewerker"
                />
                <input
                  value={editState.machine}
                  onChange={(event) => setEditState((current) => ({ ...current, machine: event.target.value }))}
                  className="rounded-md border border-neutral-300 px-3 py-2"
                  placeholder="Machine"
                />
                <input
                  value={editState.route}
                  onChange={(event) => setEditState((current) => ({ ...current, route: event.target.value }))}
                  className="rounded-md border border-neutral-300 px-3 py-2"
                  placeholder="Route"
                />
                <input
                  value={editState.herhaling}
                  onChange={(event) => setEditState((current) => ({ ...current, herhaling: event.target.value }))}
                  className="rounded-md border border-neutral-300 px-3 py-2"
                  placeholder="Herhaling"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTaskId(null)}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                >
                  Annuleren
                </button>
              </div>
            </section>
          ) : null}
        </section>
      </ModuleGuard>
    </AppShell>
  );
}
