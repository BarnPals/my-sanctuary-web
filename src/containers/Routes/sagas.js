// Dependencies
import { call, takeLatest, put } from 'redux-saga/effects';
import * as firebase from 'firebase/app';
import get from 'lodash/get';
// Externals
import history from 'store/history';
import { registerAuthStateChangeAction } from 'containers/Auth/actions';
// Relative
import { APP_INIT } from './constants';

export function* appInitSaga({ options }) {
  try {
    // Initialize firebase if we are told to.
    if (get(options, 'initFirebase')) {
      yield call(firebase.initializeApp, {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      });
    }

    // Navigate them to the root URL.
    yield call(history.push, '/');

    // Start listening for auth changes.
    yield put(registerAuthStateChangeAction());
  } catch (error) {
    if (window.FS) {
      window.FS.log('warn', 'error', error);
    }
  }
}

export default [takeLatest(APP_INIT, appInitSaga)];
