"use client";
import couple from "@/lib/constants/couple";

export default function OpeningGate({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50 px-4">
      <p className="text-base sm:text-lg mb-2">Wedding Invitation</p>
      <h1 className="text-2xl sm:text-3xl font-serif mb-6">{couple.brideName} &amp; {couple.groomName}</h1>

      <button
        onClick={onOpen}
        className="px-4 py-2 sm:px-6 sm:py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
        aria-label="Open invitation"
      >
        Open Invitation
      </button>
    </div>
  );
}