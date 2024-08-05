import logo from './logo.svg';
import './App.css';
import React from 'react';
import Select from 'react-select';
import { allTimezones } from "react-timezone-select";

const options_ice = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

// Convert timezones object into an array of options for react-select
const timezoneOptions = Object.entries(allTimezones).map(([value, label]) => ({
  value,
  label,
}));

function App() {
  const MyComponent = ({ options, onChange }) => (
    <Select
      options={options}
      onChange={onChange}
      placeholder="Select an option"
    />
  );

  const handleTimezoneChange = (selectedOption) => {
    console.log(`Selected Timezone:`, selectedOption);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ice Cream</h1>
        <MyComponent options={options_ice} />

        <h2>Time Zones</h2>
        <MyComponent options={timezoneOptions} onChange={handleTimezoneChange} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
