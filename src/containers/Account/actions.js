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

// ====================
// CREATE
// ====================
export const createAccountAction = () => ({
  type: CREATE_ACCOUNT,
});

export const createAccountFailure = (error) => ({
  error,
  type: CREATE_ACCOUNT_FAILURE,
});

export const createAccountSuccess = () => ({
  type: CREATE_ACCOUNT_SUCCESS,
});

// ====================
// DELETE
// ====================
export const deleteAccountAction = (id) => ({
  id,
  type: DELETE_ACCOUNT,
});

export const deleteAccountFailure = (error) => ({
  error,
  type: DELETE_ACCOUNT_FAILURE,
});

export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getAccountAction = () => ({
  type: GET_ACCOUNT,
});

export const getAccountFailure = (error) => ({
  error,
  type: GET_ACCOUNT_FAILURE,
});

export const getAccountSuccess = (account) => ({
  account,
  type: GET_ACCOUNT_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getAccountsAction = () => ({
  type: GET_ACCOUNTS,
});

export const getAccountsFailure = (error) => ({
  error,
  type: GET_ACCOUNTS_FAILURE,
});

export const getAccountsSuccess = (accountsLookup) => ({
  accountsLookup,
  type: GET_ACCOUNTS_SUCCESS,
});

// ====================
// UPDATE
// ====================
export const updateAccountAction = (account, options) => ({
  account,
  options,
  type: UPDATE_ACCOUNT,
});

export const updateAccountFailure = (error) => ({
  error,
  type: UPDATE_ACCOUNT_FAILURE,
});

export const updateAccountSuccess = (account) => ({
  account,
  type: UPDATE_ACCOUNT_SUCCESS,
});

// ====================
// UPDATE IN STATE
// ====================
export const updateProfileImageURLAction = (profileImageURL) => ({
  profileImageURL,
  type: UPDATE_PROFILE_IMAGE_URL,
});
