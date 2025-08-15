// components/ImageModal.jsx
import { useEffect } from 'react';

const ImageModal = ({ 
  isOpen, 
  cityImage, 
  cityName, 
  cityPhotographer, 
  imageLoaded, 
  isClosing, 
  onClose, 
  onImageLoad 
}) => {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevenir scroll do body
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Restaurar scroll do body
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !cityImage) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 transition-all duration-500 ease-out ${
        isClosing ? 'bg-opacity-0' : 'bg-opacity-90'
      }`}
      onClick={onClose}
    >
      <div 
        className={`relative max-w-6xl max-h-[90vh] w-full transform transition-all duration-500 ease-out ${
          isClosing 
            ? 'scale-95 opacity-0 translate-y-4' 
            : imageLoaded 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem expandida */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={cityImage}
            alt={cityName}
            className="w-full h-auto max-h-[80vh] object-contain"
            onLoad={onImageLoad}
          />
          
          {/* Botão fechar - DENTRO da imagem */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 group ${
              isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <svg 
              className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Informações do fotógrafo */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-6 transition-all duration-300 ease-out ${
            isClosing ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg flex items-center gap-2">
                  📸 {cityPhotographer}
                </p>
                <p className="text-sm opacity-80">via Pexels • {cityName}</p>
              </div>
              
            </div>
          </div>

          {/* Loading spinner */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;