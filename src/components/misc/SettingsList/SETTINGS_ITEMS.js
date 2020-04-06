// Externals
import {
  SETTINGS_APPEARANCE,
  SETTINGS_DATA,
  SETTINGS_GENERAL,
  SETTINGS_LANGUAGE,
  SETTINGS_NOTIFICATIONS,
  SETTINGS_PRIVACY,
  SETTINGS_RELEASES,
} from 'containers/Dashboard/ITEMS';
// Relative
import { GeneralIcon, NotifcationsIcon, LockIcon, DataIcon, BrushIcon, LanguageIcon, ReleaseNotesIcon } from './styles';

export default [
  {
    id: SETTINGS_GENERAL,
    title: 'General',
    ItemIcon: GeneralIcon,
  },
  {
    id: SETTINGS_NOTIFICATIONS,
    title: 'Notifications and Sounds',
    ItemIcon: NotifcationsIcon,
  },
  {
    id: SETTINGS_PRIVACY,
    title: 'Privacy and Security',
    ItemIcon: LockIcon,
  },
  {
    id: SETTINGS_DATA,
    title: 'Data and Storage',
    ItemIcon: DataIcon,
  },
  {
    id: SETTINGS_APPEARANCE,
    title: 'Appearance',
    ItemIcon: BrushIcon,
  },
  {
    id: SETTINGS_LANGUAGE,
    title: 'Language',
    ItemIcon: LanguageIcon,
  },
  {
    id: SETTINGS_RELEASES,
    title: 'Release Notes',
    ItemIcon: ReleaseNotesIcon,
  },
];
