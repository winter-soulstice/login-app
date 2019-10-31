// Import validator modules for string verification
import Validator from 'validator';
// Import isEmpty module for emptiness verifcationn
import isEmpty from 'is-empty';

// Method to verify the data being passed to server
export const validateLogin = (data) => {
  // Error and data variables
  const errors = {};
  const data1 = data;

  // Convert empty fields of data to strings or populate data fields
  data1.username = !isEmpty(data.username) ? data.username : '';
  data1.password = !isEmpty(data.password) ? data.password : '';

  // Check the username
  if (Validator.isEmpty(data1.username)) {
    // Save the error when the field is empty
    errors.username = 'Please enter a username';
  }

  // Check the password
  if (Validator.isEmpty(data1.password)) {
    // Save the error when the field is empty
    errors.password = 'Please enter a password';
  } else if (!Validator.isLength(data1.password, { min: 6, max: 30 })) {
    // Save the error when the field is empty
    errors.password = 'Please enter a password between 6-30 characters';
  }

  // Return the fields errors and isValid(boolean)
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Export the validate function to controller
export { validateLogin as default };
