// Import validator modules for string verification
import Validator from 'validator';
// Import isEmpty module for emptiness verification
import isEmpty from 'is-empty';

// Function to verify data being inputed to server
const validateRegister = (data) => {
  // Error and data variables
  const errors = {};
  const data1 = data;

  // Convert empty fields of data to strings or populate data fields
  data1.username = !isEmpty(data.username) ? data.username : '';
  data1.email = !isEmpty(data.email) ? data.email : '';
  data1.password = !isEmpty(data.password) ? data.password : '';
  data1.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Check the username
  if (Validator.isEmpty(data1.username)) {
    errors.username = 'Please enter a username';
  }

  // Check the email
  if (Validator.isEmpty(data1.email)) {
    errors.email = 'Please enter an email';
  } else if (!Validator.isEmail(data1.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Check the password
  if (Validator.isEmpty(data1.password)) {
    errors.password = 'Please enter a password';
  } else if (Validator.isEmpty(data1.password2)) {
    errors.password2 = 'Please confirm the password';
  }

  // Ensure valid password
  if (!Validator.isLength(data1.password, { min: 6, max: 30 })) {
    errors.password = 'Please enter a password between 6-30 characters';
  } else if (!Validator.equals(data1.password, data1.password2)) {
    errors.password2 = 'Please enter a matching password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Export the validate function to controller
export { validateRegister as default };
