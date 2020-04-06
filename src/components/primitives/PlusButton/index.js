// Dependencies
import styled from 'styled-components';
// Externals
import Plus from 'assets/react-svgs/Plus';
import theme from 'assets/theme';

export default styled(Plus)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
  height: 25px;
  margin-left: 10px;
  width: 25px;

  path {
    fill: ${({ disabled }) => (disabled ? theme.main.colors.greys.normal : theme.main.colors.blue.normal)};
  }
`;
