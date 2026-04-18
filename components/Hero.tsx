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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative text-center px-6">
        <p className="mb-2 tracking-widest">Dear</p>
        <h2 className="text-2xl mb-4">{guestName}</h2>

        <h1 className="text-5xl font-serif mb-4">
          Reinaldo & Eunike
        </h1>

        <p className="italic">We are getting married</p>
      </div>
    </section>
  );
}