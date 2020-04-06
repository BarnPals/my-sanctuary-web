// Externals
import CreateBoardFears from 'components/misc/CreateBoardFears';
import CreateBoardTitle from 'components/misc/CreateBoardTitle';

// Step names.
export const CREATE_BOARD_TITLE = 'CREATE_BOARD_TITLE';
export const CREATE_BOARD_FEARS = 'CREATE_BOARD_FEARS';

// Steps lookup.
export const stepsLookup = {
  [CREATE_BOARD_FEARS]: CreateBoardFears,
  [CREATE_BOARD_TITLE]: CreateBoardTitle,
};
