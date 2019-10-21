import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { CookiesProvider } from 'react-cookie';

import allReducers from '../reducers';
import App from '../app';

const store = createStore(allReducers);

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

// Import and render all of the providers
const Providers = () => (
  <CookiesProvider>
    <AlertProvider template={AlertTemplate} options={options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </CookiesProvider>
);

export { Providers as default };
