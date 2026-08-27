"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/lib/store";

export default function AuthSync() {
  const setUserId = useStore((s) => s.setUserId);
  const loadProjects = useStore((s) => s.loadProjects);
  const reset = useStore((s) => s.reset);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      loadProjects();
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        reset();
        return;
      }
      setUserId(session?.user?.id ?? null);
      loadProjects();
    });

    return () => subscription.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
