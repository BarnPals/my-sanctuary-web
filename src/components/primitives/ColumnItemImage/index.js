// Dependencies
import styled from 'styled-components';
// Externals
import Image from 'components/misc/Image';
import theme from 'assets/theme';

export default styled(Image)`
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 50px;
  width: 50px;
`;
