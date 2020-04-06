// Dependencies
import styled from 'styled-components';
// Externals
import Arrow from 'assets/react-svgs/Arrow';
import Bar from 'components/primitives/Bar';
import BarLeft from 'components/primitives/BarLeft';
import BarRight from 'components/primitives/BarRight';
import Camera from 'assets/react-svgs/Camera';
import Checkmark from 'assets/react-svgs/Checkmark';
import Image from 'components/misc/Image';
import MobileBackIcon from 'components/primitives/MobileBackIcon';
import Notes from 'assets/react-svgs/Notes';
import Trash from 'assets/react-svgs/Trash';
import theme from 'assets/theme';

export const Wrapper = styled(Bar)`
  border-bottom: 1px solid ${theme.main.colors.greys.tint};
  justify-content: space-between;

  @media (max-width: 650px) {
    position: fixed;
    top: 0;
  }
`;

export const MobileBack = styled(MobileBackIcon)``;

export const ExpandNavButton = styled(Arrow)`
  cursor: pointer;
  flex-shrink: 0;
  height: 20px;
  display: ${({ hidden }) => (hidden ? 'none' : 'inherit')};
  margin-right: 10px;
  transform: rotate(90deg);
  width: 20px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

export const BoardImageOverlay = styled.div`
  background: ${theme.main.colors.black};
  border-radius: ${theme.main.borderRadii.circle};
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const BoardImage = styled(Image)`
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  cursor: pointer;
  height: 35px;
  width: 35px;
`;

export const UploadImageField = styled.input`
  display: none;
`;

export const CameraIcon = styled(Camera)`
  background: transparent;
  height: 20px;
  left: 7.5px;
  position: absolute;
  top: 7.5px;
  width: 20px;

  path {
    fill: ${theme.main.colors.white};
  }
`;

export const BoardImageWrapper = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 10px;
  position: relative;

  ${BoardImageOverlay} {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  ${CameraIcon} {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    ${BoardImageOverlay} {
      opacity: 0.4;
    }
    ${CameraIcon} {
      opacity: 1;
    }
  }
`;

export const BoardName = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${theme.main.colors.greys.shade};
  display: -webkit-box;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.normal};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Left = styled(BarLeft)`
  flex-grow: 1;
  flex-shrink: 0;
`;

export const Right = styled(BarRight)`
  flex-grow: 1;
  flex-shrink: 0;
`;

export const Item = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 15px;
`;

export const StyledCounter = styled.div`
  align-items: center;
  display: flex;
  color: ${theme.main.colors.greys.normal};
  margin-right: 5px;
`;

export const ResolvedIcon = styled(Checkmark)`
  cursor: pointer;
  height: 42px;
  width: 42px;

  path {
    fill: ${({ resolved }) => (resolved ? theme.main.colors.green.tint : theme.main.colors.greys.normal)};
    transition: fill 0.5s ease;
  }
`;

export const NotesIcon = styled(Notes)`
  cursor: pointer;
  height: 26px;
  width: 26px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;

export const DeleteIcon = styled(Trash)`
  cursor: pointer;
  height: 22px;
  margin-left: 8px;
  width: 22px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;
