// Dependencies
import styled from 'styled-components';
// Externals
import BackIcon from 'components/primitives/BackIcon';

export default styled(BackIcon)`
  cursor: pointer;
  display: none;
  margin-right: 10px;

  @media (max-width: 650px) {
    display: initial;
  }
`;
