// Dependencies
import React from 'react';
// Externals
import theme from 'assets/theme';
// Relative
import { Wrapper, Header, SpinnerWrapper, StyledSpinner } from './styles';

const FallbackItem = () => (
  <Wrapper>
    <Header />
    <SpinnerWrapper>
      <StyledSpinner color={theme.main.colors.greys.tint} />
    </SpinnerWrapper>
  </Wrapper>
);

export default FallbackItem;
