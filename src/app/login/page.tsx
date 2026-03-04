"use client";

import { AppShell } from "@/components/app-shell";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Log in om je objecten, planning en taken te beheren.");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth) {
      setMessage("Firebase Auth is nog niet geconfigureerd.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Inloggen gelukt.");
    } catch {
      setMessage("Inloggen mislukt. Controleer je gegevens.");
    }
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-md rounded-lg border border-neutral-200 p-4">
        <h2 className="text-xl font-semibold">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
            className="w-full rounded-md border border-neutral-300 px-3 py-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Wachtwoord"
            className="w-full rounded-md border border-neutral-300 px-3 py-2"
            required
          />
          <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Inloggen
          </button>
        </form>
        <p className="mt-3 text-sm text-neutral-700">{message}</p>
      </section>
    </AppShell>
  );
}