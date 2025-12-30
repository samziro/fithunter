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
      <div className="text-center text-white max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
          About Fit Hunter
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed font-inter">
          As a certified personal trainer in Watamu, Kenya, I started Fit Hunter from a love of coastal fitness. I've helped hundreds build strength and confidence with simple, effective programs tailored to your goals.
        </p>
        <div className="inline-block bg-yellow-600 border border-yellow-400/30 px-6 py-3 rounded-md">
          <p className="text-white text-xl font-bold font-poppins">Building confidence through fitness, one rep at a time.</p>
        </div>
      </div>
    </section>
  );
}