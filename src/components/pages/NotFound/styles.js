// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Externals
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;

  * {
    flex-shrink: 0;
  }
`;

export const Title = styled.div`
  color: ${theme.main.colors.blue.tint};
  font-size: ${theme.main.fontSizes.larger};
  font-weight: ${theme.main.fontWeights.bold};
`;

export const StyledLink = styled(Link)`
  background: ${theme.main.colors.blue.normal};
  box-sizing: border-box;
  border-radius: ${theme.main.borderRadii.round};
  color: ${theme.main.colors.white};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 30px 0 0;
  padding: 10px 15px;
  text-align: center;
`;
