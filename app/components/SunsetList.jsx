// SunsetList.jsx
"use client";

import { useState, useEffect } from 'react';
import SunsetCard from './SunsetCard';
import Navbar from './Navbar';
import { getSunsetsInNext30Minutes, getRecentSunsets, formatSunsetTime } from '../utils/sunsetUtils';
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
    <div className="bg-gradient-to-br from-white to-slate-50 border border-orange-200 shadow-md rounded-2xl p-4 text-center hover:shadow-xl hover:shadow-orange-300/30 transition-all duration-300 hover:scale-105 hover:border-orange-300 group">
      <h4 className="font-semibold text-gray-900 mb-1 text-base group-hover:text-orange-700 transition-colors duration-300">{city.name}</h4>
      <p className="text-gray-500 text-xs mb-3">{city.country}</p>
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl px-3 py-2 inline-block text-sm font-mono font-bold text-orange-800 group-hover:from-orange-300 group-hover:to-amber-300 transition-all duration-300">
        {isClient ? timeRemaining : '--:--'}
      </div>
    </div>
  );
};

const RecentSunsetCard = ({ city }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 border border-purple-200 shadow-md rounded-2xl p-4 text-center hover:shadow-xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105 hover:border-purple-300 group">
      <h4 className="font-semibold text-purple-900 mb-1 text-base group-hover:text-purple-700 transition-colors duration-300">{city.name}</h4>
      <p className="text-purple-600 text-xs mb-2">{city.country}</p>
      <div className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl px-3 py-2 inline-block text-sm font-mono font-bold text-purple-800 mb-2 group-hover:from-purple-300 group-hover:to-indigo-300 transition-all duration-300">
        {formatSunsetTime(city.sunsetTime)}
      </div>
      <p className="text-xs text-purple-500 flex items-center justify-center gap-1">
        <span>🕒</span> {city.timeAgo}
      </p>
    </div>
  );
};

const SunsetList = () => {
  const [upcomingSunsets, setUpcomingSunsets] = useState([]);
  const [recentSunsets, setRecentSunsets] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [cityPhotographer, setCityPhotographer] = useState(null);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const updateSunsets = () => {
    const now = new Date();
    const sunsets = getSunsetsInNext30Minutes(cities);
    setUpcomingSunsets(sunsets);
    
    // Se não há sunsets próximos, buscar os recentes
    if (sunsets.length === 0) {
      const recent = getRecentSunsets(cities);
      setRecentSunsets(recent);
    } else {
      setRecentSunsets([]);
    }
    
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

  const handleImageClick = () => {
    if (!imageExpanded) {
      setImageExpanded(true);
      setImageLoaded(false);
      setIsClosing(false);
      // Prevenir scroll do body
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseExpanded = () => {
    setIsClosing(true);
    
    // Aguardar a animação antes de fechar
    setTimeout(() => {
      setImageExpanded(false);
      setImageLoaded(false);
      setIsClosing(false);
      // Restaurar scroll do body
      document.body.style.overflow = 'unset';
    }, 400); // Tempo da animação
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCloseExpanded();
      }
    };
    
    if (imageExpanded) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [imageExpanded]);

  if (!isClient) return null;

  const mainSunset = upcomingSunsets[0];
  const additionalSunsets = upcomingSunsets.slice(1);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero Section - Dinâmico */}
          <div className="text-center mb-12">
            {upcomingSunsets.length > 0 ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-orange-600">Golden Hour <span className="text-red-500">Alert!</span></h1>
                <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                  Discover the most beautiful sunsets happening around the world in the next 30 minutes.
                </p>
              </>
            ) : (
              <div className="py-16">
                <div className="text-7xl mb-6">🌙</div>
                <h1 className="text-4xl md:text-4xl font-bold text-orange-600 mb-4">No sunsets in the next 30 minutes</h1>
                <p className="text-gray-600 text-lg">Check back soon for the next golden hour!</p>
              </div>
            )}
          </div>

          {upcomingSunsets.length > 0 && (
            <div className="space-y-12">
              <div className="text-center">
                <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
                  {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'sunset found' : 'sunsets found'}
                </span>
              </div>

              {/* Main Sunset */}
              {mainSunset && (
                <div className="mb-8">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <SunsetCard city={mainSunset} onExpired={handleSunsetExpired} />
                    </div>

                    {cityImage && (
                      <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-orange-300/40 h-64 lg:h-auto cursor-pointer group border-2 border-orange-200">
                        <div
                          className="relative h-full"
                          onClick={handleImageClick}
                        >
                          <img
                            src={cityImage}
                            alt={mainSunset.name}
                            className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
                          />
                          
                          {/* Overlay de hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent group-hover:from-orange-600/40 transition-all duration-300 ease-in-out"></div>
                          
                          {/* Indicador de clique */}
                          <div className="absolute top-4 right-4 bg-orange-500 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out shadow-lg">
                            <svg 
                              className="w-4 h-4 text-white" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs p-2 text-center">
                            📸 {cityPhotographer} / Pexels
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Modal da imagem expandida */}
              {imageExpanded && cityImage && (
                <div 
                  className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black transition-all duration-500 ease-out ${
                    isClosing ? 'bg-opacity-0' : 'bg-opacity-90'
                  }`}
                  onClick={handleCloseExpanded}
                >
                  <div 
                    className={`relative max-w-6xl max-h-[90vh] w-full transform transition-all duration-500 ease-out ${
                      isClosing 
                        ? 'scale-95 opacity-0 translate-y-4' 
                        : imageLoaded 
                          ? 'scale-100 opacity-100 translate-y-0' 
                          : 'scale-95 opacity-0 translate-y-4'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Imagem expandida */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={cityImage}
                        alt={mainSunset.name}
                        className="w-full h-auto max-h-[80vh] object-contain"
                        onLoad={handleImageLoad}
                      />
                      
                      {/* Botão fechar - DENTRO da imagem */}
                      <button
                        onClick={handleCloseExpanded}
                        className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 group ${
                          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
                        }`}
                      >
                        <svg 
                          className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      {/* Informações do fotógrafo */}
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-6 transition-all duration-300 ease-out ${
                        isClosing ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-lg flex items-center gap-2">
                              📸 {cityPhotographer}
                            </p>
                            <p className="text-sm opacity-80">via Pexels • {mainSunset.name}</p>
                          </div>
                          <div className="text-right text-sm opacity-70">
                            <p>Press ESC to close</p>
                          </div>
                        </div>
                      </div>

                      {/* Loading spinner */}
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Sunsets */}
              {additionalSunsets.length > 0 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-orange-700">Other Upcoming Sunsets</h3>
                    <p className="text-gray-600 text-sm">Don't miss these beautiful moments</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {additionalSunsets.map((city) => (
                      <MiniSunsetCard key={city.name} city={city} onExpired={handleSunsetExpired} />
                    ))}
                  </div>
                </div>
              )}

              {/* Last Updated */}
              <div className="text-center mt-16 ">
                <span className="text-xs text-gray-500">
                  Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
                </span>
              </div>
            </div>
          )}

          {/* Recent Sunsets - Mostrar quando não há sunsets próximos */}
          {upcomingSunsets.length === 0 && recentSunsets.length > 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Recent Sunsets</h2>
                <p className="text-purple-600">Here are the last 3 sunsets that happened around the world</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentSunsets.map((city, index) => (
                  <RecentSunsetCard key={`${city.name}-${index}`} city={city} />
                ))}
              </div>

              {/* Last Updated */}
              <div className="text-center mt-16">
                <span className="text-xs text-gray-500">
                  Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SunsetList;