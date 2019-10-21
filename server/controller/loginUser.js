// Imports jwt for user authentication and remembering state
import jwt from 'jsonwebtoken';

import {
  badRequest,
  goodRequest,
  isNullOrUndefined,
  sha512,
  findUser,
} from './localMethods';

import { validLogin } from '../validator';

/* Function that encodes data as jwt(json web token)
 * @credentials: Data that will be encoded
 * @res: Response that will be sent back
 * @return: Returns a response
 */
const saveJwt = (credentials, res) => {
  jwt.sign({ credentials }, 'timHortons', (err, token) => {
    if (err) {
      return badRequest(403, err, res);
    }
    return goodRequest(200, { token }, res);
  });
};

/* Function that is used to log user into site
* @req: Request that is sent to the server
* @res: Response that the server will send back
* @return: Returns a response
*/
const loginUser = async (req, res) => {
// Makes sure the user entered a valid username/pass
  const { errors, isValid } = validLogin(req.body);
  if (!isValid) {
    return badRequest(400, errors, res);
  }
  if (isValid) {
    // Checks if the user is in the database
    const { username } = req.body;
    const user = await findUser(username, res)
      .catch((err) => badRequest(400, err, res));

    // Makes sure that user is defined
    if (isNullOrUndefined(user)) {
      return badRequest(400, 'Username not found', res);
    }

    // Checks if the user has been found
    if (user) {
      // Validate the password passed in with salt and sha512
      const { password } = req.body;
      const { salt } = user;
      const hashpwd = sha512(password, salt).passwordHash;
      // Ensures that the password is correct
      if (hashpwd !== user.password) {
        return badRequest(400, 'Password is incorrect', res);
      }
      // Saves credentials as jwt when passwords match
      if (hashpwd === user.password) {
        const credentials = {
          username: user.username,
          email: user.email,
        };
        saveJwt(credentials, res);
      }
    }
  }
  return res;
};

export { loginUser as default };
