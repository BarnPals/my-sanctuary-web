// Dependencies
import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
// Externals
import { SUCCESS } from 'containers/UniversalNotifications/MESSAGE_TYPES';
import { createAccountSubscriptionAction } from 'containers/AccountSubscriptions/actions';
import { createOrganizationAction, getOrganizationsAction } from 'containers/Organizations/actions';
import { getBoardsAction } from 'containers/Boards/actions';
import { getRecommendationsAction } from 'containers/Recommendations/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { logoutAction } from 'containers/Auth/actions';
import { showUniversalNotificationAction } from 'containers/UniversalNotifications/actions';
// Relative
import { ADMIN } from './ROLES';
import { GET_ACCOUNT, GET_ACCOUNTS, CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from './constants';
import { createAccountApi, getAccountApi, getAccountsApi, updateAccountApi } from './api';
import {
  createAccountFailure,
  createAccountSuccess,
  getAccountAction,
  getAccountFailure,
  getAccountSuccess,
  getAccountsAction,
  getAccountsFailure,
  getAccountsSuccess,
  updateAccountFailure,
  updateAccountSuccess,
} from './actions';

export function* createAccountSaga({ account }) {
  try {
    yield call(createAccountApi, account);
    yield all([
      put(createAccountSuccess()),
      put(createOrganizationAction({ name: 'Personal', organizationType: 'PERSONAL' }, { makePrimary: true })),
    ]);
    yield put(getAccountAction());
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createAccountFailure] });
  }
}

export function* deleteAccountSaga() {
  // @TODO.
}

export function* getAccountSaga() {
  try {
    // Fetch the account.
    const account = yield call(getAccountApi);
    yield put(getAccountSuccess(account));

    // Log them out if they aren't an admin.
    if (get(account, 'role') !== ADMIN) {
      yield put(logoutAction());
      yield delay(1000);
      yield put(
        showUniversalNotificationAction({
          message: 'You must be an admin to sign in here. Log in at barnpals.org, instead!',
        }),
      );
      return;
    }

    // Fetch our organizations and boards data.
    // @WARNING: Organizations is not used in the app atm.
    yield all([
      put(getAccountsAction()),
      put(getBoardsAction({ navigateToMainBoard: true })),
      put(getOrganizationsAction()),
      put(getRecommendationsAction()),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getAccountFailure], skipUniversalNotification: true });
  }
}

export function* getAccountsSaga() {
  try {
    // eslint-disable-next-line
    const [accountIDs, accountsLookup] = yield call(getAccountsApi);
    yield put(getAccountsSuccess(accountsLookup));
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getAccountsFailure] });
  }
}

export function* updateAccountSaga({ account, options }) {
  try {
    // Derive the options.
    const showSuccess = get(options, 'showSuccess');

    // Make request to update account.
    const updatedAccount = yield call(updateAccountApi, account);
    yield put(updateAccountSuccess(updatedAccount));

    // Show success notification if the option is passed.
    if (showSuccess) {
      yield put(showUniversalNotificationAction({ message: 'Account updated successfully!', messageType: SUCCESS }));
    }
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateAccountFailure] });
  }
}

export default [
  takeLatest(CREATE_ACCOUNT, createAccountSaga),
  takeLatest(DELETE_ACCOUNT, deleteAccountSaga),
  takeLatest(GET_ACCOUNT, getAccountSaga),
  takeLatest(GET_ACCOUNTS, getAccountsSaga),
  takeLatest(UPDATE_ACCOUNT, updateAccountSaga),
];
