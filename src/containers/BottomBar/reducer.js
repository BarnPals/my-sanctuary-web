// Relative
import { SELECT_BOTTOM_BAR_ITEM } from './constants';

const initialState = {
  selectedBottomBarItem: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_BOTTOM_BAR_ITEM: {
      return { ...state, selectedBottomBarItem: action.item };
    }
    default: {
      return { ...state };
    }
  }
};
