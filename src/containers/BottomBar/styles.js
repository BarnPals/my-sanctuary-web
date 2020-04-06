// Dependencies
import styled from 'styled-components';
// Externals
import Bar from 'components/primitives/Bar';
import Button from 'components/primitives/Button';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  width: 100%;
  z-index: 1;

  @media (max-width: 650px) {
    bottom: 0;
    position: fixed;
  }
`;

export const PreviousButton = styled(Button)`
  background: ${theme.main.colors.white};
  border-left: 1px solid ${theme.main.colors.greys.tint};
  border-radius: unset;
  border-right: 1px solid ${theme.main.colors.greys.tint};
  border-top-left-radius: ${theme.main.borderRadii.round};
  border-top-right-radius: ${theme.main.borderRadii.round};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  box-sizing: border-box;
  color: ${({ disabled }) => (disabled ? theme.main.colors.greys.normal : theme.main.colors.greys.shade)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  opacity: 1;
  text-align: center;
  left: 20px;
  min-height: unset;
  min-width: 100px;
  padding: 10px;
  position: absolute;
  top: -40px;
  z-index: 2;
`;

export const NextButton = styled(Button)`
  background: ${theme.main.colors.white};
  border-left: 1px solid ${theme.main.colors.greys.tint};
  border-radius: unset;
  border-right: 1px solid ${theme.main.colors.greys.tint};
  border-top-left-radius: ${theme.main.borderRadii.round};
  border-top-right-radius: ${theme.main.borderRadii.round};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  box-sizing: border-box;
  color: ${({ disabled }) => (disabled ? theme.main.colors.greys.normal : theme.main.colors.greys.shade)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  opacity: 1;
  text-align: center;
  min-height: unset;
  min-width: 100px;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: -40px;
  z-index: 2;
`;

export const NoContent = styled(Bar)`
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  padding: 20px 20px 10px;
  min-height: 51px;
`;
