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
    <div className="space-y-12">
      <div className="text-center">
        <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
          {upcomingSunsets.length} {upcomingSunsets.length === 1 ? 'sunset found' : 'sunsets found'}
        </span>
      </div>

      {/* Main Sunset */}
      {mainSunset && (
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 gap-6">
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
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-orange-700">Other Upcoming Sunsets</h3>
            <p className="text-gray-600 text-sm">Don't miss these beautiful moments</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSunsets.map((city) => (
              <MiniSunsetCard key={city.name} city={city} onExpired={onExpired} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingSunsetsSection;