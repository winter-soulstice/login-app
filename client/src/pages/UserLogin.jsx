import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { loginUser } from '../api/index';
import login from '../actions';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 15px;
`;

const CancelButton = styled.button.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 15px;
`;

// Functional component used to register a user
const UserLogin = (props) => {
  // Hook declaration in order to store state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { history } = props;
  const alert = useAlert();

  function showMessage(message) {
    return alert.show(message);
  }

  function getErrors(er) {
    const message = er.response.data.error;
    const values = Object.values(message);
    if (values.length > 2) {
      showMessage(message);
    }
    let errors = '';
    for (let i = 0; i < values.length; i += 1) {
      errors += `${values[i]}. \n`;
    }
    alert.show(errors);
  }

  // Asynchronous function to save each user
  async function userLogin() {
    const payload = { username, password };
    let response;
    let complete = false;
    await loginUser(payload).then((res) => {
      response = res;
      const success = 200;
      if (response.status === success) {
        complete = true;
      }
    }).catch((err) => getErrors(err));

    if (complete) {
      dispatch(login());
      history.push('/');
    }
  }

  async function goHome() {
    history.push('/');
  }

  return (
    <Wrapper>
      <Title>Login</Title>

      <Label>Username: </Label>
      <InputText
        type="text"
        value={username}
        onChange={(e) => { setUsername(e.target.value); }}
      />

      <Label>Password: </Label>
      <InputText
        type="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); }}
      />
      <Button onClick={userLogin}>Login</Button>
      <CancelButton onClick={goHome}>Cancel</CancelButton>
    </Wrapper>
  );
};

UserLogin.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export { UserLogin as default };
