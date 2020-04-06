// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: 50px;
  justify-content: space-around;
  padding: 10px 20px;
  width: 100%;
  z-index: 1;

  @media (max-width: 650px) {
    position: fixed;
    top: 0;
  }
`;
