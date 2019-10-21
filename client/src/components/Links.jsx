import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Btn } from '../tags';
import { hide } from '../actions';

const List = styled.div.attrs({
  className: 'list',
})``;

const Item = styled.div.attrs({
  className: 'item',
})``;

// Parameters for the login button
const login = 'Login';
const blue = 'btn btn-primary btn-lg';

// Parameters for the register button
const register = 'Register';
const yellow = 'btn btn-warning btn-lg';

// Parameters for styling the button
const btnStyle = {
  display: 'inline-block',
  border_radius: '3px',
  padding: '0.5rem 0',
  margin: '0.5rem 1rem',
  width: '11rem',
};

const LoginButton = () => (
  <Btn
    color={blue}
    name={login}
    newStyle={btnStyle}
  />
);

const RegisterButton = () => (
  <Btn
    color={yellow}
    name={register}
    newStyle={btnStyle}
  />
);

const Links = () => {
  const dispatch = useDispatch();
  const click = useSelector((state) => state.isClicked);
  const clicked = () => dispatch(hide());

  if (click) {
    return '';
  }
  return (
    <List>
      <Item>
        <Link to="/login" className="nav-login" onClick={clicked}>
          <LoginButton />
        </Link>
      </Item>
      <Item>
        <Link to="/register" className="nav-register" onClick={clicked}>
          <RegisterButton />
        </Link>
      </Item>
    </List>
  );
};

export { Links as default };
