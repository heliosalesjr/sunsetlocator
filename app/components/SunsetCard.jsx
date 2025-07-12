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
    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{city.name}</h2>
          <p className="text-gray-500 text-sm">{city.country}</p>
        </div>
        <div className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">LIVE</div>
      </div>

      {/* Countdown - Bem maior e centralizado */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 mb-8">
        <div style={{ fontSize: '80px', fontWeight: 'bold', fontFamily: 'monospace', color: '#1f2937', lineHeight: '1' }}>
          {isClient ? (
            <CountdownClient targetTime={city.sunsetTime} onExpired={() => onExpired && onExpired(city)} />
          ) : (
            '--:--:--'
          )}
        </div>
        <p className="text-lg text-gray-400 uppercase tracking-widest mt-6">Until Sunset</p>
      </div>

      {/* Info - Tudo na mesma linha */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 uppercase">Sunset Time</p>
            <p className="text-sm font-mono text-gray-800">{formatSunsetTime(city.sunsetTime)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Coordinates</p>
            <p className="text-sm font-mono text-gray-800">
              {city.lat.toFixed(2)}°, {city.lng.toFixed(2)}°
            </p>
          </div>
          {city.timezone && (
            <div>
              <p className="text-xs text-gray-500 uppercase">Timezone</p>
              <p className="text-sm font-mono text-gray-800">{city.timezone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress - Barra mais grossa */}
      <div className="w-full h-4 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 rounded-r-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SunsetCard;