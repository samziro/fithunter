/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ClientModal from '@/components/ClientModal';

export default function ProgramPage() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const router = useRouter();

  const handleBuyClick = () => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('clientAuth') === 'true') {
        router.push('/order');
        return;
      }
    } catch (e) {}
    setIsClientModalOpen(true);
  };

  return (
    <div className="min-h-dvh">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-[90dvh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/trainer.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Choose Your Transformation Path</h1>
          <p className="text-xl">Expert personal trainer Watamu programs at KES 2000—preying on fitness goals one rep at a time.</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Training Programs</h2>
            <p className="text-xl text-slate-100">All programs priced at KES 2000—tailored for your coastal fitness journey in Watamu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#292929] shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square">
                <Image
                  width={400}
                  height={400} 
                  src="/mike.jpg"
                  alt="Personal Training one-on-one session Watamu"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white mb-3">Personal Training</h3>
                <p className="text-slate-100 mb-4">Work directly with a certified coach on a personalized training plan.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    KES 2000
                  </div>
                  <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#292929]  shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square">
                <Image
                  width={400}
                  height={400} 
                  src="/mike.jpg"
                  alt="Defined Abs Program core training Watamu"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white mb-3">Defined Abs Program</h3>
                <p className="text-slate-100 mb-4">Shred stubborn belly fat and sculpt a stronger core.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    KES 2000
                  </div>
                  <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#292929] shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square">
                <Image
                  width={400}
                  height={400} 
                  src="/mike.jpg"
                  alt="Custom Workout Programs muscle building Watamu"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white mb-3">Custom Workout Programs</h3>
                <p className="text-slate-100 mb-4">Build muscle, enhance endurance, and improve performance.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    KES 2000
                  </div>
                  <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#292929] shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square">
                <Image
                  width={400}
                  height={400} 
                  src="/mike.jpg"
                  alt="Online Coaching virtual fitness Kenya"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white mb-3">Online Coaching</h3>
                <p className="text-slate-100 mb-4">Online coaching for personalized fitness guidance from anywhere.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    KES 2000
                  </div>
                  <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3  font-semibold hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

            <div className="text-center mt-12">
            <p className="text-xl text-slate-100 mb-6">
              Unsure which program fits you best? Get a free consultation with our coaching team.
            </p>
            <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-8 py-4  text-lg font-semibold hover:bg-yellow-700 transition-colors">
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>

      <ClientModal open={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />

      {/* Personal Training Pricing Section */}
      <section className="py-20 bg-[#292929] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Personal Training Program</h2>
            <p className="text-xl text-slate-100">Flexible packages for committed transformation—save more with bulk sessions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#4a4a4a]  p-4 text-center">
              <h3 className="text-2xl font-bold mb-4">Single Session</h3>
              <div className="text-3xl font-bold mb-4">2,500 KES</div>
              <ul className="space-y-2 text-slate-100 mb-8">
                <li>✓ 1 training session</li>
                <li>✓ Personalized workout plan</li>
                <li>✓ Expert guidance</li>
              </ul>
              <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 block">
                Book Now
              </button>
            </div>

            <div className="bg-[#4a4a4a] p-4 text-center">
              <h3 className="text-2xl font-bold mb-4">6 Sessions</h3>
              <div className="text-4xl font-bold mb-4">13,500 KES</div>
              <ul className="space-y-2 text-slate-100 mb-8">
                <li>✓ 6 training sessions</li>
                <li>✓ Save 10%</li>
                <li>✓ Email support</li>
              </ul>
              <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 block">
                Choose Plan
              </button>
            </div>

            <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 p-6 text-center shadow-xl">
              <div className="bg-yellow-500 text-yellow-900 px-4 py-1 rounded-full inline-block mb-4 text-sm font-bold border-2 border-yellow-700">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">10 Sessions</h3>
              <div className="text-4xl font-bold mb-4">20,000 KES</div>
              <ul className="space-y-2 text-white mb-8">
                <li>✓ 10 training sessions</li>
                <li>✓ Save 20%</li>
                <li>✓ Priority email support</li>
              </ul>
              <button onClick={handleBuyClick} className="bg-white text-yellow-600 px-6 py-3 font-semibold hover:bg-gray-100 block">
                Get Started
              </button>
            </div>

            <div className="bg-[#4a4a4a] p-4 text-center">
              <h3 className="text-2xl font-bold mb-4">16 Sessions</h3>
              <div className="text-4xl font-bold mb-4">29,000 KES</div>
              <ul className="space-y-2 text-slate-100 mb-8">
                <li>✓ 16 training sessions</li>
                <li>✓ Save 27%</li>
                <li>✓ Monthly check-ins</li>
                <button onClick={handleBuyClick} className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 block">
                  Choose Plan
                </button>
              </ul>
            </div>

            <div className="bg-[#4a4a4a] p-4 text-center">
              <h3 className="text-2xl font-bold mb-4">20 Sessions</h3>
              <div className="text-4xl font-bold mb-4">35,000 KES</div>
              <ul className="space-y-2 text-slate-100 mb-8">
                <li>✓ 20 training sessions</li>
                <li>✓ Save 30%</li>
                <li>✓ Full transformation support</li>
              </ul>
              <Link href="/book" className="bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700 block">
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-[#4a4a4a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Training Promise</h2>
            <p className="text-xl text-slate-100">Personalized, effective, and coastal-inspired fitness coaching Kenya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-pulse-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Personalized Approach</h3>
              <p className="text-slate-100 text-sm">Plans tailored to your goals and lifestyle</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-run-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Beach Workouts</h3>
              <p className="text-slate-100 text-sm">Unique coastal sessions for motivation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Expert Guidance</h3>
              <p className="text-slate-100 text-sm">Safe, effective training with proven methods</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Proven Results</h3>
              <p className="text-slate-100 text-sm">Join hundreds of transformed clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#292929] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Transformation?</h2>
          <p className="text-xl mb-8 text-slate-100">
            Book a free consultation with your personal trainer Watamu today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-white text-yellow-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Book Free Consultation
            </Link>
            <a href="tel:+254748679264" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors whitespace-nowrap cursor-pointer">
              Call +254 748 679 264
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}