// Dependencies
import get from 'lodash/get';
// Relative
import {
  CREATE_NOTE,
  CREATE_NOTE_FAILURE,
  CREATE_NOTE_SUCCESS,
  DELETE_NOTE,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  GET_NOTES,
  GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
  RESET,
  UPDATE_NOTE,
  UPDATE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_IN_LOOKUP,
} from './constants';

const initialState = {
  // Error.
  error: '',
  // In flight.
  creating: false,
  deleting: false,
  getting: false,
  updating: false,
  // Data.
  notesLookup: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_NOTE_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_NOTE_SUCCESS: {
      return { ...state, creating: false };
    }
    case DELETE_NOTE: {
      return { ...state, deleting: true, error: '' };
    }
    case DELETE_NOTE_FAILURE: {
      return { ...state, deleting: false, error: action.error };
    }
    case DELETE_NOTE_SUCCESS: {
      return { ...state, deleting: false };
    }
    case GET_NOTES: {
      return { ...state, getting: true, error: '' };
    }
    case GET_NOTES_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_NOTES_SUCCESS: {
      return {
        ...state,
        getting: false,
        notesLookup: action.notesLookup,
      };
    }
    case RESET: {
      return { ...initialState };
    }
    case UPDATE_NOTE: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_NOTE_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_NOTE_SUCCESS: {
      return { ...state, updating: false };
    }
    case UPDATE_NOTE_IN_LOOKUP: {
      // Derive the note properties.
      const note = get(action, 'note');
      const noteID = get(note, 'id');

      return {
        ...state,
        notesLookup: {
          ...state.notesLookup,
          [noteID]: {
            ...state.notesLookup[noteID],
            ...note,
          },
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
