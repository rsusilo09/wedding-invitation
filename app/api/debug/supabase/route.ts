import { NextResponse } from "next/server";
import supabase, { postgrest } from "@/lib/supabase";

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const configuredSchema = process.env.SUPABASE_SCHEMA || "public";

  if (!supabase || !postgrest) {
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, message: "Supabase client not initialized" });
  }

  try {
    const tryConfigs = [
      { table: "rsvps", schema: "public" },
      { table: "rsvps", schema: configuredSchema },
    ];
    const errors: Array<{ table: string; schema: string; message: string }> = [];
    for (const entry of tryConfigs) {
      const query = entry.schema === "public"
        ? postgrest.from(entry.table)
        : postgrest.schema(entry.schema).from(entry.table);
      const { data, error } = await query.select("id").limit(1);
      if (!error) return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: true, schema: entry.schema, sample: data ?? [] });
      errors.push({ table: entry.table, schema: entry.schema, message: error.message });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: error.message, schema: entry.schema, errors }, { status: 500 });
      }
    }
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: "Tables not found in Supabase (checked public and configured schema).", errors }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: String(err) }, { status: 500 });
  }
}
