import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.div.attrs({
  className: 'list',
})``;

const Item = styled.div.attrs({
  className: 'item',
})``;

const Login = styled.button.attrs({
  className: 'btn btn-primary',
})`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
`;

const Register = styled.button.attrs({
  className: 'btn btn-danger',
})`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
`;

const Links = () => (
  <List>
    <Item>
      <Link to="/register" className="nav-register">
        <Register>Register</Register>
      </Link>
    </Item>
    <Item>
      <Link to="/login" className="nav-login">
        <Login>Login</Login>
      </Link>
    </Item>
  </List>
);

export { Links as default };
