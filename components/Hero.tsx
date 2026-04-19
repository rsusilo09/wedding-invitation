"use client";

export default function Hero({ guestName }: { guestName: string }) {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486')",
      }}
    >
      {/* softer overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative text-center px-6 max-w-2xl">
        <p className="italic text-lg md:text-xl mb-6 opacity-90">
          Dear {guestName},
        </p>

        <h1 className="text-5xl md:text-7xl font-[var(--font-script)] leading-tight mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Reinaldo & Eunike
        </h1>

        <p className="italic text-lg md:text-xl opacity-90">
          invite you to our wedding
        </p>
      </div>
    </section>
  );
}