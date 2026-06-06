"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer({
  isPlaying,
  audioRef,
}: {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const fadeIntervalRef = useRef<number | null>(null);
  const playTimeoutRef = useRef<number | null>(null);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    clearFade();

    let volume = 0;
    const maxVolume = 0.6;

    audio.volume = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (volume < maxVolume) {
        volume += 0.02 * (1 - volume);
        audio.volume = Math.min(volume, maxVolume);
      } else {
        clearFade();
      }
    }, 80);
  };

  const fadeOut = (audio: HTMLAudioElement) => {
    clearFade();

    let volume = audio.volume;

    fadeIntervalRef.current = window.setInterval(() => {
      if (volume > 0) {
        volume -= 0.03;
        audio.volume = Math.max(volume, 0);
      } else {
        audio.pause();
        clearFade();
      }
    }, 80);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.src) {
      audio.src = "/music.mp3";
      audio.load();
    }

    if (isPlaying) {
      playTimeoutRef.current = window.setTimeout(() => {
        audio
          .play()
          .then(() => fadeIn(audio))
          .catch(() => {});
      }, 400);
    } else {
      fadeOut(audio);
    }

    return () => {
      if (playTimeoutRef.current) {
        window.clearTimeout(playTimeoutRef.current);
      }

      clearFade();
    };
  }, [isPlaying, audioRef]);

  return <audio ref={audioRef} loop preload="none" aria-hidden />;
}