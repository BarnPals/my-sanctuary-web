// Dependencies
import styled from 'styled-components';
// Externals
import Motivation from 'assets/react-svgs/Motivation';
import theme from 'assets/theme';

export default styled(Motivation)`
  flex-shrink: 0;
  height: 25px;
  margin: 10px;
  width: 25px;

  path {
    fill: ${theme.main.colors.blue.normal};
  }
`;
