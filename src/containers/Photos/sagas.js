// Dependencies
import { call, put, takeLatest } from 'redux-saga/effects';
import shuffle from 'lodash/shuffle';
// Externals
import { handleSagaError } from 'utils/helpers/sagaHelpers';
// Relative
import { fetchPhotosApi } from './api';
import { FETCH_PHOTOS } from './constants';
import { fetchPhotosFailure, fetchPhotosSuccess } from './actions';

export function* fetchPhotosSaga({ options }) {
  try {
    const photos = yield call(fetchPhotosApi, options);
    yield put(fetchPhotosSuccess(shuffle(photos)));
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [fetchPhotosFailure] });
  }
}

export default [takeLatest(FETCH_PHOTOS, fetchPhotosSaga)];
