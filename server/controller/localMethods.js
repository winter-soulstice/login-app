// Imports crypto module for hashing the password
import crypto from 'crypto';

// Import User Schema from the database.
// Ensures one endpoint for all requests.
import User from '../schema';

/* Function that hashes the password
 * @password: The password to be hashed
 * @salt: The unique salt key that will be used to create the hash
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  // Updates the hash created with the password
  hash.update(password);
  // Saves the hash as hex values
  const value = hash.digest('hex');
  // Returns the salt key and hashed password
  return {
    salt,
    passwordHash: value,
  };
};

/* Function that is used to return bad request
 * @mes: Message to respond with
 * @res: Response to be sent
 * @statNum: Status number to set response
 * @return: A status of @statNum with a success false and a message
 */
const badRequest = (statNum, mes, res) => (
  res.status(statNum).json({
    success: false,
    error: mes,
  }));

/* Function that is used to return a successful request
 * @payload: Object that will be returned
 * @res: Response to be sent back
 * @return: A status of @statNum with a success true and an object
 */
const goodRequest = (statNum, payload, res) => (
  res.status(statNum).json({
    success: true,
    payload,
  })
);

/* Function that is used to return a boolean if object is null or undefined
 * @toCheck: Object that will be checked
 * @return: Boolean based on if object is null
 */
const isNullOrUndefined = (toCheck) => {
  if (toCheck === null || toCheck === undefined) {
    return true;
  }
  return false;
};

/* Function that is used to find a user in the database
 * @toFind: Check the database to find this value
 * @res: Response to be sent back
 * @return: Returns a user from the database
 */
const findUser = async (toFind, res) => {
  const user = await User.findOne({ username: toFind }, (err, found) => {
    if (err) {
      return badRequest(400, err, res);
    }
    return found;
  });
  return user;
};

/* Function that is used to find a user by email in the database
 * @toFind: Check the databse to find this value
 * @res: Response to be sent back
 * @return: Returns a user from the database
 */
const findEmail = async (toFind, res) => {
  const email = await User.findOne({ email: toFind }, (err, found) => {
    if (err) {
      return badRequest(400, err, res);
    }
    return found;
  });
  return email;
};

/* Function that saves the user to the database
* @payload: Values to create a new user with
* @res: Status to send back
* @return: Returns a response
*/
const saveUser = (payload, res) => {
  // Creates new user
  const newUser = new User(payload);
  // Checks if newUser is null
  if (isNullOrUndefined(newUser)) {
    return badRequest(400, 'A user could not be created.', res);
  }
  // Checks if newUser exists
  if (newUser) {
    return (
      newUser
        .save()
        .then(() => res.status(201).json({
          success: true,
          id: newUser.id,
          message: 'User created!',
        }))
        .catch((error) => badRequest(400, error, res)));
  }
  return res;
};

export {
  sha512,
  badRequest,
  goodRequest,
  isNullOrUndefined,
  findUser,
  findEmail,
  saveUser,
};
