// SunsetCard.jsx
"use client";
import { useState, useEffect } from 'react';
import { formatSunsetTime } from '../utils/sunsetUtils';
import dynamic from 'next/dynamic';

const CountdownClient = dynamic(() => import('./Countdown'), { ssr: false });

const SunsetCard = ({ city, onExpired }) => {
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;

    const updateProgress = () => {
      const now = new Date();
      const sunset = city.sunsetTime;
      const start = new Date(sunset.getTime() - 30 * 60 * 1000);
      const elapsed = now.getTime() - start.getTime();
      const total = sunset.getTime() - start.getTime();
      setProgress(Math.max(0, Math.min(100, (elapsed / total) * 100)));

      if (sunset - now <= 0) {
        onExpired && onExpired(city);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isClient, city.sunsetTime]);

  return (
    <div className="relative glass rounded-3xl shadow-sunset overflow-hidden min-h-[420px] flex flex-col group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-orange-100/50">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-rose-50/50 opacity-60"></div>
      
      {/* Header */}
      <div className="relative p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-display">{city.name}</h2>
          <p className="text-slate-600 text-sm font-medium">{city.country}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse-soft">
          ✨ LIVE NOW
        </div>
      </div>

      {/* Countdown - Destaque principal */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-8 mb-8">
        <div className="relative">
          <div className="text-5xl md:text-6xl font-bold font-mono text-gradient-sunset leading-none tracking-tight">
            {isClient ? (
              <CountdownClient targetTime={city.sunsetTime} onExpired={() => onExpired && onExpired(city)} />
            ) : (
              '--:--:--'
            )}
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 text-5xl md:text-6xl font-bold font-mono text-orange-400 opacity-20 blur-sm">
            {isClient ? (
              <CountdownClient targetTime={city.sunsetTime} onExpired={() => onExpired && onExpired(city)} />
            ) : (
              '--:--:--'
            )}
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <p className="text-lg text-slate-600 uppercase tracking-[0.2em] font-semibold">Until Sunset</p>
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Info Grid - Mais elegante */}
      <div className="relative px-6 pb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100/50">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Sunset Time</p>
            <p className="text-sm font-mono font-bold text-slate-800">{formatSunsetTime(city.sunsetTime)}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100/50">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Coordinates</p>
            <p className="text-sm font-mono font-bold text-slate-800">
              {city.lat.toFixed(2)}°, {city.lng.toFixed(2)}°
            </p>
          </div>
          {city.timezone && (
            <div className="text-center p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100/50">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Timezone</p>
              <p className="text-sm font-mono font-bold text-slate-800">{city.timezone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar - Mais dramática */}
      <div className="relative w-full h-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 via-rose-500 to-purple-600 transition-all duration-1000 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
        
        {/* Progress glow */}
        <div
          className="absolute top-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 opacity-50 blur-sm transition-all duration-1000"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SunsetCard;