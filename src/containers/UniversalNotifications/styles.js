// Dependencies
import styled from 'styled-components';
// Externals
import Close from 'assets/react-svgs/Close';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.blue.shade};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  left: 0;
  line-height: 1.5;
  overflow: hidden;
  padding: 20px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  /* @TODO: Create a z-index structure for the whole app. */
  z-index: 9999;

  @media (max-width: 880px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const StyledRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  @media (max-width: 880px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const CloseIcon = styled(Close)`
  flex-shrink: 0;
  margin: 0 -10px 0 15px;
  width: 20px;

  g,
  path {
    stroke: ${theme.main.colors.white};
  }

  @media (max-width: 880px) {
    margin: 10px 0 0;
  }
`;

export const Message = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Action = styled.div`
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 0 0 0 10px;
  transition: color 0.5s ease;

  &:hover {
    color: ${theme.main.colors.blue.tint};
  }

  @media (max-width: 880px) {
    margin: 10px 0 0;
  }
`;
