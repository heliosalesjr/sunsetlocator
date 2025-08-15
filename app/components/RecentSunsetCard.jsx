// components/RecentSunsetCard.jsx
import { formatSunsetTime } from '../utils/sunsetUtils';

const RecentSunsetCard = ({ city }) => {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 hover:scale-105 border border-purple-100/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-indigo-50/40 to-slate-50/60 group-hover:from-purple-100/60 group-hover:via-indigo-100/40 group-hover:to-slate-100/60 transition-all duration-500"></div>
      
      <div className="relative p-5 text-center">
        {/* Header */}
        <div className="mb-4">
          <h4 className="font-bold text-slate-800 text-lg font-display group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{city.name}</h4>
          <p className="text-slate-600 text-sm font-medium">{city.country}</p>
        </div>

        {/* Time Display */}
        <div className="mb-4">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl px-4 py-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <div className="text-lg font-mono font-bold text-white tracking-wider">
              {formatSunsetTime(city.sunsetTime)}
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 font-medium">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>{city.timeAgo}</span>
        </div>

        {/* Past sunset icon */}
        <div className="absolute top-3 right-3 text-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          🌆
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default RecentSunsetCard;