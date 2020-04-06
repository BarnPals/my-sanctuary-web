// Dependencies
import styled from 'styled-components';
// Externals
import Arrow from 'assets/react-svgs/Arrow';
import theme from 'assets/theme';

export default styled(Arrow)`
  flex-shrink: 0;
  height: 15px;
  margin-left: 10px;
  transform: rotate(270deg);
  width: 15px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;
