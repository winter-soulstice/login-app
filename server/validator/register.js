import Validator from 'validator';
import isEmpty from 'is-empty';

const validateRegister = (data) => {
  const errors = {};

  const data1 = data;
  // Converting empty fields to strings for validator functions to work
  // or populate with data if not empty.
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
  }

  if (Validator.isEmpty(data1.password2)) {
    errors.password2 = 'Please confirm the password';
  }

  if (!Validator.isLength(data1.password, { min: 6, max: 30 })) {
    errors.password = 'Please enter a password between 6-30 characters';
  }

  if (!Validator.equals(data1.password, data1.password2)) {
    errors.password2 = 'Please enter a matching password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateRegister as default };
