import SignOutButton from "@/components/auth/SignOutButton";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function TopNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/full-logo.png"
              alt="UX Launchsite"
              width={160}
              height={39}
              className="h-6 sm:h-7 w-auto logo-adaptive"
              priority
            />
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 text-sm shrink-0">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-ink-muted truncate max-w-[180px] hidden md:inline">
                {user.email}
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-ink-muted hover:text-ink transition-colors text-xs sm:text-sm"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
