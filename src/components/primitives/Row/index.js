// Dependencies
import styled from 'styled-components';

export default styled.div`
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  justify-content: flex-start;
  max-width: 100%;
  width: 100%;

  @media (max-width: 650px) {
    flex-flow: column nowrap;
  }
`;
