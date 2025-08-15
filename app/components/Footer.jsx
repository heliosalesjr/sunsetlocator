// Footer.jsx
"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-8"></div>
      
      <div className="glass-dark rounded-3xl mx-6 mb-8 border border-white/10">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="text-center">
            {/* Logo section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gradient-sunset font-display mb-2">
                SunsetTracker
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Chasing golden hours around the world, one sunset at a time.
              </p>
            </div>

            {/* Divider */}
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-6"></div>

            {/* Copyright */}
            <p className="text-slate-600 text-sm font-medium">
              © {currentYear} • Made with 
              <span className="text-red-500 mx-1 animate-pulse">♥</span> 
              by{' '}
              <a 
                href="https://www.linkedin.com/in/helio-sales-jr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gradient-sunset font-semibold hover:text-orange-600 transition-all duration-300 relative group"
              >
                Hélio Sales Jr
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </p>

            {/* Tech stack hint */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Next.js
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Tailwind CSS
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Sunset API
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;