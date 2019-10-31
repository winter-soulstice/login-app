import React from 'react';
// Import link from react router dom
import { Link } from 'react-router-dom';
// Import styled from styled components
import styled from 'styled-components';

// Import btn from tags
import { Btn } from '../tags';

// Stlyed div element used as list
const List = styled.div.attrs({
  className: 'list',
})``;

// Stlyed div element used to display items
const Item = styled.div.attrs({
  className: 'item',
})``;

// Parameters for the login button
const login = 'Login';
const blue = 'btn btn-info btn-lg';

// Parameters for the register button
const register = 'Register';
const yellow = 'btn btn-dark btn-lg';

// Parameters for styling the button
const btnStyle = {
  display: 'inline-block',
  border_radius: '3px',
  padding: '0.5rem 0',
  margin: '0.5rem 1rem',
  width: '11rem',
};

// Functional component that renders html, specificly
// the login button that links to /login
const LoginButton = () => (
  <Item>
    <Link to="/login">
      <Btn
        color={blue}
        name={login}
        newStyle={btnStyle}
      />
    </Link>
  </Item>
);

// Functional component that renders html, specificly
// the register button that links to /register
const RegisterButton = () => (
  <Item>
    <Link to="/register">
      <Btn
        color={yellow}
        name={register}
        newStyle={btnStyle}
      />
    </Link>
  </Item>
);

// Functional component that renders html, combining the
// register and login button
const Links = () => (
  <List>
    <LoginButton />
    <RegisterButton />
  </List>
);

export { Links as default };
