import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const configuredSchema = process.env.SUPABASE_SCHEMA || "public";

  if (!supabase) {
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, message: "Supabase client not initialized" });
  }

  try {
    const tryTables = ["rsvps", "Married.rsvps", "married.rsvps"];
    const errors: Array<{ table: string; message: string }> = [];
    for (const table of tryTables) {
      const { data, error } = await supabase.from(table).select("id").limit(1);
      if (!error) return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: true, table, sample: data ?? [] });
      errors.push({ table, message: error.message });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: error.message, table, errors }, { status: 500 });
      }
    }
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: "Tables not found in Supabase (checked public, Married, and married).", errors }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ hasUrl, hasKey, configuredSchema, connected: false, error: String(err) }, { status: 500 });
  }
}
