"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supaBase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 أول مرة نجيب user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();

    // 👇 listen لأي تغيير (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    // cleanup
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
