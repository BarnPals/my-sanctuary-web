// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  align-items: center;
  color: ${theme.main.colors.greys.tint};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: ${theme.main.fontSizes.larger};
  font-weight: ${theme.main.fontWeights.bold};
  justify-content: center;
  width: 100%;
`;
