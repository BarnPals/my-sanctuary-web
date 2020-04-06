// Dependencies
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    opacity: ${({ show }) => (show ? '1' : '0')};
    transition: opacity 1s ease;
  }
`;
