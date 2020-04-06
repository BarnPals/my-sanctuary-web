// Dependencies
import { all } from 'redux-saga/effects';
// Externals
import accountSagas from 'containers/Account/sagas';
import authSagas from 'containers/Auth/sagas';
import boardsSagas from 'containers/Boards/sagas';
import motivationsSagas from 'containers/Motivations/sagas';
import nodesSagas from 'containers/Nodes/sagas';
import notesSagas from 'containers/Notes/sagas';
import organizationsSagas from 'containers/Organizations/sagas';
import photosSagas from 'containers/Photos/sagas';
import recommendationsSagas from 'containers/Recommendations/sagas';
import registerSagas from 'containers/Register/sagas';
import routesSagas from 'containers/Routes/sagas';

// NOTE: Current pattern taken from https://github.com/redux-saga/redux-saga/issues/160#issuecomment-308540204
export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...authSagas,
    ...boardsSagas,
    ...motivationsSagas,
    ...nodesSagas,
    ...notesSagas,
    ...organizationsSagas,
    ...photosSagas,
    ...recommendationsSagas,
    ...registerSagas,
    ...routesSagas,
  ]);
}
