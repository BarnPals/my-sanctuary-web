// Dependencies
import styled from 'styled-components';
// Externals
import Arrow from 'assets/react-svgs/Arrow';
import theme from 'assets/theme';

export default styled(Arrow)`
  flex-shrink: 0;
  height: 20px;
  transform: rotate(90deg);
  width: 20px;

  path {
    fill: ${theme.main.colors.blue.normal};
  }
`;
