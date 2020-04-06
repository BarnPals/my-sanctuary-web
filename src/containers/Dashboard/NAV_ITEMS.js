// Dependencies
import { lazy } from 'react';
// Externals
const BoardsList = lazy(() => import('components/misc/BoardsList'));
const RecommendationRequestsList = lazy(() => import('components/misc/RecommendationRequestsList'));
const SettingsList = lazy(() => import('components/misc/SettingsList'));

export const BOARDS_LIST = 'BOARDS_LIST';
export const RECOMMENDATION_REQUESTS_LIST = 'RECOMMENDATION_REQUESTS_LIST';
export const SETTINGS_LIST = 'SETTINGS_LIST';

export default {
  [BOARDS_LIST]: BoardsList,
  [RECOMMENDATION_REQUESTS_LIST]: RecommendationRequestsList,
  [SETTINGS_LIST]: SettingsList,
};
