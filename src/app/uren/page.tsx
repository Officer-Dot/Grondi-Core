"use client";

import { AppShell } from "@/components/app-shell";
import { registerTime } from "@/lib/firestore-service";
import { FormEvent, useState } from "react";

interface Entry {
  id: string;
  taskId: string;
  userId: string;
  minutes: number;
  note: string;
}

export default function UrenPage() {
  const [tenantId, setTenantId] = useState("demo-tenant");
  const [taskId, setTaskId] = useState("tsk-001");
  const [userId, setUserId] = useState("usr-001");
  const [minutes, setMinutes] = useState(60);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [message, setMessage] = useState("Registreer uren per taak.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const created = await registerTime({ tenantId, taskId, userId, minutes, note });
    setEntries((current) => [{ id: String(Date.now()), taskId, userId, minutes, note }, ...current]);

    setNote("");
    setMessage(created ? "Uren opgeslagen in Firestore." : "Uren lokaal toegevoegd (Firestore niet actief).");
  };

  return (
    <AppShell>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Urenregistratie</h2>
        <form onSubmit={handleSubmit} className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-2">
          <input
            value={tenantId}
            onChange={(event) => setTenantId(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Tenant ID"
            required
          />
          <input
            value={taskId}
            onChange={(event) => setTaskId(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Taak ID"
            required
          />
          <input
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Gebruiker ID"
            required
          />
          <input
            type="number"
            min={1}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            className="rounded-md border border-neutral-300 px-3 py-2"
            placeholder="Minuten"
            required
          />
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 sm:col-span-2"
            placeholder="Notitie"
            required
          />
          <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100 sm:col-span-2">
            Uren registreren
          </button>
        </form>
        <p className="text-sm text-neutral-700">{message}</p>
        <div className="space-y-2">
          {entries.map((entry) => (
            <article key={entry.id} className="rounded-md border border-neutral-200 p-3 text-sm">
              taak: {entry.taskId} • gebruiker: {entry.userId} • minuten: {entry.minutes} • {entry.note}
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}