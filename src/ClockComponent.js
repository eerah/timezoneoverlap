import React, { useState, useEffect } from 'react';

const ClockComponent = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      if (timezone) {
        const date = new Date();
        const options = {
          timeZone: timezone.value,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        setCurrentTime(date.toLocaleTimeString('en-US', options));
      }
    };

    updateCurrentTime(); // Update time immediately when timezone changes
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timezone]);

  return (
    <div>
      {timezone && (
        <>
          <h3>Current Time in {timezone.label}:</h3>
          <p>{currentTime}</p>
        </>
      )}
    </div>
  );
};

export default ClockComponent;
