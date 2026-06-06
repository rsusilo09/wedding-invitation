import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient<any, any, any> | null = null;

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const schema = process.env.SUPABASE_SCHEMA || "public";

if (url && key) {
  supabase = createClient(url, key, {
    db: { schema: schema as any },
  });
}

export default supabase;
