// Dependencies
import styled from 'styled-components';
// Externals
import ColumnItem from 'components/primitives/ColumnItem';
import ColumnItemTitle from 'components/primitives/ColumnItemTitle';
import NavArrow from 'components/primitives/NavArrow';
import theme from 'assets/theme';

export const Wrapper = styled(ColumnItem)``;

export const Title = styled(ColumnItemTitle)`
  flex-direction: column;
`;

export const TitleText = styled.div``;

export const CreatorAccountEmail = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.small};
  margin: 5px 0 0;
`;

export const Timestamp = styled.div`
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.small};
  margin: 5px 0 0;
`;

export const StyledArrow = styled(NavArrow)``;
