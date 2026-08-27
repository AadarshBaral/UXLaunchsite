import SignOutButton from "@/components/auth/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function TopNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background">
      <div className="mx-auto max-w-[1280px] px-6 h-14 flex items-center gap-8">
        <Link
          href="/"
          className="font-serif text-base font-semibold text-ink tracking-tight"
        >
          UX Launchsite
        </Link>
        <nav className="flex items-center gap-6 text-sm flex-1">
          <Link
            href="/"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/docs"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            Documentation
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-ink-muted truncate max-w-[180px]">
                {user.email}
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
