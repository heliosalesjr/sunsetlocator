"use client"

// components/Countdown.js
import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '../utils/sunsetUtils';

const Countdown = ({ targetTime, onExpired }) => {
  const [timeRemaining, setTimeRemaining] = useState('Loading...');

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = formatTimeRemaining(targetTime);
      setTimeRemaining(remaining);
      
      if (targetTime <= new Date() && onExpired) {
        onExpired();
      }
    };

    // Atualiza imediatamente
    updateCountdown();
    
    // Depois configura o intervalo
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onExpired]);

  return (
    <span className="font-mono text-inherit font-bold tracking-tight">
      {timeRemaining}
    </span>
  );
};

export default Countdown;