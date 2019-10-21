import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { loginUser } from '../api/index';

import Btn from '../components/Btn';
import Input from '../components/Input';

import { hide, login } from '../actions';

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  font-family: Times;
  margin: 0 30px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Label = styled.label`
  font-weight: bold;
  margin: 5px;
`;

// Parameters for the form class
const form = 'form-control';

// Parameters for the user form
const user = 'text';
const userPlace = 'Please enter your username';

// Parameters for the password form
const pass = 'password';
const passPlace = 'Please enter your password';

// Parameters for styling the form class
const formStyle = {
  fontFamily: 'Arial',
  margin: '5px',
  width: '90%',
};

// Parameters for the confirm button
const confirm = 'Confirm';
const green = 'btn btn-success';

// Parameters for the cancel button
const cancel = 'Cancel';
const red = 'btn btn-danger';

// Parameters for styling the button
const btnStyle = {
  margin: '.6rem',
  width: 'auto',
};

// Method to set cookie.
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

// Functional component used to register a user
const UserLogin = (props) => {
  // Hook declaration in order to get username/passwords
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const logged = () => dispatch(login());
  const clicked = () => dispatch(hide());

  const { history } = props;

  const showMessage = (message) => {
    alert.show(message);
  };

  async function goHome() {
    clicked();
    history.push('/');
  }

  const getErrors = (er) => {
    if (er.response) {
      const message = er.response.data.error;
      const values = Object.values(message);
      if (values.length > 2) {
        showMessage(message);
      } else {
        let errors = '';
        for (let i = 0; i < values.length; i += 1) {
          errors += `${values[i]}. \n`;
        }
        return showMessage(errors);
      }
    }
    return er;
  };

  // Asynchronous function to save each user
  const userLogin = async () => {
    const payload = { username, password };
    // Check on client side for user credentials
    // this will shorten time/load on server.
    let complete = false;
    if (payload) {
      await loginUser(payload).then((res) => {
        const response = res;
        const success = 200;
        if (response.status === success) {
          setCookie('token', res.data.payload.token);
          setCookie('username', username);
          complete = true;
        }
      }).catch((err) => getErrors(err));
    }

    if (complete) {
      logged();
      history.push('/');
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>

      <Label>Username: </Label>
      <Input
        action={(e) => { setUsername(e.target.value); }}
        classType={form}
        input={username}
        inputType={user}
        holder={userPlace}
        newStyle={formStyle}
      />

      <Label>Password: </Label>
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

UserLogin.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export { UserLogin as default };
