import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NewInput = styled.input.attrs({
})``;


const Input = (props) => {
  const { action } = props;
  const { classType } = props;
  const { input } = props;
  const { inputType } = props;
  const { holder } = props;
  const { newStyle } = props;

  return (
    <NewInput
      onChange={action}
      className={classType}
      placeholder={holder}
      style={newStyle}
      type={inputType}
      value={input}
    />
  );
};

Input.defaultProps = {
  classType: '',
  newStyle: {},
};

Input.propTypes = {
  action: PropTypes.func.isRequired,
  classType: PropTypes.string,
  holder: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  newStyle: PropTypes.instanceOf(Object),
};

export { Input as default };
