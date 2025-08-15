// components/MiniSunsetCard.jsx
import { useState, useEffect } from 'react';

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
    <div className="group relative glass rounded-2xl overflow-hidden hover:shadow-sunset transition-all duration-500 hover:scale-105 border border-orange-100/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-rose-50/60 group-hover:from-orange-100/60 group-hover:via-amber-100/40 group-hover:to-rose-100/60 transition-all duration-500"></div>
      
      <div className="relative p-5 text-center">
        {/* Header */}
        <div className="mb-4">
          <h4 className="font-bold text-slate-800 text-lg font-display group-hover:text-gradient-sunset transition-all duration-300">{city.name}</h4>
          <p className="text-slate-600 text-sm font-medium">{city.country}</p>
        </div>

        {/* Countdown Display */}
        <div className="mb-4">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl px-4 py-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <div className="text-2xl font-mono font-bold text-white tracking-wider">
              {isClient ? timeRemaining : '--:--'}
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 font-medium">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span>minutes left</span>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default MiniSunsetCard;