import { NextResponse } from "next/server";
import { getAllWishes, saveWish } from "@/lib/db";

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

  const saved = saveWish(body);
  return NextResponse.json({ success: true, wish: saved });
}
