// Imports the useState hook from react
import React, { useState } from 'react';
// Imports the dispatcher hook for managing state
import { useDispatch } from 'react-redux';
// Imports the alert hook for rendering alerts
import { useAlert } from 'react-alert';
// Imports proptypes for type checking
import PropTypes from 'prop-types';
// Imports styled from styled-components
import styled from 'styled-components';
// Imports loginUser method for get request with axios
import { loginUser } from '../api/index';
// Imports login validation method
import { validLogin } from '../validator';
// Import the required custom tags
import {
  Btn,
  Input,
  Label,
  Title,
} from '../tags';
// Import the login action
import { login } from '../actions';

// A styled div that is used as a wrapper for all elements on
// the login page
const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  font-family: Arial;
  margin: 2rem 2rem;
  color: #343a40;
`;

// Parameters for styling the label class
const labelStyle = {
  fontWeight: 'bold',
  margin: '.6rem',
};

// Parameters for styling the form class
const formStyle = {
  fontFamily: 'Arial',
  margin: '5px',
  width: '98%',
};

// Parameters for styling the button
const btnStyle = {
  margin: '.6rem',
  width: 'auto',
  float: 'right',
};

// Parameters for title tag name
const logTitle = 'Login';

// Parameters for styling the title class
const titleStyle = {
  textAlign: 'Center',
};

// Title tag that is used to render title
const LoginTitle = () => (
  <Title
    name={logTitle}
    newStyle={titleStyle}
  />
);

// Parameters for the user tag names
const userLabel = 'Username: ';
const passLabel = 'Password: ';

// Parameters for the form class
const form = 'form-control';

// Parameters for the user form
const user = 'text';
const userPlace = 'Please enter your username';

// Parameters for the password form
const pass = 'password';
const passPlace = 'Please enter your password';

// Parameters for the confirm button
const confirm = 'Confirm';
const green = 'btn btn-success';

// Parameters for the cancel button
const cancel = 'Cancel';
const red = 'btn btn-danger';

// Method to set cookie.
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

// Functional component used to register a user
const UserLogin = (props) => {
  // Hook declaration for using dispatch
  const dispatch = useDispatch();
  const logged = () => dispatch(login());

  // Hook declaration in order to get username/passwords
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hook declaration to use custom alerts
  const alert = useAlert();

  // History proptype used to navigate the webpage
  const { history } = props;

  // Show custom alert messages
  const showMessage = (message) => {
    alert.show(message);
  };

  // Asynchronous function to let the user go back to the home page
  async function goHome() {
    history.push('/');
  }

  // Function to display errors as alerts to user from server
  const getErrorServer = (er) => {
    // Checks for a response
    if (er.response) {
      // Gets the message from response
      const message = er.response.data.error;
      const values = Object.values(message);
      // Display all messages when length is greater than 2
      if (values.length > 2) {
        showMessage(message);
      } else {
        // Display errors one by one
        let errors = '';
        for (let i = 0; i < values.length; i += 1) {
          errors += `${values[i]}. \n`;
        }
        return showMessage(errors);
      }
    }
    return er;
  };

  // Function to display errors as alerts from client
  const getErrorClient = (er) => {
    if (er) {
      const message = Object.values(er);
      if (message.length > 2) {
        showMessage(message);
      } else {
        let errors = '';
        for (let i = 0; i < message.length; i += 1) {
          errors += `${message[i]}. \n`;
        }
        return showMessage(errors);
      }
    }
    return er;
  };

  // Asynchronous function to save each user
  const userLogin = async () => {
    // Combines the username and password into a single object
    const payload = { username, password };
    // Validate the errors and isValid
    const { errors, isValid } = validLogin(payload);

    // When valid send request to server
    if (isValid) {
      let complete = false;
      // Ensures that the payload is present
      if (payload) {
        // Ajax post request to database
        await loginUser(payload).then((res) => {
          // Save the response
          const response = res;
          const success = 200;
          // When the response is 200 set username and jwt cookies
          if (response.status === success) {
            setCookie('token', res.data.payload.token);
            setCookie('username', username);
            complete = true;
          }
        }).catch((err) => getErrorServer(err));
      }
      // Move the user back to home page on success
      if (complete) {
        logged();
        history.push('/');
      }
    } else if (!isValid) {
      // Else display the errors
      return getErrorClient(errors);
    }
    return payload;
  };

  // Html component that renders the login page
  // Title, 2 label, 2 input and 2 button tags
  return (
    <Wrapper>

      <LoginTitle />

      <Label
        name={userLabel}
        newStyle={labelStyle}
      />
      <Input
        action={(e) => { setUsername(e.target.value); }}
        classType={form}
        input={username}
        inputType={user}
        holder={userPlace}
        newStyle={formStyle}
      />

      <Label
        name={passLabel}
        newStyle={labelStyle}
      />
      <Input
        action={(e) => { setPassword(e.target.value); }}
        classType={form}
        input={password}
        inputType={pass}
        holder={passPlace}
        newStyle={formStyle}
      />

      <Btn
        action={userLogin}
        color={green}
        name={confirm}
        newStyle={btnStyle}
      />
      <Btn
        action={goHome}
        color={red}
        name={cancel}
        newStyle={btnStyle}
      />
    </Wrapper>
  );
};

// Proptype validation for history object
UserLogin.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export { UserLogin as default };
