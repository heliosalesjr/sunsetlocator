"use client" 
// components/SunsetCard.js
import { formatSunsetTime } from '../utils/sunsetUtils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const CountdownClient = dynamic(() => import('./Countdown'), {
  ssr: false,
  loading: () => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 inline-block">
      <div className="text-5xl font-mono font-bold text-white mb-2 tracking-wider">
        --:--:--
      </div>
      <div className="text-white/80 text-sm uppercase tracking-widest">
        Until Sunset
      </div>
    </div>
  )
});

const SunsetCard = ({ city, onExpired }) => {
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateProgress = () => {
      const now = new Date();
      const sunsetTime = city.sunsetTime;
      const thirtyMinutesAgo = new Date(sunsetTime.getTime() - 30 * 60 * 1000);
      
      // Calcula o progresso (0 a 100%)
      const totalDuration = sunsetTime.getTime() - thirtyMinutesAgo.getTime();
      const elapsed = now.getTime() - thirtyMinutesAgo.getTime();
      const progressPercent = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      
      setProgress(progressPercent);

      // Calcula tempo restante
      const diff = sunsetTime - now;
      if (diff <= 0) {
        setTimeRemaining('00:00');
        onExpired && onExpired(city);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [isClient, city.sunsetTime, onExpired]);

  return (
    <div className="relative overflow-hidden  shadow-2xl group">
      {/* Background Image with Overlay - será preenchida pela imagem externa */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-purple-600/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
            <p className="text-white/80 text-sm font-medium">{city.country}</p>
          </div>
          
          {/* Live Indicator */}
          <div className="backdrop-blur-md bg-red-500/90 rounded-full px-3 py-1 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
          </div>
        </div>

        {/* Countdown Center */}
        <div className="text-center flex-1 flex items-center justify-center">
          {isClient ? (
            <CountdownClient 
              targetTime={city.sunsetTime} 
              onExpired={() => onExpired && onExpired(city)}
            />
          ) : (
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 inline-block">
              <div className="text-5xl font-mono font-bold text-white mb-2 tracking-wider">
                --:--:--
              </div>
              <div className="text-white/80 text-sm uppercase tracking-widest">
                Until Sunset
              </div>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full h-2 bg-white/20 rounded-full backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Sun Icon */}
            <div className="absolute -right-2 -top-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
              <div className="text-sm">🌅</div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Sunset Time</div>
              <div className="text-white font-mono text-sm">
                {isClient ? formatSunsetTime(city.sunsetTime) : '--:--:--'}
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Coordinates</div>
              <div className="text-white font-mono text-sm">
                {city.lat.toFixed(2)}°, {city.lng.toFixed(2)}°
              </div>
            </div>
          </div>

          {city.timezone && (
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Timezone</div>
              <div className="text-white font-mono text-sm">{city.timezone}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SunsetCard;