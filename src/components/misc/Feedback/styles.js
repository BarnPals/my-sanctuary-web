// Dependencies
import styled from 'styled-components';
// Externals
import Button from 'components/primitives/Button';
import Close from 'assets/react-svgs/Close';
import Feedback from 'assets/react-svgs/Feedback';
import Label from 'components/primitives/Label';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  bottom: 20px;
  display: flex;
  flex-direction: column;
  left: 20px;
  position: fixed;
  z-index: 9999999;
`;

export const FeedbackWindow = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-between;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  width: 300px;

  * {
    flex-shrink: 0;
  }
`;

export const StyledLabel = styled(Label)``;

export const FieldWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 220px;
  overflow-y: auto;
  width: 100%;
`;

export const FeedbackField = styled(Textarea)`
  border-radius: unset;
  border: none;
  box-shadow: none;
  padding: 5px 0;

  &:focus {
    box-shadow: none;
  }
`;

export const SendButton = styled(Button)`
  background: ${theme.main.colors.blue.tint};
  color: ${theme.main.colors.white};
  margin: 20px 0 0;

  &:hover {
    background: ${theme.main.colors.blue.tint};
    color: ${theme.main.colors.white};
  }
`;

export const FeedbackBubble = styled.div`
  align-items: center;
  background: ${theme.main.colors.blue.tint};
  border-radius: ${theme.main.borderRadii.circle};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 75px;
  justify-content: center;
  padding: 18px;
  width: 75px;
`;

export const FeedbackCloseIcon = styled(Close)`
  cursor: pointer;
  height: 80%;
  width: 80%;

  svg,
  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const FeedbackShowIcon = styled(Feedback)`
  cursor: pointer;
  height: 100%;
  width: 100%;

  svg,
  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;
