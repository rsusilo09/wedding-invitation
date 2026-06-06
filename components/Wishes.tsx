"use client";

import { FormEvent, useEffect, useState } from "react";
import { getWishes, submitWish } from "@/lib/services/wishes.service";

const sampleWishes = [
  {
    id: "sample-1",
    guestName: "Teman Dekat",
    message: "Semoga bahagia selalu, dan selamat menempuh hidup baru!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    guestName: "Keluarga",
    message: "Doa terbaik untuk perjalanan kalian bersama. Semoga selalu diberkati.",
    createdAt: new Date().toISOString(),
  },
];

type WishData = {
  id: string;
  guestName: string;
  message: string;
  createdAt: string;
};

export default function Wishes({ guestName }: { guestName: string }) {
  const [wishes, setWishes] = useState<WishData[]>(sampleWishes);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWishes() {
      try {
        const response = await getWishes();
        if (response.success && Array.isArray(response.wishes)) {
          setWishes(response.wishes);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchWishes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = message.trim();
    if (!trimmed) {
      setError("Tolong tuliskan pesan Anda terlebih dahulu.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitWish({ guestName, message: trimmed });
      if (response.success && response.wish) {
        setWishes((current) => [response.wish, ...current]);
        setMessage("");
        setSuccess("Pesan kamu sudah terkirim. Terima kasih!");
      } else {
        setError("Gagal mengirim pesan. Coba lagi nanti.");
      }
    } catch (err) {
      setError((err as Error).message || "Gagal mengirim pesan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-16 sm:px-6 bg-zinc-50">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-100">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600">Wishes</p>
          <h2 className="mt-3 text-3xl font-serif text-zinc-950">Kirim Doa dan Harapanmu</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Tulis pesan singkat untuk mempelai. Setiap pesan akan tersimpan di database dan tampil di halaman ini.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-900" htmlFor="wish-message">
              Pesanmu untuk pengantin
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              className="mt-3 w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              placeholder="Tuliskan doa dan harapanmu..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-pink-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-pink-700 disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? "Mengirim..." : "Kirim Pesan"}
          </button>

          {success && <p className="text-sm text-emerald-700">{success}</p>}
          {error && <p className="text-sm text-rose-700">{error}</p>}
        </form>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {wishes.map((wish) => (
            <div key={wish.id} className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-sm text-zinc-600">dari {wish.guestName}</p>
              <p className="mt-3 text-base leading-7 text-zinc-800">{wish.message}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {new Date(wish.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
