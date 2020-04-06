// Relative
import { RESET, SELECT_CREATE_BOARD_STEP, UPDATE_EXAMPLE_BOARD_FEARS, UPDATE_EXAMPLE_BOARD_NAME } from './constants';

export const resetAction = () => ({
  type: RESET,
});

export const selectCreateBoardStepAction = (stepID, options) => ({
  stepID,
  options,
  type: SELECT_CREATE_BOARD_STEP,
});

export const updateExampleBoardFearsAction = (fears) => ({
  fears,
  type: UPDATE_EXAMPLE_BOARD_FEARS,
});

export const updateExampleBoardNameAction = (boardName) => ({
  boardName,
  type: UPDATE_EXAMPLE_BOARD_NAME,
});
