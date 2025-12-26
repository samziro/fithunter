'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminModal from './AdminModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      setIsAdmin(Boolean(localStorage.getItem('adminAuth')));
    } catch (e) {
      setIsAdmin(false);
    }
  }, []);

  return (
    <header className="bg-[#4a4a4a] shadow-lg z-10 w-full fixed">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-1">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Fit Hunter Logo - Personal Trainer Watamu"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/about" className="text-white transition-colors cursor-pointer">
              About
            </Link>
            <Link href="/programs" className="text-white transition-colors cursor-pointer">
              Programs
            </Link>
            {/* <Link href="/book" className="text-white transition-colors cursor-pointer">
              Book Session
            </Link> */}
            <Link href="/blogs" className="text-white transition-colors cursor-pointer">
              Blogs
            </Link>
            <button onClick={() => setIsAdminOpen(true)} className="text-white transition-colors cursor-pointer">
              Admin
            </button>
            {isAdmin && (
              <>
                <Link href="/admin/orders" className="text-white transition-colors cursor-pointer">
                  Dashboard
                </Link>
                {/* <button
                  onClick={async () => {
                    // call logout API
                    await fetch('/api/admin/logout', { method: 'POST' });
                    try { localStorage.removeItem('adminAuth'); localStorage.removeItem('adminName'); } catch (e) {}
                    setIsAdmin(false);
                    window.location.href = '/';
                  }}
                  className="text-white transition-colors cursor-pointer"
                >
                  Logout
                </button> */}
              </>
            )}
            <Link href="/login" className="bg-yellow-500 text-white px-6 py-3 hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-yellow-600`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/about" className="text-white transition-colors cursor-pointer">
                About
              </Link>
              <Link href="/programs" className="text-white transition-colors cursor-pointer">
                Programs
              </Link>
              <Link href="/book" className="text-white transition-colors cursor-pointer">
                Book Session
              </Link>
              <Link href="/login" className="bg-yellow-600 text-white px-6 py-3 hover:bg-yellow-700 transition-colors text-center whitespace-nowrap cursor-pointer">
                Get Started
              </Link>
            </div>
          </div>
        )}
        <AdminModal open={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </header>
  );
}