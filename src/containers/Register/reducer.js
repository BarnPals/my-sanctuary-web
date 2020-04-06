// Relative
import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from './constants';

const initialState = {
  error: '',
  registering: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      return { ...state, registering: true, error: '' };
    }
    case REGISTER_FAILURE: {
      return { ...state, registering: false, error: action.error };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registering: false, error: '' };
    }
    default: {
      return { ...state };
    }
  }
};
