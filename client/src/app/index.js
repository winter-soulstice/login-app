// Imports react and useEffect hooks from react
import React, { useEffect } from 'react';
// Imports router from react-router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Imports dispatch from react-redux to access state
import { useDispatch } from 'react-redux';

// Imports homepage
import HomePage from '../components';
// Imports register and login pages
import { UserRegister, UserLogin } from '../pages/index';
// Imports authJwt method from api
import { authJwt } from '../api/index';
// Imports login as an action
import { login } from '../actions';
// Imports the bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';


/* Functional component App that loads all the html necessary for
 * the single page app.
 */
const App = () => {
  // React redux dispatcher allowed to use this because of provider
  const dispatch = useDispatch();

  // Set the authorization headers before sending axios request.
  // Make sure that cookie is set.
  const { cookie } = document;
  const token = cookie.split(';')[0];
  const jwt = token.split('=')[1];
  let config;
  if (jwt !== undefined) {
    config = {
      headers: { Authorization: `bearer ${jwt}` },
    };
  }

  // Renders once when the app loads.
  useEffect(() => {
    // Function that logs the user in.
    const logged = () => dispatch(login());

    // Function to remember logged in statae
    const checkLog = async () => {
      // Sends a get request to check is user was logged in
      await authJwt(config).then((res) => {
        // successful response logs the user back in
        if (res) {
          logged();
        }
        // catch errors
      }).catch((err) => err);
    };

    // Check whether or not jwt cookie is set before sending request.
    if (document.cookie) {
      checkLog();
    }
  // Dependencies for use-effect
  }, [config, dispatch]);

  // Html that returns the three components based on path
  // Remember: order matters -> when / path was first navigation
  // elements were rendered on every page
  return (
    <Router>
      <Switch>
        <Route path="/register" exact component={UserRegister} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export { App as default };
