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

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`;

const Header = styled.h1.attrs({
  className: 'title',
})`
  margin-top: 20px;
`;

const Motto = styled.p.attrs({
  className: 'description',
})`
  color: maroon;
`;

const home = 'Home Page';
const homeMessage = 'A simple login page';

const HomePage = () => {
  const logged = useSelector((state) => state.isLogged);
  const hid = useSelector((state) => state.isClicked);

  const goHome = () => {
    document.location.assign('/');
  };

  const NewWrapper = () => {
    if (hid) {
      return '';
    }
    return (
      <Wrapper>
        <Header>
          <Link to="/" className="Home" onClick={goHome}>{home}</Link>
        </Header>
        <Motto>{homeMessage}</Motto>
      </Wrapper>
    );
  };

  return (
    <Container>
      <NewWrapper />
      {!logged ? <Links /> : ''}
      {logged ? <UserLogout /> : ''}
    </Container>
  );
};

export { HomePage as default };
