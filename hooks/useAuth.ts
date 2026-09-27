"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supaBase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // first time to get user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen to any change
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("SESSION:", session);
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
