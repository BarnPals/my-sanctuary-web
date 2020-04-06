// Dependencies
import styled from 'styled-components';
// Externals
import Trash from 'assets/react-svgs/Trash';
import theme from 'assets/theme';

export default styled(Trash)`
  align-items: center;
  background: ${theme.main.colors.greys.tint};
  border-radius: ${theme.main.borderRadii.circle};
  border: 3px solid ${theme.main.colors.white};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  padding: 5px;
  position: absolute;
  right: -15px;
  top: -15px;
  transition: background 0.5s ease;
  width: 30px;
  z-index: 1;

  path {
    fill: ${theme.main.colors.white};
  }

  &:hover {
    background: ${theme.main.colors.red.normal};
  }
`;
