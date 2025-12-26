/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="py-20 bg-[#292929]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Meet Your Trainer
          </h2>
          <p className="text-xl text-slate-100 max-w-3xl mx-auto">
            Behind every successful transformation is a dedicated trainer who cares about your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              width={800}
              height={800}
              src="/about.jpg"
              alt="Fit Hunter personal trainer in Watamu"
              className="w-full object-cover object-top  shadow-xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Passionate About Your Success
            </h3>
            <div className="space-y-6 text-slate-100">
              <p className="text-lg leading-relaxed">
                At Fit Hunter, our experienced trainer brings 3 years in the fitness industry and 4 years as a personal trainer to help you achieve your goals in Watamu, Kenya.
              </p>
              <p className="text-lg leading-relaxed">
                From initial assessments to ongoing support, we focus on empathy, expertise, and motivation to ensure your programs—from defined abs routines to online coaching—deliver real results.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that a supportive, knowledgeable trainer leads to lasting wellness and confidence for our clients.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-heart-line text-yellow-600 text-xl"></i>
                </div>
                <div className="font-semibold text-yellow-500">Expert Guidance</div>
                <div className="text-sm text-yellow-500">Personalized approach</div>
              </div>
              <div className="text-center p-4 bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-yellow-600 text-xl"></i>
                </div>
                <div className="font-semibold text-yellow-500">Flexible Scheduling</div>
                <div className="text-sm text-yellow-500">Coastal convenience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 text-white py-16 px-8 ">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-8 text-slate-100">
              Join hundreds of satisfied clients who trust Fit Hunter for their fitness needs in Watamu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/services" className="bg-white text-yellow-600 px-8 py-3 font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                View Our Services
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-yellow-600 transition-colors cursor-pointer whitespace-nowrap">
                Get Started Today
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-100">
              <i className="ri-phone-line"></i>
              <span>Call us at +254 748 679 264</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}