import { NextResponse } from "next/server";
import { getAllRSVPs, saveRSVP, RSVPStatus } from "@/lib/db";
import { postgrest, default as supabase } from "@/lib/supabase";

interface RSVPInput {
  name: string;
  status: RSVPStatus;
  person: number;
}

function validatePayload(payload: unknown): payload is RSVPInput {
  if (typeof payload !== "object" || payload === null) return false;
  const data = payload as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    (data.status === "attending" || data.status === "not_attending") &&
    typeof data.person === "number" &&
    data.person >= 1 &&
    data.person <= 2
  );
}

export async function GET() {
  if (supabase && postgrest) {
    const configuredSchema = process.env.SUPABASE_SCHEMA || "public";
    const tryConfigs = [
      { table: "rsvps", schema: "public" },
      { table: "rsvps", schema: configuredSchema },
    ];
    for (const entry of tryConfigs) {
      const query = entry.schema === "public"
        ? postgrest.from(entry.table)
        : postgrest.schema(entry.schema).from(entry.table);
      const { data, error } = await query.select("*").order("created_at", { ascending: false });
      if (!error) return NextResponse.json({ success: true, rsvps: data ?? [], schema: entry.schema });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: false, error: "Tables not found in Supabase (checked public and configured schema)." }, { status: 500 });
  }

  const rsvps = getAllRSVPs();
  return NextResponse.json({ success: true, rsvps });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!validatePayload(body)) {
    return NextResponse.json(
      { success: false, error: "Invalid RSVP payload." },
      { status: 400 }
    );
  }

  if (supabase && postgrest) {
    const now = new Date().toISOString();
    const insert = {
      name: body.name,
      status: body.status,
      person: body.person,
      created_at: now,
    };
    const configuredSchema = process.env.SUPABASE_SCHEMA || "public";
    const tryConfigs = [
      { table: "rsvps", schema: "public" },
      { table: "rsvps", schema: configuredSchema },
    ];
    for (const entry of tryConfigs) {
      const query = entry.schema === "public"
        ? postgrest.from(entry.table)
        : postgrest.schema(entry.schema).from(entry.table);
      const { data, error } = await query.insert([insert]).select().single();
      if (!error) return NextResponse.json({ success: true, rsvp: data, schema: entry.schema });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: false, error: "Tables not found in Supabase (checked public and configured schema)." }, { status: 500 });
  }

  const saved = saveRSVP(body);
  return NextResponse.json({ success: true, rsvp: saved });
}
