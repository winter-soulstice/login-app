import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* Functional component that will render button from bootstrap
 * Styled is then used for placement of the button
 */

const NewButton = styled.button.attrs({
})``;

// Empty function that does not return anything;
const myFunction = () => {};

const Btn = (props) => {
  const { action } = props;
  const { color } = props;
  const { name } = props;
  const { newStyle } = props;
  return (
    <NewButton
      className={color}
      onClick={action}
      style={newStyle}
    >
      {name}
    </NewButton>
  );
};

Btn.defaultProps = {
  action: myFunction(),
  newStyle: {},
};

Btn.propTypes = {
  action: PropTypes.func,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newStyle: PropTypes.instanceOf(Object),
};

export { Btn as default };
