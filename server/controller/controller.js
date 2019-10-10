import crypto from 'crypto';
import 'regenerator-runtime';
import { isNullOrUndefined } from 'util';
import User from '../schema/users';
import validateRegister from '../validator/register';
import validateLogin from '../validator/login';

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value,
  };
};

// Save the user to the database
const saveUser = (payload, res) => {
  const newuser = new User(payload);

  // Make sure that the payload was accurate.
  if (newuser) {
    newuser
      .save()
      .then(() => res.status(201).json({
        success: true,
        id: newuser.id,
        message: 'User created!',
      }))
      .catch((error) => res.status(400).json({
        success: false,
        error,
      }));
  }
  return res.status(400).json({
    success: false,
    error: 'User could not be created.',
  });
};


// Use post for this method
const registerUser = async (req, res) => {
  // Validate the users input
  const { errors, isValid } = validateRegister(req.body);

  if (isValid) {
    const { body } = req;

    // Check to see if the request has a payload
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'A user has not been provided.',
      });
    }
    // Encrypt the user's password
    const salt = crypto.randomBytes(8).toString('hex');
    const hashpwd = sha512(body.password, salt);
    const password = hashpwd.passwordHash;
    const salty = hashpwd.salt;
    const { username } = body;
    const { email } = body;
    const payload = {
      username, password, email, salt: salty,
    };
    // Check if username/email is already in the database
    const userTrue = await User.findOne({ username }, (err, users) => {
      if (err) {
        return (
          res.status(400).json({
            success: false,
            error: err,
          })
        );
      }
      return users;
    }).catch((err) => err);
    const emailTrue = await User.findOne({ email }, (err, emails) => {
      if (err) {
        return (
          res.status(400).json({
            success: false,
            error: err,
          })
        );
      }
      return emails;
    }).catch((err) => err);
    if (userTrue) {
      if (userTrue.username === username) {
        return (
          res.status(400).json({
            success: false,
            error: 'Username has already been taken.',
          })
        );
      }
    } else if (emailTrue) {
      if (emailTrue.email === email) {
        return (
          res.status(400).json({
            success: false,
            error: 'Email has already been used.',
          })
        );
      }
    } else if (!isNullOrUndefined(userTrue) && !isNullOrUndefined(emailTrue)) {
      saveUser(payload, res);
    }
  }
  return res.status(400).json({
    success: false,
    error: errors,
  });
};

// Method to authenticate the user to the website
const loginUser = async (req, res) => {
  // Makes sure the user entered valid username/pass
  const { errors, isValid } = validateLogin(req.body);
  if (isValid) {
    await User.findOne({ username: req.body.username }, (err, user) => {
      // Check if the user has been found
      if (user) {
        const pwd = req.body.password;
        const { salt } = user;
        const hashpwd = sha512(pwd, salt).passwordHash;
        if (hashpwd !== user.password) {
          return res.status(400).json({
            success: false,
            error: 'Password is incorrect',
          });
        }
        if (hashpwd === user.password) {
          return res.status(200).json({
            success: true,
            data: user,
          });
        }
      }
      return res.status(400).json({
        success: false,
        error: err,
      });
    }).catch((err) => err);
  }
  return res.status(400).json({
    success: false,
    error: errors,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
