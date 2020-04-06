// Dependencies
import styled from 'styled-components';
// Externals
import Back from 'components/primitives/MobileBackIcon';
import Bar from 'components/primitives/Bar';
import BarCenter from 'components/primitives/BarCenter';
import BarLeft from 'components/primitives/BarLeft';
import BarRight from 'components/primitives/BarRight';
import ComingSoon from 'components/primitives/ComingSoon';
import ComingSoonIcon from 'components/primitives/ComingSoonIcon';
import Page from 'components/primitives/Page';
import theme from 'assets/theme';

export const Wrapper = styled(Page)``;

export const Header = styled(Bar)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};

  @media (max-width: 650px) {
    position: fixed;
    top: 0;
  }
`;

export const Left = styled(BarLeft)``;

export const StyledBackButton = styled(Back)``;

export const Center = styled(BarCenter)`
  color: ${theme.main.colors.greys.shade};
  font-weight: ${theme.main.fontWeights.bold};
`;

export const Right = styled(BarRight)``;

export const StyledComingSoon = styled(ComingSoon)``;

export const StyledComingSoonIcon = styled(ComingSoonIcon)``;
