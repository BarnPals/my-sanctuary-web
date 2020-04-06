// Relative
import { FETCH_PHOTOS, FETCH_PHOTOS_FAILURE, FETCH_PHOTOS_SUCCESS } from './constants';

const initialState = {
  fetching: false,
  page: 1,
  perPage: 18,
  photos: [],
  query: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS: {
      return { ...state, fetching: false, error: '', page: action.page, perPage: action.perPage, query: action.query };
    }
    case FETCH_PHOTOS_FAILURE: {
      return { ...state, fetching: false, error: action.error };
    }
    case FETCH_PHOTOS_SUCCESS: {
      return { ...state, fetching: false, error: '', photos: action.photos };
    }
    default: {
      return { ...state };
    }
  }
};
