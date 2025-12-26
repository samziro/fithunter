/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Title from '@/components/Title';

const Location = () => {
  return (
    <section className="bg-[#292929] py-20">
      <Title heading="Our Location" />
      <div className='max-w-6xl mx-auto my-12 py-8 flex flex-col md:flex-row gap-8 items-center'>
        {/* Map */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d39.999!3d-3.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMjEnMDAiUyA0MMKwMDAnMDAiRQ!5e0!3m2!1sen!2ske!4v1735000000000"
            width="100%"
            height="300"
            style={{
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fit Hunter Location in Watamu"
          ></iframe>
        </div>
        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="mb-4 text-slate-100">
            Fit Hunter operates in the stunning coastal town of Watamu, Kenya. Sessions take place on beautiful beaches and outdoor locations, making the most of the natural environment for inspiring workouts.
          </p>
          <div className="space-y-2">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-map-pin-line text-yellow-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Location</h5>
                  <p className="text-slate-100">
                    Watamu Beach & Coastal Areas, Watamu, Kilifi County, Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-phone-line text-yellow-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Contact</h5>
                  <p className="text-slate-100">+254 748 679 264</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-time-line text-yellow-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">
                    Session Hours
                  </h5>
                  <p className="text-slate-100">
                    Flexible scheduling – morning and evening sessions available daily
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-walk-line text-yellow-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">
                    Getting Here
                  </h5>
                  <p className="text-slate-100">
                    Beach sessions at popular Watamu spots. Exact meeting points shared upon booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location