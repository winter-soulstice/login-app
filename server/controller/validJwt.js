// Imports jwt for user authentication and remembering state
import jwt from 'jsonwebtoken';
// Imported to prevent an error
import 'regenerator-runtime';

import {
  badRequest,
  goodRequest,
  isNullOrUndefined,
  findUser,
} from './localMethods';

/* Function to get the jwt from header (json web token)
 * @req: Request that is sent to server
 * @res: Response that is sent back from server
 * @returns: Returns a response
 */
const verifyToken = (req, res) => {
  const bearerHeader = req.headers.authorization;
  // Makes sure header is not defined
  if (bearerHeader === 'undefined') {
    return badRequest(403, 'Unable to verify token.', res);
  }
  // Removes bearer from authorization header
  if (typeof (bearerHeader) !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  return res;
};

/* Function to validate the jwt
* @req: Request that is sent to the server
* @res: Response that is sent back from the server
*/
const validJwt = async (req, res) => {
  // Ensure that a jwt was sent
  verifyToken(req, res);
  // Decode the jwt with the special pass phrase
  jwt.verify(req.token, 'timHortons', (error, authData) => {
    if (error) {
      return badRequest(403, error, res);
    }
    // Ensures auth data exists
    if (isNullOrUndefined(authData)) {
      return badRequest(400, 'JWT payload incorrect', res);
    }
    const { username } = authData;
    // Check to see if the user is in the database before sending response
    const uFound = findUser(username, res)
      .catch((er) => badRequest(403, er, res));
    // Ensures user has been found before sending back response
    if (uFound) {
      return goodRequest(200, { authData }, res);
    }
    return authData;
  });
  return res;
};

export { validJwt as default };
