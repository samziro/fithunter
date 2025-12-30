/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="py-20 bg-[#292929]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
            Meet Your Trainer
          </h2>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto font-inter leading-relaxed">
            I'm dedicated to your fitness journey, with expert guidance to help you build strength and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              width={800}
              height={800}
              src="/about.jpg"
              alt="Fit Hunter personal trainer leading a fitness session in Watamu, Kenya"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-poppins">
              Passionate About Your Success
            </h3>
            <div className="space-y-6 text-slate-100 font-inter text-base leading-relaxed">
              <p>
                With 11 years in fitness and 5+ years as a certified personal trainer in Watamu, Kenya, I bring proven expertise to every session.
              </p>
              <p>
                From your first assessment to ongoing motivation, my focus is on safe, effective plans—like one-on-one training or online coaching—that get real results.
              </p>
              <p>
                I believe in empathy and support to help you achieve lasting health and confidence.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-yellow-600/20 rounded-md border-2 border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-heart-line text-yellow-600 text-xl"></i>
                </div>
                <div className="font-semibold text-yellow-500 font-poppins">Expert Guidance</div>
                <div className="text-sm text-yellow-500 font-inter">Tailored to you</div>
              </div>
              <div className="text-center p-4 bg-yellow-600/20 rounded-md border-2 border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-yellow-600 text-xl"></i>
                </div>
                <div className="font-semibold text-yellow-500 font-poppins">Flexible Scheduling</div>
                <div className="text-sm text-yellow-500 font-inter">Fits your life</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-yellow-600/20 rounded-lg border border-yellow-400/30 text-white py-12 px-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">Ready to Start?</h3>
            <p className="text-lg md:text-xl mb-8 text-slate-100 font-inter leading-relaxed">
              Join 100+ happy clients who've transformed with Fit Hunter in Watamu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/programs" className="bg-white text-yellow-600 px-8 py-3 font-semibold rounded-md hover:bg-gray-100 transition-colors font-poppins">
                View Programs
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 font-semibold rounded-md hover:bg-white hover:text-yellow-600 transition-colors font-poppins">
                Get Started
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-100 font-inter">
              <i className="ri-phone-line"></i>
              <span>+254 748 679 264</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}