// Dependencies
import get from 'lodash/get';
// Relative
import { UPDATE_MODAL_ID } from './constants';

export const updateModalIDAction = (id, options = {}) => ({
  id,
  hideClose: get(options, 'hideClose'),
  type: UPDATE_MODAL_ID,
});
