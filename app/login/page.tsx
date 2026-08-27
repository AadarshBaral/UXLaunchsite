"use client";

import GoogleIcon from "@/components/auth/GoogleIcon";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "sign-in" | "sign-up";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  async function handleGoogle() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/");
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      // If email confirmation is disabled, Supabase returns a session immediately
      if (data.session) {
        router.push("/");
        router.refresh();
      } else {
        setConfirmSent(true);
      }
    }
  }

  return (
    <div
      className="flex-1 relative flex items-center justify-center px-6 py-16"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-6 left-6">
        <Image
          src="/full-logo.png"
          alt="UX Launch Site"
          width={160}
          height={39}
          className="h-8 w-auto"
        />
      </div>

      <div
        className="w-full max-w-sm bg-background border border-line rounded-3xl shadow-md shadow-purple-400/20 p-8 flex flex-col gap-5"
        style={{
          background:
            "linear-gradient(to bottom, #cfe7f7 0%, #e3f1fa 15%, #f5fafd 30%, #ffffff 45%)",
        }}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <Image
            src="/short-logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div>
            <h1 className="font-serif text-xl font-semibold text-ink">
              {mode === "sign-in"
                ? "Log in to UX Launchsite"
                : "Create your account"}
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              {mode === "sign-in"
                ? "Welcome back."
                : "Your projects sync to your account."}
            </p>
          </div>
        </div>

        {confirmSent ? (
          <p className="text-sm text-ink">
            Check <span className="font-medium">{email}</span> for a
            confirmation link, then come back and log in.
          </p>
        ) : (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={handleGoogle}
              className="w-full"
            >
              <GoogleIcon size={15} /> Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs text-ink-disabled">or</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-sm text-status-red">{error}</p>}

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full mt-1"
              >
                {loading
                  ? "Please wait…"
                  : mode === "sign-in"
                    ? "Log in"
                    : "Create account"}
              </Button>
            </form>

            <p className="text-sm text-ink-muted text-center">
              {mode === "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "sign-in" ? "sign-up" : "sign-in");
                  setError(null);
                }}
                className="text-accent hover:underline cursor-pointer"
              >
                {mode === "sign-in" ? "Sign up" : "Log in"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
