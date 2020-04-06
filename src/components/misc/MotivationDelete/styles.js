// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 40px;
  z-index: 1;
`;

export const StyledTitle = styled.div`
  box-sizing: border-box;
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  padding: 0 0 20px;
  text-align: center;
`;

export const StyledActions = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 20px 0 0;
  width: 100%;

  @media (max-width: 650px) {
    flex-direction: column;
    flex-shrink: 0;
  }
`;

export const DeleteButton = styled.div`
  background: ${theme.main.colors.red.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  padding: 15px 20px;
`;

export const CancelButton = styled.div`
  background: ${theme.main.colors.white};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: ${theme.main.colors.greys.shade};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  margin-left: 20px;
  padding: 15px 20px;

  @media (max-width: 650px) {
    margin-top: 20px;
  }
`;
