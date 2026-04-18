"use client";

import { useEffect, useState } from "react";

function getTimeLeft() {
  const target = new Date("2026-12-19T14:00:00").getTime();
  const now = new Date().getTime();
  const diff = target - now;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-32 text-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519741497674-611481863552')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10">
        <h2 className="text-4xl font-serif mb-10">Countdown</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {Object.entries(time).map(([label, value]) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
            >
              <p className="text-4xl font-bold">{value}</p>
              <p className="uppercase text-sm tracking-widest mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}