import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../components';
import { UserRegister, UserLogin } from '../pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <Router>
    <HomePage />
    <Switch>
      <Route path="/register" exact component={UserRegister} />
      <Route path="/login" exact component={UserLogin} />
    </Switch>
  </Router>
);


export { App as default };
