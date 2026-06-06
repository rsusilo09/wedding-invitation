"use client";

import { useState, FormEvent } from "react";
import { submitRSVP, RSVPRequest, RSVPStatus } from "../lib/services/rsvp.service";

const attendanceOptions: Array<{ value: RSVPStatus; label: string; description: string }> = [
  {
    value: "attending",
    label: "Attending",
    description: "I will celebrate with the couple.",
  },
  {
    value: "not_attending",
    label: "Not attending",
    description: "I cannot join, but I send my best wishes.",
  },
];

export default function RSVPForm({ guestName }: { guestName: string }) {
  const [status, setStatus] = useState<RSVPStatus | "">("");
  const [person, setPerson] = useState<number>(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload: RSVPRequest = {
      name: guestName,
      status: status as RSVPStatus,
      person,
    };

    try {
      await submitRSVP(payload);
      setSuccess(`Thank you, ${guestName}! Your response has been received.`);
    } catch (err) {
      setError((err as Error).message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-rose-50/40">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-pink-100/40 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600">RSVP</p>
          <h2 className="mt-3 text-3xl font-serif text-zinc-950">Confirm your attendance</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Choose your attendance status, the number of guests, and send us a quick reply.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <fieldset className="space-y-4 rounded-[1.75rem] border border-pink-200 bg-pink-50/80 p-4 sm:p-5">
            <legend className="text-sm uppercase tracking-[0.3em] text-pink-700">Attendance</legend>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {attendanceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`block cursor-pointer rounded-3xl border p-4 transition focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 ${
                    status === option.value
                      ? "border-pink-500 bg-white shadow-sm"
                      : "border-pink-200 bg-white/80"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={() => setStatus(option.value)}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-2 text-center">
                    <span className="text-lg font-semibold text-zinc-900">{option.label}</span>
                    <span className="text-sm text-zinc-600">{option.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {status === "attending" && (
            <label className="block">
              <span className="text-sm font-medium text-zinc-900">Number of guests</span>
              <select
                aria-label="Number of guests attending"
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                value={person}
                onChange={(e) => setPerson(Number(e.target.value))}
              >
                <option value={1}>1 person</option>
                <option value={2}>2 persons</option>
              </select>
            </label>
          )}

          <button
            type="submit"
            disabled={loading || status === ""}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-pink-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-pink-700 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send RSVP"}
          </button>
        </form>

        {success && (
          <div
            className="mt-6 rounded-3xl bg-emerald-50 p-5 text-sm text-emerald-700"
            role="status"
            aria-live="polite"
          >
            {success}
          </div>
        )}

        {error && (
          <div
            className="mt-6 rounded-3xl bg-rose-50 p-5 text-sm text-rose-700"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
      </div>
    </section>
  );
}