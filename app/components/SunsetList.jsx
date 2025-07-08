"use client";

import { useState, useEffect } from 'react';
import SunsetCard from './SunsetCard';
import { getSunsetsInNext30Minutes } from '../utils/sunsetUtils';
import { cities } from '../utils/cities';
import Link from 'next/link';

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
    <div className="bg-gradient-to-r from-orange-300 to-red-400 rounded-lg p-3 shadow-md text-white hover:shadow-lg transition-shadow">
      <div className="text-center">
        <h4 className="font-bold text-sm mb-1">{city.name}</h4>
        <p className="text-orange-100 text-xs mb-2">{city.country}</p>
        <div className="inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs font-bold">
              {isClient ? timeRemaining : '--:--'}
            </span>
          </div>
        </div>
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
      if (data.photos && data.photos.length > 0) {
        setCityImage(data.photos[0].src.landscape);
        setCityPhotographer(data.photos[0].photographer);
      } else {
        setCityImage(null);
        setCityPhotographer(null);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
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

  const handleSunsetExpired = (expiredCity) => {
    setUpcomingSunsets(prev => prev.filter(city => city.name !== expiredCity.name));
  };

  const mainSunset = upcomingSunsets[0];
  const additionalSunsets = upcomingSunsets.slice(1);

  useEffect(() => {
    if (mainSunset) {
      fetchCityImage(mainSunset.name);
    }
  }, [mainSunset]);

  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌅 Golden Hour Alert</h1>
          <p className="text-gray-600 mb-4">Upcoming Sunsets for the next 30 minutes</p>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sunset data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🌅 Golden Hour Alert</h1>
        <p className="text-gray-600 mb-4">Upcoming Sunsets for the next 30 minutes</p>
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
        </div>
      </div>

      {upcomingSunsets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌙</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No sunset for the next 30 minutes</h2>
          <p className="text-gray-500">Try again soon!</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'city found' : 'cities found'}
            </span>
          </div>

          {mainSunset && (
            <div className="mb-6 flex flex-col lg:flex-row bg-white rounded-lg shadow overflow-hidden">
              <div className="lg:w-2/3 p-4">
                <SunsetCard key={mainSunset.name} city={mainSunset} onExpired={handleSunsetExpired} />
              </div>
              {cityImage && (
                <div className="lg:w-1/3 relative group overflow-hidden">
                  <img
                    src={cityImage}
                    alt={mainSunset.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {cityPhotographer && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                      Photo by {cityPhotographer} / Pexels
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {additionalSunsets.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Other upcoming sunsets</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {additionalSunsets.map((city) => (
                  <MiniSunsetCard key={city.name} city={city} onExpired={handleSunsetExpired} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Powered by the library <em><Link href="/">SunCalc</Link></em>
        </p>
      </div>
    </div>
  );
};

export default SunsetList;
