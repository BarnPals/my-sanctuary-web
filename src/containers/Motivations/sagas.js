// Dependencies
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
// Externals
import { MOTIVATION_UPDATE } from 'containers/BottomBar/ITEMS';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
// Relative
import { CREATE_MOTIVATION, GET_MOTIVATIONS, SELECT_MOTIVATION, UPDATE_MOTIVATION } from './constants';
import { createMotivationApi, getMotivationsApi, updateMotivationApi } from './api';
import {
  createMotivationFailure,
  createMotivationSuccess,
  getMotivationsAction,
  getMotivationsFailure,
  getMotivationsSuccess,
  updateMotivationFailure,
  updateMotivationSuccess,
} from './actions';

export function* createMotivationSaga({ motivation }) {
  // Derive the boardID.
  const selectedBoardID = yield select((state) => state.boardsReducer.selectedBoardID);

  try {
    yield call(createMotivationApi, { ...motivation, boardID: selectedBoardID });
    yield all([put(createMotivationSuccess()), put(getMotivationsAction())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createMotivationFailure] });
  }
}

export function* getMotivationsSaga() {
  try {
    // Derive the boardID.
    const selectedBoardID = yield select((state) => state.boardsReducer.selectedBoardID);

    // Escape early if there is no boardID.
    if (!selectedBoardID) {
      yield put(getMotivationsSuccess([], {}));
      return;
    }

    // Fetch motivationIDs and motivationsLookup.
    const [motivationIDs, motivationsLookup] = yield call(getMotivationsApi, selectedBoardID);
    yield put(getMotivationsSuccess(motivationIDs, motivationsLookup));
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getMotivationsFailure] });
  }
}

export function* selectMotivationSaga() {
  yield put(selectBottomBarItemAction(MOTIVATION_UPDATE));
}

export function* updateMotivationSaga({ motivation }) {
  try {
    yield call(updateMotivationApi, motivation);
    yield all([put(updateMotivationSuccess()), put(getMotivationsAction())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateMotivationFailure] });
  }
}

export default [
  takeLatest(CREATE_MOTIVATION, createMotivationSaga),
  takeLatest(GET_MOTIVATIONS, getMotivationsSaga),
  takeLatest(SELECT_MOTIVATION, selectMotivationSaga),
  takeLatest(UPDATE_MOTIVATION, updateMotivationSaga),
];
