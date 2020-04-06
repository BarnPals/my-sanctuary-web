// Dependencies
import styled from 'styled-components';
// Externals
import Bar from 'components/primitives/Bar';
import BarLeft from 'components/primitives/BarLeft';
import Motivation from 'assets/react-svgs/Motivation';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled(Bar)`
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  flex-shrink: 0;
  height: unset;
  padding: 0 20px;
`;

export const Left = styled(BarLeft)`
  flex-grow: 1;
  flex-shrink: 0;

  @media (max-width: 650px) {
    align-items: flex-start;
  }
`;

export const MotivationIcon = styled(Motivation)`
  background: ${theme.main.colors.blue.tint};
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  flex-shrink: 0;
  height: 35px;
  padding: 5px;
  width: 35px;

  path {
    fill: ${theme.main.colors.blue.normal};
  }
`;

export const StyledField = styled(Textarea)`
  margin-left: 10px;

  textarea {
    color: ${theme.main.colors.greys.shade};
    font-weight: ${theme.main.fontWeights.bold};

    &::placeholder {
      color: ${theme.main.colors.greys.normal};
      font-weight: ${theme.main.fontWeights.bold};
    }
  }
`;
