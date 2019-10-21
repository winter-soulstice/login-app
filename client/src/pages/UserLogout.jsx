import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Btn from '../components/Btn';
import { hide, login } from '../actions';

// No need to change state back to false because logout reloads the homepage

const gray = 'btn btn-secondary btn-lg';
const logout = 'Logout';

const btnStyle = {
  margin: '.6rem',
  width: 'auto',
};

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
  font-family: Times;
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
  const loginMessage = 'Login Successful!';
  const userMessage = `Hello: ${user}`;

  const dispatch = useDispatch();
  const logged = () => dispatch(login());
  const formed = () => dispatch(hide());

  /* Function that will logout the user and clear the cookie set
   * Redirects window location to home page.
   */
  const logOut = () => {
    document.cookie = 'token=; max-age=-1; path=/;';
    document.cookie = 'username=; max-age=-1; path=/;';
    formed();
    logged();
    window.location.assign('/');
  };

  // Render these elements and return
  return (
    <Wrapper>
      <h4>{loginMessage}</h4>
      <h5>{userMessage}</h5>
      <Btn
        action={logOut}
        color={gray}
        name={logout}
        newStyle={btnStyle}
      />
    </Wrapper>
  );
};

export { UserLogout as default };
