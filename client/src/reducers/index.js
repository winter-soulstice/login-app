import { combineReducers } from 'redux';

import loggedReducer from './loggedReducer';
import formReducer from './formReducer';

const allReducers = combineReducers({
  isLogged: loggedReducer,
  isClicked: formReducer,
});

export { allReducers as default };
