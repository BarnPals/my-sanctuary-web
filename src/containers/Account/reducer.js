// Relative
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNTS,
  GET_ACCOUNTS_FAILURE,
  GET_ACCOUNTS_SUCCESS,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_PROFILE_IMAGE_URL,
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
  account: undefined,
  accountsLookup: {},
  profileImageURL: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_ACCOUNT_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_ACCOUNT_SUCCESS: {
      return { ...state, creating: false };
    }
    case DELETE_ACCOUNT: {
      return { ...state, deleting: true, error: '' };
    }
    case DELETE_ACCOUNT_FAILURE: {
      return { ...state, deleting: false, error: action.error };
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return { ...state, deleting: false };
    }
    case GET_ACCOUNT: {
      return { ...state, getting: true, error: '' };
    }
    case GET_ACCOUNT_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_ACCOUNT_SUCCESS: {
      return { ...state, getting: false, account: action.account };
    }
    case GET_ACCOUNTS: {
      return { ...state, getting: true, error: '' };
    }
    case GET_ACCOUNTS_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_ACCOUNTS_SUCCESS: {
      return { ...state, getting: false, accountsLookup: action.accountsLookup };
    }
    case UPDATE_ACCOUNT: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_ACCOUNT_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_ACCOUNT_SUCCESS: {
      return { ...state, updating: false, account: action.account };
    }
    case UPDATE_PROFILE_IMAGE_URL: {
      return { ...state, profileImageURL: action.profileImageURL };
    }
    default: {
      return { ...state };
    }
  }
};
