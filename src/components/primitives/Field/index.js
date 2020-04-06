// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ valid }) => (valid ? theme.main.colors.green.tint : theme.main.colors.white)};
  box-shadow: unset;
  box-sizing: border-box;
  padding: 10px 0;
  color: ${theme.main.colors.greys.shade};
  font-family: 'Lato', sans-serif, Helvetica, Arial;
  font-size: ${theme.main.fontSizes.normal};
  width: 100%;

  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: ${theme.main.colors.greys.normal};
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: ${theme.main.colors.greys.normal};
    opacity: 1;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${theme.main.colors.greys.normal};
    opacity: 1;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${theme.main.colors.greys.normal};
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${theme.main.colors.greys.normal};
  }

  &::placeholder {
    /* Most modern browsers support this now. */
    color: ${theme.main.colors.greys.normal};
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${theme.main.colors.white} inset;
    -webkit-text-fill-color: ${theme.main.colors.greys.shade};
  }
`;
