// Dependencies
import styled from 'styled-components';
// Externals
import Bulb from 'assets/react-svgs/Bulb';
import theme from 'assets/theme';

export default styled(Bulb)`
  background: ${theme.main.colors.yellow.normal};
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  flex-shrink: 0;
  height: 35px;
  padding: 5px;
  width: 35px;

  path {
    fill: ${theme.main.colors.blue.normal};
  }
`;
