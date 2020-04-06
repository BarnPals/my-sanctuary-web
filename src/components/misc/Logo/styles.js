// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Externals
import Logo from 'assets/react-svgs/Logo';
import theme from 'assets/theme';

export const Wrapper = styled(Link)`
  align-items: center;
  display: flex;
  user-select: none;
`;

export const LogoIcon = styled(Logo)`
  border-radius: 12px;
  height: 80px;
  margin-right: 20px;
  width: 80px;
`;

export const LogoText = styled.div`
  color: #3b94d0;
  font-family: 'Pacifico', cursive;
  font-size: ${theme.main.fontSizes.largest};
  text-decoration: none;
`;
