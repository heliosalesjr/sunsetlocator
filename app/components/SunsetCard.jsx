"use client" 
// components/SunsetCard.js
import { formatSunsetTime } from '../utils/sunsetUtils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const CountdownClient = dynamic(() => import('./Countdown'), {
  ssr: false,
  loading: () => (
    <span className="font-mono text-lg font-bold text-orange-600">
      --:--:--
    </span>
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
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 shadow-lg text-white mb-4 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold">{city.name}</h3>
          <p className="text-orange-100 text-sm">{city.country}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-orange-100">Sunset in:</div>
          {isClient ? (
            <CountdownClient 
              targetTime={city.sunsetTime} 
              onExpired={() => onExpired && onExpired(city)}
            />
          ) : (
            <span className="font-mono text-lg font-bold text-orange-600">
              --:--:--
            </span>
          )}
        </div>
      </div>
      
      <div className="border-t border-orange-300 pt-3 mt-3">
        <div className="flex justify-between text-sm">
          <span>Sunset time:</span>
          <span className="font-mono">
            {isClient ? formatSunsetTime(city.sunsetTime) : '--:--:--'}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Coordinates:</span>
          <span className="font-mono">{city.lat.toFixed(2)}°, {city.lng.toFixed(2)}°</span>
        </div>
        {city.timezone && (
          <div className="flex justify-between text-sm mt-1">
            <span>Timezone:</span>
            <span className="font-mono">{city.timezone}</span>
          </div>
        )}
      </div>
      
      {/* Barra de Progresso Elegante */}
      <div className="mt-4 space-y-3">
        <div className="relative">
          {/* Barra de fundo */}
          <div className="w-full h-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
            {/* Barra de progresso com gradiente animado */}
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* Ícone do sol na ponta direita */}
          <div className="absolute -right-1 -top-2 w-7 h-7 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
            <div className="text-xs">🌅</div>
            {/* Raios do sol */}
            <div className="absolute inset-0">
              <div className="absolute -top-2 left-1/2 w-0.5 h-1.5 bg-yellow-300 transform -translate-x-1/2 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 w-0.5 h-1.5 bg-yellow-300 transform -translate-x-1/2 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 w-1.5 h-0.5 bg-yellow-300 transform -translate-y-1/2 rounded-full"></div>
              <div className="absolute -right-2 top-1/2 w-1.5 h-0.5 bg-yellow-300 transform -translate-y-1/2 rounded-full"></div>
            </div>
          </div>
          
          {/* Countdown no canto esquerdo e label no direito */}
          <div className="flex justify-between items-center mt-2">
            {/* Countdown no canto esquerdo */}
            <div className="inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold tracking-wider">
                  {isClient ? timeRemaining : '--:--'}
                </span>
              </div>
            </div>
            
            {/* Label sunset no canto direito */}
            <span className="text-xs text-orange-100">Sunset</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunsetCard;