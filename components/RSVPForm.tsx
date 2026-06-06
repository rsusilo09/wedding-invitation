"use client";

import { useState, FormEvent } from "react";
import { submitRSVP, RSVPRequest } from "../lib/services/rsvp.service";

export default function RSVPForm({ guestName }: { guestName: string }) {
  const [status, setStatus] = useState("");
  const [person, setPerson] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: RSVPRequest = {
      name: guestName,
      status,
      person,
    };

    try {
      await submitRSVP(payload);
      alert("RSVP submitted!");
    } catch (err) {
      setError((err as Error).message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-8 px-4 sm:px-0 max-w-md w-full">
      <h3 className="text-xl mb-4">RSVP</h3>

      <label className="block mb-3">
        <span className="sr-only">RSVP status</span>
        <select
          aria-label="RSVP status"
          className="w-full border p-2 rounded"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="attending">Attending</option>
          <option value="not_attending">Not Attending</option>
        </select>
      </label>

      <label className="block mb-3">
        <span className="sr-only">Number of people</span>
        <select
          aria-label="Number of people"
          className="w-full border p-2 rounded"
          onChange={(e) => setPerson(Number(e.target.value))}
          required
        >
          <option value="">Select</option>
          <option value="1">1 person</option>
          <option value="2">2 person</option>
        </select>
      </label>

      <button
        className="mt-4 w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50"
        disabled={loading}
        type="submit"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </form>
  );
}