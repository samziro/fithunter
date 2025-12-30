/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-20 bg-[#292929]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
              Our Story: Passion for Fitness in Watamu
            </h2>
            <div className="space-y-6 text-slate-100 font-inter text-base leading-relaxed">
              <p>
                Fit Hunter started with a simple goal: Help people in Kenya get fit and confident through personalized training. As a certified personal trainer, I've built this from my love of coastal workouts.
              </p>
              <p>
                Based in Watamu's beautiful beaches, I use years of experience to create safe, fun sessions—one-on-one, group classes, or outdoor training—that deliver real results.
              </p>
              <p>
                Our motto: "Building confidence through fitness, one rep at a time." It's more than words—it's how I support every client's journey to better health.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-white font-poppins">5+</div>
                <div className="text-sm text-slate-100 font-inter">Years of Experience</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-white font-poppins">100+</div>
                <div className="text-sm text-slate-100 font-inter">Happy Clients</div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="text-3xl font-bold text-white font-poppins">100%</div>
                <div className="text-sm text-slate-100 font-inter">Personalized Plans</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              width={400}
              height={400}
              src="/mike2.jpeg"
              alt="Fit Hunter personal trainer leading a session in Watamu, Kenya"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-600 text-white p-4 rounded-md shadow-xl">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-2xl"></i>
                <div>
                  <div className="font-semibold font-poppins">Based in</div>
                  <div className="text-sm font-inter">Watamu, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}