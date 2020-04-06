import { APP_INIT } from './constants';

export const appInitAction = (options = {}) => ({
  options,
  type: APP_INIT,
});
