"use client";

import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className={`max-w-4xl mx-auto px-6 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 border border-white/20 mb-6">
            <span className="text-orange-400 text-sm font-medium">ℹ️ ABOUT</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">SunsetLocator</span>
          </h1>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the magic of golden hour around the world
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">What is SunsetLocator?</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              SunsetLocator is a real-time sunset tracking application that helps you discover the most beautiful sunsets happening around the world in the next 30 minutes. Whether you're a photographer, traveler, or simply someone who appreciates nature's daily masterpiece, our app connects you with golden hour moments across the globe.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1">🌅</span>
                <div>
                  <h3 className="font-medium text-white">Real-time Sunset Tracking</h3>
                  <p>Live countdown to sunsets in major cities worldwide</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1">📸</span>
                <div>
                  <h3 className="font-medium text-white">Beautiful Imagery</h3>
                  <p>Stunning city photography powered by Pexels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1">🌍</span>
                <div>
                  <h3 className="font-medium text-white">Global Coverage</h3>
                  <p>Sunset times calculated for cities across all continents</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 mt-1">⏰</span>
                <div>
                  <h3 className="font-medium text-white">30-Minute Window</h3>
                  <p>Focus on the most imminent sunset opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Technology</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Built with Next.js and React, SunsetLocator uses SunCalc for precise sunset calculations and integrates with the Pexels API for high-quality city imagery. The app features a responsive design with smooth animations and real-time updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;