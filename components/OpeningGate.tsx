"use client";

export default function OpeningGate({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <p className="text-lg mb-2">Wedding Invitation</p>
      <h1 className="text-3xl font-serif mb-6">Reinaldo & Eunike</h1>

      <button
        onClick={onOpen}
        className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
      >
        Open Invitation
      </button>
    </div>
  );
}