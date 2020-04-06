// Dependencies
import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest, select } from 'redux-saga/effects';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import get from 'lodash/get';
// Externals
import history from 'store/history';
import { INFO } from 'containers/UniversalNotifications/MESSAGE_TYPES';
import { appInitAction } from 'containers/Routes/actions';
import { createAccountAction, getAccountAction } from 'containers/Account/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { resetAppAction } from 'containers/Root/actions';
import { showUniversalNotificationAction } from 'containers/UniversalNotifications/actions';
// Relative
import { loginApi, loginWithProviderApi, logoutApi, sendEmailVerificationApi, sendPasswordResetEmailApi } from './api';
import {
  LOGIN,
  LOGIN_WITH_PROVIDER,
  LOGOUT,
  REGISTER_AUTH_STATE_CHANGE,
  SEND_EMAIL_VERIFICATION,
  SEND_PASSWORD_RESET_EMAIL,
} from './constants';
import {
  loginFailure,
  loginSuccess,
  loginWithProviderFailure,
  loginWithProviderSuccess,
  sendEmailVerificationFailure,
  sendEmailVerificationSuccess,
  sendPasswordResetEmailFailure,
  sendPasswordResetEmailSuccess,
} from './actions';

function* loginSaga({ credentials }) {
  try {
    yield call(loginApi, credentials);
    yield all([put(loginSuccess()), put(appInitAction())]);
  } catch (error) {
    // Custom error message for user-not-found.
    if (error.code === 'auth/user-not-found') {
      yield call(handleSagaError, new Error('Invalid email or password.'), { actionCreators: [loginFailure] });
      return;
    }

    // Handle the error normally.
    yield call(handleSagaError, error, { actionCreators: [loginFailure] });
  }
}

function* loginWithProviderSaga({ providerName }) {
  try {
    // Make the call to authenticate.
    const result = yield call(loginWithProviderApi, providerName);

    // Create an account if they are a new user.
    if (get(result, 'additionalUserInfo.isNewUser')) {
      yield all([put(loginWithProviderSuccess()), put(createAccountAction())]);
      return;
    }

    // Login normally if they are not a new user.
    yield all([put(loginWithProviderSuccess()), put(appInitAction())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [loginWithProviderFailure] });
  }
}

function* logoutSaga() {
  // Attempt to log out.
  yield call(logoutApi);

  // Clear our local storage.
  localStorage.clear();

  // Reset our redux state.
  yield put(resetAppAction());

  // Call app init to determine where to go next.
  yield put(appInitAction());
}

function* sendEmailVerificationSaga() {
  try {
    yield call(sendEmailVerificationApi);
    yield put(sendEmailVerificationSuccess());
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [sendEmailVerificationFailure] });
  }
}

function* sendPasswordResetEmailSaga({ customEmail }) {
  // Derive the account email.
  const account = yield select((state) => state.accountsReducer.account);
  const email = customEmail || get(account, 'email');

  // Derive the action code settings.
  const actionCodeSettings = {
    handleCodeInApp: true,
    url: window.location.origin,
  };

  try {
    yield call(sendPasswordResetEmailApi, email, actionCodeSettings);
    yield all([
      put(sendPasswordResetEmailSuccess()),
      put(
        showUniversalNotificationAction({ message: `We just tried to send an email to ${email}.`, messageType: INFO }),
      ),
    ]);
  } catch (error) {
    yield all([
      put(sendPasswordResetEmailFailure(error)),
      put(
        showUniversalNotificationAction({ message: `We just tried to send an email to ${email}.`, messageType: INFO }),
      ),
    ]);
  }
}

function* registerAuthStateChangeSaga() {
  // // Listen to see if auth changes.
  const channel = yield call(onAuthChange);

  // This code will listen to see if any actions are emitted from the onAuthChange code above.
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

const onAuthChange = () =>
  eventChannel((emitAction) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // No user is signed in.
        history.push('/');
        return;
      }

      // Fetch our app init actions if they're logged in.
      emitAction(getAccountAction());

      // Derive user properties.
      const displayName = get(user, 'displayName');
      const email = get(user, 'email');
      const emailVerified = get(user, 'emailVerified');
      const id = get(user, 'uid');
      const phoneNumber = get(user, 'phoneNumber');
      const photoURL = get(user, 'photoURL');

      // Identify our user on Full Story.
      if (window.FS) {
        window.FS.identify(id, {
          displayName,
          email,
          emailVerified,
          environment_str: process.env.REACT_APP_ENV,
          phoneNumber,
          photoURL,
        });
      }
    });

    // @WARNING: I've never seen this code run, but it can theoretically.
    // This is called when the channel is canceled, which should currently never happen.
    return () => {};
  });

export default [
  takeLatest(LOGIN, loginSaga),
  takeLatest(LOGIN_WITH_PROVIDER, loginWithProviderSaga),
  takeLatest(LOGOUT, logoutSaga),
  takeLatest(REGISTER_AUTH_STATE_CHANGE, registerAuthStateChangeSaga),
  takeLatest(SEND_EMAIL_VERIFICATION, sendEmailVerificationSaga),
  takeLatest(SEND_PASSWORD_RESET_EMAIL, sendPasswordResetEmailSaga),
];
