// Dependencies
import React from 'react';
// Externals
import theme from 'assets/theme';
// Relative
import { StyledSpinner, Wrapper } from './styles';

const FallbackRoute = () => (
  <Wrapper>
    <StyledSpinner color={theme.main.colors.greys.tint} />
  </Wrapper>
);

export default FallbackRoute;
