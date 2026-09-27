"use client";

import { createClient } from "@/utils/supabase/client";

export default function GoogleButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return <button onClick={handleGoogleLogin}>Continue with Google</button>;
}
