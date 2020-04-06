// Dependencies
import get from 'lodash/get';
// Relative
import { CREATE_BOARD_TITLE } from './STEPS';
import { RESET, SELECT_CREATE_BOARD_STEP, UPDATE_EXAMPLE_BOARD_FEARS, UPDATE_EXAMPLE_BOARD_NAME } from './constants';

const initialState = {
  boardName: '',
  fears: [],
  showWelcome: false,
  stepID: CREATE_BOARD_TITLE,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      return { ...initialState };
    }
    case SELECT_CREATE_BOARD_STEP: {
      return { ...state, showWelcome: get(action, 'options.showWelcome', false), stepID: action.stepID };
    }
    case UPDATE_EXAMPLE_BOARD_FEARS: {
      return { ...state, fears: action.fears };
    }
    case UPDATE_EXAMPLE_BOARD_NAME: {
      return { ...state, boardName: action.boardName };
    }
    default: {
      return { ...state };
    }
  }
};
