// Dependencies
import styled from 'styled-components';
// Externals
import BarRight from 'components/primitives/BarRight';
import Trash from 'assets/react-svgs/Trash';
import theme from 'assets/theme';

export const Wrapper = styled(BarRight)`
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const Item = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 15px;
`;

export const DeleteIcon = styled(Trash)`
  cursor: pointer;
  height: 22px;
  margin-left: 8px;
  width: 22px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;
