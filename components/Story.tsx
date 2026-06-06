import Reveal from "./Reveal";

export default function Story() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 text-center bg-white">
      <Reveal>
        <h2 className="text-2xl sm:text-3xl font-serif mb-6">Our Story</h2>
        <p className="max-w-xl mx-auto text-gray-600 text-sm sm:text-base">
          From a simple hello to a lifetime promise. Our journey began with
          laughter, grew with love, and now we are ready for forever.
        </p>
      </Reveal>
    </section>
  );
}