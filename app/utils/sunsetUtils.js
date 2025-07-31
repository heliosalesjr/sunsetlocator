import SunCalc from 'suncalc';
import { formatDistanceToNow, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const getSunsetTime = (lat, lng, date = new Date()) => {
  const times = SunCalc.getTimes(date, lat, lng);
  return times.sunset;
};

export const getSunsetsInNext30Minutes = (cities, currentTime = null) => {
  const now = currentTime || new Date();
  const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
  
  return cities
    .map(city => {
      const sunsetTime = getSunsetTime(city.lat, city.lng);
      return {
        ...city,
        sunsetTime,
        minutesUntilSunset: Math.round((sunsetTime - now) / (1000 * 60))
      };
    })
    .filter(city => {
      return city.sunsetTime >= now && city.sunsetTime <= thirtyMinutesFromNow;
    })
    .sort((a, b) => a.sunsetTime - b.sunsetTime);
};

export const getRecentSunsets = (cities, currentTime = null) => {
  const now = currentTime || new Date();
  
  return cities
    .map(city => {
      const sunsetTime = getSunsetTime(city.lat, city.lng);
      return {
        ...city,
        sunsetTime,
        timeAgo: formatDistanceToNow(sunsetTime, { addSuffix: true, locale: enUS })
      };
    })
    .filter(city => city.sunsetTime < now) // Apenas sunsets que já aconteceram
    .sort((a, b) => b.sunsetTime - a.sunsetTime) // Ordenar do mais recente para o mais antigo
    .slice(0, 3); // Pegar apenas os 3 mais recentes
};

export const formatTimeRemaining = (targetTime, currentTime = null) => {
  const now = currentTime || new Date();
  const diff = targetTime - now;
  
  if (diff <= 0) return 'Sunset already happened';
  
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export const formatSunsetTime = (date) => {
  return format(date, 'HH:mm:ss', { locale: enUS });
};

export const getLocalTimeString = (date) => {
  return format(date, "MM/dd/yyyy 'at' HH:mm:ss", { locale: enUS });
};

export const getSunsetTimeFormatted = (lat, lng, date = new Date()) => {
  const sunsetTime = getSunsetTime(lat, lng, date);
  return {
    time: sunsetTime,
    formatted: formatSunsetTime(sunsetTime)
  };
};