// Dependencies
import styled from 'styled-components';
// Externals
import Cog from 'assets/react-svgs/Cog';
import Grid from 'assets/react-svgs/Grid';
import Robot from 'assets/react-svgs/Robot';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  border-right: 1px solid ${theme.main.colors.greys.tint};
  display: ${({ hiddenOnLarge }) => (hiddenOnLarge ? 'none' : 'flex')};
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  width: 300px;

  @media (max-width: 650px) {
    display: ${({ hiddenOnMobile }) => (hiddenOnMobile ? 'none' : 'flex')};
    width: ${({ hiddenOnMobile }) => (hiddenOnMobile ? 'inherit' : '100%')};
  }
`;

export const NoNavItem = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const Navbar = styled.div`
  align-items: center;
  background: ${theme.main.colors.white};
  border-top: 1px solid ${theme.main.colors.greys.tint};
  display: flex;
  flex-shrink: 0;
  height: 50px;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 650px) {
    bottom: 0;
    position: fixed;
  }
`;

export const BoardsIcon = styled(Grid)`
  cursor: pointer;
  height: 30px;
  width: 30px;

  path {
    fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.greys.normal)};
  }
`;

export const RecommendationsIcon = styled(Robot)`
  cursor: pointer;
  height: 25px;
  width: 30px;

  path {
    fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.greys.normal)};
  }
`;

export const SettingsIcon = styled(Cog)`
  cursor: pointer;
  height: 25px;
  width: 30px;

  path {
    fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.greys.normal)};
  }
`;
