/* eslint-disable react/no-unescaped-entities */
'use client';

export default function AboutHero() {
  return (
    <section 
      className="relative h-[90dvh] flex items-center justify-center bg-cover bg-center"
      style={{

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/trainer.jpg')`

      }}
    >
      <div className="text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Journey
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
          From a passion for coastal fitness in Watamu to empowering hundreds with transformative programs, Fit Hunter is dedicated to your sustainable health through expert guidance and unwavering support.
        </p>
        <div className="inline-block bg-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 px-8 py-3">
          <p className="text-yellow-300 text-lg">Preying on fitness goals one rep at a time</p>
        </div>
        <p className="mt-4">We're committed to building strength, confidence, and wellness in Kenya's tropical paradise.</p>
      </div>
    </section>
  );
}