import {
  CREATE_BOARD,
  CREATE_BOARD_FAILURE,
  CREATE_BOARD_SUCCESS,
  DELETE_BOARD,
  DELETE_BOARD_FAILURE,
  DELETE_BOARD_SUCCESS,
  GET_BOARDS,
  GET_BOARDS_FAILURE,
  GET_BOARDS_SUCCESS,
  SELECT_BOARD,
  UPDATE_BOARD,
  UPDATE_BOARD_FAILURE,
  UPDATE_BOARD_IN_LOOKUP,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_IMAGE_URL,
} from './constants';

// ====================
// CREATE
// ====================
export const createBoardAction = (board) => ({
  board,
  type: CREATE_BOARD,
});

export const createBoardFailure = (error) => ({
  error,
  type: CREATE_BOARD_FAILURE,
});

export const createBoardSuccess = () => ({
  type: CREATE_BOARD_SUCCESS,
});

// ====================
// DELETE
// ====================
export const deleteBoardAction = (board) => ({
  board,
  type: DELETE_BOARD,
});

export const deleteBoardFailure = (error) => ({
  error,
  type: DELETE_BOARD_FAILURE,
});

export const deleteBoardSuccess = () => ({
  type: DELETE_BOARD_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getBoardsAction = (options = {}) => ({
  options,
  type: GET_BOARDS,
});

export const getBoardsFailure = (error) => ({
  error,
  type: GET_BOARDS_FAILURE,
});

export const getBoardsSuccess = (boardIDs, boardsLookup) => ({
  boardIDs,
  boardsLookup,
  type: GET_BOARDS_SUCCESS,
});

// ====================
// SELECT BOARD
// ====================
export const selectBoardAction = (id) => ({
  id,
  type: SELECT_BOARD,
});

// ====================
// UPDATE
// ====================
export const updateBoardAction = (board) => ({
  board,
  type: UPDATE_BOARD,
});

export const updateBoardFailure = (error) => ({
  error,
  type: UPDATE_BOARD_FAILURE,
});

export const updateBoardSuccess = () => ({
  type: UPDATE_BOARD_SUCCESS,
});

// ====================
// UPDATE IN STATE
// ====================
export const updateBoardInLookupAction = (board) => ({
  board,
  type: UPDATE_BOARD_IN_LOOKUP,
});

export const updateBoardImageURLAction = (boardImageURL) => ({
  boardImageURL,
  type: UPDATE_BOARD_IMAGE_URL,
});
