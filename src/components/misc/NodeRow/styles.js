// Dependencies
import styled from 'styled-components';
// Externals
import PlusButton from 'components/primitives/PlusButton';
import QuestionButton from 'components/primitives/QuestionButton';
import Row from 'components/primitives/Row';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  ${({ darkenBackground }) => (darkenBackground ? `background: ${theme.main.colors.background};` : '')}
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 280px;
  padding: 35px 20px 0 40px;
  width: 100%;

  @media (max-width: 650px) {
    padding: 35px 20px;
  }
`;

export const Nodes = styled(Row)``;

export const StyledQuestionWrapper = styled(QuestionButton)``;

export const StyledQuestionText = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
`;

export const StyledPlusButton = styled(PlusButton)`
  height: 15px;
  width: 15px;

  path {
    fill: ${theme.main.colors.greys.shade};
  }
`;
