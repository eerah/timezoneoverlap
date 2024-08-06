import React, { useState, useEffect } from 'react';
import SelectComponent from './SelectComponent';
import { allTimezones } from 'react-timezone-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const timezoneOptions = Object.entries(allTimezones).map(([value, label]) => {
  const date = new Date();
  const localOptions = { timeZone: value, timeZoneName: 'short' };
  const gmtOffset = date.toLocaleString('en-US', localOptions).split(' ').pop();

  return {
    value,
    label: `${label} (${gmtOffset})`,
  };
});

const customSelectStyle = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '20vh',
  }),
};

function App() {
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [currentGMT, setCurrentGMT] = useState('');
  const [localGMT, setLocalGMT] = useState('');

  useEffect(() => {
    const updateGMT = () => {
      const now = new Date();
      setCurrentGMT(now.toLocaleString());

      // Get local GMT offset
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const options = { timeZone: localTimezone, timeZoneName: 'short' };
      const gmtOffset = now.toLocaleString('en-US', options).split(' ').pop();
      setLocalGMT(gmtOffset); // Set local GMT offset
    };

    updateGMT();
    const interval = setInterval(updateGMT, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTimezoneOption = timezoneOptions.find(option => option.value === localTimezone);

    if (localTimezoneOption) {
      setSelectedTimezones([localTimezoneOption]);
    }
  }, []);

  const handleTimezoneChange = (selectedOption) => {
    if (selectedOption && !selectedTimezones.find(tz => tz.value === selectedOption.value)) {
      setSelectedTimezones([...selectedTimezones, selectedOption]);
    }
  };

  const removeTimezone = (value) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.value !== value));
  };

  // Function to generate local time based on timezone
  const generateLocalTime = (timezone) => {
    const localTimes = [];
    const date = new Date();
    for (let hour = 0; hour < 24; hour++) {
      const localDate = new Date(date.setUTCHours(hour));
      const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false };
      localTimes.push(localDate.toLocaleString('en-GB', options).split(':')[0]); // Get only the hour
    }
    return localTimes;
  };

  return (
    <div className="App container-fluid">
      <header className="App-header">
        <h2 className="mb-4">Time Zones</h2>
        <div className="mb-4">
          <SelectComponent
            options={timezoneOptions}
            onChange={handleTimezoneChange}
            placeholder="Select a timezone"
            styles={customSelectStyle}
          />
        </div>

        <div className="mb-4">
          <h3>Current GMT Time:</h3>
          <p className="current-time">{currentGMT}</p>
        </div>

        <div className="mb-4">
          <h4 className="mb-3">Selected Time Zones:</h4>
          <div className="timezone-boxes">
            {selectedTimezones.map((timezone) => (
              <div key={timezone.value} className="timezone-box">
                <span>{timezone.label.split(' (')[0]}</span>
                <button onClick={() => removeTimezone(timezone.value)} className="close-button">X</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
         {selectedTimezones.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>GMT+0</th> {/* Replace "GMT 0" with user's local GMT */}
                  {Array.from({ length: 24 }, (_, hour) => (
                    <th key={hour}>{hour.toString().padStart(2, '0')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedTimezones.map((timezone) => (
                  <tr key={timezone.value}>
                    <td>{timezone.label.split(' (')[0]}</td>
                    {generateLocalTime(timezone.value).map((localTime, index) => {
                      const hourValue = parseInt(localTime.split(':')[0], 10);
                      const cellClass = (hourValue >= 9 && hourValue <= 17) ? 'highlight' : '';
                      return (
                        <td key={index} className={cellClass}>{localTime}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>GMT+0</th> {/* Replace "GMT 0" with user's local GMT */}
                  {Array.from({ length: 24 }, (_, hour) => (
                    <th key={hour}>{hour.toString().padStart(2, '0')}</th>
                  ))}                </tr>
              </thead>
            </table>
          )}
        </div>

        <div className="Timezone-container">
          <div className="Timezone-list">
            <h4 className="mb-3">Available Time Zones</h4>
            <ul className="list-unstyled">
              {timezoneOptions.map(option => (
                <li key={option.value} className="py-1">{option.label}</li>
              ))}
            </ul>
          </div>
          <div className="Timezone-img">
            <InnerImageZoom
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/World_Time_Zones_Map_1.png"
              alt="Earth"
              moveType="drag"
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
