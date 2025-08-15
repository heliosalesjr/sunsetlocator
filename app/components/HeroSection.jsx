// components/HeroSection.jsx
const HeroSection = ({ upcomingSunsets }) => {
  return (
    <div className="text-center mb-16 relative">
      {upcomingSunsets.length > 0 ? (
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="text-gradient-sunset">Golden Hour</span>
            <br />
            <span className="text-gradient-accent">Alert!</span>
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Discover the most breathtaking sunsets happening around the world 
            <span className="text-gradient-sunset font-semibold"> in the next 30 minutes</span>.
          </p>
        </div>
      ) : (
        <div className="py-20 relative">
          {/* Night mode styling */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-100 rounded-3xl opacity-60"></div>
          
          <div className="relative">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-semibold rounded-full border border-indigo-200/50">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                Sunset Watch
              </span>
            </div>

            <div className="text-8xl mb-8 animate-float">🌙</div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-slate-700 bg-clip-text text-transparent">
                No sunsets in the next 30 minutes
              </span>
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto font-medium">
              The golden hour has passed. Check back soon for the next magical sunset moment!
            </p>

            {/* Decorative stars */}
            <div className="absolute top-10 left-1/4 text-2xl opacity-40 animate-pulse">✨</div>
            <div className="absolute top-16 right-1/4 text-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
            <div className="absolute bottom-10 left-1/3 text-lg opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>💫</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;