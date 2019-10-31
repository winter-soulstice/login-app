import React from 'react';
// Import useSelector from react-redux
import { useSelector } from 'react-redux';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';
// Import styled from styled-components
import styled from 'styled-components';

// Import Links and UserLogout from links and Login page
import Links from './Links';
import { UserLogout } from '../pages';

// Styled div used as a container for all the elements
const Container = styled.div.attrs({
  className: 'container',
})`
  text-align: center;
  font-family: Arial;
`;

// Stlyed div used as a wrapper for the header
const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`;

// Styled h1 tag used for title
const Header = styled.h1.attrs({
  className: 'title',
})`
  margin-top: 20px;
`;

// Styled p tag used for motto
const Motto = styled.p.attrs({
  className: 'description',
})`
  color: #343a40;
`;

// Messages to be rendered
const home = 'Home Page';
const homeMessage = 'A simple login page';

// Function to redirect user to home page
const goHome = () => {
  document.location.assign('/');
};

// Html functional component that render the navigation of website
const NewWrapper = () => (
  <Wrapper>
    <Header>
      <Link to="/" className="Home" onClick={goHome}>{home}</Link>
    </Header>
    <Motto>{homeMessage}</Motto>
    <Links />
  </Wrapper>
);


// Functional homepage component
const HomePage = () => {
  // Selector that gets the users state (logged/not)
  const logged = useSelector((state) => state.isLogged);

  // Render homepage and links when the user is not logged in
  // Render userlogout when the user is logged in
  return (
    <Container>
      {!logged ? <NewWrapper /> : ''}
      {logged ? <UserLogout /> : ''}
    </Container>
  );
};

export { HomePage as default };
