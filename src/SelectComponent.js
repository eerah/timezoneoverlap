import React from 'react';
import Select from 'react-select';
import customStyles from './Select';

const SelectComponent = ({ options, onChange, placeholder }) => (
  <Select
    className="custom-select"
    options={options}
    onChange={onChange}
    placeholder={placeholder}
    styles={customStyles}
  />
);

export default SelectComponent;
