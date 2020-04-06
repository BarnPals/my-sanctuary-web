// Dependencies
import { lazy } from 'react';
// Externals
const SettingsAppearance = lazy(() => import('components/misc/SettingsAppearance'));
const SettingsData = lazy(() => import('components/misc/SettingsData'));
const SettingsGeneral = lazy(() => import('components/misc/SettingsGeneral'));
const SettingsLanguage = lazy(() => import('components/misc/SettingsLanguage'));
const SettingsNotifications = lazy(() => import('components/misc/SettingsNotifications'));
const SettingsPrivacy = lazy(() => import('components/misc/SettingsPrivacy'));
const SettingsProfile = lazy(() => import('components/misc/SettingsProfile'));
const SettingsReleases = lazy(() => import('components/misc/SettingsReleases'));
const NodeRows = lazy(() => import('components/misc/NodeRows'));
const NodeNotes = lazy(() => import('components/misc/NodeNotes'));
const NodeRecommendations = lazy(() => import('components/misc/NodeRecommendations'));

export const SETTINGS_APPEARANCE = 'SETTINGS_APPEARANCE';
export const SETTINGS_DATA = 'SETTINGS_DATA';
export const SETTINGS_GENERAL = 'SETTINGS_GENERAL';
export const SETTINGS_LANGUAGE = 'SETTINGS_LANGUAGE';
export const SETTINGS_NOTIFICATIONS = 'SETTINGS_NOTIFICATIONS';
export const SETTINGS_PRIVACY = 'SETTINGS_PRIVACY';
export const SETTINGS_PROFILE = 'SETTINGS_PROFILE';
export const SETTINGS_RELEASES = 'SETTINGS_RELEASES';
export const NODE_ROWS = 'NODE_ROWS';
export const NODE_NOTES = 'NODE_NOTES';
export const NODE_RECOMMENDATIONS = 'NODE_RECOMMENDATIONS';

export default {
  [SETTINGS_APPEARANCE]: SettingsAppearance,
  [SETTINGS_DATA]: SettingsData,
  [SETTINGS_GENERAL]: SettingsGeneral,
  [SETTINGS_LANGUAGE]: SettingsLanguage,
  [SETTINGS_NOTIFICATIONS]: SettingsNotifications,
  [SETTINGS_PRIVACY]: SettingsPrivacy,
  [SETTINGS_PROFILE]: SettingsProfile,
  [SETTINGS_RELEASES]: SettingsReleases,
  [NODE_ROWS]: NodeRows,
  [NODE_NOTES]: NodeNotes,
  [NODE_RECOMMENDATIONS]: NodeRecommendations,
};
