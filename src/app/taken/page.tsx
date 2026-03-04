"use client";

import { AppShell } from "@/components/app-shell";
import { useRuntime } from "@/components/runtime-context";
import { TaskItem } from "@/lib/domain";
import { createTask } from "@/lib/firestore-service";
import { initialTasks } from "@/lib/mvp-data";
import { FormEvent, useState } from "react";

export default function TakenPage() {
  const { tenantId } = useRuntime();
  const [objectId, setObjectId] = useState("obj-001");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [message, setMessage] = useState("Beheer de uitvoerlaag met taken en auditlog.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const created = await createTask({ tenantId, objectId, description });
    const now = new Date().toISOString();

    setTasks((current) => [
      {
        id: `tsk-${Date.now()}`,
        tenantId,
        createdAt: now,
        updatedAt: now,
        objectId,
        description,
        checklist: [],
        status: "nieuw",
        fotoUrls: [],
        materiaalgebruik: [],
        auditlog: ["Taak aangemaakt"],
      },
      ...current,
    ]);

    setDescription("");
    setMessage(created ? "Taak opgeslagen in Firestore." : "Taak lokaal toegevoegd (Firestore niet actief).");
  };

  return (
    <AppShell>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Taken</h2>
        <form onSubmit={handleSubmit} className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-2">
          <p className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700">Tenant: {tenantId}</p>
          <input
            value={objectId}
            onChange={(event) => setObjectId(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Object ID"
            required
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 sm:col-span-2"
            placeholder="Taakbeschrijving"
            required
          />
          <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100 sm:col-span-2">
            Taak aanmaken
          </button>
        </form>
        <p className="text-sm text-neutral-700">{message}</p>

        <div className="space-y-2">
          {tasks.map((task) => (
            <article key={task.id} className="rounded-md border border-neutral-200 p-3">
              <h3 className="font-semibold">{task.description}</h3>
              <p className="text-sm text-neutral-700">
                object: {task.objectId} • status: {task.status} • audit: {task.auditlog[0]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}