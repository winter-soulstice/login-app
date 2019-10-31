import React from 'react';

// These lines import all the providers and their complements
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { CookiesProvider } from 'react-cookie';

// This line imports the reducers and app
import allReducers from '../reducers';
import App from '../app';

const store = createStore(allReducers);

// optional cofiguration
const options = {
  // you can also use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: '30px',
  // you can also use 'scale'
  transition: transitions.SCALE,
};

// Import and render all of the providers outside the app
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
