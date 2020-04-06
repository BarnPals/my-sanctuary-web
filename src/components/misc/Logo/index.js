// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
// Relative
import { Wrapper, LogoIcon, LogoText } from './styles';

const Logo = (props) => (
  <Wrapper to={props.to}>
    <LogoIcon {...filterInvalidDOMProps(props)} />
    {props.includeText && <LogoText>Barn Pals | My Sanctuary</LogoText>}
  </Wrapper>
);

Logo.propTypes = {
  includeText: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

export default Logo;
