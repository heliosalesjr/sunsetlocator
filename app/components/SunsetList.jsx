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
    <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer transform hover:scale-105 transition-all duration-300">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-4 text-center">
        <h4 className="font-bold text-white mb-1">{city.name}</h4>
        <p className="text-white/80 text-xs mb-3">{city.country}</p>
        
        <div className="backdrop-blur-md bg-white/20 rounded-xl px-3 py-2 border border-white/30">
          <div className="text-white font-mono text-sm font-bold">
            {isClient ? timeRemaining : '--:--'}
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="relative overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Sunset <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Tracker</span>
              </h1>
              
              <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
                Discover the most beautiful sunsets happening around the world in the next 30 minutes
              </p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white/70">Loading sunset data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Sunset <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Tracker</span>
            </h1>
            
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Discover the most beautiful sunsets happening around the world in the next 30 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {upcomingSunsets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌙</div>
            <h2 className="text-3xl font-bold text-white mb-4">No sunsets in the next 30 minutes</h2>
            <p className="text-white/60 text-lg">Check back soon for the next golden hour!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats */}
            <div className="text-center">
              <div className="inline-block backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-white font-medium">
                  {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'sunset found' : 'sunsets found'}
                </span>
              </div>
            </div>

            {/* Main Sunset */}
            {mainSunset && (
              <div className="mb-12 flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden">
                <div className="lg:w-2/3 relative">
                  {/* Imagem de fundo para o card principal */}
                  {cityImage && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cityImage}
                        alt={mainSunset.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <SunsetCard key={mainSunset.name} city={mainSunset} onExpired={handleSunsetExpired} />
                </div>
                
                {cityImage && (
                  <div className="lg:w-1/3 relative group overflow-hidden">
                    <img
                      src={cityImage}
                      alt={mainSunset.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {cityPhotographer && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="backdrop-blur-md bg-black/40 text-white text-xs px-3 py-2 rounded-lg border border-white/20">
                          📸 {cityPhotographer} / Pexels
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Additional Sunsets */}
            {additionalSunsets.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Other Upcoming Sunsets</h3>
                  <p className="text-white/60">Don't miss these beautiful moments</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {additionalSunsets.map((city) => (
                    <MiniSunsetCard key={city.name} city={city} onExpired={handleSunsetExpired} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Last Updated - Movido para o final */}
        <div className="mt-16 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-xl px-4 py-2 border border-white/20 inline-block">
            <div className="text-white/60 text-sm">
              Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunsetList;