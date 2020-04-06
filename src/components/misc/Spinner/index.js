// Dependencies
import React from 'react';
// Relative
import { Bounce1, Bounce2, Bounce3, Wrapper } from './styles';

const Spinner = (props) => (
  <Wrapper {...props}>
    <Bounce1 />
    <Bounce2 />
    <Bounce3 />
  </Wrapper>
);

export default Spinner;
