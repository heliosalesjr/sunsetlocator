// components/CityImageCard.jsx
const CityImageCard = ({ cityImage, cityName, cityPhotographer, onImageClick }) => {
  if (!cityImage) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-orange-300/40 h-64 lg:h-auto cursor-pointer group border-2 border-orange-200">
      <div
        className="relative h-full"
        onClick={onImageClick}
      >
        <img
          src={cityImage}
          alt={cityName}
          className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
        />
        
        {/* Overlay de hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent group-hover:from-orange-600/40 transition-all duration-300 ease-in-out"></div>
        
        {/* Indicador de clique */}
        <div className="absolute top-4 right-4 bg-orange-500 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out shadow-lg">
          <svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs p-2 text-center">
          📸 {cityPhotographer} / Pexels
        </div>
      </div>
    </div>
  );
};

export default CityImageCard;