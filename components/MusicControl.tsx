"use client";

export default function MusicControl({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label="Toggle background music"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-white/20 backdrop-blur-lg px-3 py-2 md:px-4 md:py-3 rounded-full shadow-lg text-white text-sm md:text-base"
      style={{ zIndex: 9999 }}
    >
      🎵
    </button>
  );
}