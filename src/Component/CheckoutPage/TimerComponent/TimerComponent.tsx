import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const TimerDisplay = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.8rem',
    color: 'white',
    backgroundColor: '#9794b7',
    padding: '8px',
    justifyContent: 'center',
});

const TimerIcon = styled(AccessAlarmIcon)({
    fontSize: '2.0rem',
    color: 'white',
});

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(600);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        let startTime = storedStartTime ? parseInt(storedStartTime) : Date.now();
        const remainingTime = 600 - ((Date.now() - startTime) / 1000);
        setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        
        const timerId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 0) {
                    clearInterval(timerId);
                    localStorage.removeItem('startTime');
                    // Use navigate('/') to navigate to '/'
                    navigate('/');
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        if (!storedStartTime) {
            localStorage.setItem('startTime', startTime.toString());
        }

        return () => clearInterval(timerId);
    }, [navigate]); // Add navigate to dependencies array to avoid warning

    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    return (
        <TimerDisplay>
            <TimerIcon />
            {minutes} Minutes {seconds} Seconds left!
        </TimerDisplay>
    );
};

export default CountdownTimer;

