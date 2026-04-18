import Reveal from "./Reveal";

export default function Event() {
  return (
    <section className="py-20 bg-pink-50 flex justify-center">
      <Reveal>
        <div className="backdrop-blur-lg bg-white/70 p-10 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-serif mb-4">Wedding Day</h3>
          <p>Saturday, 19 December 2026</p>
          <p>14:00</p>
          <p className="mt-4">GKI Residen Sudirman</p>
        </div>
      </Reveal>
    </section>
  );
}