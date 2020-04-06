// Relative
import { FETCH_PHOTOS, FETCH_PHOTOS_FAILURE, FETCH_PHOTOS_SUCCESS } from './constants';

export const fetchPhotosAction = (options) => ({
  options,
  type: FETCH_PHOTOS,
});
export const fetchPhotosFailure = (error) => ({
  error,
  type: FETCH_PHOTOS_FAILURE,
});
export const fetchPhotosSuccess = (photos) => ({
  photos,
  type: FETCH_PHOTOS_SUCCESS,
});
