"use client";

import { useRef, useState } from "react";
import OpeningGate from "@/components/OpeningGate";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Event from "@/components/Event";
import RSVPForm from "@/components/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer";
import MusicControl from "@/components/MusicControl";

export default function ClientPage({ guestName }: { guestName: string }) {
  const [open, setOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      {!open && <OpeningGate onOpen={() => setOpen(true)} />}

      <MusicPlayer isPlaying={open} audioRef={audioRef} />
      <MusicControl audioRef={audioRef} />

      <main className="bg-white">
        <Hero guestName={guestName} />
        <Story />
        <Event />
        <RSVPForm guestName={guestName} />
      </main>
    </>
  );
}