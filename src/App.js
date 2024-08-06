import React, { useState, useEffect } from 'react';
import SelectComponent from './SelectComponent';
import ClockComponent from './ClockComponent';
import { allTimezones } from 'react-timezone-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'; // Import the styles

const timezoneOptions = Object.entries(allTimezones).map(([value, label]) => {
  const date = new Date();
  const localOptions = { timeZone: value, timeZoneName: 'short' };
  const gmtOffset = date.toLocaleString('en-US', localOptions).split(' ').pop();

  return {
    value,
    label: `${label} (${gmtOffset})`, // Keep GMT offset in the available options
  };
});

const customSelectStyle = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '20vh',
  })
}

function App() {
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [currentGMT, setCurrentGMT] = useState('');

  useEffect(() => {
    const updateGMT = () => {
      const now = new Date();
      setCurrentGMT(now.toGMTString());
    };

    updateGMT();
    const interval = setInterval(updateGMT, 1000);

    return () => clearInterval(interval);
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
      localTimes.push(localDate.toLocaleString('en-US', options).split(':')[0]); // Get only the hour
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
                <span>{timezone.label.split(' (')[0]}</span> {/* Display only the label without GMT */}
                <button onClick={() => removeTimezone(timezone.value)} className="close-button">X</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-3">Local Time Table</h4>
          {selectedTimezones.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Local Time</th>
                  {Array.from({ length: 24 }, (_, hour) => (
                    <th key={hour}>{hour.toString().padStart(2, '0')}</th> // Display hours 00 to 23
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedTimezones.map((timezone) => (
                  <tr key={timezone.value}>
                    <td>{timezone.label.split(' (')[0]}</td> {/* Display timezone name */}
                    {generateLocalTime(timezone.value).map((localTime, index) => (
                      <td key={index}>{localTime}</td> // Display local time for each hour
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Please select time zones to display the local time table.</p>
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
