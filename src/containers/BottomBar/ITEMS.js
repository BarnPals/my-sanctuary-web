// Externals
import MotivationCreate from 'components/misc/MotivationCreate';
import MotivationUpdate from 'components/misc/MotivationUpdate';
import NodeCreate from 'components/misc/NodeCreate';
import NodeUpdate from 'components/misc/NodeUpdate';

export const MOTIVATION_CREATE = 'MOTIVATION_CREATE';
export const MOTIVATION_UPDATE = 'MOTIVATION_UPDATE';
export const NODE_CREATE = 'NODE_CREATE';
export const NODE_UPDATE = 'NODE_UPDATE';

export default {
  [MOTIVATION_CREATE]: MotivationCreate,
  [MOTIVATION_UPDATE]: MotivationUpdate,
  [NODE_CREATE]: NodeCreate,
  [NODE_UPDATE]: NodeUpdate,
};
