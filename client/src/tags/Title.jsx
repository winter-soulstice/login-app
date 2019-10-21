import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NewTitle = styled.h1.attrs({
})``;

const Title = (props) => {
  const { classType } = props;
  const { name } = props;
  const { newStyle } = props;

  return (
    <NewTitle
      className={classType}
      style={newStyle}
    >
      {name}
    </NewTitle>
  );
};

Title.defaultProps = {
  classType: '',
  newStyle: {},
};

Title.propTypes = {
  classType: PropTypes.string,
  name: PropTypes.string.isRequired,
  newStyle: PropTypes.instanceOf(Object),
};

export { Title as default };
