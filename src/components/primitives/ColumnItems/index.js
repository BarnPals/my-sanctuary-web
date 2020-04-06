// Dependencies
import styled from 'styled-components';

export default styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0 10px;
  width: 100%;

  @media (max-width: 650px) {
    padding: 70px 0;
  }
`;
