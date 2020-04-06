// Dependencies
import styled from 'styled-components';
// Externals
import Fear from 'assets/react-svgs/Fear';
import theme from 'assets/theme';

export default styled(Fear)`
  flex-shrink: 0;
  height: 25px;
  margin: 10px;
  width: 25px;

  path {
    fill: ${theme.main.colors.red.normal};
  }
`;
