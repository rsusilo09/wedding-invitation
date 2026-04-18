"use client";

import { useState } from "react";
import OpeningGate from "@/components/OpeningGate";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Event from "@/components/Event";
import RSVPForm from "@/components/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";

export default function ClientPage({ guestName }: { guestName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && <OpeningGate onOpen={() => setOpen(true)} />}
      <MusicPlayer isPlaying={open} />

      <main className="bg-white">
        <Hero guestName={guestName} />
        <Story />
        <Countdown />
        <Event />
        <RSVPForm guestName={guestName} />
      </main>
    </>
  );
}