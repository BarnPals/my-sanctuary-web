// Dependencies
import styled from 'styled-components';
// Externals
import Button from 'components/primitives/Button';
import LottieAnimation from 'components/primitives/LottieAnimation';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  display: flex;
  flex-flow: row-reverse;
  justify-content: space-between;
  min-height: 100vh;
  position: relative;
  width: 100%;

  @media (max-width: 1200px) {
    flex-flow: column;
  }
`;

export const StyledLottieAnimation = styled(LottieAnimation)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Content = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  min-height: 100vh;
  padding: 20px 50px;
  text-align: center;

  * {
    max-width: 450px;
  }

  @media (max-width: 1200px) {
    min-height: unset;
    padding: 50px 20px;
    width: 100%;
  }
`;

export const BoardImages = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  margin: 40px 0 20px;
  min-height: 114px;
  overflow-x: auto;
  padding: 0 10px 10px;
  width: 100%;
`;

export const BoardImage = styled.div`
  align-items: center;
  background-image: url(${({ src }) => src});
  background-position: 50%;
  background-size: cover;
  border-radius: ${theme.main.borderRadii.round};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-right: 20px;
  min-height: 100px;
  min-width: 100px;
  position: relative;
  transition: opacity 0.5s ease, box-shadow 0.5s ease;
`;

export const StyledButton = styled(Button)`
  align-items: center;
  background: ${theme.main.colors.blue.normal};
  color: ${theme.main.colors.white};
  display: flex;
  font-size: ${theme.main.fontSizes.normal};
  justify-content: center;
  margin: 25px 0 0;
  width: 100%;
`;
