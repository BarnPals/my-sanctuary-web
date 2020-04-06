// Dependencies
import styled from 'styled-components';
// Externals
import ColumnItem from 'components/primitives/ColumnItem';
import ColumnItemImage from 'components/primitives/ColumnItemImage';
import ColumnItemTitle from 'components/primitives/ColumnItemTitle';
import NavArrow from 'components/primitives/NavArrow';
import theme from 'assets/theme';

export const Wrapper = styled(ColumnItem)``;

export const StyledImage = styled(ColumnItemImage)``;

export const Title = styled(ColumnItemTitle)`
  flex-direction: column;
`;

export const TitleText = styled.div``;

export const CreatorAccountEmail = styled.div`
  color: ${theme.main.colors.greys.normal};
  font-size: ${theme.main.fontSizes.small};
`;

export const StyledArrow = styled(NavArrow)``;
