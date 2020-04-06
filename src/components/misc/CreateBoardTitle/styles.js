// Dependencies
import styled from 'styled-components';
// Externals
import Button from 'components/primitives/Button';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTitle = styled.div`
  color: ${theme.main.colors.blue.normal};
  font-size: ${theme.main.fontSizes.larger};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 0 0 40px;
  opacity: 0;
`;

export const StyledText = styled.div`
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.large};
  opacity: 0;
`;

export const NameField = styled(Textarea)`
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 40px 0;
  opacity: 0;
  padding: 15px 10px;
`;

export const NextButton = styled(Button)`
  background: ${theme.main.colors.blue.normal};
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};
  opacity: 0;
`;
