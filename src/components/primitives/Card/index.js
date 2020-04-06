// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  background: ${theme.main.colors.white};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  margin: 0 20px 50px 0;
  min-height: 124px;
  position: relative;
  user-select: none;
  width: 250px;

  @media (max-width: 650px) {
    margin: 0 0 50px;

    &:last-of-type {
      margin: 0;
    }
  }
`;
