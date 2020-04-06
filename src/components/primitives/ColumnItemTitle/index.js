// Dependencies
import styled from 'styled-components';
// Externals
import theme from 'assets/theme';

export default styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${theme.main.colors.greys.shade};
  display: -webkit-box;
  flex-grow: 1;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.normal};
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
