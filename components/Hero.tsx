"use client";

import couple from "@/lib/constants/couple";

export default function Hero({ guestName }: { guestName: string }) {
  return (
    <section className="min-h-screen h-auto flex items-center justify-center text-white relative overflow-hidden">
      {/* decorative background image */}
      {/* Using next/image for optimization and lazy loading */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
      </div>

      {/* softer overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative text-center px-4 sm:px-6 max-w-2xl w-full">
        <p className="italic text-base sm:text-lg md:text-xl mb-6 opacity-90">
          Dear {guestName},
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-[var(--font-script)] leading-tight mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {couple.brideName} <span className="mx-2 text-zinc-400">&</span> <span className="text-pink-600">{couple.groomName}</span>
        </h1>

        <p className="italic text-base sm:text-lg md:text-xl opacity-90">
          invite you to our wedding
        </p>
      </div>
    </section>
  );
}