import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase) {
    return NextResponse.json({ hasUrl, hasKey, connected: false, message: "Supabase client not initialized" });
  }

  try {
    // try public first then Married schema
    const tryTables = ["rsvps", "Married.rsvps"];
    for (const table of tryTables) {
      const { data, error } = await supabase.from(table).select("id").limit(1);
      if (!error) return NextResponse.json({ hasUrl, hasKey, connected: true, schema: table.includes(".") ? table.split(".")[0] : "public", sample: data ?? [] });
      if (!error.message?.toLowerCase().includes("could not find the table")) return NextResponse.json({ hasUrl, hasKey, connected: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ hasUrl, hasKey, connected: false, error: "Tables not found in Supabase (checked public and Married)." }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ hasUrl, hasKey, connected: false, error: String(err) }, { status: 500 });
  }
}
