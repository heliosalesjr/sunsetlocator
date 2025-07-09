"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/10 border-b border-white/10 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="relative">
              <h1 className="text-2xl font-bold text-slate-700 group-hover:text-orange-400 transition-all duration-300 transform group-hover:scale-105">
                Sunset
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 group-hover:from-orange-300 group-hover:to-red-400 transition-all duration-300">
                  Tracker
                </span>
              </h1>
              
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-yellow-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="text-slate-700 hover:text-slate=900 transition-colors duration-300 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <a 
              href="https://github.com/heliosalesjr/sunsetlocator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 transition-colors duration-300 font-medium relative group flex items-center space-x-1"
            >
              <span>Github</span>
              <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;