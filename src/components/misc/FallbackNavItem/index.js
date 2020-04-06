// Dependencies
import React from 'react';
// Externals
import theme from 'assets/theme';
// Relative
import { Wrapper, Header, StyledSpinner, SpinnerWrapper } from './styles';

const FallbackNavItem = () => (
  <Wrapper>
    <Header />
    <SpinnerWrapper>
      <StyledSpinner color={theme.main.colors.greys.tint} />
    </SpinnerWrapper>
  </Wrapper>
);

export default FallbackNavItem;
