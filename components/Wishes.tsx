"use client";

import { FormEvent, useEffect, useState } from "react";
import { getWishes, submitWish } from "@/lib/services/wishes.service";

type WishData = {
  id: string;
  guestName: string;
  message: string;
  createdAt: string;
};

export default function Wishes({ guestName }: { guestName: string }) {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchWishes();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    <section className="bg-gradient-to-b from-rose-50 via-white to-zinc-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[3rem] border border-zinc-200 bg-white/95 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
              Baru! Kirim pesan doamu
            </div>
            <h2 className="text-3xl font-serif tracking-tight text-zinc-950 sm:text-4xl">
              Doa dan harapan dari tamu undangan
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
              Isi pesanmu untuk pengantin agar mereka merasa lebih dekat dan dikelilingi doa dari keluarga serta sahabat.
            </p>

            <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="wish-message">
                    Pesanmu untuk pengantin
                  </label>
                  <textarea
                    id="wish-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={5}
                    className="mt-3 min-h-[170px] w-full rounded-[1.75rem] border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="Tuliskan doa, harapan, atau ucapan selamatmu di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-pink-700 disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? "Mengirim..." : "Kirim Pesan"}
                </button>

                {success && <p className="text-sm text-emerald-700">{success}</p>}
                {error && <p className="text-sm text-rose-700">{error}</p>}
              </form>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Tercatat</p>
                <p className="mt-2 text-4xl font-semibold text-zinc-950">{wishes.length}</p>
              </div>
              <div className="rounded-3xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white">
                Terbaru di atas
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-[1.75rem] border border-zinc-200 bg-zinc-100 p-6" />
                  ))}
                </div>
              ) : wishes.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600">
                  Belum ada pesan yang masuk. Jadilah yang pertama mengirim doa untuk pengantin!
                </div>
              ) : (
                <div className="space-y-5 max-h-[640px] overflow-y-auto pr-2">
                  {wishes.map((wish) => (
                    <article key={wish.id} className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-rose-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">{wish.guestName}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">{new Date(wish.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 shadow-sm">
                          Wish
                        </span>
                      </div>
                      <p className="mt-4 text-base leading-8 text-zinc-900">{wish.message}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
