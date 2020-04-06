// Dependencies
import styled from 'styled-components';
// Externals
import Column from 'components/primitives/Column';
import ColumnHeader from 'components/primitives/ColumnHeader';
import Spinner from 'components/misc/Spinner';

export const Wrapper = styled(Column)``;

export const Header = styled(ColumnHeader)``;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`;

export const StyledSpinner = styled(Spinner)``;
