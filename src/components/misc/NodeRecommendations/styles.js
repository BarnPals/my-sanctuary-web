// Dependencies
import styled from 'styled-components';
// Externals
import Back from 'components/primitives/Back';
import Bar from 'components/primitives/Bar';
import BarCenter from 'components/primitives/BarCenter';
import BarLeft from 'components/primitives/BarLeft';
import BarRight from 'components/primitives/BarRight';
import Page from 'components/primitives/Page';
import PlusButton from 'components/primitives/PlusButton';
import Present from 'assets/react-svgs/Present';
import Textarea from 'components/primitives/Textarea';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const Header = styled(Bar)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
`;

export const Left = styled(BarLeft)``;

export const StyledBackButton = styled(Back)``;

export const Center = styled(BarCenter)`
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
`;

export const Subtitle = styled.div`
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Right = styled(BarRight)``;

export const StyledTitle = styled.div`
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  margin: 20px 0 0;
`;

export const NoRecommendations = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  opacity: 0;
  width: 100%;
`;

export const NoRecommendationsIcon = styled(Present)`
  height: 200px;
  margin-left: 35px;
  width: 200px;

  svg,
  g,
  path {
    fill: ${theme.main.colors.greys.tint};
  }
`;

export const Recommendations = styled(Page)`
  padding: 20px 20px 70px;
`;

export const Recommendation = styled.div`
  background: ${theme.main.colors.white};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0 0 40px;
  max-width: 500px;
  overflow: visible;
  padding: 10px;
  position: relative;
  transition: box-shadow 0.5s ease;
  width: 100%;

  &:first-of-type {
    margin-top: auto !important;
  }

  &:last-of-type {
    margin: 0;
  }

  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const RecommendationStatus = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  text-align: center;
`;

export const RecommendationTimestamp = styled.div`
  border-radius: ${theme.main.borderRadii.round};
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.small};
  margin: 10px 0 0;
  text-align: center;
`;

export const CreateBar = styled(Bar)`
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  flex-shrink: 0;
  height: unset;
  padding: 0 20px;

  @media (max-width: 650px) {
    bottom: 0;
    position: fixed;
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

export const StyledButton = styled(PlusButton)``;
