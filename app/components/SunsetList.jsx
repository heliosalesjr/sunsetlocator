// SunsetList.jsx
"use client";

import { useState, useEffect } from 'react';
import SunsetCard from './SunsetCard';
import { getSunsetsInNext30Minutes } from '../utils/sunsetUtils';
import { cities } from '../utils/cities';

const MiniSunsetCard = ({ city, onExpired }) => {
  const [isClient, setIsClient] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;
    const updateTime = () => {
      const now = new Date();
      const diff = city.sunsetTime - now;

      if (diff <= 0) {
        setTimeRemaining('00:00');
        onExpired && onExpired(city);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isClient, city.sunsetTime, onExpired]);

  return (
    <div className="bg-white border border-gray-200 shadow rounded-2xl p-4 text-center hover:shadow-md transition-all">
      <h4 className="font-semibold text-gray-900 mb-1 text-base">{city.name}</h4>
      <p className="text-gray-500 text-xs mb-3">{city.country}</p>
      <div className="bg-gray-100 rounded-xl px-3 py-2 inline-block text-sm font-mono font-bold text-gray-700">
        {isClient ? timeRemaining : '--:--'}
      </div>
    </div>
  );
};

const SunsetList = () => {
  const [upcomingSunsets, setUpcomingSunsets] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [cityPhotographer, setCityPhotographer] = useState(null);

  const updateSunsets = () => {
    const now = new Date();
    const sunsets = getSunsetsInNext30Minutes(cities);
    setUpcomingSunsets(sunsets);
    setLastUpdate(now);
  };

  const fetchCityImage = async (cityName) => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(cityName)}&per_page=1`, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
        },
      });
      const data = await response.json();
      if (data.photos?.length) {
        setCityImage(data.photos[0].src.landscape);
        setCityPhotographer(data.photos[0].photographer);
      } else {
        setCityImage(null);
        setCityPhotographer(null);
      }
    } catch {
      setCityImage(null);
      setCityPhotographer(null);
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateSunsets();
    const interval = setInterval(updateSunsets, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (upcomingSunsets[0]) {
      fetchCityImage(upcomingSunsets[0].name);
    }
  }, [upcomingSunsets]);

  const handleSunsetExpired = (expiredCity) => {
    setUpcomingSunsets((prev) => prev.filter((c) => c.name !== expiredCity.name));
  };

  if (!isClient) return null;

  const mainSunset = upcomingSunsets[0];
  const additionalSunsets = upcomingSunsets.slice(1);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Sunset <span className="text-orange-500">Tracker</span></h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Discover the most beautiful sunsets happening around the world in the next 30 minutes.
          </p>
        </div>

        {upcomingSunsets.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-7xl mb-6">🌙</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No sunsets in the next 30 minutes</h2>
            <p className="text-gray-400">Check back soon for the next golden hour!</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="text-center">
              <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'sunset found' : 'sunsets found'}
              </span>
            </div>

            {/* Main Sunset */}
            {mainSunset && (
              <div className="mb-8 grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SunsetCard city={mainSunset} onExpired={handleSunsetExpired} />
                </div>

                {cityImage && (
                  <div className="relative rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src={cityImage}
                      alt={mainSunset.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/70 text-gray-800 text-xs p-2 text-center">
                      📸 {cityPhotographer} / Pexels
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Additional Sunsets */}
            {additionalSunsets.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Other Upcoming Sunsets</h3>
                  <p className="text-gray-500 text-sm">Don't miss these beautiful moments</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {additionalSunsets.map((city) => (
                    <MiniSunsetCard key={city.name} city={city} onExpired={handleSunsetExpired} />
                  ))}
                </div>
              </div>
            )}

            {/* Last Updated */}
            <div className="text-center mt-16">
              <span className="text-xs text-gray-400">
                Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SunsetList;