// Dependencies
import get from 'lodash/get';
// Relative
import {
  CREATE_RECOMMENDATION,
  CREATE_RECOMMENDATION_FAILURE,
  CREATE_RECOMMENDATION_SUCCESS,
  DELETE_RECOMMENDATION,
  DELETE_RECOMMENDATION_FAILURE,
  DELETE_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_SUCCESS,
  RESET,
  UPDATE_RECOMMENDATION,
  UPDATE_RECOMMENDATION_FAILURE,
  UPDATE_RECOMMENDATION_SUCCESS,
  UPDATE_RECOMMENDATION_IN_LOOKUP,
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
  recommendationIDs: [],
  recommendationsLookup: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECOMMENDATION: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_RECOMMENDATION_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_RECOMMENDATION_SUCCESS: {
      return { ...state, creating: false };
    }
    case DELETE_RECOMMENDATION: {
      return { ...state, deleting: true, error: '' };
    }
    case DELETE_RECOMMENDATION_FAILURE: {
      return { ...state, deleting: false, error: action.error };
    }
    case DELETE_RECOMMENDATION_SUCCESS: {
      return { ...state, deleting: false };
    }
    case GET_RECOMMENDATIONS: {
      return { ...state, getting: true, error: '' };
    }
    case GET_RECOMMENDATIONS_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_RECOMMENDATIONS_SUCCESS: {
      return {
        ...state,
        getting: false,
        recommendationIDs: action.recommendationIDs,
        recommendationsLookup: action.recommendationsLookup,
      };
    }
    case RESET: {
      return { ...initialState };
    }
    case UPDATE_RECOMMENDATION: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_RECOMMENDATION_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_RECOMMENDATION_SUCCESS: {
      return { ...state, updating: false };
    }
    case UPDATE_RECOMMENDATION_IN_LOOKUP: {
      // Derive the recommendation properties.
      const recommendation = get(action, 'recommendation');
      const recommendationID = get(recommendation, 'id');

      return {
        ...state,
        recommendationsLookup: {
          ...state.recommendationsLookup,
          [recommendationID]: {
            ...state.recommendationsLookup[recommendationID],
            ...recommendation,
          },
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
