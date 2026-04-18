"use client";

import { useState } from "react";

export default function RSVPForm({ guestName }: { guestName: string }) {
  const [status, setStatus] = useState("");
  const [person, setPerson] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify({
        name: guestName,
        status,
        person
      }),
    });

    alert("RSVP submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="py-10">
      <h3 className="text-xl mb-4">RSVP</h3>

      <select
        className="border p-2 rounded"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select</option>
        <option value="attending">Attending</option>
        <option value="not_attending">Not Attending</option>
      </select>
      <select
        className="border p-2 rounded"
        onChange={(e) => setPerson(Number(e.target.value))}
      >
        <option value="">Select</option>
        <option value="1">1 person</option>
        <option value="2">2 person</option>
      </select>
      <br />

      <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}