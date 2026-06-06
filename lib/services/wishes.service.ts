export interface WishRequest {
  guestName: string;
  message: string;
}

export async function submitWish(payload: WishRequest) {
  const res = await fetch("/api/wishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to submit wish.");
  }

  return res.json();
}

export async function getWishes() {
  const res = await fetch("/api/wishes");
  if (!res.ok) {
    throw new Error("Failed to load wishes.");
  }
  return res.json();
}
