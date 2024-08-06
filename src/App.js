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
    label: `${label} (${gmtOffset})`,
  };
});

const customSelectStyle = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '20vh',
  })
}

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState(null);
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
    setSelectedTimezone(selectedOption);
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
          <ClockComponent timezone={selectedTimezone} />
        </div>

        <div className="mb-4">
          <h3>Current GMT Time:</h3>
          <p>{currentGMT}</p>
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
