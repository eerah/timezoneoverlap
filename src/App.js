import React, { useState } from 'react';
import SelectComponent from './SelectComponent';
import ClockComponent from './ClockComponent';
import { allTimezones } from 'react-timezone-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const timezoneOptions = Object.entries(allTimezones).map(([value, label]) => ({
  value,
  label,
}));

const customSelectStyle = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '20vh',
  })
}

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState(null);

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

        <h3 className="mb-3">Available Time Zones:</h3>
        <div className="Timezone-container">
          <div className="Timezone-list">
            <ul className="list-unstyled">
              {timezoneOptions.map(option => (
                <li key={option.value} className="py-1">{option.label}</li>
              ))}
            </ul>
          </div>
          <div className="Timezone-img">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/World_Time_Zones_Map_1.png"
              alt="Earth"
              className="img-fluid"
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
