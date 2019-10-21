import crypto from 'crypto';

// Imported to prevent an error
import 'regenerator-runtime';

import {
  badRequest,
  isNullOrUndefined,
  sha512,
  findUser,
  findEmail,
  saveUser,
} from './localMethods';

import { validRegister } from '../validator';

/* Function that is used to register the user
* @req: Request that the server recieves
* @res: Response that the server sends back
* @return: Returns a response
*/
const registerUser = async (req, res) => {
  // Validate the users input
  const { errors, isValid } = validRegister(req.body);
  if (!isValid) {
    return badRequest(400, errors, res);
  }
  if (isValid) {
    const { body } = req;

    // Check to see if the request has a payload
    if (!body) {
      return badRequest(400, 'A user has not been provided.', res);
    }

    // Encrypts the user's password and combines user input
    const salt = crypto.randomBytes(8).toString('hex');
    const hashpwd = sha512(body.password, salt);
    const password = hashpwd.passwordHash;
    const salty = hashpwd.salt;
    const { username } = body;
    const { email } = body;
    const payload = {
      username, password, email, salt: salty,
    };

    // Checks if username/email is already in the database
    const uFound = await findUser(username, res)
      .catch((err) => badRequest(400, err, res));
    const eFound = await findEmail(email, res)
      .catch((err) => badRequest(400, err, res));

    // Ensures that username/email is not taken before saving the payload in db
    if (uFound) {
      if (uFound.username === username) {
        return badRequest(400, 'Username has already been taken.', res);
      }
    } else if (eFound) {
      if (eFound.email === email) {
        return badRequest(400, 'Email has already been used.', res);
      }
    } else if (isNullOrUndefined(uFound) && isNullOrUndefined(eFound)) {
      const response = saveUser(payload, res);
      return response;
    }
  }
  return res;
};

export { registerUser as default };
