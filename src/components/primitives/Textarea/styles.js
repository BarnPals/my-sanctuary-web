// Dependencies
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
// Externals
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const StyledTextarea = styled(TextareaAutosize)`
  border-radius: unset;
  border: none;
  box-shadow: unset;
  box-sizing: border-box;
  color: ${theme.main.colors.greys.shade};
  font-family: 'Lato', sans-serif, Helvetica, Arial;
  font-size: ${theme.main.fontSizes.normal};
  line-height: 1.5;
  outline: none;
  padding: 0;
  resize: none;
  width: 100%;
`;

export const CharCounter = styled.div`
  align-self: flex-end;
  bottom: 5px;
  color: ${({ color }) => color || theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.smaller};
  margin: 10px 0 0;
  opacity: ${({ hidden }) => (hidden ? '0' : '1')};
  position: absolute;
  right: 10px;
  text-align: right;
  transition: color 0.3s ease, opacity 0.3s ease;
`;
