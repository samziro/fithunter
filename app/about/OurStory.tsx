/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Rooted in Passion, Driven by Results
            </h2>
            <div className="space-y-6 text-slate-100">
              <p className="text-lg leading-relaxed">
                Fit Hunter was founded with a simple vision: to empower individuals in Watamu, Kenya, with transformative fitness programs that blend coastal vibes with expert guidance.
              </p>
              <p className="text-lg leading-relaxed">
                Located in the beautiful coastal region of Watamu, our approach combines years of experience with sustainable practices to deliver personalized training that meets the highest standards of effectiveness and enjoyment.
              </p>
              <p className="text-lg leading-relaxed">
                Every day, we commit to our motto: "Preying on fitness goals one rep at a time." This isn't just a slogan – it's our promise to you and your wellness journey.
              </p>
            </div>
            <div className="mt-8 flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4+</div>
                <div className="text-sm text-slate-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-slate-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-100">Personalized</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              width={400}
              height={400}
              src="/mike.jpg"
              alt="Fit Hunter trainer in Watamu"
              className="w-full h-full object-top shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-600 text-white p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-2xl"></i>
                <div>
                  <div className="font-semibold">Located in</div>
                  <div className="text-sm">Watamu, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}