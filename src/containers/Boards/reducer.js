// Dependencies
import get from 'lodash/get';
// Relative
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

const initialState = {
  // Error.
  error: '',
  // In flight.
  creating: false,
  deleting: false,
  gettingBoards: false,
  updating: false,
  // Data.
  boardIDs: [],
  boardImageURL: '',
  boardsLookup: {},
  selectedBoardID: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_BOARD_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_BOARD_SUCCESS: {
      return { ...state, creating: false, showingCreate: false };
    }
    case DELETE_BOARD: {
      return { ...state, deleting: true, error: '' };
    }
    case DELETE_BOARD_FAILURE: {
      return { ...state, deleting: false, error: action.error };
    }
    case DELETE_BOARD_SUCCESS: {
      return { ...state, deleting: false, showingDelete: false };
    }
    case GET_BOARDS: {
      return { ...state, gettingBoards: true, error: '' };
    }
    case GET_BOARDS_FAILURE: {
      return { ...state, gettingBoards: false, error: action.error };
    }
    case GET_BOARDS_SUCCESS: {
      return {
        ...state,
        gettingBoards: false,
        boardsLookup: action.boardsLookup,
        boardIDs: action.boardIDs,
      };
    }
    case SELECT_BOARD: {
      return { ...state, selectedBoardID: action.id };
    }
    case UPDATE_BOARD: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_BOARD_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_BOARD_SUCCESS: {
      return { ...state, updating: false, showingUpdate: false };
    }
    case UPDATE_BOARD_IN_LOOKUP: {
      // Derive the board properties.
      const board = get(action, 'board');
      const boardID = get(board, 'id');

      return {
        ...state,
        boardsLookup: {
          ...state.boardsLookup,
          [boardID]: {
            ...state.boardsLookup[boardID],
            ...board,
          },
        },
      };
    }
    case UPDATE_BOARD_IMAGE_URL: {
      return { ...state, boardImageURL: action.boardImageURL };
    }
    default: {
      return { ...state };
    }
  }
};
