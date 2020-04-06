// Dependencies
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
// Externals
import { getNodesAction } from '../Nodes/actions';
import { handleSagaError } from '../../utils/helpers/sagaHelpers';
import { updateNodeApi } from '../Nodes/api';
// Relative
import { CREATE_RECOMMENDATION, GET_RECOMMENDATIONS, UPDATE_RECOMMENDATION } from './constants';
import { createRecommendationApi, getRecommendationsApi, updateRecommendationApi } from './api';
import {
  createRecommendationFailure,
  createRecommendationSuccess,
  getRecommendationsAction,
  getRecommendationsFailure,
  getRecommendationsSuccess,
  updateRecommendationFailure,
  updateRecommendationSuccess,
} from './actions';

export function* createRecommendationSaga({ recommendation }) {
  // Derive the recommendation properties.
  const parentNodeID = get(recommendation, 'parentNodeID');
  const recommendationID = uuidv4();

  // Derive the node properties.
  const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);
  const node = get(nodesLookup, `[${parentNodeID}]`);
  const recommendationIDs = cloneDeep(get(node, 'recommendationIDs', []));

  // Add the new recommendationID at the beginning of the parent recommendation's recommendationIDs array.
  recommendationIDs.unshift(recommendationID);

  // Derive the updated node.
  const updatedNode = {
    id: parentNodeID,
    recommendationIDs,
  };

  try {
    // Create the new recommendation first (so it's ready for the UI).
    const newRecommendation = yield call(createRecommendationApi, { ...recommendation, id: recommendationID });

    // Update the node's recommendationIDs.
    yield call(updateNodeApi, updatedNode);

    // Refetch our recommendations and nodes.
    yield all([
      put(createRecommendationSuccess(newRecommendation)),
      put(getRecommendationsAction()),
      put(getNodesAction()),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createRecommendationFailure] });
  }
}

export function* getRecommendationsSaga() {
  try {
    // Fetch the recommendations.
    const [recommendationIDs, recommendationsLookup] = yield call(getRecommendationsApi);
    yield put(getRecommendationsSuccess(recommendationIDs, recommendationsLookup));
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getRecommendationsFailure] });
  }
}

export function* updateRecommendationSaga({ recommendation }) {
  try {
    yield call(updateRecommendationApi, recommendation);
    yield all([put(getRecommendationsAction()), put(updateRecommendationSuccess())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateRecommendationFailure] });
  }
}

export default [
  takeLatest(CREATE_RECOMMENDATION, createRecommendationSaga),
  takeLatest(GET_RECOMMENDATIONS, getRecommendationsSaga),
  takeLatest(UPDATE_RECOMMENDATION, updateRecommendationSaga),
];
