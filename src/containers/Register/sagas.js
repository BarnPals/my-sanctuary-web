// Dependencies
import { all, call, put, takeLatest } from 'redux-saga/effects';
// Externals
import { createAccountAction } from 'containers/Account/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
// Relative
import { registerApi } from './api';
import { REGISTER } from './constants';
import { registerFailure, registerSuccess } from './actions';

export function* registerSaga({ user }) {
  try {
    yield call(registerApi, user);
    yield all([put(createAccountAction()), put(registerSuccess())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [registerFailure] });
  }
}

export default [takeLatest(REGISTER, registerSaga)];
