// Relative
import { NODE_ROWS } from './ITEMS';
import { BOARDS_LIST } from './NAV_ITEMS';
import { COLLAPSE_NAV, EXPAND_NAV, SELECT_ITEM, SELECT_NAV_ITEM } from './constants';

const initialState = {
  isNavCollapsed: false,
  selectedItem: NODE_ROWS,
  selectedNavItem: BOARDS_LIST,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLAPSE_NAV: {
      return { ...state, isNavCollapsed: true };
    }
    case EXPAND_NAV: {
      return { ...state, isNavCollapsed: false };
    }
    case SELECT_ITEM: {
      return { ...state, selectedItem: action.item };
    }
    case SELECT_NAV_ITEM: {
      return { ...state, selectedNavItem: action.navItem };
    }
    default: {
      return { ...state };
    }
  }
};
