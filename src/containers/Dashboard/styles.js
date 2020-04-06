// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const NoContent = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  display: flex;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: 650px) {
    display: none;
  }
`;
