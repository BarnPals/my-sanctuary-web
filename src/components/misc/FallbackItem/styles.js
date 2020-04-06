// Dependencies
import styled from 'styled-components';
// Externals
import Bar from 'components/primitives/Bar';
import Page from 'components/primitives/Page';
import Spinner from 'components/misc/Spinner';
import theme from 'assets/theme';

export const Wrapper = styled(Page)``;

export const Header = styled(Bar)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};

  @media (max-width: 650px) {
    position: fixed;
    top: 0;
  }
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`;

export const StyledSpinner = styled(Spinner)``;
