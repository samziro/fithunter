/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Title from '@/components/Title';

const Location = () => {
  return (
    <section className="bg-[#292929] py-20">
      <Title heading="Our Location" />
      <div className="max-w-6xl mx-auto my-12 py-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 mx-auto flex flex-col gap-4 px-6">
          <p className="mb-4 text-slate-100 text-base leading-relaxed font-inter">
            Fit Hunter is based in Watamu, Kenya, with no fixed gym—we come to you! Whether it's your home, a beach, park, or any spot you prefer, our sessions use the coastal environment for motivating workouts.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1 font-poppins text-lg">Location</h5>
                <p className="text-slate-100 font-inter">
                  Watamu and surrounding areas, Kilifi County, Kenya—your choice of spot!
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-phone-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1 font-poppins text-lg">Contact</h5>
                <p className="text-slate-100 font-inter">+254 748 679 264</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-time-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1 font-poppins text-lg">Session Hours</h5>
                <p className="text-slate-100 font-inter">
                  Flexible scheduling: Morning and evening sessions available daily.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-walk-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1 font-poppins text-lg">How It Works</h5>
                <p className="text-slate-100 font-inter">
                  Tell us your preferred location—we'll meet you there for personalized training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;