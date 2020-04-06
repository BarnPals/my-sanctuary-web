// Dependencies
import styled from 'styled-components';
// Externals
import Spinner from 'components/misc/Spinner';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`;

export const StyledSpinner = styled(Spinner)`
  transform: scale(1.2);
`;
