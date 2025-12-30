/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from "next/image";

export default function QualityStandards() {
  const standards = [
    {
      title: 'Personalized Programs',
      description: 'Every workout plan is tailored to your unique goals, fitness level, and preferences, ensuring maximum effectiveness and enjoyment.'
    },
    {
      title: 'Safe Training Environment',
      description: 'We prioritize proper form and progressive overload in our coastal settings to prevent injuries and promote long-term health.'
    },
    {
      title: 'Regular Progress Monitoring',
      description: 'Our team tracks your development with consistent check-ins and adjustments to keep you motivated and on path to success.'
    },
    {
      title: 'Holistic Wellness Focus',
      description: 'We combine physical training with nutrition guidance and mindset coaching for comprehensive, sustainable results.'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              width={400}
              height={400}
              src="/mike.jpg"
              alt="Fit Hunter training standards in Watamu"
              className="w-full object-cover object-top rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Training Standards
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At Fit Hunter, excellence isn't optional. We've established rigorous standards that ensure every session delivers transformative results for your fitness journey in Watamu.
            </p>
            
            <div className="space-y-6">
              {standards.map((standard, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <i className="ri-check-line text-blue-600 font-bold"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{standard.title}</h3>
                    <p className="text-gray-600">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <i className="ri-award-line text-2xl text-blue-600"></i>
                <h4 className="font-semibold text-blue-800">Our Commitment</h4>
              </div>
              <p className="text-blue-700">
                Every program from Fit Hunter represents our dedication to excellence, empathy, and the success of our clients across Kenya's coastal region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}