// Dependencies
import styled from 'styled-components';
// Externals
import Present from 'assets/react-svgs/Present';
import theme from 'assets/theme';

export default styled(Present)`
  height: 50px;
  width: 50px;
  margin-bottom: 10px;

  path {
    fill: ${theme.main.colors.greys.tint};
  }
`;
