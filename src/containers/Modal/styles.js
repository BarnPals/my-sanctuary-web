// Dependencies
import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  padding: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
`;

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;
