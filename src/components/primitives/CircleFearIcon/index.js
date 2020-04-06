// Dependencies
import styled from 'styled-components';
// Externals
import Fear from 'assets/react-svgs/Fear';
import theme from 'assets/theme';

export default styled(Fear)`
  background: ${theme.main.colors.brown.tint};
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  flex-shrink: 0;
  height: 35px;
  padding: 5px;
  width: 35px;

  path {
    fill: ${theme.main.colors.red.normal};
  }
`;
