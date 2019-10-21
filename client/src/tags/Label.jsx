import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NewLabel = styled.label.attrs({
})``;

const Label = (props) => {
  const { name } = props;
  const { newStyle } = props;

  return (
    <NewLabel
      style={newStyle}
    >
      {name}
    </NewLabel>
  );
};

Label.defaultProps = {
  newStyle: {},
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  newStyle: PropTypes.instanceOf(Object),
};

export { Label as default };
