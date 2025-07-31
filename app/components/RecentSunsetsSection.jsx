// components/RecentSunsetsSection.jsx
import RecentSunsetCard from './RecentSunsetCard';

const RecentSunsetsSection = ({ recentSunsets, upcomingSunsets }) => {
  if (upcomingSunsets.length > 0 || recentSunsets.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-600 mb-2">Recent Sunsets</h2>
        <p className="text-slate-600">Here are the last 3 sunsets that happened around the world</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentSunsets.map((city, index) => (
          <RecentSunsetCard key={`${city.name}-${index}`} city={city} />
        ))}
      </div>
    </div>
  );
};

export default RecentSunsetsSection;