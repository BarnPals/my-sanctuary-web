// Dependencies
import { lazy } from 'react';
// Externals
const CropProfileImage = lazy(() => import('components/misc/CropProfileImage'));
const CropBoardImage = lazy(() => import('components/misc/CropBoardImage'));
const NodeDelete = lazy(() => import('components/misc/NodeDelete'));
const MotivationDelete = lazy(() => import('components/misc/MotivationDelete'));

// Export modalIDs.
export const CROP_PROFILE_IMAGE = 'CROP_PROFILE_IMAGE';
export const CROP_BOARD_IMAGE = 'CROP_BOARD_IMAGE';
export const NODE_DELETE = 'NODE_DELETE';
export const MOTIVATION_DELETE = 'MOTIVATION_DELETE';

// Export modalsLookup
export const MODALS_LOOKUP = {
  [CROP_PROFILE_IMAGE]: {
    Content: CropProfileImage,
  },
  [CROP_BOARD_IMAGE]: {
    Content: CropBoardImage,
  },
  [NODE_DELETE]: {
    Content: NodeDelete,
  },
  [MOTIVATION_DELETE]: {
    Content: MotivationDelete,
  },
};
