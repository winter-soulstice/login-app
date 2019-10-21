import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { registerUser } from '../api/index';
import Btn from '../components/Btn';
import Input from '../components/Input';

import { hide } from '../actions';

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

// Parameters for the text form
const user = 'text';
const userPlace = 'Please enter your username';

// Parameters for the mail form
const mail = 'text';
const mailPlace = 'Please enter your email';

// Parameters for the password form
const pass = 'password';
const passPlace = 'Please enter your password';

// Paramters for the confirm form
const pass2 = 'password';
const pass2Place = 'Please confirm your password';

// Parameters for styling the form
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

// Parameters for styling the buttons
const btnStyle = {
  margin: '.6rem',
  width: 'auto',
};

// Functional component used to register a user
const UserReg = (props) => {
  // Hook declaration in order to store state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { history } = props;
  const alert = useAlert();
  const dispatch = useDispatch();
  const clicked = () => dispatch(hide());

  function showMessage(message) {
    return alert.show(message);
  }

  const getErrors = (er) => {
    if (er) {
      const message = (er.response.data.error);
      const values = Object.values(message);
      if (values.length > 3) {
        showMessage(message);
      } else {
        let errors = '';
        for (let i = 0; i < values.length; i += 1) {
          errors += `${values[i]}. \n`;
        }
        return alert.show(errors);
      }
    }
    return er;
  };

  // Asynchronous function to save each user
  async function saveUser() {
    const payload = {
      username, email, password, password2,
    };

    await registerUser(payload).then((res) => {
      showMessage(res.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
    }).catch((err) => getErrors(err));
  }

  async function goHome() {
    clicked();
    history.push('/');
  }

  return (
    <Wrapper>
      <Title>Register User</Title>

      <Label>Username: </Label>
      <Input
        action={(e) => { setUsername(e.target.value); }}
        classType={form}
        input={username}
        inputType={user}
        holder={userPlace}
        newStyle={formStyle}
      />

      <Label>Email: </Label>
      <Input
        action={(e) => { setEmail(e.target.value); }}
        classType={form}
        input={email}
        inputType={mail}
        holder={mailPlace}
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

      <Label>Confirm Password: </Label>
      <Input
        action={(e) => { setPassword2(e.target.value); }}
        classType={form}
        input={password2}
        inputType={pass2}
        holder={pass2Place}
        newStyle={formStyle}
      />

      <Btn
        action={saveUser}
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

UserReg.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export { UserReg as default };
