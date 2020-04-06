import { COLLAPSE_NAV, EXPAND_NAV, SELECT_ITEM, SELECT_NAV_ITEM } from './constants';

export const collapseNavAction = () => ({
  type: COLLAPSE_NAV,
});

export const expandNavAction = () => ({
  type: EXPAND_NAV,
});

export const selectItemAction = (item) => ({
  item,
  type: SELECT_ITEM,
});

export const selectNavItemAction = (navItem) => ({
  navItem,
  type: SELECT_NAV_ITEM,
});
