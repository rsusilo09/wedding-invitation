import { NextResponse } from "next/server";
import { getAllRSVPs, saveRSVP, RSVPStatus } from "@/lib/db";

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

  const saved = saveRSVP(body);
  return NextResponse.json({ success: true, rsvp: saved });
}
