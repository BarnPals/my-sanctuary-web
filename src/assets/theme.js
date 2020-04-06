// Dependencies
import theme from 'theme';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// @WARNING: This is currently a pointless abstraction for theme,
// but will allow us to add custom theme styles in the future.
export default {
  ...theme,
  main: {
    ...theme.main,
    animations: {
      fadeIn,
    },
  },
};
