// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    background: transparent;
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.main.colors.greys.normal};
    background-clip: padding-box;
    border-right: 2px solid rgba(0, 0, 0, 0);
    height: 6px;
    width: 6px;
  }
`;
