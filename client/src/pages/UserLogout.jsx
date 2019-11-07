import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Btn } from '../tags';
import { hide, login } from '../actions';

const gray = 'btn btn-secondary btn-lg';
const logout = 'Logout';

const h4Style = {
  color: 'green',
};

const h5Style = {
  color: '#343a40',
};

const btnStyle = {
  margin: '.6rem',
  width: 'auto',
};

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 2rem 2rem;
  font-family: Arial;
`;


/* Function the retrieves the username from cookie */
const getUserName = () => {
  const { cookie } = document;
  if (cookie) {
    const keys = cookie.split(';')[1];
    const username = (keys).split('=')[1];
    return username;
  }
  return cookie;
};

/* Renders the logout page after the user has logged in */
const UserLogout = () => {
  // Save the messages as constants
  const user = getUserName().toUpperCase();
  const loginMessage = 'Login Successful';
  const userMessage = `Hello ${user}!`;

  const dispatch = useDispatch();
  const logged = () => dispatch(login());
  const hidden = () => dispatch(hide());

  /* Function that will logout the user and clear the cookie set
   * Redirects window location to home page.
   */
  const logOut = () => {
    document.cookie = 'token=; max-age=-1; path=/;';
    document.cookie = 'username=; max-age=-1; path=/;';
    hidden();
    logged();
    window.location.assign('/');
  };

  // Renders the logout button which calls the logout function
  const LogoutButton = () => (
    <Btn
      action={logOut}
      color={gray}
      name={logout}
      newStyle={btnStyle}
    />
  );

  // Render these elements and return
  return (
    <Wrapper>
      <h4 style={h4Style}>{loginMessage}</h4>
      <h5 style={h5Style}>{userMessage}</h5>
      <LogoutButton />
    </Wrapper>
  );
};

export { UserLogout as default };
