"use client";

import { AppShell } from "@/components/app-shell";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function KlantPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });
  }, []);

  const status = !auth ? "Firebase Auth is niet geconfigureerd." : user ? "Ingelogd" : "Niet ingelogd";

  const handleSignOut = async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-2xl space-y-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700 gc-surface">
        <h1 className="text-2xl font-semibold">Klantportaal</h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">Status: {status}</p>

        {user ? (
          <div className="space-y-3">
            <p className="text-sm">Welkom, {user.email || user.uid}</p>
            <div className="flex gap-2">
              <Link
                href="/projecten"
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
              >
                Naar projecten
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
              >
                Uitloggen
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">Log in om klantdata en projecten te bekijken.</p>
            <Link
              href="/login"
              className="inline-block rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
            >
              Naar login
            </Link>
          </div>
        )}
      </section>
    </AppShell>
  );
}
