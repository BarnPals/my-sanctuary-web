// Dependencies
import styled from 'styled-components';
// Externals
import Brush from 'assets/react-svgs/Brush';
import Cog from 'assets/react-svgs/Cog';
import Column from 'components/primitives/Column';
import ColumnHeader from 'components/primitives/ColumnHeader';
import ColumnItem from 'components/primitives/ColumnItem';
import ColumnItemTitle from 'components/primitives/ColumnItemTitle';
import ColumnItems from 'components/primitives/ColumnItems';
import ColumnTitle from 'components/primitives/ColumnTitle';
import Data from 'assets/react-svgs/Data';
import Earth from 'assets/react-svgs/Earth';
import Image from 'components/misc/Image';
import Lock from 'assets/react-svgs/Lock';
import NavArrow from 'components/primitives/NavArrow';
import Notifications from 'assets/react-svgs/Notifications';
import Rocket from 'assets/react-svgs/Rocket';
import theme from 'assets/theme';

export const Wrapper = styled(Column)``;

export const Header = styled(ColumnHeader)``;

export const Title = styled(ColumnTitle)``;

export const List = styled(ColumnItems)``;

export const ProfileImage = styled(Image)`
  border-radius: ${theme.main.borderRadii.circle};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 50px;
  width: 50px;
`;

export const ProfileDetails = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 10px;
  max-width: 180px;

  @media (max-width: 650px) {
    margin-left: 0;
  }
`;

export const DisplayName = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Email = styled.div`
  color: ${theme.main.colors.greys.shade};
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Profile = styled(ColumnItem)`
  margin-bottom: 50px;
  padding: 20px;
`;

export const StyledArrow = styled(NavArrow)``;

export const GeneralIcon = styled(Cog)`
  background: #909090;
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  padding: 5px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const NotifcationsIcon = styled(Notifications)`
  background: ${theme.main.colors.red.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const LockIcon = styled(Lock)`
  background: ${theme.main.colors.blue.shade};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  padding: 5px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const DataIcon = styled(Data)`
  background: ${theme.main.colors.green.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  padding: 6px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const BrushIcon = styled(Brush)`
  background: ${theme.main.colors.blue.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const LanguageIcon = styled(Earth)`
  background: ${theme.main.colors.purple.tint};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  padding: 3px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const ReleaseNotesIcon = styled(Rocket)`
  background: ${theme.main.colors.orange.normal};
  border-radius: ${theme.main.borderRadii.round};
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 25px;
  padding: 5px;
  transition: background 0.5s ease;
  width: 25px;

  path {
    fill: ${theme.main.colors.white};
    transition: fill 0.5s ease;
  }
`;

export const Item = styled(ColumnItem)`
  ${GeneralIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${NotifcationsIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${LockIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${DataIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${BrushIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${LanguageIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }

  ${ReleaseNotesIcon} {
    ${({ selected }) => (selected ? `background: ${theme.main.colors.white}` : '')}

    path {
      fill: ${({ selected }) => (selected ? theme.main.colors.blue.normal : theme.main.colors.white)};
    }
  }
`;

export const ItemTitle = styled(ColumnItemTitle)``;
