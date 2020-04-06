// Dependencies
import styled from 'styled-components';
// Externals
import Button from 'components/primitives/Button';
import theme from 'assets/theme';

export default styled(Button)`
  align-items: center;
  background: ${theme.main.colors.white};
  color: ${theme.main.colors.greys.shade};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
