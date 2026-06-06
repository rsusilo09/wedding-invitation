import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PostgrestClient } from "@supabase/postgrest-js";

let supabase: SupabaseClient<any, any, any> | null = null;
let postgrest: PostgrestClient | null = null;

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (url && key) {
  supabase = createClient(url, key);
  postgrest = new PostgrestClient(`${url}/rest/v1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });
}

export default supabase;
export { postgrest };
