// components/HeroSection.jsx
const HeroSection = ({ upcomingSunsets }) => {
  return (
    <div className="text-center mb-12">
      {upcomingSunsets.length > 0 ? (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600">
            Golden Hour <span className="text-red-500">Alert!</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Discover the most beautiful sunsets happening around the world in the next 30 minutes.
          </p>
        </>
      ) : (
        <div className="py-16">
          <div className="text-7xl mb-6">🌙</div>
          <h1 className="text-4xl md:text-4xl font-bold text-orange-600 mb-4">
            No sunsets in the next 30 minutes
          </h1>
          <p className="text-gray-600 text-lg">Check back soon for the next golden hour!</p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;