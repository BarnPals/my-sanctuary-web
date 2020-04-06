// Dependencies
import styled from 'styled-components';
// Externals
import Bulb from 'assets/react-svgs/Bulb';
import theme from 'assets/theme';

export default styled(Bulb)`
  flex-shrink: 0;
  height: 25px;
  margin: 10px;
  width: 25px;

  path {
    fill: ${theme.main.colors.blue.normal};
  }
`;
