import Validator from 'validator';
import isEmpty from 'is-empty';

module.exports = function validateLogin(data) {
  const errors = {};

  // Converting empty fields to strings for validator methods
  // or populate data when not empty
  /* eslint-disable no-param-reassign */
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Check the username
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Please enter a username';
  }

  // Check the password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please enter a password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
