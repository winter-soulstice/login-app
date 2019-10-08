import crypto from 'crypto';
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime';
import { isNullOrUndefined } from 'util';
import User from '../schema/users';
import validateRegister from '../validator/register';
import validateLogin from '../validator/login';


// eslint-disable-next-line
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value,
  };
};

/* eslint-disable consistent-return */
const saveUser = (payload, res) => {
  // Save the user to the database
  // *Need to encrypt the password.
  // *Need to get the salt token.
  const newuser = new User(payload);

  // Make sure that the payload was accurate.
  if (!newuser) {
    return res.status(400).json({
      success: false,
      error: 'User could not be created.',
    });
  }


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
};


// Use post for this method
// eslint-disable-next-line
const registerUser = async (req, res) => {
  // Validate the users input
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: errors,
    });
  }

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
  // eslint-disable-next-line
  const userTrue = await User.findOne({ username }, (err, users) => {
    if (err) {
      return (
        res.status(400).json({
          success: false,
          error: err,
        })
      );
    }
  });

  // eslint-disable-next-line
  const emailTrue = await User.findOne({ email }, (err, emails) => {
    if (err) {
      return (
        res.status(400).json({
          success: false,
          error: err,
        })
      );
    }
  });

  if (!isNullOrUndefined(userTrue)) {
    if (userTrue.username === username) {
      return (
        res.status(400).json({
          success: false,
          error: 'Username has already been taken.',
        })
      );
    }
  } else if (!isNullOrUndefined(emailTrue)) {
    if (emailTrue.email === email) {
      return (
        res.status(400).json({
          success: false,
          error: 'Email has already been used.',
        })
      );
    }
  } else {
    saveUser(payload, res);
  }
};


// Method to login the user to the website
// eslint-disable-next-line
const loginUser = async (req, res) => {
  // Makes sure the user entered valid username/pass
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: errors,
    });
  }

  // eslint-disable-next-line
  await User.findOne({ username: req.body.username }, (err, user) => {
    // Check to see if an error has been thrown
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    // Check if the user has been found
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const pwd = req.body.password;
    const { salt } = user;
    const hashpwd = sha512(pwd, salt).passwordHash;
    if (hashpwd === user.password) {
      // Might need to hash/dehash the password
      // Need to make sure the passwords match if they match then return 200
      return res.status(200).json({
        success: true,
        data: user,
      });
    }
    if (hashpwd !== user.password) {
      return res.status(400).json({
        success: false,
        error: 'Password is incorrect',
      });
    }
    // eslint-disable-next-line
  }).catch((err) => console.log(err));
};

module.exports = {
  registerUser,
  loginUser,
};
