import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TimerComponent = () => {
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          navigate('/redirect-url');
          clearInterval(timerRef.current);
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p>Timer: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
    </div>
  );
};

export default TimerComponent;