import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        fetch: (...args) =>
          fetch(...args).catch((err) => {
            // Suppress network errors in preview/iframe environments
            console.warn("[Supabase] Network request failed (preview env):", err?.message);
            return new Response(JSON.stringify({ error: "network_error" }), {
              status: 0,
              headers: { "Content-Type": "application/json" },
            });
          }),
      },
    }
  );
