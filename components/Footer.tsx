/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#4a4a4a] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Fit Hunter Logo - Personal Trainer Watamu"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <p className="text-slate-100 text-sm">
              Fit Hunter is your dedicated personal trainer in Watamu, Kenya. We offer affordable, personalized fitness coaching with unique beach workouts to help you achieve your goals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-100 hover:text-yellow-500 transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-100 hover:text-yellow-500 transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-slate-100 hover:text-yellow-500 transition-colors cursor-pointer">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-slate-100 hover:text-yellow-500 transition-colors cursor-pointer">
                  Book Session
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-100 hover:text-yellow-500 transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-white"></i>
                <span className="text-slate-100">Watamu Beach & Coastal Areas, Watamu, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-white"></i>
                <span className="text-slate-100">+254 748 679 264</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-white"></i>
                <span className="text-slate-100">Flexible scheduling – morning and evening sessions</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social Links</h4>
            <div className="icons flex  gap-4 ">
          <a
            className=" flex items-center justify-center  duration-500"
            href="https://www.facebook.com/hunterkalama"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-facebook-circle-fill text-white text-3xl hover:text-yellow-500"></i>
          </a>
          <a
            className="flex items-center justify-center hover:text-yellow-500 duration-500"
            href="https://www.instagram.com/the.fit.hunter/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-fill text-white text-3xl hover:text-yellow-500"></i>
          </a>
          <a
            className="flex items-center justify-center hover:text-yellow-500 duration-500"
            href="https://www.youtube.com/@the.fit.hunter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-youtube-fill text-white text-3xl hover:text-yellow-500"></i>
          </a>
          <a
            className="flex items-center justify-center hover:text-yellow-500 duration-500"
            href="https://wa.me/0748679264"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-whatsapp-fill text-white text-3xl hover:text-yellow-500"></i>
          </a>
          <a
            className="flex items-center justify-center hover:text-yellow-500 duration-500"
            href="tel:0748679264"
          >
            <i className="ri-phone-fill text-white text-3xl hover:text-yellow-500"></i>
          </a>
        </div>
          </div>
        </div>

        <div className="border-t border-[#292929] mt-8 pt-8 text-center text-sm text-slate-100">
          <p>&copy; 2026 Fit Hunter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}