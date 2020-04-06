// Dependencies
import styled from 'styled-components';
// Externals
import Bar from 'components/primitives/Bar';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled(Bar)`
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  flex-direction: column;
  flex-shrink: 0;
  height: unset;
  padding: 10px 20px 20px;
`;

export const StyledField = styled(Textarea)`
  margin-left: 10px;
  padding: 10px 0 0;

  textarea {
    color: ${theme.main.colors.greys.shade};
    font-weight: ${theme.main.fontWeights.bold};

    &::placeholder {
      color: ${theme.main.colors.greys.normal};
      font-weight: ${theme.main.fontWeights.bold};
    }
  }
`;
