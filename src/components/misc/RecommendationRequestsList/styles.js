// Dependencies
import styled from 'styled-components';
// Externals
import Arrow from 'assets/react-svgs/Arrow';
import Column from 'components/primitives/Column';
import PlusButton from 'components/primitives/PlusButton';
import ColumnHeader from 'components/primitives/ColumnHeader';
import ColumnItems from 'components/primitives/ColumnItems';
import ColumnTitle from 'components/primitives/ColumnTitle';
import theme from 'assets/theme';

export const Wrapper = styled(Column)``;

export const Header = styled(ColumnHeader)``;

export const CollapseIcon = styled(Arrow)`
  cursor: pointer;
  flex-shrink: 0;
  height: 20px;
  transform: rotate(90deg);
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  width: 20px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }

  @media (max-width: 650px) {
    visibility: hidden;
  }
`;

export const Title = styled(ColumnTitle)``;

export const AddItem = styled(PlusButton)`
  height: 20px;
  margin-left: 0;
  width: 20px;

  path {
    fill: ${theme.main.colors.greys.normal};
    transition: fill 0.5s ease;
  }

  &:hover {
    path {
      fill: ${theme.main.colors.blue.normal};
    }
  }
`;

export const List = styled(ColumnItems)`
  max-height: calc(100vh - 101px);
`;
