"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer({ isPlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop>
      <source src="/music.mp3" type="audio/mpeg" />
    </audio>
  );
}