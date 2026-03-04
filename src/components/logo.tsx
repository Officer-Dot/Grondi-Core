import Link from "next/link";

export function GrondiLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="GrondiCore home">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 18L12 4L20 18H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8.5 16.2L12 10.5L15.5 16.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="1.2" fill="currentColor" />
        </svg>
      </span>
      {!compact ? (
        <span className="text-lg font-semibold tracking-tight">GrondiCore</span>
      ) : null}
    </Link>
  );
}
