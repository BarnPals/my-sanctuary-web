// Dependencies
import styled from 'styled-components';
// Externals
import Page from 'components/primitives/Page';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const Rows = styled(Page)`
  padding: 0 0 calc(100vh - 430px);

  @media (max-width: 650px) {
    padding: 70px 0 calc(50vh + 70px);
  }
`;
