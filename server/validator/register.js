import Validator from 'validator';
import isEmpty from 'is-empty';

const validateRegister = (data) => {
  const errors = {};

  // Converting empty fields to strings for validator functions to work
  // or populate with data if not empty.
  /* eslint-disable no-param-reassign */
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Check the username
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Please enter a username';
  }

  // Check the email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please enter an email';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Check the password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please enter a password';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please confirm the password';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Please enter a password between 6-30 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Please enter a matching password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateRegister as default };
