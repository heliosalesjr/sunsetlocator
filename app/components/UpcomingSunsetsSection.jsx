// components/UpcomingSunsetsSection.jsx
import SunsetCard from './SunsetCard';
import CityImageCard from './CityImageCard';
import MiniSunsetCard from './MiniSunsetCard';

const UpcomingSunsetsSection = ({ 
  upcomingSunsets, 
  cityImage, 
  cityPhotographer, 
  onExpired, 
  onImageClick 
}) => {
  if (upcomingSunsets.length === 0) return null;

  const mainSunset = upcomingSunsets[0];
  const additionalSunsets = upcomingSunsets.slice(1);

  return (
    <div className="space-y-8">
      {/* Status Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 border border-orange-200/50 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-lg font-bold text-slate-800">
              {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'sunset found' : 'sunsets found'}
            </span>
          </div>
          <div className="w-px h-6 bg-orange-300"></div>
          <span className="text-sm text-slate-600 font-medium">Live tracking active</span>
        </div>
      </div>

      {/* Main Sunset */}
      {mainSunset && (
        <div className="mb-12">
          <div className="text-center mb-8">
            
            <p className="text-slate-600 font-medium">The closest golden hour to begin:</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SunsetCard city={mainSunset} onExpired={onExpired} />
            </div>

            <CityImageCard 
              cityImage={cityImage}
              cityName={mainSunset.name}
              cityPhotographer={cityPhotographer}
              onImageClick={onImageClick}
            />
          </div>
        </div>
      )}

      {/* Additional Sunsets */}
      {additionalSunsets.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-block rounded-2xl px-6 py-4 border border-orange-100/50 mb-4">
              <h3 className="text-2xl font-display font-bold text-slate-600 mb-1">
                Other Upcoming Sunsets
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                Don't miss these magical moments around the world
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSunsets.map((city, index) => (
              <div 
                key={city.name} 
                className="animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <MiniSunsetCard city={city} onExpired={onExpired} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingSunsetsSection;