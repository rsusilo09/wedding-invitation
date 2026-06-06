import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase) {
    return NextResponse.json({ hasUrl, hasKey, connected: false, message: "Supabase client not initialized" });
  }

  try {
    const { data, error } = await supabase.from("rsvps").select("id").limit(1);
    if (error) return NextResponse.json({ hasUrl, hasKey, connected: false, error: error.message }, { status: 500 });
    return NextResponse.json({ hasUrl, hasKey, connected: true, sample: data ?? [] });
  } catch (err) {
    return NextResponse.json({ hasUrl, hasKey, connected: false, error: String(err) }, { status: 500 });
  }
}
