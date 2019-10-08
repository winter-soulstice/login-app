import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage } from '../components';
import { UserReg, UserLogin } from '../pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';


export function App() {

    return (
        <Router>
            <HomePage />
                    <Switch>
                        <Route path="/register" exact component={ UserReg } />
                        <Route path="/login" exact component={ UserLogin } /> 
                    </Switch>
        </Router>
    );
}
