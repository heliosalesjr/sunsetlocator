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
    <div className="bg-gradient-to-br from-white to-slate-50 border border-orange-200 shadow-md rounded-2xl p-4 text-center hover:shadow-xl hover:shadow-orange-300/30 transition-all duration-300 hover:scale-105 hover:border-orange-300 group">
      <h4 className="font-semibold text-gray-900 mb-1 text-base group-hover:text-orange-700 transition-colors duration-300">{city.name}</h4>
      <p className="text-gray-500 text-xs mb-3">{city.country}</p>
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl px-3 py-2 inline-block text-sm font-mono font-bold text-orange-800 group-hover:from-orange-300 group-hover:to-amber-300 transition-all duration-300">
        {isClient ? timeRemaining : '--:--'}
      </div>
    </div>
  );
};

export default MiniSunsetCard;