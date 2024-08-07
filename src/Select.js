const customStyles = {
  control: (base) => ({
    ...base,
    border: 'none',
    backgroundColor: '#3c3836',
    color: '#ebd89e',
    height: '2.5rem', // Match the table cell height
    minHeight: '2.5rem',
    '&:hover': {
      backgroundColor:'#77767b',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#77767b' : '#3c3836',
    color: state.isSelected ? '#f89d28' : '#ebd89e',
    '&:active': {
      backgroundColor: '#d0d0d0',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f89d28',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#a89984',
  }),
  valueContainer: (base) => ({
    ...base,
    height: '2.5rem',
    padding: '0 0.75rem',
  }),
  input: (base) => ({
    ...base,
    margin: '0',
    padding: '0',
  }),
};

export default customStyles;
