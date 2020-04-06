// Relative
import { UPDATE_MODAL_ID } from './constants';

const initialState = {
  hideClose: false,
  id: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODAL_ID: {
      return { ...state, hideClose: action.hideClose, id: action.id };
    }
    default: {
      return { ...state };
    }
  }
};
