// Dependencies
import styled from 'styled-components';
// Externals
import Card from 'components/primitives/Card';
import Checkmark from 'assets/react-svgs/Checkmark';
import Notes from 'assets/react-svgs/Notes';
import theme from 'assets/theme';

export const Wrapper = styled(Card)``;

export const Title = styled.div`
  box-sizing: border-box;
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  line-height: 1.5;
  overflow: hidden;
  padding: 10px 20px 20px 0;
`;

export const NodeIndicators = styled.div`
  align-items: center;
  display: flex;
  right: -13.5px;
  position: absolute;
  top: -15px;
`;

export const RecommendationsCounter = styled.div`
  align-items: center;
  background: ${theme.main.colors.red.normal};
  border-radius: ${theme.main.borderRadii.circle};
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: pointer;
  display: flex;
  font-size: ${theme.main.fontSizes.small};
  height: 25px;
  justify-content: center;
  margin-right: 0;
  overflow: visible;
  padding: 5px;
  width: 25px;
  z-index: 1;
`;

export const ResolvedIcon = styled(Checkmark)`
  background: ${theme.main.colors.green.tint};
  border-radius: ${theme.main.borderRadii.circle};
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 25px;
  margin-right: 10px;
  overflow: visible;
  width: 25px;
  z-index: 1;

  svg,
  g,
  path {
    fill: ${theme.main.colors.white};
  }
`;

export const NotesCounter = styled(Notes)`
  background: ${theme.main.colors.orange.tint};
  border-radius: ${theme.main.borderRadii.circle};
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  margin-right: 10px;
  overflow: visible;
  padding: 5px;
  width: 25px;
  z-index: 1;

  svg,
  g,
  path {
    fill: ${theme.main.colors.white};
  }
`;
