// SunsetList.jsx - Refatorado
"use client";

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import UpcomingSunsetsSection from './UpcomingSunsetsSection';
import RecentSunsetsSection from './RecentSunsetsSection';
import ImageModal from './ImageModal';
import useImageModal from '../hooks/useImageModal';
import { getSunsetsInNext30Minutes, getRecentSunsets } from '../utils/sunsetUtils';
import { cities } from '../utils/cities';

const SunsetList = () => {
  const [upcomingSunsets, setUpcomingSunsets] = useState([]);
  const [recentSunsets, setRecentSunsets] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [cityPhotographer, setCityPhotographer] = useState(null);

  const {
    imageExpanded,
    imageLoaded,
    isClosing,
    handleImageClick,
    handleCloseExpanded,
    handleImageLoad,
  } = useImageModal();

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

  if (!isClient) return null;

  const mainSunset = upcomingSunsets[0];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-5xl mx-auto px-6">
          
          <HeroSection upcomingSunsets={upcomingSunsets} />

          <UpcomingSunsetsSection 
            upcomingSunsets={upcomingSunsets}
            cityImage={cityImage}
            cityPhotographer={cityPhotographer}
            onExpired={handleSunsetExpired}
            onImageClick={handleImageClick}
          />

          <ImageModal
            isOpen={imageExpanded}
            cityImage={cityImage}
            cityName={mainSunset?.name}
            cityPhotographer={cityPhotographer}
            imageLoaded={imageLoaded}
            isClosing={isClosing}
            onClose={handleCloseExpanded}
            onImageLoad={handleImageLoad}
          />

          <RecentSunsetsSection 
            recentSunsets={recentSunsets}
            upcomingSunsets={upcomingSunsets}
          />

          {/* Last Updated */}
          {(upcomingSunsets.length > 0 || recentSunsets.length > 0) && (
            <div className="text-center mt-16">
              <span className="text-xs text-gray-500">
                Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR') : '--:--:--'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SunsetList;