"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // On mount, read saved preference (default to light)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="h-8 w-8 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-surface hover:text-ink transition-colors cursor-pointer"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
