// Footer.jsx
"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100/50 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center">
          
          
          <p className="text-gray-600 text-sm">
            © {currentYear} Hélio Sales Jr. • Todos os direitos reservados.
          </p>
          
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;