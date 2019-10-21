import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HomePage from '../components';
import { UserRegister, UserLogin } from '../pages/index';
import { authJwt } from '../api/index';

import { login } from '../actions';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const dispatch = useDispatch();

  // Set the authorization headers before sending axios request.
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
    const logged = () => dispatch(login());

    // Function to remember state of browser.
    const checkLog = async () => {
      await authJwt(config).then((res) => {
        if (res) {
          logged();
        }
      }).catch((err) => err);
    };

    // Check whether or not jwt cookie is set before sending request.
    if (document.cookie) {
      checkLog();
    }
  // Dependencies for use-effect
  }, [config, dispatch]);

  return (
    <Router>
      <HomePage />
      <Switch>
        <Route path="/register" exact component={UserRegister} />
        <Route path="/login" exact component={UserLogin} />
      </Switch>
    </Router>
  );
};

export { App as default };
