// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
// Relative
import { StyledArrow, Wrapper } from './styles';

const Back = (props) => (
  <Wrapper {...props}>
    <StyledArrow />
  </Wrapper>
);

Back.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Back;
