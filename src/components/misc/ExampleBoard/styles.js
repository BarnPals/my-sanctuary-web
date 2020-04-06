// Dependencies
import styled from 'styled-components';
// Externals
import Close from 'assets/react-svgs/Close';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: radial-gradient(circle, ${theme.main.colors.blue.tint} 0%, ${theme.main.colors.blue.normal} 100%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  min-height: 100vh;
  padding: 20px 50px;
  position: relative;

  @media (max-width: 1200px) {
    min-height: unset;
    padding: 50px 20px;
    width: 100%;
  }
`;

export const CloseIcon = styled(Close)`
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: 20px;
  top: 20px;

  svg,
  g,
  path {
    fill: ${theme.main.colors.white};
  }

  @media (max-width: 1200px) {
    right: 10px;
    top: 10px;
  }
`;

export const Well = styled.div`
  align-items: center;
  background: ${theme.main.colors.greys.tint};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 50px 30px;
  position: relative;

  @media (max-width: 1200px) {
    padding: 20px;
  }
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
  min-height: 50px;
  min-width: 50px;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: opacity 0.5s ease, box-shadow 0.5s ease;

  @media (max-width: 1200px) {
    min-height: 30px;
    min-width: 30px;
    right: 10px;
    top: 10px;
  }
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0 50px;

  &:last-of-type {
    margin: 0;
  }

  @media (max-width: 1200px) {
    margin: 0 0 30px;
  }
`;

export const Card = styled.div`
  background: ${({ color }) => color};
  border-radius: ${theme.main.borderRadii.round};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 20px 0 0;
  padding: 15px;
  height: 150px;
  width: 150px;
  max-width: 150px;
  overflow: hidden;
  transition: background 1s ease;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 1200px) {
    margin: 0 15px 0 0;
    height: 80px;
    width: 80px;
  }
`;

export const CardTitle = styled.div`
  color: ${theme.main.colors.white};
  font-size: ${theme.main.fontSizes.normal};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 1200px) {
    font-size: ${theme.main.fontSizes.small};
  }
`;

export const CardTitleBlank = styled.div`
  background: ${theme.main.colors.greys.tint};
  border-radius: 4px;
  height: 15px;
  margin: 0 0 10px;
  width: 80%;

  &:first-of-type {
    width: 100%;
  }

  &:nth-of-type(3) {
    width: 60%;
  }

  @media (max-width: 1200px) {
    height: 6px;
  }
`;
