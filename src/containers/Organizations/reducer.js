// Relative
import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION_SUCCESS,
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_FAILURE,
  GET_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
} from './constants';

const initialState = {
  // Error.
  error: '',
  // In flight.
  creating: false,
  getting: false,
  updating: false,
  // Data.
  organizationIDs: [],
  organizationsLookup: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_ORGANIZATION_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_ORGANIZATION_SUCCESS: {
      return { ...state, creating: false, showingCreate: false };
    }
    case GET_ORGANIZATIONS: {
      return { ...state, getting: true, error: '' };
    }
    case GET_ORGANIZATIONS_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_ORGANIZATIONS_SUCCESS: {
      return {
        ...state,
        getting: false,
        organizationsLookup: action.organizationsLookup,
        organizationIDs: action.organizationIDs,
      };
    }
    case UPDATE_ORGANIZATION: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_ORGANIZATION_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_ORGANIZATION_SUCCESS: {
      return { ...state, updating: false, showingUpdate: false };
    }
    default: {
      return { ...state };
    }
  }
};
