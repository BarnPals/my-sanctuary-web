// Dependencies
import styled from 'styled-components';
// Externals
import Bar from 'components/primitives/Bar';
import PlusButton from 'components/primitives/PlusButton';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled(Bar)`
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  flex-shrink: 0;
  height: unset;
  padding: 0 20px;
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

export const StyledButton = styled(PlusButton)``;
