import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Links from './Links';
import { UserLogout } from '../pages';

const Container = styled.div.attrs({
  className: 'container',
})`
  text-align: center
`;

const Header = styled.h1.attrs({
  className: 'title',
})`
  margin-top: 20px;
`;

const HomePage = () => {
  const logged = useSelector((state) => state.isLogged);
  return (
    <Container>
      <Header>
        <Link to="/" className="Home">
          Home Page
        </Link>
      </Header>
      <p>A simple login page</p>
      {!logged ? <Links /> : ''}
      {logged ? <UserLogout /> : ''}
    </Container>
  );
};

export { HomePage as default };
