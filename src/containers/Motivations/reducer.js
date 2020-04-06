// Dependencies
import concat from 'lodash/concat';
import get from 'lodash/get';
// Relative
import {
  CREATE_MOTIVATION,
  CREATE_MOTIVATION_FAILURE,
  CREATE_MOTIVATION_IN_LOOKUP,
  CREATE_MOTIVATION_SUCCESS,
  GET_MOTIVATIONS,
  GET_MOTIVATIONS_FAILURE,
  GET_MOTIVATIONS_SUCCESS,
  RESET,
  SELECT_MOTIVATION,
  UPDATE_MOTIVATION,
  UPDATE_MOTIVATION_FAILURE,
  UPDATE_MOTIVATION_IN_LOOKUP,
  UPDATE_MOTIVATION_SUCCESS,
} from './constants';

const initialState = {
  // Error.
  error: '',
  // In flight.
  creating: false,
  getting: false,
  updating: false,
  // Data.
  motivationIDs: [],
  motivationsLookup: {},
  selectedMotivationID: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MOTIVATION: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_MOTIVATION_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_MOTIVATION_IN_LOOKUP: {
      // Derive the motivation properties.
      const motivation = get(action, 'motivation');
      const motivationID = get(motivation, 'id');

      return {
        ...state,
        motivationsLookup: {
          ...state.motivationsLookup,
          [motivationID]: {
            ...state.motivationsLookup[motivationID],
            ...motivation,
          },
        },
        motivationIDs: concat(state.motivationIDs, [motivationID]),
      };
    }
    case CREATE_MOTIVATION_SUCCESS: {
      return { ...state, creating: false };
    }
    case GET_MOTIVATIONS: {
      return { ...state, getting: true, error: '' };
    }
    case GET_MOTIVATIONS_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_MOTIVATIONS_SUCCESS: {
      return {
        ...state,
        getting: false,
        motivationIDs: action.motivationIDs,
        motivationsLookup: action.motivationsLookup,
      };
    }
    case RESET: {
      return { ...initialState };
    }
    case SELECT_MOTIVATION: {
      return { ...state, selectedMotivationID: action.id };
    }
    case UPDATE_MOTIVATION: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_MOTIVATION_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_MOTIVATION_IN_LOOKUP: {
      // Derive the motivation properties.
      const motivation = get(action, 'motivation');
      const motivationID = get(motivation, 'id');

      return {
        ...state,
        motivationsLookup: {
          ...state.motivationsLookup,
          [motivationID]: {
            ...state.motivationsLookup[motivationID],
            ...motivation,
          },
        },
      };
    }
    case UPDATE_MOTIVATION_SUCCESS: {
      return { ...state, updating: false };
    }
    default: {
      return { ...state };
    }
  }
};
