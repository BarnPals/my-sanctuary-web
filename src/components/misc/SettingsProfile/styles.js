// Dependencies
import styled from 'styled-components';
// Externals
import Back from 'components/primitives/MobileBackIcon';
import Bar from 'components/primitives/Bar';
import BarCenter from 'components/primitives/BarCenter';
import BarLeft from 'components/primitives/BarLeft';
import BarRight from 'components/primitives/BarRight';
import Camera from 'assets/react-svgs/Camera';
import Field from 'components/primitives/Field';
import Image from 'components/misc/Image';
import Page from 'components/primitives/Page';
import theme from 'assets/theme';

export const Wrapper = styled(Page)``;

export const Header = styled(Bar)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};

  @media (max-width: 650px) {
    position: fixed;
    top: 0;
  }
`;

export const Left = styled(BarLeft)``;

export const StyledBackButton = styled(Back)``;

export const Center = styled(BarCenter)`
  color: ${theme.main.colors.greys.shade};
  font-weight: ${theme.main.fontWeights.bold};
`;

export const Right = styled(BarRight)``;

export const ProfileGroup = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: 10px 20px;
  width: 100%;

  @media (max-width: 650px) {
    padding: 70px 20px 10px;
  }
`;

export const ProfileImageWrapper = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 10px;
  position: relative;
`;

export const ProfileImageOverlay = styled.div`
  background: ${theme.main.colors.black};
  border-radius: ${theme.main.borderRadii.circle};
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const ProfileImage = styled(Image)`
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  width: 50px;
`;

export const UploadImageField = styled.input`
  display: none;
`;

export const CameraIcon = styled(Camera)`
  background: transparent;
  height: 20px;
  left: 15px;
  position: absolute;
  top: 15px;
  width: 20px;

  path {
    fill: ${theme.main.colors.white};
  }
`;

export const DisplayNameField = styled(Field)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
  color: ${theme.main.colors.greys.shade};
  font-weight: ${theme.main.fontWeights.normal};

  &::placeholder {
    color: ${theme.main.colors.greys.normal};
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${theme.main.colors.white} inset;
    -webkit-text-fill-color: ${theme.main.colors.greys.shade};
  }
`;

export const StyledButton = styled.div`
  color: ${({ disabled }) => (disabled ? theme.main.colors.greys.tint : theme.main.colors.blue.normal)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  margin-left: 10px;
  transition: color 0.5s ease;
`;

export const StyledLink = styled.div`
  align-self: flex-start;
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
  box-sizing: border-box;
  color: ${({ color }) => color || theme.main.colors.greys.shade};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.normal};
  margin: 10px 20px 0;
  padding: 10px 0;
  width: calc(100% - 40px);
`;
