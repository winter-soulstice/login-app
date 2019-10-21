import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Links from './Links';
import { UserLogout } from '../pages';

const Container = styled.div.attrs({
  className: 'container',
})`
  text-align: center;
  font-family: arial;
`;

const Header = styled.h1.attrs({
  className: 'title',
})`
  margin-top: 20px;
`;

const Motto = styled.p.attrs({
  className: 'description',
})`
  color: brown;
`;

const home = 'Home Page';
const homeMessage = 'A simple login page';

const HomePage = () => {
  const logged = useSelector((state) => state.isLogged);

  const goHome = () => {
    document.location.assign('/');
  };

  return (
    <Container>
      <Header>
        <Link to="/" className="Home" onClick={goHome}>{home}</Link>
      </Header>
      <Motto>{homeMessage}</Motto>
      {!logged ? <Links /> : ''}
      {logged ? <UserLogout /> : ''}
    </Container>
  );
};

export { HomePage as default };
