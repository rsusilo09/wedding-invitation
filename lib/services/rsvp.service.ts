export interface RSVPRequest {
  name: string;
  status: "attending" | "not_attending" | string;
  person: number;
}

export async function submitRSVP(payload: RSVPRequest) {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit RSVP");
  }

  return res.json();
}
