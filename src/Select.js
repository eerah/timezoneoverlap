
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

export default customStyles;
