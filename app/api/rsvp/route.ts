import { NextResponse } from "next/server";
import { getAllRSVPs, saveRSVP, RSVPStatus } from "@/lib/db";
import supabase from "@/lib/supabase";

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
  if (supabase) {
    const { data, error } = await supabase.from("rsvps").select("*").order("createdAt", { ascending: false });
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, rsvps: data ?? [] });
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

  if (supabase) {
    const now = new Date().toISOString();
    const insert = {
      name: body.name,
      status: body.status,
      person: body.person,
      createdAt: now,
    };
    const { data, error } = await supabase.from("rsvps").insert([insert]).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, rsvp: data });
  }

  const saved = saveRSVP(body);
  return NextResponse.json({ success: true, rsvp: saved });
}
