// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Externals
import Button from 'components/primitives/Button';
import Field from 'components/primitives/Field';
import GoogleButton from 'components/primitives/GoogleButton';
import GoogleIcon from 'components/primitives/GoogleIcon';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;

  * {
    flex-shrink: 0;
  }
`;

export const Well = styled.div`
  align-items: center;
  background: ${theme.main.colors.blue.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 6px 20px -1px rgba(19, 38, 56, 0.2);
  box-sizing: border-box;
  display: flex;
  padding: 45px 35px;
  margin: 40px 20px;
  flex-direction: column;
  max-width: 400px;
  width: calc(100% - 40px);

  @media (max-width: 650px) {
    border-radius: unset;
    flex-grow: 1;
    margin: 0;
    max-width: unset;
    width: 100%;
  }
`;

export const Title = styled.div`
  color: ${theme.main.colors.white};
  font-size: ${theme.main.fontSizes.larger};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 0 0 40px;
`;

export const EmailField = styled(Field)`
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};

  &::placeholder {
    color: ${theme.main.colors.white};
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${theme.main.colors.blue.normal} inset;
    -webkit-text-fill-color: ${theme.main.colors.white};
  }
`;

export const PasswordField = styled(Field)`
  color: ${theme.main.colors.white};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 20px 0 0;

  &::placeholder {
    color: ${theme.main.colors.white};
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${theme.main.colors.blue.normal} inset;
    -webkit-text-fill-color: ${theme.main.colors.white};
  }
`;

export const StyledButton = styled(Button)`
  align-items: center;
  background: ${theme.main.colors.white};
  color: ${theme.main.colors.greys.shade};
  display: flex;
  justify-content: center;
  margin: 40px 0 20px;
  width: 100%;
`;

export const StyledGoogleButton = styled(GoogleButton)`
  width: 100%;
`;

export const StyledGoogleIcon = styled(GoogleIcon)``;

export const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 40px 0 0;
  width: 100%;
`;

export const LinkButton = styled(Link)`
  color: ${theme.main.colors.white};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 20px 0 0;
`;
