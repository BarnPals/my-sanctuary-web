// Externals
import allReducers from 'store/reducers';
// Relative
import { RESET_APP } from './constants';

export default (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined;
  }

  return allReducers(state, action);
};
