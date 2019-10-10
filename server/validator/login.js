import Validator from 'validator';
import isEmpty from 'is-empty';

const validateLogin = (data) => {
  const errors = {};
  const data1 = data;

  // Converting empty fields to strings for validator methods
  // or populate data when not empty
  data1.username = !isEmpty(data.username) ? data.username : '';
  data1.password = !isEmpty(data.password) ? data.password : '';

  // Check the username
  if (Validator.isEmpty(data1.username)) {
    errors.username = 'Please enter a username';
  }

  // Check the password
  if (Validator.isEmpty(data1.password)) {
    errors.password = 'Please enter a password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateLogin as default };
