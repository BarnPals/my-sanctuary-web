// Dependencies
import styled from 'styled-components';
// Externals
import Card from 'components/primitives/Card';
import MotivationIcon from 'components/primitives/MotivationIcon';
import theme from 'assets/theme';

export const Wrapper = styled(Card)`
  background: ${theme.main.colors.blue.tint};
`;

export const Icon = styled(MotivationIcon)``;

export const Title = styled.div`
  box-sizing: border-box;
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  line-height: 1.5;
  overflow: hidden;
  padding: 10px 20px 20px 0;
`;
