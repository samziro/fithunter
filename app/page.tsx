'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';


const features = [
  {
    icon: 'ri-run-line',
    title: 'Personalized Training',
    description: 'Tailored workout programs designed specifically for your fitness goals and lifestyle in Watamu.',
  },
  {
    icon: 'ri-body-scan-line',
    title: 'Coastal Workouts',
    description: 'Unique beach-inspired sessions that blend ocean vibes with effective strength and endurance training.',
  },
  {
    icon: 'ri-wallet-line',
    title: 'Affordable Pricing',
    description: 'All programs starting at just KES 2000, making professional fitness coaching accessible to everyone.',
  },
];

const programHighlights = [
  'Custom plans for muscle gain, weight loss, or overall health',
  'Incorporates Watamu\'s natural environment for engaging sessions',
  'Expert guidance with empathy and motivation',
  'Online options for flexible scheduling',
];

interface CTAButtonProps {
  href: string
  children: ReactNode
  className?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, children, className = '' }) => (
  <Link href={href} className={`px-8 py-4 text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${className}`}>
    {children}
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-dvh">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-dvh flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/about.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transform Your Fitness
            <span className="block text-yellow-500">One Rep at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Expert personal trainer Watamu offering affordable fitness coaching Kenya. Preying on fitness goals with coastal-inspired programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/programs" className="bg-yellow-600 text-white hover:bg-yellow-600">
              Book a Session - KES 2000
            </CTAButton>
            <CTAButton href="/programs" className="border-2 border-white text-white hover:bg-white hover:text-gray-900">
              View Our Programs
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#292929] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Fit Hunter?</h2>
            <p className="text-xl text-slate-100">Your partner in coastal fitness excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[#4a4a4a] p-8  shadow-lg text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${feature.icon} text-yellow-600 text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Showcase */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Fitness Programs</h2>
            <p className="text-xl text-slate-100">Tailored solutions for your wellness journey</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                width={600}
                height={500}
                src="/mike.jpg"
                alt="Personal trainer Watamu demonstrating fitness programs"
                className=" shadow-2xl object-cover object-top w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Comprehensive Training Options</h3>
              <div className="space-y-4 mb-8">
                {programHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <i className="ri-check-line text-yellow-600 text-xl"></i>
                    <span className="text-lg text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">KES 2000</span>
                  <span className="text-slate-100">per program</span>
                </div>
              </div>
              <CTAButton href="/book" className="bg-yellow-600 text-white hover:bg-yellow-700 inline-block">
                Get Started
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#292929] text-white text-center py-6">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
          <p className="text-slate-100 mb-6">
            Start your journey with expert personal trainer Watamu today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/book"
              className="bg-yellow-600 text-slate-100 font-semibold hover:bg-yellow-700"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-calendar-check-line"></i>
                <span>Book Session Now</span>
              </div>
            </CTAButton>
            <CTAButton
              href="/client/dashboard"
              className="border-2 border-white text-white font-semibold hover:bg-white hover:text-yellow-600"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-line-chart-line"></i>
                <span>Track Your Progress</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-[#292929] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Achieve Your Fitness Goals?</h2>
          <p className="text-xl mb-8">
            Contact your personal trainer Watamu today for a free consultation and start preying on your goals one rep at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/book" className="bg-white text-yellow-600 hover:bg-gray-100">
              Book Free Consultation
            </CTAButton>
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