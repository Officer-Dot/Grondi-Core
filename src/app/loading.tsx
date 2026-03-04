export default function GlobalLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="gc-spinner" aria-label="Laden" />
        <p className="text-sm text-neutral-600 dark:text-neutral-300">GrondiCore laden...</p>
      </div>
    </main>
  );
}
