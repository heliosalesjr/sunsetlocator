// components/RecentSunsetCard.jsx
import { formatSunsetTime } from '../utils/sunsetUtils';

const RecentSunsetCard = ({ city }) => {
  return (
    <div className="bg-white/50 shadow-md rounded-2xl p-4 text-center hover:shadow-xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105 hover:border-purple-300 group">
      <h4 className="font-semibold text-purple-900 mb-1 text-base group-hover:text-purple-700 transition-colors duration-300">{city.name}</h4>
      <p className="text-purple-900 text-xs mb-2">{city.country}</p>
      <div className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl px-3 py-2 inline-block text-sm font-mono font-bold text-purple-800 mb-2 group-hover:from-purple-300 group-hover:to-indigo-300 transition-all duration-300">
        {formatSunsetTime(city.sunsetTime)}
      </div>
      <p className="text-xs text-purple-500 flex items-center justify-center gap-1">
        <span>🕒</span> {city.timeAgo}
      </p>
    </div>
  );
};

export default RecentSunsetCard;