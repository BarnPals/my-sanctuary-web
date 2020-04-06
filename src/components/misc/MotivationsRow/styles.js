// Dependencies
import styled from 'styled-components';
// Externals
import Node from 'components/misc/Node';
import PlusButton from 'components/primitives/PlusButton';
import Row from 'components/primitives/Row';
import QuestionButton from 'components/primitives/QuestionButton';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 280px;
  padding: 35px 20px 0 40px;
  width: 100%;

  @media (max-width: 650px) {
    min-height: unset;
    padding: 35px 20px;
  }
`;

export const StyledRow = styled(Row)``;

export const StyledNode = styled(Node)``;

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
