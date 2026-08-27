import Link from "next/link";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background">
      <div className="mx-auto max-w-[1280px] px-6 h-14 flex items-center gap-8">
        <Link href="/" className="font-serif text-base font-semibold text-ink tracking-tight">
          UX Launchpad
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-ink-muted hover:text-ink transition-colors">
            Projects
          </Link>
          <Link href="/docs" className="text-ink-muted hover:text-ink transition-colors">
            Documentation
          </Link>
        </nav>
      </div>
    </header>
  );
}
