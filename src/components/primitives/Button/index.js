// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  background: ${theme.main.colors.blue.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  line-height: 1.5;
  min-height: 51px;
  padding: 15px 30px;
  text-align: center;
  transition: background 0.5s ease, opacity 0.5s ease;

  ${({ disabled }) => (disabled ? 'cursor: not-allowed; opacity: 0.4;' : '')}
`;
