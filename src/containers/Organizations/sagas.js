// Dependencies
import { all, call, put, takeLatest } from 'redux-saga/effects';
// Externals
import { handleSagaError } from 'utils/helpers/sagaHelpers';
// Relative
import { GET_ORGANIZATIONS, CREATE_ORGANIZATION, UPDATE_ORGANIZATION } from './constants';
import { createOrganizationApi, getOrganizationsApi, updateOrganizationApi } from './api';
import {
  createOrganizationFailure,
  createOrganizationSuccess,
  getOrganizationsAction,
  getOrganizationsFailure,
  getOrganizationsSuccess,
  updateOrganizationFailure,
  updateOrganizationSuccess,
} from './actions';

export function* createOrganizationSaga({ organization }) {
  try {
    yield call(createOrganizationApi, organization);
    yield all([put(createOrganizationSuccess())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createOrganizationFailure] });
  }
}

export function* getOrganizationsSaga() {
  try {
    const [organizationIDs, organizationsLookup] = yield call(getOrganizationsApi);
    yield all([put(getOrganizationsSuccess(organizationIDs, organizationsLookup))]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getOrganizationsFailure] });
  }
}

export function* updateOrganizationSaga({ organization }) {
  try {
    yield call(updateOrganizationApi, organization);
    yield all([put(updateOrganizationSuccess()), put(getOrganizationsAction())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateOrganizationFailure] });
  }
}

export default [
  takeLatest(CREATE_ORGANIZATION, createOrganizationSaga),
  takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga),
  takeLatest(UPDATE_ORGANIZATION, updateOrganizationSaga),
];
