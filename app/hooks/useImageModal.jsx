// hooks/useImageModal.js
import { useState } from 'react';

const useImageModal = () => {
  const [imageExpanded, setImageExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleImageClick = () => {
    if (!imageExpanded) {
      setImageExpanded(true);
      setImageLoaded(false);
      setIsClosing(false);
    }
  };

  const handleCloseExpanded = () => {
    setIsClosing(true);
    
    // Aguardar a animação antes de fechar
    setTimeout(() => {
      setImageExpanded(false);
      setImageLoaded(false);
      setIsClosing(false);
    }, 400); // Tempo da animação
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return {
    imageExpanded,
    imageLoaded,
    isClosing,
    handleImageClick,
    handleCloseExpanded,
    handleImageLoad,
  };
};

export default useImageModal;