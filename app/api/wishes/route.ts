import { NextResponse } from "next/server";
import { getAllWishes, saveWish } from "@/lib/db";
import { postgrest, default as supabase } from "@/lib/supabase";

interface WishInput {
  guestName: string;
  message: string;
}

function validatePayload(payload: unknown): payload is WishInput {
  if (typeof payload !== "object" || payload === null) return false;
  const data = payload as Record<string, unknown>;
  return (
    typeof data.guestName === "string" &&
    data.guestName.trim().length > 0 &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  );
}

export async function GET() {
  if (supabase && postgrest) {
    const configuredSchema = process.env.SUPABASE_SCHEMA || "public";
    const tryConfigs = [
      { table: "wishes", schema: "public" },
      { table: "wishes", schema: configuredSchema },
    ];
    for (const entry of tryConfigs) {
      const query = entry.schema === "public"
        ? postgrest.from(entry.table)
        : postgrest.schema(entry.schema).from(entry.table);
      const { data, error } = await query.select("*").order("createdAt", { ascending: false });
      if (!error) return NextResponse.json({ success: true, wishes: data ?? [], schema: entry.schema });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: false, error: "Tables not found in Supabase (checked public and configured schema)." }, { status: 500 });
  }

  const wishes = getAllWishes();
  return NextResponse.json({ success: true, wishes });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!validatePayload(body)) {
    return NextResponse.json(
      { success: false, error: "Invalid wish payload." },
      { status: 400 }
    );
  }

  if (supabase && postgrest) {
    const now = new Date().toISOString();
    const insert = {
      guestName: body.guestName,
      message: body.message,
      createdAt: now,
    };
    const configuredSchema = process.env.SUPABASE_SCHEMA || "public";
    const tryConfigs = [
      { table: "wishes", schema: "public" },
      { table: "wishes", schema: configuredSchema },
    ];
    for (const entry of tryConfigs) {
      const query = entry.schema === "public"
        ? postgrest.from(entry.table)
        : postgrest.schema(entry.schema).from(entry.table);
      const { data, error } = await query.insert([insert]).select().single();
      if (!error) return NextResponse.json({ success: true, wish: data, schema: entry.schema });
      if (!error.message?.toLowerCase().includes("could not find the table")) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: false, error: "Tables not found in Supabase (checked public and configured schema)." }, { status: 500 });
  }

  const saved = saveWish(body);
  return NextResponse.json({ success: true, wish: saved });
}
