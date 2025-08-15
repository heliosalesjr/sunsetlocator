"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Detect scroll para efeito glassmorphism
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
        : 'backdrop-blur-md bg-white/60 border-b border-slate-200/30'
    } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:via-orange-500 group-hover:to-rose-500 transition-all duration-300 transform group-hover:scale-105">
                Sunset
                <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-300">
                  Tracker
                </span>
              </h1>
              
              {/* Efeito de brilho refinado */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/about" 
              className="relative text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium group overflow-hidden"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg -z-0"></div>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <a 
              href="https://github.com/heliosalesjr/sunsetlocator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium group flex items-center space-x-2 overflow-hidden"
            >
              <span className="relative z-10">Github</span>
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg -z-0"></div>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-500 to-slate-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;