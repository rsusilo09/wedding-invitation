"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-12-19").getTime();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  return (
    <section className="py-10">
      <h3 className="text-xl">Countdown</h3>
      <p className="text-3xl font-bold">{days} days</p>
    </section>
  );
}