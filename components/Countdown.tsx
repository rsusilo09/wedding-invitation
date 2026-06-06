"use client";

import Image from "next/image";
import useCountdown from "../lib/hooks/useCountdown";

export default function Countdown() {
  const time = useCountdown("2026-12-19T14:00:00");

  return (
    <section className="py-32 text-center text-white relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1519741497674-611481863552"
        alt="decorative wedding background"
        fill
        priority={false}
        className="object-cover absolute inset-0 -z-10"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Countdown</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto px-2">
          {Object.entries(time).map(([label, value]) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-2xl shadow-xl"
            >
              <p className="text-3xl md:text-4xl font-bold">{value}</p>
              <p className="uppercase text-xs md:text-sm tracking-widest mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}