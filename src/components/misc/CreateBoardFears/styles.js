// Dependencies
import styled from 'styled-components';
// Externals
import Button from 'components/primitives/Button';
import Drag from 'assets/react-svgs/Drag';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTitle = styled.div`
  animation-delay: 0.5s;
  color: ${theme.main.colors.blue.normal};
  font-size: ${theme.main.fontSizes.larger};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 0 0 40px;
  opacity: 0;
`;

export const StyledText = styled.div`
  animation-delay: 1s;
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.large};
  line-height: 1.5;
  opacity: 0;
`;

export const StyledField = styled(Textarea)`
  animation-delay: 2s;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: ${theme.main.borderRadii.round};
  margin: 40px 0 20px;
  opacity: 0;
  padding: 15px 10px;
`;

export const StyledButton = styled(Button)`
  animation-delay: 2s;
  background: ${theme.main.colors.blue.normal};
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};
  opacity: 0;
`;

export const Fears = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 40px 0 0;
  outline: none;
  padding: 0;
  position: relative;
  width: 100%;
`;

export const Fear = styled.div`
  align-items: center;
  background: ${theme.main.colors.red.normal};
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: grab;
  display: flex;
  font-size: ${theme.main.fontSizes.small};
  font-weight: ${theme.main.fontWeights.bold};
  padding: 15px 10px;
  text-align: left;
  user-select: none;
  width: 100%;
`;

export const StyledPosition = styled.div`
  align-items: center;
  border-radius: ${theme.main.borderRadii.circle};
  border: 2px solid ${theme.main.colors.white};
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  display: flex;
  font-size: ${theme.main.fontSizes.small};
  height: 20px;
  justify-content: center;
  margin: 0 10px 0;
  padding: 3px;
  width: 20px;
`;

export const StyledDragIcon = styled(Drag)`
  cursor: grab;
  height: 20px;
  width: 20px;
  min-width: 20px;
  margin-right: 10px;

  @media (max-width: 880px) {
    display: none;
  }
`;

export const NextButton = styled(Button)`
  background: ${theme.main.colors.blue.normal};
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 40px 0 0;
  opacity: 0;
`;
