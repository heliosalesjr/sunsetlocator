// About.jsx
"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  const [expandedTech, setExpandedTech] = useState(null);

  const features = [
    {
      icon: "🌅",
      title: "Real-time Sunset Tracking",
      description: "Track sunsets happening in the next 30 minutes worldwide with precise calculations"
    },
    {
      icon: "📍",
      title: "Global Coverage",
      description: "Monitor sunsets across major cities and hidden gems around the world"
    },
    {
      icon: "📸",
      title: "Visual Context",
      description: "Beautiful photography from Pexels API to showcase each destination"
    },
    {
      icon: "⏰",
      title: "Live Countdown",
      description: "Real-time countdown timers showing exactly when each sunset will occur"
    },
    {
      icon: "🎯",
      title: "Precision Calculation",
      description: "Accurate sunset times using advanced astronomical calculations"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Seamless experience across desktop, tablet, and mobile devices"
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "Next.js 14", description: "React framework with App Router" },
        { name: "React 18", description: "UI library with hooks and modern features" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "JavaScript ES6+", description: "Modern JavaScript features" }
      ]
    },
    {
      category: "APIs & Services",
      technologies: [
        { name: "SunCalc Library", description: "Astronomical calculations for sunset times" },
        { name: "Pexels API", description: "High-quality photography integration" },
        { name: "Geolocation API", description: "City coordinates and positioning" }
      ]
    },
    {
      category: "Tools & Deployment",
      technologies: [
        { name: "Vercel", description: "Deployment and hosting platform" },
        { name: "Git", description: "Version control system" },
        { name: "VS Code", description: "Development environment" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <Navbar />
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-orange-500">Sunset Tracker</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the magic of golden hour moments happening around the world, 
            right now, with real-time sunset tracking and stunning photography.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* What is Sunset Tracker */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            What is Sunset Tracker?
          </h2>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sunset Tracker is a real-time web application that shows you where the sun is setting 
              at any given moment around the world. Whether you're a photography enthusiast, a travel 
              planner, or simply someone who appreciates the beauty of golden hour, this tool helps you 
              discover stunning sunset moments happening within the next 30 minutes globally.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The project integrates two powerful APIs to deliver both accuracy and visual appeal. 
              The <strong className="text-orange-600">SunCalc library</strong> provides precise astronomical 
              calculations for sunset times, ensuring you never miss a golden hour moment. Meanwhile, 
              the <strong className="text-orange-600">Pexels API</strong> brings beautiful, high-quality 
              photography to give you visual context of each destination.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This combination creates a unique experience where technical precision meets visual storytelling, 
              helping you discover both famous landmarks and hidden gems around the world during their most 
              photogenic moments.
            </p>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Technology Stack
          </h2>
          <div className="space-y-8">
            {techStack.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                      onClick={() => setExpandedTech(expandedTech === `${categoryIndex}-${techIndex}` ? null : `${categoryIndex}-${techIndex}`)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedTech === `${categoryIndex}-${techIndex}` ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {expandedTech === `${categoryIndex}-${techIndex}` && (
                        <p className="text-gray-600 mt-2 text-sm">{tech.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Me */}
        <section className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              About the Creator
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Hi! I'm a passionate developer who loves creating meaningful digital experiences. 
                Sunset Tracker was born from my fascination with the intersection of technology and nature's beauty.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                As someone who appreciates both the precision of code and the artistry of photography, 
                I wanted to build something that celebrates those magical moments when the day transitions 
                to night around our beautiful planet.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This project represents my commitment to creating applications that are not just functional, 
                but also inspiring and visually engaging. I believe technology should help us connect with 
                the world around us in more meaningful ways.
              </p>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Built with ❤️ and lots of ☕ • Open to feedback and collaboration
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Chase the Golden Hour?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Discover beautiful sunsets happening right now around the world
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Tracking Sunsets →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;