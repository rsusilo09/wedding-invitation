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
      className="fixed bottom-6 right-6 bg-white/20 backdrop-blur-lg px-4 py-3 rounded-full shadow-lg text-white"
      style={{
        zIndex: 9999
      }}
    >
      🎵
    </button>
  );
}