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

// ====================
// CREATE
// ====================
export const createOrganizationAction = (organization, options = {}) => ({
  organization,
  options,
  type: CREATE_ORGANIZATION,
});

export const createOrganizationFailure = (error) => ({
  error,
  type: CREATE_ORGANIZATION_FAILURE,
});

export const createOrganizationSuccess = () => ({
  type: CREATE_ORGANIZATION_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getOrganizationsAction = () => ({
  type: GET_ORGANIZATIONS,
});

export const getOrganizationsFailure = (error) => ({
  error,
  type: GET_ORGANIZATIONS_FAILURE,
});

export const getOrganizationsSuccess = (organizationIDs, organizationsLookup) => ({
  organizationIDs,
  organizationsLookup,
  type: GET_ORGANIZATIONS_SUCCESS,
});

// ====================
// UPDATE
// ====================
export const updateOrganizationAction = (organization) => ({
  organization,
  type: UPDATE_ORGANIZATION,
});

export const updateOrganizationFailure = (error) => ({
  error,
  type: UPDATE_ORGANIZATION_FAILURE,
});

export const updateOrganizationSuccess = () => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
});
