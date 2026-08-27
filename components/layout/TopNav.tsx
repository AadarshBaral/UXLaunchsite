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
      <div className="mx-auto max-w-[1280px] px-6 h-14 flex items-center gap-8">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/full-logo.png"
            alt="UX Launchsite"
            width={160}
            height={39}
            className="h-7 w-auto logo-adaptive"
          />
        </Link>
        <NavLinks />
        <div className="flex items-center gap-2 text-sm">
          <ThemeToggle />
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
