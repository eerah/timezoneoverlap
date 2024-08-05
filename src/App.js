import logo from './logo.svg';
import './App.css';
import React from 'react';
import Select from "react-select";
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

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#3c3836', // Background color
    borderColor: '#ccc', // Border color
    '&:hover': {
      backgroundColor:'#77767b',
      borderColor: '#77767b', // Border color on hover
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#77767b' : '#3c3836', // Background color on hover
    color: '#ebd89e', // Text color
    '&:active': {
      backgroundColor: '#d0d0d0', // Background color when active
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f89d28', // Text color for selected value
  }),
};


function App() {

  const MyComponent = ({ options, onChange }) => (
    <Select
      className="custom-select"
      options={options}
      onChange={onChange}
      placeholder="Select an option"
      styles={customStyles}
    />
  );

  const handleTimezoneChange = (selectedOption) => {
    // Todo change the handle on to do something nice
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
