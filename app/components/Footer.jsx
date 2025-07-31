// Footer.jsx
"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100/50 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} <a href="https://www.linkedin.com/in/helio-sales-jr/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors duration-300 underline">Hélio Sales Jr</a> • All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;