// Dependencies
import { all, call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isError from 'lodash/isError';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
// Externals
import { ERROR } from 'containers/UniversalNotifications/MESSAGE_TYPES';
import { showUniversalNotificationAction } from 'containers/UniversalNotifications/actions';

// ==============================
// HELPER TO HANDLE SAGA ERRORS.
// ==============================
export function* handleSagaError(error, options = {}) {
  // Escape early if error isn't what we expect.
  if (!isError(error)) {
    if (window.FS) {
      window.FS.log(
        'warn',
        `Unhandled error due to "handleSagaError"'s first argument "error".\n${error}\nPlease be sure that "error" is of type Error.`,
      );
    }
    return;
  }

  // Derive the error's response.
  const errorResponse = get(error, 'response');

  // Warn with the error's message if it didn't propagate from a network request.
  if (!errorResponse) {
    const errorMessage = get(error, 'message', 'Unknown error occurred.');
    yield call(handleSagaErrorOptions, options, errorMessage);
    return;
  }

  // Retrieve the error message from the response if any.
  const errorMessage = get(errorResponse, 'data.clientError') || get(errorResponse, 'data.serverError', '');
  yield call(handleSagaErrorOptions, options, errorMessage);
}

// ==============================
// DISPATCHES ACTIONS WITH ERROR MESSAGES.
// ==============================
function* handleSagaErrorOptions(options, errorMessage) {
  // Log the error to FS.
  if (window.FS) {
    window.FS.log('warn', errorMessage);
  }

  // Derive the actionCreators to fire off.
  const actionCreators = get(options, 'actionCreators', []);

  // Escape early if actionCreators isn't what we expect.
  const firstAction = get(actionCreators, '[0]');
  if (!isFunction(firstAction)) {
    if (window.FS) {
      window.FS.log(
        'warn',
        `Unhandled error due to "handleSagaError"'s second argument "options".\n${options}\nPlease be sure that "options.actionCreators" is an array of action creators (ie. functions), not actions (ie. objects).`,
      );
    }
    return;
  }

  // Escape early if there are no extra actions to dispatch.
  if (isEmpty(actionCreators)) {
    return;
  }

  // Dispatch all actions and provide the errorMessage with each one.
  yield all(map(actionCreators, (actionCreator) => put(actionCreator(errorMessage))));

  // Show the universal notification unless they opt out.
  if (!get(options, 'skipUniversalNotification')) {
    yield put(showUniversalNotificationAction({ message: errorMessage, messageType: ERROR }));
  }
}
