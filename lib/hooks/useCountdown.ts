import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function useCountdown(targetIso: string) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetIso)
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetIso));
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetIso]);

  return timeLeft;
}

export type { TimeLeft };
