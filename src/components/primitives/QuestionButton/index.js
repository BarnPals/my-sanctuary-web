// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  align-items: center;
  background: ${theme.main.colors.greys.tint};
  border-radius: ${theme.main.borderRadii.round};
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  opacity: 0.3;
  margin: 0 0 35px;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;
